#!/usr/bin/env node
/**
 * Remove title-echo boilerplate bullets from "学完这篇你会掌握什么" /
 * "What you will learn" sections.
 *
 * zh patterns removed:
 *   - 理解 <H2标题> 相关的概念
 *   - 掌握 <H2标题> 相关的操作
 *   - 理解/掌握 <...> 相关的设计考量 / 相关的用法 ...
 *   - 知道在什么场景下使用该命令，什么场景下避免使用
 * en patterns removed:
 *   - Understand the core purpose of X / X Tutorial
 *   - Master the basic usage and common options of X
 *   - Know when to use this feature and when to avoid it
 *   - Understand key concepts: X   / Understand when it is a good fit
 *   - Explains how to ... (sentence-style echo)
 *
 * The first bullet (real summary line) is always kept. After removal,
 * if fewer than 1 bullet remains, nothing else is synthesized — the
 * remaining real bullet(s) stand alone.
 *
 * Dry-run by default; pass --apply to write.
 */

import fs from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const APPLY = process.argv.includes("--apply");
const CONTENT_DIR = path.join(root, "content");

const ZH_NOISE = [
  /^- (?:理解|掌握|知道) .+相关(?:的)?(?:概念|操作|设计考量|用法|场景)$/,
  /^- 知道在什么场景下使用该命令，什么场景下避免使用$/,
  /^- (?:理解|掌握) 概述 相关的概念$/,
  /^- (?:理解|掌握) .+的核心作用(?:和适用场景)?$/,
  /^- (?:掌握|理解) .+的基本用法(?:和常用参数)?$/,
];
const EN_NOISE = [
  /^- Understand the core purpose of .+$/i,
  /^- Master the basic usage and common options of .+$/i,
  /^- Know when to use this feature and when to avoid it$/i,
  /^- Understand key concepts: .+$/i,
  /^- Understand when it is a good fit$/i,
  /^- Know when to use this (?:command|feature) and when to avoid/i,
  /^- Explains how to .+$/i,
  /^- Understand key concepts: /i,
  /^- (?:Understand|Master) .+(?:related (?:operations|concepts|considerations))$/i,
];

function segmentBody(body) {
  const lines = body.split("\n");
  const segments = [];
  let current = { heading: null, lines: [] };
  for (const line of lines) {
    const m = line.match(/^## (.+?)\s*$/);
    if (m) {
      segments.push(current);
      current = { heading: m[1], lines: [line] };
    } else {
      current.lines.push(line);
    }
  }
  segments.push(current);
  return segments;
}

async function collectMdxFiles() {
  const files = [];
  for (const locale of ["zh", "en"]) {
    const localeRoot = path.join(CONTENT_DIR, locale);
    async function walk(dir) {
      for (const e of await fs.readdir(dir, { withFileTypes: true })) {
        const full = path.join(dir, e.name);
        if (e.isDirectory()) await walk(full);
        else if (e.name.endsWith(".mdx")) files.push({ locale, file: full });
      }
    }
    await walk(localeRoot);
  }
  return files;
}

let filesTouched = 0;
let bulletsRemoved = 0;

for (const { locale, file } of await collectMdxFiles()) {
  const source = await fs.readFile(file, "utf8");
  const m = source.match(/export const metadata = \{[\s\S]*?\n\};/);
  if (!m) continue;
  const head = source.slice(0, m[0].length);
  let body = source.slice(m[0].length);

  const segments = segmentBody(body);
  const goalsHeading = locale === "zh" ? "学完这篇你会掌握什么" : "What you will learn";
  const seg = segments.find((s) => s.heading === goalsHeading);
  if (!seg) continue;

  const noise = locale === "zh" ? ZH_NOISE : EN_NOISE;
  const bullets = seg.lines.filter((l) => l.trim().startsWith("-"));
  const kept = bullets.filter((b) => !noise.some((re) => re.test(b.trim())));
  const removed = bullets.length - kept.length;
  if (removed === 0) continue;
  if (kept.length === 0) continue; // never leave an empty goals section

  // Rebuild the segment: heading, blank, kept bullets, trailing blank
  const headLines = [];
  for (const l of seg.lines) {
    if (l.startsWith("## ")) break;
    headLines.push(l);
  }
  const newSegLines = [...headLines, `## ${seg.heading}`, "", ...kept, ""];
  // Trim trailing blanks inside the section (next heading line supplies its own)
  while (newSegLines.length && newSegLines[newSegLines.length - 1].trim() === "") newSegLines.pop();
  // Find where original segment content ends (start of next "## " line after heading)
  const startIdx = body.split("\n").indexOf(seg.lines[0]);
  const bodyLines = body.split("\n");
  let endIdx = startIdx + 1;
  for (let i = startIdx + 1; i < bodyLines.length; i++) {
    if (bodyLines[i].startsWith("## ")) { endIdx = i; break; }
    endIdx = i + 1;
  }
  const newBody = [
    ...bodyLines.slice(0, startIdx),
    ...newSegLines,
    "",
    ...bodyLines.slice(endIdx),
  ].join("\n");

  body = newBody;
  bulletsRemoved += removed;
  filesTouched += 1;

  if (APPLY) {
    await fs.writeFile(file, head + body, "utf8");
  } else {
    console.log(`[dry] ${path.relative(root, file)}: -${removed}`);
  }
}

console.log(`\n${APPLY ? "Applied" : "Dry-run"}: ${filesTouched} files, ${bulletsRemoved} boilerplate bullets removed. ${APPLY ? "" : "Pass --apply to write."}`);
