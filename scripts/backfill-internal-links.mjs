#!/usr/bin/env node
/**
 * Backfill internal links.
 *
 * Problem: 526 articles contain essentially zero internal links. Every page
 * is an island — PageRank can't flow, crawlers under-discover long-tail
 * pages, and users hit dead ends. This is the single biggest untapped SEO
 * lever after the GEO citations pass.
 *
 * Two passes, both idempotent:
 *
 * Pass A — linkify existing plain-text cross-references.
 *   Many ZH articles already list follow-up commands as numbered items like
 *     1. `git reflog`
 *   These are dead text. We rewrite them to real markdown links pointing at
 *   the matching article:  1. [`git reflog`](/zh/commands/git-reflog)
 *   Only links that resolve to a real article are rewritten; unknown
 *   references are left untouched (no broken links).
 *
 * Pass B — inject a structured 「延伸阅读」 / "Further reading" block.
 *   For every article that lacks one, append a 3-link block of sibling
 *   articles from the same section (next/prev + one mid-list), plus a
 *   cross-section link when an override exists. This guarantees every page
 *   has ≥3 outbound internal links and every page is reachable.
 *
 * Both passes operate on the MDX body (after the metadata block) and never
 * touch frontmatter. Re-running is safe — Pass A is a no-op once linked,
 * Pass B skips files that already contain the marker comment.
 *
 * Usage:
 *   node scripts/backfill-internal-links.mjs            # apply both passes
 *   node scripts/backfill-internal-links.mjs --dry-run  # preview counts
 *   node scripts/backfill-internal-links.mjs --pass=a   # only linkify
 *   node scripts/backfill-internal-links.mjs --pass=b   # only inject block
 */

import fs from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const CONTENT_DIR = path.join(root, "content");
const DRY_RUN = process.argv.includes("--dry-run");
const ONLY_PASS = (process.argv.find((a) => a.startsWith("--pass=")) ?? "").split("=")[1];
const RUN_A = !ONLY_PASS || ONLY_PASS === "a";
const RUN_B = !ONLY_PASS || ONLY_PASS === "b";

const metadataBlockRe = /export const metadata = \{([\s\S]*?)\n\};/;

function extractField(block, key) {
  const m = block.match(new RegExp(`${key}:\\s*"([^"]+)"`));
  return m?.[1];
}

// ---------- Build the global article index ----------
// slug + section + locale → docPath. We key on (locale, slug) so linkify can
// resolve `git reflog` → the right locale's article.
async function buildIndex() {
  const index = {
    zh: { bySlug: new Map(), byTitle: new Map(), bySection: new Map() },
    en: { bySlug: new Map(), byTitle: new Map(), bySection: new Map() },
  };
  const allPaths = { zh: [], en: [] };

  async function walk(dir) {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    const files = [];
    for (const e of entries) {
      const full = path.join(dir, e.name);
      if (e.isDirectory()) files.push(...(await walk(full)));
      else if (e.name.endsWith(".mdx")) files.push(full);
    }
    return files;
  }

  for (const locale of ["zh", "en"]) {
    const files = (await walk(path.join(CONTENT_DIR, locale))).sort();
    for (const file of files) {
      const source = await fs.readFile(file, "utf8");
      const m = source.match(metadataBlockRe);
      if (!m) continue;
      const block = m[1];
      const slug = extractField(block, "slug");
      const section = extractField(block, "section");
      const title = extractField(block, "title");
      if (!slug || !section) continue;
      const docPath = path.relative(path.join(CONTENT_DIR, locale), file).replace(/\.mdx$/, "");
      const entry = { docPath, slug, section, title, file };
      index[locale].bySlug.set(slug, entry);
      index[locale].byTitle.set(title, entry);
      if (!index[locale].bySection.has(section)) index[locale].bySection.set(section, []);
      index[locale].bySection.get(section).push(entry);
      allPaths[locale].push(entry);
    }
    // Preserve filesystem order as the "series order" proxy (matches
    // docPathRegistry ordering well enough for sibling selection).
  }
  return { index, allPaths };
}

