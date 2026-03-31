const DEFAULT_SITE_URL = "http://localhost:3000";

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
