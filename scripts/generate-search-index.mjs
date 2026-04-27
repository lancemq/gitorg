import fs from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const contentRoot = path.join(root, "content");
const contentTsPath = path.join(root, "lib", "content.ts");
const publicDir = path.join(root, "public");

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

function extractMetadataField(block, key) {
  const match = block.match(new RegExp(`${key}:\\s*"([^"]+)"`));
  return match?.[1] ?? "";
}

function getDocHref(locale, docPath) {
  if (docPath.startsWith("commands/")) {
    return `/${locale}/commands/${docPath.replace("commands/", "")}`;
  }
  if (docPath === "concepts/git-history") {
    return `/${locale}/history`;
  }
  if (docPath.startsWith("best-practices/")) {
    return `/${locale}/best-practices/${docPath.replace("best-practices/", "")}`;
  }
  if (docPath.startsWith("workflows/")) {
    return `/${locale}/workflows/${docPath.replace("workflows/", "")}`;
  }
  if (docPath.startsWith("github/")) {
    return `/${locale}/github/${docPath.replace("github/", "")}`;
  }
  if (docPath.startsWith("gitlab/")) {
    return `/${locale}/gitlab/${docPath.replace("gitlab/", "")}`;
  }
  if (docPath.startsWith("internals/")) {
    return `/${locale}/internals/${docPath.replace("internals/", "")}`;
  }
  if (docPath.startsWith("recovery/")) {
    return `/${locale}/recovery/${docPath.replace("recovery/", "")}`;
  }
  if (docPath === "learning-path/quick-start") {
    return `/${locale}/learning-path`;
  }
  return `/${locale}/docs/${docPath}`;
}

function getTier(docPath, coreDocPaths, recommendedDocPaths) {
  if (coreDocPaths.has(docPath)) {
    return "core";
  }
  if (recommendedDocPaths.has(docPath)) {
    return "recommended";
  }
  return "extended";
}

async function main() {
  const contentSource = await fs.readFile(contentTsPath, "utf8");
  const docPathRegistry = extractQuotedStrings(
    extractArrayBlock(contentSource, "export const docPathRegistry = [", "] as const;"),
  );
  const coreDocPaths = new Set(
    extractQuotedStrings(
      extractArrayBlock(contentSource, "const coreDocPaths = new Set<DocPath>([", "]);"),
    ),
  );
  const recommendedDocPaths = new Set(
    extractQuotedStrings(
      extractArrayBlock(contentSource, "const recommendedDocPaths = new Set<DocPath>([", "]);"),
    ),
  );

  const locales = ["zh", "en"];

  await fs.mkdir(publicDir, { recursive: true });

  for (const locale of locales) {
    const index = [];

    for (const docPath of docPathRegistry) {
      const filePath = path.join(contentRoot, locale, `${docPath}.mdx`);
      const source = await fs.readFile(filePath, "utf8");
      const metadataBlock = source.match(/export const metadata = \{([\s\S]*?)\n\};/)?.[1] ?? "";
      const title = extractMetadataField(metadataBlock, "title");
      const slug = extractMetadataField(metadataBlock, "slug");
      const summary = extractMetadataField(metadataBlock, "summary");
      const section = extractMetadataField(metadataBlock, "section");

      index.push({
        href: getDocHref(locale, docPath),
        path: docPath,
        section,
        tier: getTier(docPath, coreDocPaths, recommendedDocPaths),
        slug,
        title,
        summary,
        suggestions: [],
      });
    }

    const outputPath = path.join(publicDir, `search-index-${locale}.json`);
    await fs.writeFile(outputPath, JSON.stringify(index, null, 2), "utf8");
    console.log(`Wrote ${outputPath} (${index.length} docs)`);
  }
}

await main();
