import type { Metadata } from "next";

import type { Locale } from "@/lib/i18n";

const siteName = "Git Org Academy";

export function getLocaleLang(locale: Locale) {
  return locale === "zh" ? "zh-CN" : "en";
}

function getLocalizedSiteDescription(locale: Locale) {
  return locale === "zh"
    ? "Git Org Academy 是一个基于 MDX 的双语 Git 学习站，覆盖快速开始、命令专题、工作流、恢复和原理。"
    : "Git Org Academy is a bilingual MDX-powered Git learning site covering quick start, command guides, workflows, recovery, and internals.";
}

export function buildAlternates(pathname: string) {
  return {
    canonical: `/zh${pathname}`,
    languages: {
      "zh-CN": `/zh${pathname}`,
      en: `/en${pathname}`,
      "x-default": `/zh${pathname}`,
    },
  };
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
    alternates: buildAlternates(pathname),
    openGraph: {
      title: fullTitle,
      description,
      siteName,
      locale: getLocaleLang(locale),
      type: "website",
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
    alternates: buildAlternates(""),
    openGraph: {
      title: siteName,
      description,
      siteName,
      locale: getLocaleLang(locale),
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: siteName,
      description,
    },
  };
}
