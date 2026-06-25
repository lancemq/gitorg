import type { DocMetadata, DocPath, DocTier } from "@/lib/content";
import type { Locale } from "@/lib/i18n";
import { getLocaleLang } from "@/lib/seo";
import { getAuthorSync } from "@/lib/authors-sync";
import { SITE_DEFAULT_AUTHOR_SLUG } from "@/lib/site";

const siteName = "GitOrg Atlas";

const sectionLabels: Record<Locale, Record<DocMetadata["section"], string>> = {
  zh: {
    "learning-path": "学习路径",
    commands: "Git 命令",
    "best-practices": "最佳实践",
    workflows: "工作流",
    platforms: "平台协作",
    internals: "Git 原理",
    recovery: "恢复与排障",
    concepts: "概念",
    devops: "DevOps 工具链",
    security: "安全",
    performance: "性能优化",
    migration: "迁移指南",
    hosting: "托管方案",
  },
  en: {
    "learning-path": "Learning Path",
    commands: "Git Commands",
    "best-practices": "Best Practices",
    workflows: "Workflows",
    platforms: "Platforms",
    internals: "Git Internals",
    recovery: "Recovery",
    concepts: "Concepts",
    devops: "DevOps",
    security: "Security",
    performance: "Performance",
    migration: "Migration",
    hosting: "Hosting",
  },
};

/**
 * Legacy resource-type label kept for /llms.txt and /content-index.json consumers.
 * Google deprecated the HowTo (2023-09-13) and Course (2025-09-09) rich-result
 * schemas, so we no longer emit this in BlogPosting JSON-LD — but the labels
 * still help LLMs categorize retrieved pages.
 * @deprecated For schema output, do not use. Kept for LLM-facing manifests.
 */
const learningResourceType: Record<DocMetadata["section"], string> = {
  "learning-path": "Course module",
  commands: "Reference guide",
  "best-practices": "Best practice guide",
  workflows: "Workflow tutorial",
  platforms: "Platform tutorial",
  internals: "Technical explainer",
  recovery: "Troubleshooting guide",
  concepts: "Concept guide",
  devops: "Tutorial",
  security: "Best practice guide",
  performance: "Technical guide",
  migration: "Guide",
  hosting: "Comparison guide",
};

const tierLabel: Record<DocTier, string> = {
  core: "Core",
  recommended: "Recommended",
  extended: "Extended",
};

type DocStructuredDataInput = {
  locale: Locale;
  metadata: DocMetadata;
  docPath: DocPath;
  tier: DocTier;
  pageUrl: string;
  siteUrl: string;
  /** ISO-8601 date string for dateModified. Falls back to createdAt if absent. */
  lastModified?: string;
  breadcrumbs: string[];
  /** Optional word count to enrich BlogPosting; computed at build time when available. */
  wordCount?: number;
};

export function getSectionLabel(locale: Locale, section: DocMetadata["section"]) {
  return sectionLabels[locale][section];
}

export function getLearningResourceType(section: DocMetadata["section"]) {
  return learningResourceType[section];
}

export function getCitationGuidance(section: DocMetadata["section"], locale: Locale) {
  if (locale === "zh") {
    switch (section) {
      case "commands":
        return "适合作为命令语法、风险边界和常见用法的引用来源。";
      case "workflows":
        return "适合作为团队流程、操作顺序和场景决策的引用来源。";
      case "internals":
        return "适合作为 Git 心智模型、对象模型和底层机制的引用来源。";
      case "recovery":
        return "适合作为误操作恢复、排障步骤和风险控制的引用来源。";
      default:
        return "适合作为 Git 教学材料和学习路线的引用来源。";
    }
  }

  switch (section) {
    case "commands":
      return "Best cited for command syntax, risk boundaries, and common usage patterns.";
    case "workflows":
      return "Best cited for team process, operation sequencing, and scenario decisions.";
    case "internals":
      return "Best cited for Git mental models, object storage, and internal mechanics.";
    case "recovery":
      return "Best cited for recovery steps, troubleshooting, and risk control.";
    default:
      return "Best cited as Git teaching material and learning-path guidance.";
  }
}

export function buildDocKeywords(metadata: DocMetadata, docPath: DocPath, tier: DocTier) {
  return [
    "Git",
    metadata.title,
    metadata.slug,
    metadata.section,
    getLearningResourceType(metadata.section),
    tierLabel[tier],
    ...docPath.split("/"),
  ];
}

