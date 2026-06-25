/**
 * Synchronous author lookup for use inside the structured-seo code path.
 *
 * lib/authors.ts uses async fs APIs because it's the canonical author
 * registry consumed by page render. lib/structured-seo.ts is a synchronous
 * function called per page — making it async would cascade into every
 * page.tsx. Instead, this module pre-loads the small author registry once
 * at module load via readFileSync, giving us a sync map for display-name
 * resolution.
 *
 * The cost is bounded: author count is on the order of 1-10 files.
 */
import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";

import type { Author } from "@/lib/authors";

const AUTHORS_DIR = path.join(process.cwd(), "content", "authors");

let authors: Author[] | null = null;

function loadAuthors(): Author[] {
  if (authors) return authors;
  try {
    const files = readdirSync(AUTHORS_DIR).filter((f) => f.endsWith(".json"));
    authors = files.map((f) => {
      const raw = readFileSync(path.join(AUTHORS_DIR, f), "utf8");
      return JSON.parse(raw) as Author;
    });
  } catch {
    // Authors directory missing during early build steps — degrade gracefully.
    authors = [];
  }
  return authors;
}

export function getAuthorSync(slug: string): Author | null {
  return loadAuthors().find((a) => a.slug === slug) ?? null;
}
