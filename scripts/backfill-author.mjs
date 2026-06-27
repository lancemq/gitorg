#!/usr/bin/env node
/**
 * Backfill explicit `author` field into MDX frontmatter.
 *
 * Why:
 *   PR #5 wired author resolution, but every article falls back to the
 *   site default (lance-mq) implicitly. Google's E-E-A-T signals are
 *   stronger when authorship is explicit per-article rather than inferred.
 *   Making it explicit also lets future multi-author splits happen by
 *   editing one field per article, with no code change.
 *
 * What this does:
 *   - For every MDX without an `author:` field, inserts
 *       author: "lance-mq",
 *     immediately after the `section:` line in the metadata block.
 *   - Idempotent: skips files that already declare an author.
 *   - Never touches files outside the metadata block.
 *
 * Usage:
 *   node scripts/backfill-author.mjs            # write
 *   node scripts/backfill-author.mjs --dry-run  # preview
 */

import fs from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const DRY_RUN = process.argv.includes("--dry-run");
const CONTENT_DIR = path.join(root, "content");
const DEFAULT_AUTHOR = "lance-mq";

const metadataBlockRe = /export const metadata = \{([\s\S]*?)\n\};/;
const hasAuthorRe = /\n\s*author:\s*"/;
const sectionLineRe = /^(\s*section:\s*"[^"]+",)\s*$/m;

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

async function processFile(file) {
  const source = await fs.readFile(file, "utf8");
  const blockMatch = source.match(metadataBlockRe);
  if (!blockMatch) return { skipped: "no metadata block" };

  const block = blockMatch[1];
  if (hasAuthorRe.test(block)) return { skipped: "already has author" };

  // Insert `author:` right after the `section:` line.
  const sectionMatch = block.match(sectionLineRe);
  if (!sectionMatch) return { skipped: "no section line" };

  const sectionLine = sectionMatch[0];
  const insertLine = sectionLine.replace(/\s*$/, "") + `\n  author: "${DEFAULT_AUTHOR}",`;

  // Replace within the block, then within the source.
  const newBlock = block.replace(sectionLine, insertLine);
  const nextSource = source.replace(blockMatch[1], newBlock);

  if (!DRY_RUN) await fs.writeFile(file, nextSource, "utf8");
  return { updated: true };
}

async function main() {
  const files = (await walk(CONTENT_DIR)).sort();
  let updated = 0;
  let skipped = 0;
  for (const file of files) {
    const r = await processFile(file);
    if (r.updated) {
      updated += 1;
      if (process.env.VERBOSE) console.log(`✓ ${path.relative(root, file)}`);
    } else {
      skipped += 1;
      if (process.env.VERBOSE) console.log(`· ${path.relative(root, file)} (${r.skipped})`);
    }
  }
  console.log(`Files updated: ${updated}`);
  console.log(`Files skipped: ${skipped}`);
  if (DRY_RUN) console.log("(dry-run: no files written)");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
