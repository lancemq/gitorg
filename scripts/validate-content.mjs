import fs from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const contentRoot = path.join(root, "content");
const contentTsPath = path.join(root, "lib", "content.ts");
const locales = ["zh", "en"];
const allowedSections = new Set([
  "learning-path",
  "commands",
  "best-practices",
  "workflows",
  "platforms",
  "internals",
  "recovery",
  "concepts",
  "devops",
  "security",
  "performance",
  "migration",
  "hosting",
]);

function extractQuotedStrings(block) {
  return Array.from(block.matchAll(/"([^"]+)"/g), (match) => match[1]);
}

function extractArrayBlock(source, startMarker, endMarker) {
  const start = source.indexOf(startMarker);
  if (start === -1) {
    throw new Error(`Unable to find start marker: ${startMarker}`);
  }

  const end = source.indexOf(endMarker, start);
  if (end === -1) {
    throw new Error(`Unable to find end marker: ${endMarker}`);
  }

  return source.slice(start + startMarker.length, end);
}

function getDuplicateValues(values) {
  const seen = new Set();
  const duplicates = new Set();

  for (const value of values) {
    if (seen.has(value)) {
      duplicates.add(value);
    }
    seen.add(value);
  }

  return [...duplicates];
}

function metadataField(block, key) {
  return block.match(new RegExp(`${key}:\\s*"([^"]+)"`))?.[1];
}

function hasConflictMarkers(source) {
  // Remove all fenced code blocks (``` ... ```) before checking for conflict markers
  const withoutCodeBlocks = source.replace(/```[\s\S]*?```/g, "");
  return /^(<<<<<<<|>>>>>>>) /m.test(withoutCodeBlocks);
}

async function collectMdxPaths(locale) {
  const localeRoot = path.join(contentRoot, locale);
  const mdxPaths = [];

  async function walk(directory) {
    const entries = await fs.readdir(directory, { withFileTypes: true });

    for (const entry of entries) {
      const entryPath = path.join(directory, entry.name);
      if (entry.isDirectory()) {
        await walk(entryPath);
      } else if (entry.name.endsWith(".mdx")) {
        mdxPaths.push(
          path
            .relative(localeRoot, entryPath)
            .replaceAll(path.sep, "/")
            .replace(/\.mdx$/, ""),
        );
      }
    }
  }

  await walk(localeRoot);
  return mdxPaths.sort();
}

function fail(errors) {
  console.error("Content validation failed:");
  for (const error of errors) {
    console.error(`- ${error}`);
  }
  process.exit(1);
}

const errors = [];
const contentSource = await fs.readFile(contentTsPath, "utf8");

if (hasConflictMarkers(contentSource)) {
  errors.push("lib/content.ts contains merge conflict markers.");
}

const docPathRegistry = extractQuotedStrings(
  extractArrayBlock(contentSource, "export const docPathRegistry = [", "] as const;"),
);
const registeredPaths = new Set(docPathRegistry);

for (const duplicate of getDuplicateValues(docPathRegistry)) {
  errors.push(`docPathRegistry contains duplicate path: ${duplicate}`);
}

for (const locale of locales) {
  const mdxPaths = await collectMdxPaths(locale);
  const mdxPathSet = new Set(mdxPaths);

  for (const docPath of docPathRegistry) {
    if (!mdxPathSet.has(docPath)) {
      errors.push(`${locale}/${docPath}.mdx is registered but missing.`);
    }
  }

  for (const mdxPath of mdxPaths) {
    if (!registeredPaths.has(mdxPath)) {
      errors.push(`${locale}/${mdxPath}.mdx exists but is not in docPathRegistry.`);
    }

    const source = await fs.readFile(path.join(contentRoot, locale, `${mdxPath}.mdx`), "utf8");
    if (hasConflictMarkers(source)) {
      errors.push(`${locale}/${mdxPath}.mdx contains merge conflict markers.`);
    }

    const metadataBlock = source.match(/export const metadata = \{([\s\S]*?)\n\};/)?.[1];
    if (!metadataBlock) {
      errors.push(`${locale}/${mdxPath}.mdx is missing export const metadata.`);
      continue;
    }

    const title = metadataField(metadataBlock, "title");
    const slug = metadataField(metadataBlock, "slug");
    const metadataLocale = metadataField(metadataBlock, "locale");
    const section = metadataField(metadataBlock, "section");
    const summary = metadataField(metadataBlock, "summary");

    if (!title) {
      errors.push(`${locale}/${mdxPath}.mdx metadata.title is missing.`);
    }
    if (!slug) {
      errors.push(`${locale}/${mdxPath}.mdx metadata.slug is missing.`);
    } else if (slug !== mdxPath.split("/").at(-1)) {
      errors.push(`${locale}/${mdxPath}.mdx metadata.slug should be ${mdxPath.split("/").at(-1)}.`);
    }
    if (metadataLocale !== locale) {
      errors.push(`${locale}/${mdxPath}.mdx metadata.locale should be ${locale}.`);
    }
    if (!section || !allowedSections.has(section)) {
      errors.push(`${locale}/${mdxPath}.mdx metadata.section is invalid or missing.`);
    }
    if (!summary) {
      errors.push(`${locale}/${mdxPath}.mdx metadata.summary is missing.`);
    }
  }
}

if (errors.length > 0) {
  fail(errors);
}

console.log(`Content validation passed for ${docPathRegistry.length} docs across ${locales.length} locales.`);
