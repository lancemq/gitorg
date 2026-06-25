/**
 * Author registry.
 *
 * Authors live under content/authors/{slug}.json. JSON is intentional: the
 * file is small, structured, and avoids the MDX compilation pass — which
 * means /lib/authors.ts can be imported from both server components and
 * the structured-seo code path without a React render dependency.
 *
 * Articles reference an author by slug in their MDX `metadata.author`.
 * When absent, structured-seo falls back to the site Organization.
 */
import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import { cache } from "react";

import type { Locale } from "@/lib/i18n";

export type AuthorBio = {
  /** Plain-language paragraph(s) by locale. Markdown is NOT parsed — render as plain text. */
  zh: string;
  en: string;
};

export type Author = {
  /** URL-safe slug (e.g. "lance-mq"). Matches filename and frontmatter ref. */
  slug: string;
  /** Display name. Same in zh/en unless an explicit nameZh is provided. */
  name: string;
  /** Optional Chinese display name. */
  nameZh?: string;
  /** Short role / expertise statement. Localized. */
  role: { zh: string; en: string };
  /** Verbose bio. Localized. */
  bio: AuthorBio;
  /** Years actively using Git, for E-E-A-T's "first-hand experience" signal. */
  yearsOfGit?: number;
  /** External URLs to corroborate identity (GitHub, Twitter/X, personal site). */
  sameAs?: string[];
  /** Avatar URL — if absent, the author page falls back to a generated monogram. */
  avatarUrl?: string;
};

const AUTHORS_DIR = path.join(process.cwd(), "content", "authors");

export const getAllAuthors = cache(async (): Promise<Author[]> => {
  const files = await readdir(AUTHORS_DIR);
  const authors = await Promise.all(
    files
      .filter((f) => f.endsWith(".json"))
      .map(async (f) => {
        const raw = await readFile(path.join(AUTHORS_DIR, f), "utf8");
        return JSON.parse(raw) as Author;
      }),
  );
  return authors.sort((a, b) => a.name.localeCompare(b.name));
});

export async function getAuthor(slug: string): Promise<Author | null> {
  const all = await getAllAuthors();
  return all.find((a) => a.slug === slug) ?? null;
}

export function getAuthorDisplayName(author: Author, locale: Locale) {
  return locale === "zh" && author.nameZh ? author.nameZh : author.name;
}
