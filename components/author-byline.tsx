import Link from "next/link";

import { getAuthorSync } from "@/lib/authors-sync";
import type { Locale } from "@/lib/i18n";
import { SITE_DEFAULT_AUTHOR_SLUG } from "@/lib/site";

type AuthorBylineProps = {
  locale: Locale;
  /** Slug from frontmatter. When omitted, falls back to site default. */
  authorSlug?: string;
};

/**
 * Visible byline.
 *
 * Renders "Written by {name}" linked to /{locale}/authors/{slug}. Mirrors
 * what the JSON-LD `author` field says, so Google's correlated E-E-A-T
 * signals (per the helpful-content guidance) line up between structured
 * data and human-visible HTML.
 *
 * Skipped silently when the author registry has no entry for the slug —
 * avoids broken links during incremental backfill.
 */
export function AuthorByline({ locale, authorSlug }: AuthorBylineProps) {
  const slug = authorSlug ?? SITE_DEFAULT_AUTHOR_SLUG;
  const author = getAuthorSync(slug);
  if (!author) return null;

  const displayName =
    locale === "zh" && author.nameZh ? author.nameZh : author.name;
  const label = locale === "zh" ? "作者" : "Written by";

  return (
    <p className="author-byline">
      {label}{" "}
      <Link href={`/${locale}/authors/${slug}`} rel="author">
        {displayName}
      </Link>
      {typeof author.yearsOfGit === "number" ? (
        <span className="author-byline-experience">
          {" "}
          ·{" "}
          {locale === "zh"
            ? `Git 使用 ${author.yearsOfGit} 年`
            : `${author.yearsOfGit} years of Git`}
        </span>
      ) : null}
    </p>
  );
}
