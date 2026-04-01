import type { MetadataRoute } from "next";

import { getDocHref, getDocLastModified, getDocPaths, getLatestDocLastModified } from "@/lib/content";
import { locales } from "@/lib/i18n";
import { getSiteUrl } from "@/lib/site";

function buildLocaleAlternates(siteUrl: string, pathname: string) {
  return {
    languages: {
      "zh-CN": `${siteUrl}/zh${pathname}`,
      en: `${siteUrl}/en${pathname}`,
      "x-default": `${siteUrl}/zh${pathname}`,
    },
  };
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = getSiteUrl();
  const staticRoutes = await Promise.all(
    locales.flatMap((locale) => [
      (async () => ({
        pathname: `/${locale}`,
        lastModified: await getLatestDocLastModified(locale),
        changeFrequency: "weekly" as const,
        priority: 1,
      }))(),
      (async () => ({
        pathname: `/${locale}/commands`,
        lastModified: await getLatestDocLastModified(locale, "commands"),
        changeFrequency: "weekly" as const,
        priority: 0.9,
      }))(),
      (async () => ({
        pathname: `/${locale}/best-practices`,
        lastModified: await getLatestDocLastModified(locale, "best-practices"),
        changeFrequency: "weekly" as const,
        priority: 0.85,
      }))(),
      (async () => ({
        pathname: `/${locale}/workflows`,
        lastModified: await getLatestDocLastModified(locale, "workflows"),
        changeFrequency: "weekly" as const,
        priority: 0.85,
      }))(),
      (async () => ({
        pathname: `/${locale}/internals`,
        lastModified: await getLatestDocLastModified(locale, "internals"),
        changeFrequency: "monthly" as const,
        priority: 0.8,
      }))(),
      (async () => ({
        pathname: `/${locale}/history`,
        lastModified: await getLatestDocLastModified(locale, "concepts"),
        changeFrequency: "monthly" as const,
        priority: 0.75,
      }))(),
      (async () => ({
        pathname: `/${locale}/faq`,
        lastModified: await getLatestDocLastModified(locale),
        changeFrequency: "weekly" as const,
        priority: 0.75,
      }))(),
      (async () => ({
        pathname: `/${locale}/learning-path`,
        lastModified: await getLatestDocLastModified(locale, "learning-path"),
        changeFrequency: "weekly" as const,
        priority: 0.85,
      }))(),
    ]),
  );

  const docRoutes = await Promise.all(
    locales.flatMap((locale) =>
      getDocPaths(locale).map(async (docPath) => ({
        pathname: getDocHref(locale, docPath),
        lastModified: await getDocLastModified(locale, docPath),
        changeFrequency: docPath.startsWith("commands/") ? ("monthly" as const) : ("weekly" as const),
        priority: docPath.startsWith("commands/") ? 0.72 : 0.76,
      })),
    ),
  );

  return [...staticRoutes, ...docRoutes].map((entry) => ({
    url: `${siteUrl}${entry.pathname}`,
    lastModified: entry.lastModified,
    changeFrequency: entry.changeFrequency,
    priority: entry.priority,
    alternates: buildLocaleAlternates(
      siteUrl,
      entry.pathname.replace(/^\/(zh|en)/, ""),
    ),
  }));
}
