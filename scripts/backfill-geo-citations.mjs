#!/usr/bin/env node
/**
 * Backfill structured `citations` into MDX frontmatter from existing `sourceUrls`.
 *
 * Why:
 *   PR #3 shipped the GEO citation field (DocCitation[]) but only git-rebase
 *   was filled by hand. The KDD '24 GEO paper shows cited sources (+27% LLM
 *   citation rate, +115% for rank-5 sites) — leaving 524/526 articles
 *   without citations wastes the entire lever.
 *
 * What this does:
 *   - For every MDX file under content/{zh,en}/ that has `sourceUrls` but
 *     no `citations`, derive a citations[] array:
 *       git-scm.com/docs/...       → kind: "official"
 *       git-scm.com/book/...       → kind: "book"
 *       *.github.com / kernel.org  → kind: "discussion"
 *       arxiv.org                  → kind: "paper"
 *       everything else            → kind: "blog"
 *   - Title is derived from the URL path (last meaningful segment, prettified).
 *   - Idempotent: re-running is a no-op on files that already have citations.
 *   - Never overwrites hand-written citations; only adds when absent.
 *
 * What it does NOT do:
 *   - Does not add `quotes` or `stats`. Those need human judgment (which
 *     Pro Git sentence to quote, which benchmark number). This script
 *     closes the 80% gap (citations) automatically; quotes/stats are a
 *     follow-up manual pass on the 62 core articles.
 *
 * Usage:
 *   node scripts/backfill-geo-citations.mjs            # write changes
 *   node scripts/backfill-geo-citations.mjs --dry-run  # preview only
 */

import fs from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const DRY_RUN = process.argv.includes("--dry-run");
const CONTENT_DIR = path.join(root, "content");

const metadataBlockRe = /export const metadata = \{([\s\S]*?)\n\};/;
const sourceUrlsRe = /sourceUrls:\s*\[([\s\S]*?)\]/;
const hasCitationsRe = /\n\s*citations:\s*\[/;
const urlRe = /"([^"]+)"/g;

function classifyKind(url) {
  if (/git-scm\.com\/docs\//.test(url)) return "official";
  if (/git-scm\.com\/book\//.test(url)) return "book";
  if (/arxiv\.org\//.test(url)) return "paper";
  if (/github\.com|kernel\.org|lore\.kernel|lkml\.org/.test(url)) return "discussion";
  return "blog";
}

function deriveTitle(url) {
  try {
    const u = new URL(url);
    const seg = u.pathname.split("/").filter(Boolean).pop() ?? u.hostname;
    // Strip .html and trailing fragment, replace separators
    const cleaned = seg
      .replace(/\.html?$/i, "")
      .replace(/[#?].*$/, "")
      .replace(/[-_]/g, " ")
      .replace(/\s+/g, " ")
      .trim();
    if (!cleaned) return u.hostname;
    // Capitalize first letter; keep the host as context for short slugs
    const cap = cleaned.charAt(0).toUpperCase() + cleaned.slice(1);
    return cap.length < 8 ? `${u.hostname} — ${cap}` : cap;
  } catch {
    return url;
  }
}

function buildCitationsBlock(urls) {
  const items = urls.map((url) => {
    const kind = classifyKind(url);
    const title = deriveTitle(url);
    return [
      "    {",
      `      title: ${JSON.stringify(title)},`,
      `      url: ${JSON.stringify(url)},`,
      `      kind: ${JSON.stringify(kind)},`,
      "    },",
    ].join("\n");
  });
  return `  citations: [\n${items.join("\n")}\n  ],`;
}

async function processFile(file) {
  const source = await fs.readFile(file, "utf8");
  const blockMatch = source.match(metadataBlockRe);
  if (!blockMatch) return { skipped: "no metadata block" };

  const block = blockMatch[1];

  // Skip if citations already present.
  if (hasCitationsRe.test(block)) {
    return { skipped: "already has citations" };
  }

  const urlsMatch = block.match(sourceUrlsRe);
  if (!urlsMatch) {
    return { skipped: "no sourceUrls" };
  }
  const urls = Array.from(urlsMatch[1].matchAll(urlRe), (m) => m[1]);
  if (urls.length === 0) {
    return { skipped: "empty sourceUrls" };
  }

  // Insert citations after the full `sourceUrls: [ ... ]` array (and its
  // trailing comma, if any). We match the array literal directly on the
  // source so the insert lands in the right place regardless of trailing
  // comma style.
  const sourceUrlsLiteralRe = /sourceUrls:\s*\[([\s\S]*?)\],?/;
  const litMatch = source.match(sourceUrlsLiteralRe);
  if (!litMatch) {
    return { skipped: "could not match sourceUrls literal" };
  }
  const insertPos = litMatch.index + litMatch[0].length;

  const citationsBlock = "\n" + buildCitationsBlock(urls);
  const nextSource = source.slice(0, insertPos) + citationsBlock + source.slice(insertPos);

  if (!DRY_RUN) {
    await fs.writeFile(file, nextSource, "utf8");
  }
  return { updated: urls.length };
}

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) {
      files.push(...(await walk(full)));
    } else if (e.name.endsWith(".mdx")) {
      files.push(full);
    }
  }
  return files;
}

async function main() {
  const files = (await walk(CONTENT_DIR)).sort();
  let updated = 0;
  let skipped = 0;
  let totalCitations = 0;

  for (const file of files) {
    const rel = path.relative(root, file);
    const result = await processFile(file);
    if (result.updated) {
      updated += 1;
      totalCitations += result.updated;
      console.log(`✓ ${rel}  (+${result.updated} citations)`);
    } else {
      skipped += 1;
      if (process.env.VERBOSE) console.log(`· ${rel}  (${result.skipped})`);
    }
  }

  console.log("");
  console.log(`Files updated:        ${updated}`);
  console.log(`Files skipped:        ${skipped}`);
  console.log(`Citations generated:  ${totalCitations}`);
  if (DRY_RUN) console.log("(dry-run: no files written)");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
