import type { Metadata } from "next";

import type { Locale } from "@/lib/i18n";

const siteName = "GitOrg Atlas";
const siteKeywords = {
  zh: [
    "Git 教程",
    "Git 命令",
    "Git 工作流",
    "Git 原理",
    "Git 学习路线",
    "GitOrg Atlas",
  ],
  en: [
    "Git tutorial",
    "Git commands",
    "Git workflows",
    "Git internals",
    "Git learning path",
    "GitOrg Atlas",
  ],
} as const;
const defaultRobots = {
  index: true,
  follow: true,
  googleBot: {
    index: true,
    follow: true,
    "max-image-preview": "large" as const,
    "max-snippet": -1,
    "max-video-preview": -1,
  },
};

export function getLocaleLang(locale: Locale) {
  return locale === "zh" ? "zh-CN" : "en";
}

function getLocalizedSiteDescription(locale: Locale) {
  return locale === "zh"
    ? "GitOrg Atlas 是一个基于 MDX 的双语 Git 学习站，覆盖快速开始、命令专题、工作流、恢复和原理。"
    : "GitOrg Atlas is a bilingual MDX-powered Git learning site covering quick start, command guides, workflows, recovery, and internals.";
}

export function buildAlternates(locale: Locale, pathname: string) {
  return {
    canonical: `/${locale}${pathname}`,
    languages: {
      "zh-CN": `/zh${pathname}`,
      en: `/en${pathname}`,
      "x-default": `/zh${pathname}`,
    },
  };
}

function getKeywords(locale: Locale) {
  return [...siteKeywords[locale]];
}

type PageMetadataInput = {
  locale: Locale;
  pathname?: string;
  title: string;
  description: string;
};

export function buildPageMetadata({
  locale,
  pathname = "",
  title,
  description,
}: PageMetadataInput): Metadata {
  const fullTitle = `${title} | ${siteName}`;

  return {
    title: fullTitle,
    description,
    applicationName: siteName,
    keywords: getKeywords(locale),
    category: "technology",
    robots: defaultRobots,
    alternates: buildAlternates(locale, pathname),
    openGraph: {
      title: fullTitle,
      description,
      siteName,
      locale: getLocaleLang(locale),
      alternateLocale: locale === "zh" ? ["en"] : ["zh-CN"],
      type: "website",
      url: `/${locale}${pathname}`,
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
    },
  };
}

export function buildLocaleHomeMetadata(locale: Locale): Metadata {
  const description = getLocalizedSiteDescription(locale);

  return {
    title: siteName,
    description,
    applicationName: siteName,
    keywords: getKeywords(locale),
    category: "technology",
    robots: defaultRobots,
    alternates: buildAlternates(locale, ""),
    openGraph: {
      title: siteName,
      description,
      siteName,
      locale: getLocaleLang(locale),
      alternateLocale: locale === "zh" ? ["en"] : ["zh-CN"],
      type: "website",
      url: `/${locale}`,
    },
    twitter: {
      card: "summary_large_image",
      title: siteName,
      description,
    },
  };
}