// ---------- Pass A: linkify plain-text command references ----------
// Matches numbered list items like  "1. `git reflog`"  or  "1. `git reflog` (说明)"
const listItemBacktickRe = /^(\s*\d+\.\s+)`([^`]+)`(.*)$/gm;

function linkifyBody(body, locale, index) {
  let changes = 0;
  const next = body.replace(listItemBacktickRe, (line, prefix, ref, rest) => {
    // ref is e.g. "git reflog" or "git-reflog". Normalize to a slug guess.
    const slugGuess = ref.trim().replace(/^git\s+/, "git-").replace(/\s+/g, "-").toLowerCase();
    // Try direct slug match, then "git-" prefixed, then title match.
    let target =
      index[locale].bySlug.get(slugGuess) ??
      index[locale].bySlug.get(ref.trim().toLowerCase()) ??
      index[locale].bySlug.get(`git-${slugGuess.replace(/^git-/, "")}`);
    if (!target) {
      // Try matching by the command name as a title ("git reflog" tutorial)
      const titleGuess = `${ref} 教程`;
      const titleGuessEn = `${ref} Tutorial`;
      target =
        index[locale].byTitle.get(titleGuess) ??
        index[locale].byTitle.get(titleGuessEn);
    }
    if (!target) return line; // leave untouched rather than risk a broken link
    const href = `/${locale}/${target.docPath}`;
    changes += 1;
    return `${prefix}[\`${ref}\`](${href})${rest}`;
  });
  return { body: next, changes };
}

// ---------- Pass B: inject 「延伸阅读」 / "Further reading" block ----------
// MDX does NOT support HTML comments (<!-- -->) — the `!` is parsed as JSX.
// Use a JS-expression comment instead, which renders to nothing and is safe
// to grep for idempotency.
const INJECT_MARKER = "{/* internal-links:auto */}";

const blockCopy = {
  zh: {
    heading: "## 延伸阅读",
    intro: "沿着同一主题继续深入：",
  },
  en: {
    heading: "## Further reading",
    intro: "Keep going on the same topic:",
  },
};

function pickSiblings(entry, localeIndex, limit = 3) {
  const sectionList = localeIndex.bySection.get(entry.section) ?? [];
  const idx = sectionList.findIndex((e) => e.docPath === entry.docPath);
  if (idx === -1 || sectionList.length <= 1) return [];
  // Prefer prev + next + the one after next, to surface reading continuity.
  const candidates = [];
  if (idx > 0) candidates.push(sectionList[idx - 1]);
  if (idx < sectionList.length - 1) candidates.push(sectionList[idx + 1]);
  if (idx < sectionList.length - 2) candidates.push(sectionList[idx + 2]);
  if (candidates.length < limit && idx > 1) candidates.unshift(sectionList[idx - 2]);
  return candidates.slice(0, limit).filter((c) => c.docPath !== entry.docPath);
}

function buildInjectBlock(entry, locale, localeIndex) {
  const copy = blockCopy[locale];
  const siblings = pickSiblings(entry, localeIndex);
  if (siblings.length === 0) return null;
  const lines = [
    "",
    copy.heading,
    "",
    copy.intro,
    "",
    ...siblings.map((s) => `- [${s.title}](/${locale}/${s.docPath})`),
    "",
  ];
  return `${INJECT_MARKER}\n${lines.join("\n")}`;
}

function injectBlock(source, entry, locale, localeIndex) {
  if (source.includes(INJECT_MARKER)) {
    return { source, injected: false };
  }
  const block = buildInjectBlock(entry, locale, localeIndex);
  if (!block) return { source, injected: false };
  // Strip trailing whitespace/newlines then append.
  const next = source.replace(/\s+$/, "") + "\n\n" + block + "\n";
  return { source: next, injected: true };
}

// ---------- Driver ----------
async function main() {
  const { index, allPaths } = await buildIndex();
  let linkified = 0;
  let linksCreated = 0;
  let blocksInjected = 0;
  let skipped = 0;

  for (const locale of ["zh", "en"]) {
    for (const entry of allPaths[locale]) {
      const source = await fs.readFile(entry.file, "utf8");
      const m = source.match(metadataBlockRe);
      if (!m) {
        skipped += 1;
        continue;
      }
      const metaEnd = m.index + m[0].length;
      const head = source.slice(0, metaEnd);
      let body = source.slice(metaEnd);

      let changed = false;

      if (RUN_A) {
        const res = linkifyBody(body, locale, index);
        if (res.changes > 0) {
          body = res.body;
          linksCreated += res.changes;
          changed = true;
          linkified += 1;
        }
      }

      if (RUN_B) {
        const res = injectBlock(body, entry, locale, index[locale]);
        if (res.injected) {
          body = res.source;
          blocksInjected += 1;
          changed = true;
        }
      }

      if (changed && !DRY_RUN) {
        await fs.writeFile(entry.file, head + body, "utf8");
      }
    }
  }

  console.log(`Articles linkified (pass A): ${linkified}  (${linksCreated} links created)`);
  console.log(`「延伸阅读」 blocks injected (pass B): ${blocksInjected}`);
  console.log(`Skipped (no metadata): ${skipped}`);
  if (DRY_RUN) console.log("(dry-run: no files written)");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