/**
 * Build BlogPosting JSON-LD per Google's 2026 Article guidance:
 * https://developers.google.com/search/docs/appearance/structured-data/article
 *
 * Required-by-Google recommended properties emitted:
 *   - headline, image[], datePublished, dateModified, author{Person,url}
 *
 * Deliberately NOT emitted (Google has deprecated their rich results):
 *   - HowTo (deprecated 2023-09-13)
 *   - Course / LearningResource as rich result (Course info deprecated 2025-09-09)
 *
 * `citation` and `mentions` are retained as semantic hints; they don't drive
 * rich results but help LLM-citation discovery (GEO).
 */
export function buildDocStructuredData({
  locale,
  metadata,
  docPath,
  tier,
  pageUrl,
  siteUrl,
  lastModified,
  breadcrumbs,
  wordCount,
}: DocStructuredDataInput) {
  const inLanguage = getLocaleLang(locale);
  const keywords = buildDocKeywords(metadata, docPath, tier);
  const sectionLabel = getSectionLabel(locale, metadata.section);
  const citationGuidance = getCitationGuidance(metadata.section, locale);

  // Build author: per Google's helpful-content guidance, a Person + url that
  // points to a real bio page is a stronger E-E-A-T signal than the bare
  // Organization. We prefer the explicit frontmatter `author` slug, and fall
  // back to the site's default author slug (lib/site.ts) so every
  // BlogPosting still resolves to a real ProfilePage.
  //
  // Display name is resolved from the author registry when possible (sync
  // readFileSync at module load — see lib/authors-sync.ts); if the registry
  // doesn't have the slug we fall back to the slug itself, which keeps the
  // JSON-LD valid even before the bio file is added.
  const authorSlug = metadata.author ?? SITE_DEFAULT_AUTHOR_SLUG;
  const resolvedAuthor = getAuthorSync(authorSlug);
  const authorDisplayName = resolvedAuthor
    ? locale === "zh" && resolvedAuthor.nameZh
      ? resolvedAuthor.nameZh
      : resolvedAuthor.name
    : authorSlug;
  const author = {
    "@type": "Person" as const,
    name: authorDisplayName,
    url: `${siteUrl}/${locale}/authors/${authorSlug}`,
    ...(resolvedAuthor?.sameAs && resolvedAuthor.sameAs.length > 0
      ? { sameAs: resolvedAuthor.sameAs }
      : {}),
  };

  // datePublished is required by Article guidance; fall back to lastModified
  // when createdAt is absent so we never emit JSON-LD without it.
  const datePublished = metadata.createdAt ?? lastModified;
  const dateModified = lastModified ?? metadata.createdAt;

  // image[] — supply both 16:9 and 1:1 variants per Google's recommendation
  // for richer thumbnail eligibility. We point to the same /opengraph-image
  // route; differentiating dimensions is a follow-up (per-article OG).
  const image = [`${siteUrl}/opengraph-image`];

  // GEO enrichment: structured citations override the plain sourceUrls when
  // present, and quote/stat URLs are folded into a richer `citation` list so
  // LLM scrapers see attributed sources directly in JSON-LD.
  const structuredCitationUrls = (metadata.citations ?? [])
    .map((c) => c.url)
    .filter((url): url is string => Boolean(url));
  const quoteUrls = (metadata.quotes ?? [])
    .map((q) => q.url)
    .filter((url): url is string => Boolean(url));
  const statUrls = (metadata.stats ?? [])
    .map((s) => s.url)
    .filter((url): url is string => Boolean(url));
  const citation = Array.from(
    new Set([
      ...structuredCitationUrls,
      ...quoteUrls,
      ...statUrls,
      ...metadata.sourceUrls,
    ]),
  );

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: metadata.title,
    name: metadata.title,
    description: metadata.summary,
    abstract: metadata.summary,
    inLanguage,
    url: pageUrl,
    mainEntityOfPage: pageUrl,
    ...(datePublished ? { datePublished } : {}),
    ...(dateModified ? { dateModified } : {}),
    image,
    isAccessibleForFree: true,
    articleSection: sectionLabel,
    keywords,
    about: breadcrumbs,
    mentions: ["Git", sectionLabel],
    citation,
    sameAs: metadata.sourceUrls,
    usageInfo: citationGuidance,
    ...(wordCount ? { wordCount } : {}),
    author,
    publisher: {
      "@type": "Organization",
      name: siteName,
      url: siteUrl,
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/opengraph-image`,
      },
    },
    isPartOf: {
      "@type": "WebSite",
      name: siteName,
      url: `${siteUrl}/${locale}`,
    },
  };
}
