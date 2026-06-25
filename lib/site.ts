const DEFAULT_SITE_URL = "https://gitorg.xyz";

/**
 * Slug of the default author used when an MDX article omits `metadata.author`.
 * Must match a file under content/authors/{slug}.json.
 *
 * Backfilling per-article author attribution can happen incrementally; until
 * then, this default makes every BlogPosting JSON-LD point to a real
 * ProfilePage rather than the bare Organization, which is the stronger
 * E-E-A-T signal per Google's helpful-content guidance.
 */
export const SITE_DEFAULT_AUTHOR_SLUG = "lance-mq";

function normalizeUrl(value?: string | null) {
  if (!value) {
    return DEFAULT_SITE_URL;
  }

  const withProtocol = value.startsWith("http://") || value.startsWith("https://")
    ? value
    : `https://${value}`;

  return withProtocol.replace(/\/$/, "");
}

export function getSiteUrl() {
  return normalizeUrl(
    process.env.NEXT_PUBLIC_SITE_URL ??
      process.env.VERCEL_PROJECT_PRODUCTION_URL ??
      process.env.VERCEL_URL,
  );
}

export function getSiteOrigin() {
  return new URL(getSiteUrl());
}
