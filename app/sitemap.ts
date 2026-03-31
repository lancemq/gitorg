import type { MetadataRoute } from "next";

import { getDocPaths, getDocHref } from "@/lib/content";
import { locales } from "@/lib/i18n";
import { getSiteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  const staticRoutes = locales.flatMap((locale) => [
    `/${locale}`,
    `/${locale}/commands`,
    `/${locale}/best-practices`,
    `/${locale}/workflows`,
    `/${locale}/internals`,
    `/${locale}/history`,
    `/${locale}/faq`,
  ]);

  const docRoutes = locales.flatMap((locale) =>
    getDocPaths(locale).map((docPath) => getDocHref(locale, docPath)),
  );

  return [...new Set([...staticRoutes, ...docRoutes])].map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "/zh" || path === "/en" ? "weekly" : "monthly",
    priority: path === "/zh" || path === "/en" ? 1 : 0.7,
  }));
}
