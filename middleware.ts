import { NextResponse, type NextRequest } from "next/server";

/**
 * Rewrites `*.md` URLs to a sibling route handler that returns the raw
 * markdown body of the underlying MDX article.
 *
 * Examples:
 *   /zh/commands/git-rebase.md  →  /raw/zh/commands/git-rebase
 *   /en/internals/object-database.md  →  /raw/en/internals/object-database
 *
 * Why this exists:
 *   AdSense + Next.js hydration make the rendered HTML noisy for LLM
 *   scrapers (Claude / ChatGPT / Perplexity). The /llms.txt spec
 *   (llmstxt.org) recommends serving clean markdown for inference-time
 *   retrieval, while keeping the original HTML for humans + AdSense.
 *
 * The rewrite is invisible to users — only the `.md` suffix triggers it.
 * The internal route is marked `X-Robots-Tag: noindex` so the `.md`
 * mirror doesn't compete with the canonical HTML page in Google's index.
 *
 * Note: the target directory is /raw, not /_md. Next.js App Router treats
 * any folder starting with `_` as a private path and excludes it from
 * routing, so the underscore-prefixed alternative does not build.
 */
export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (!/^\/(zh|en)\/.+\.md$/.test(pathname)) {
    return NextResponse.next();
  }
  const rewritten = `/raw${pathname.slice(0, -3)}`;
  return NextResponse.rewrite(new URL(rewritten, req.url));
}

export const config = {
  matcher: ["/zh/:path*", "/en/:path*"],
};
