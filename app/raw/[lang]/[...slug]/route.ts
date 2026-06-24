import { readFile } from "node:fs/promises";
import path from "node:path";

import { docPathRegistry, type DocPath } from "@/lib/content";
import { isValidLocale, type Locale } from "@/lib/i18n";

/**
 * Markdown mirror handler.
 *
 * Reachable via the middleware rewrite at /{locale}/{section}/{slug}.md.
 * Returns the raw MDX source minus the `export const metadata = {...}` block
 * so LLM scrapers see clean prose, code fences, and the JSX components as
 * they are written. We do NOT strip JSX — keeping `<TipBox>`, `<WarningBox>`,
 * etc. as-is preserves callouts that carry teaching emphasis.
 *
 * Security / abuse:
 *   - We only serve paths in docPathRegistry; arbitrary `..` cannot escape.
 *   - X-Robots-Tag: noindex prevents the markdown mirror from competing
 *     with the canonical HTML page in Google's index.
 *   - Cache-Control allows aggressive CDN caching (content rarely changes).
 */
export const dynamic = "force-static";

const docPathSet = new Set<string>(docPathRegistry);

type RouteParams = {
  params: Promise<{
    lang: string;
    slug: string[];
  }>;
};

export async function generateStaticParams() {
  const params: Array<{ lang: Locale; slug: string[] }> = [];
  for (const lang of ["zh", "en"] as const) {
    for (const docPath of docPathRegistry) {
      params.push({ lang, slug: docPath.split("/") });
    }
  }
  return params;
}

export async function GET(_req: Request, { params }: RouteParams) {
  const { lang, slug } = await params;

  if (!isValidLocale(lang)) {
    return new Response("Not found", { status: 404 });
  }

  const docPath = slug.join("/");
  if (!docPathSet.has(docPath)) {
    return new Response("Not found", { status: 404 });
  }

  const absolutePath = path.join(
    process.cwd(),
    "content",
    lang,
    `${docPath as DocPath}.mdx`,
  );

  let source: string;
  try {
    source = await readFile(absolutePath, "utf8");
  } catch {
    return new Response("Not found", { status: 404 });
  }

  // Strip the metadata export block. The pattern targets the literal we use
  // everywhere — `export const metadata = { ... };` — and keeps everything
  // after the closing brace (including the H1 and body).
  const body = source.replace(/^export const metadata =[\s\S]*?^};\s*\n?/m, "").trim();

  return new Response(`${body}\n`, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400, stale-while-revalidate=86400",
      "X-Robots-Tag": "noindex, follow",
    },
  });
}
