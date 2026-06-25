#!/usr/bin/env node
/**
 * Export selected English articles into Dev.to-friendly markdown.
 *
 * Why this exists:
 *   Dev.to honors a `canonical_url:` front matter field, emitting a
 *   <link rel="canonical"> back to the original URL. That lets us syndicate
 *   to Dev.to's English developer audience without cannibalizing the source
 *   site's Google ranking. Without canonical, cross-posting risks duplicate
 *   content penalties.
 *
 * What it does:
 *   - Reads each path in DEVTO_SOURCE_PATHS (DocPath strings under content/en/)
 *   - Extracts the MDX `export const metadata = {...}` block via regex
 *   - Writes a single .md file per article under content/_devto/ (gitignored)
 *   - The output uses Jekyll-style "---" front matter compatible with Dev.to
 *
 * What it deliberately does NOT do:
 *   - No automatic POST to Dev.to's API. Dev.to's spam heuristics treat
 *     burst-publishing as abuse; the workflow is: generate locally, paste
 *     manually, target 1-3 articles per week.
 *   - No JSX → markdown conversion. Dev.to renders some JSX as plain text
 *     (callouts, figures). We accept the visual downgrade in exchange for
 *     not maintaining a translation layer; the readability survives because
 *     Dev.to readers care about the prose + code + headers.
 *
 * Usage:
 *   node scripts/export-to-devto.mjs                # default site URL
 *   SITE_URL=https://gitorg.xyz node scripts/export-to-devto.mjs
 */

import fs from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const SITE_URL = (process.env.SITE_URL ?? "https://gitorg.xyz").replace(/\/$/, "");
const SOURCE_DIR = path.join(root, "content", "en");
const OUT_DIR = path.join(root, "content", "_devto");

/**
 * High-value English articles to syndicate first.
 *
 * Criteria (per docs/distribution.md):
 *   1. Strong standalone narrative (not a single command syntax page)
 *   2. Practical recovery / workflow content with reproducible steps
 *   3. Topic the Dev.to audience (mid-career devs) actively searches
 *
 * Keep the list short — 1-3 per week is the publishing cadence.
 */
const DEVTO_SOURCE_PATHS = [
  // Learning path — long-form intro pieces convert well on Dev.to
  "learning-path/quick-start",
  "learning-path/first-feature-branch",
  "learning-path/open-first-pull-request",
  "learning-path/first-safe-hotfix",
  // High-search-volume commands with risk + recovery framing
  "commands/git-rebase",
  "commands/git-reset",
  "commands/git-stash",
  "commands/git-cherry-pick",
  "commands/git-reflog",
  "commands/git-bisect",
  // Internals — popular on Dev.to via "how X works under the hood"
  "internals/object-database",
  "internals/packfiles-and-storage",
  "internals/refs-and-head",
  "internals/rebase-internals-and-sequencer",
  // Concepts (deep dives added in recent sprints)
  "concepts/git-lfs-deep",
  "concepts/git-hooks-deep",
  // Recovery — high "share-worthy" rate on Dev.to
  "recovery/recover-deleted-branch",
  "recovery/recover-after-rebase",
  "recovery/reflog-recovery",
  "recovery/undo-after-pull",
  // Workflows — team-process content does well on Dev.to
  "workflows/trunk-based-development-workflow",
  "workflows/gitflow-workflow",
  "workflows/stacked-pull-requests-workflow",
  "workflows/merge-queue-workflow",
  // Performance / scale topics — popular among engineering-team leads
  "performance/git-maintenance",
  // Security
  "security/ssh-key-management",
  "security/gpg-signing",
];

/**
 * Per-article tag overrides (max 4 tags on Dev.to, lowercase, no spaces).
 * Default fallback below applies when not listed here.
 */
const TAG_OVERRIDES = {
  "commands/git-rebase": ["git", "tutorial", "productivity", "beginners"],
  "internals/object-database": ["git", "computerscience", "beginners"],
  "recovery/recover-deleted-branch": ["git", "tutorial", "productivity"],
  "workflows/merge-queue-workflow": ["git", "devops", "productivity"],
  "performance/git-maintenance": ["git", "devops", "performance"],
  "security/ssh-key-management": ["git", "security", "tutorial"],
};

const DEFAULT_TAGS = ["git", "tutorial", "beginners"];

function extractMetadata(source) {
  const match = source.match(/export const metadata = \{([\s\S]*?)\n\};/);
  if (!match) return null;
  const block = match[1];
  return {
    title: block.match(/title:\s*"([^"]+)"/)?.[1],
    summary: block.match(/summary:\s*"([^"]+)"/)?.[1],
    slug: block.match(/slug:\s*"([^"]+)"/)?.[1],
    section: block.match(/section:\s*"([^"]+)"/)?.[1],
  };
}

function buildFrontMatter({ title, description, canonicalUrl, tags }) {
  return [
    "---",
    `title: ${title}`,
    `published: false`,
    `description: ${description}`,
    `canonical_url: ${canonicalUrl}`,
    `tags: ${tags.join(", ")}`,
    "---",
    "",
  ].join("\n");
}

async function exportOne(docPath) {
  const sourceFile = path.join(SOURCE_DIR, `${docPath}.mdx`);
  let raw;
  try {
    raw = await fs.readFile(sourceFile, "utf8");
  } catch (err) {
    console.warn(`SKIP ${docPath} — could not read: ${err.message}`);
    return;
  }

  const meta = extractMetadata(raw);
  if (!meta || !meta.title || !meta.slug || !meta.section) {
    console.warn(`SKIP ${docPath} — could not parse metadata`);
    return;
  }

  // Strip metadata block and clean up: Dev.to does NOT render most JSX,
  // so we leave it inline as a degradation rather than try to translate
  // every component. Readers still get prose + code + headers cleanly.
  const body = raw.replace(/^export const metadata =[\s\S]*?^};\s*\n?/m, "").trim();

  const canonicalUrl = `${SITE_URL}/en/${meta.section}/${meta.slug}`;
  const tags = TAG_OVERRIDES[docPath] ?? DEFAULT_TAGS;
  const description = meta.summary ?? meta.title;

  const out = buildFrontMatter({ title: meta.title, description, canonicalUrl, tags }) + body + "\n";

  const outFile = path.join(OUT_DIR, `${docPath.replace(/\//g, "__")}.md`);
  await fs.mkdir(path.dirname(outFile), { recursive: true });
  await fs.writeFile(outFile, out, "utf8");
  console.log(`wrote ${outFile}`);
}

async function main() {
  await fs.rm(OUT_DIR, { recursive: true, force: true });
  await fs.mkdir(OUT_DIR, { recursive: true });

  for (const docPath of DEVTO_SOURCE_PATHS) {
    await exportOne(docPath);
  }

  console.log(`\nDone. Wrote ${DEVTO_SOURCE_PATHS.length} candidates to ${path.relative(root, OUT_DIR)}/`);
  console.log("Review each file, then paste into Dev.to's editor by hand. Do NOT automate publishing.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
