import type { DocMetadata, DocPath, DocTier } from "@/lib/content";
import type { Locale } from "@/lib/i18n";
import { getLocaleLang } from "@/lib/seo";

const siteName = "GitOrg Atlas";

const sectionLabels: Record<Locale, Record<DocMetadata["section"], string>> = {
  zh: {
    "learning-path": "学习路径",
    commands: "Git 命令",
    "best-practices": "最佳实践",
    workflows: "工作流",
    github: "GitHub 专题",
    gitlab: "GitLab 专题",
    internals: "Git 原理",
    recovery: "恢复与排障",
    concepts: "概念",
  },
  en: {
    "learning-path": "Learning Path",
    commands: "Git Commands",
    "best-practices": "Best Practices",
    workflows: "Workflows",
    github: "GitHub",
    gitlab: "GitLab",
    internals: "Git Internals",
    recovery: "Recovery",
    concepts: "Concepts",
  },
};

const learningResourceType: Record<DocMetadata["section"], string> = {
  "learning-path": "Course module",
  commands: "Reference guide",
  "best-practices": "Best practice guide",
  workflows: "Workflow tutorial",
  github: "Platform tutorial",
  gitlab: "Platform tutorial",
  internals: "Technical explainer",
  recovery: "Troubleshooting guide",
  concepts: "Concept guide",
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
  lastModified?: string;
  breadcrumbs: string[];
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

export function buildDocStructuredData({
  locale,
  metadata,
  docPath,
  tier,
  pageUrl,
  siteUrl,
  lastModified,
  breadcrumbs,
}: DocStructuredDataInput) {
  const inLanguage = getLocaleLang(locale);
  const keywords = buildDocKeywords(metadata, docPath, tier);
  const sectionLabel = getSectionLabel(locale, metadata.section);
  const resourceType = getLearningResourceType(metadata.section);
  const citationGuidance = getCitationGuidance(metadata.section, locale);

  return {
    "@context": "https://schema.org",
    "@type": ["TechArticle", "LearningResource"],
    headline: metadata.title,
    name: metadata.title,
    description: metadata.summary,
    abstract: metadata.summary,
    inLanguage,
    url: pageUrl,
    mainEntityOfPage: pageUrl,
    dateModified: lastModified,
    image: `${siteUrl}/opengraph-image`,
    isAccessibleForFree: true,
    articleSection: sectionLabel,
    learningResourceType: resourceType,
    educationalLevel: tierLabel[tier],
    teaches: keywords.slice(0, 8),
    keywords,
    about: breadcrumbs,
    mentions: ["Git", sectionLabel, resourceType],
    citation: metadata.sourceUrls,
    sameAs: metadata.sourceUrls,
    usageInfo: citationGuidance,
    author: {
      "@type": "Organization",
      name: siteName,
      url: siteUrl,
    },
    publisher: {
      "@type": "Organization",
      name: siteName,
      url: siteUrl,
    },
    provider: {
      "@type": "Organization",
      name: siteName,
      url: siteUrl,
    },
    isPartOf: {
      "@type": "WebSite",
      name: siteName,
      url: `${siteUrl}/${locale}`,
    },
  };
}
