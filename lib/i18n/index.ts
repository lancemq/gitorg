import {
  type CommandSlug,
  type BestPracticeSlug,
  type WorkflowSlug,
  type PlatformsSlug,
  type InternalsSlug,
  type RecoverySlug,
  type LearningPathSlug,
  type ConceptsSlug,
  type DevopsSlug,
  type SecuritySlug,
  type PerformanceSlug,
  type MigrationSlug,
  type HostingSlug,
  learningPathSlugs,
  platformsSlugs,
  commandSlugs,
  basicCommandSlugs,
  advancedCommandSlugs,
  bestPracticeSlugs,
  workflowSlugs,
  recoverySlugs,
  conceptSlugs,
  internalsSlugs,
  devopsSlugs,
  securitySlugs,
  performanceSlugs,
  migrationSlugs,
  hostingSlugs,
} from "./slugs";

export {
  type CommandSlug,
  type BestPracticeSlug,
  type WorkflowSlug,
  type PlatformsSlug,
  type InternalsSlug,
  type RecoverySlug,
  type LearningPathSlug,
  type ConceptsSlug,
  type DevopsSlug,
  type SecuritySlug,
  type PerformanceSlug,
  type MigrationSlug,
  type HostingSlug,
  learningPathSlugs,
  platformsSlugs,
  commandSlugs,
  basicCommandSlugs,
  advancedCommandSlugs,
  bestPracticeSlugs,
  workflowSlugs,
  recoverySlugs,
  conceptSlugs,
  internalsSlugs,
  devopsSlugs,
  securitySlugs,
  performanceSlugs,
  migrationSlugs,
  hostingSlugs,
};

export const locales = ["zh", "en"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "zh";

export function isValidLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export type NavItem = {
  label: string;
  href: string;
  active?: boolean;
  children?: NavItem[];
  childGroups?: Array<{
    title: string;
    items: NavItem[];
  }>;
};

export type NavGroup = {
  title: string;
  items: NavItem[];
};

export type SidebarContent = {
  brandLabel: string;
  searchLabel: string;
  footerTitle: string;
  footerText: string;
  localeLabel: string;
  localeNames: Record<Locale, string>;
  groups: NavGroup[];
};

type FaqItem = {
  question: string;
  answer: string;
};

export type DocsSectionId =
  | "learning-path"
  | "commands"
  | "best-practices"
  | "workflows"
  | "internals"
  | "recovery"
  | "concepts"
  | "platforms"
  | "devops"
  | "security"
  | "performance"
  | "migration"
  | "hosting";

export type Dictionary = {
  sidebar: {
    docs: (activePath?: string) => SidebarContent;
  };
  commandIndex: {
    eyebrow: string;
    title: string;
    description: string;
  };
  bestPracticeIndex: {
    eyebrow: string;
    title: string;
    description: string;
  };
  workflowIndex: {
    eyebrow: string;
    title: string;
    description: string;
  };
  recoveryIndex: {
    eyebrow: string;
    title: string;
    description: string;
  };
  platformsIndex: {
    eyebrow: string;
    title: string;
    description: string;
  };
  learningPathIndex: {
    eyebrow: string;
    title: string;
    description: string;
  };
  internalsIndex: {
    eyebrow: string;
    title: string;
    description: string;
  };
  devopsIndex: {
    eyebrow: string;
    title: string;
    description: string;
  };
  securityIndex: {
    eyebrow: string;
    title: string;
    description: string;
  };
  performanceIndex: {
    eyebrow: string;
    title: string;
    description: string;
  };
  migrationIndex: {
    eyebrow: string;
    title: string;
    description: string;
  };
  hostingIndex: {
    eyebrow: string;
    title: string;
    description: string;
  };
  conceptsIndex: {
    eyebrow: string;
    title: string;
    description: string;
  };
  home: {
    hero: {
      eyebrow: string;
      title: string;
      description: string;
      primaryAction: string;
      secondaryAction: string;
    };
    meta: {
      modulesTitle: string;
      modules: number;
      modulesLabel: string;
      commandCardsTitle: string;
      commandCards: number;
      exercisesTitle: string;
      exercises: number;
      recommendedPathTitle: string;
      recommendedPath: string;
    };
    quickStart: {
      eyebrow: string;
      title: string;
      description: string;
      cards: ReadonlyArray<{
        kicker: string;
        title: string;
        description: string;
        command: string;
      }>;
    };
    knowledgeColumns: ReadonlyArray<{
      id: string;
      eyebrow: string;
      title: string;
      description: string;
      items: ReadonlyArray<{
        title: string;
        description: string;
      }>;
    }>;
    reference: {
      eyebrow: string;
      title: string;
      description: string;
      steps: ReadonlyArray<{
        step: string;
        title: string;
        description: string;
      }>;
    };
    faq: {
      eyebrow: string;
      title: string;
      description: string;
      action: string;
      items: ReadonlyArray<FaqItem>;
    };
    latest: {
      eyebrow: string;
      title: string;
      description: string;
    };
  };
  faqPage: {
    eyebrow: string;
    title: string;
    description: string;
    groups: ReadonlyArray<{
      id: string;
      title: string;
      description: string;
      items: ReadonlyArray<FaqItem>;
    }>;
  };
  updatesPage: {
    eyebrow: string;
    title: string;
    description: string;
    entries: ReadonlyArray<{
      id: string;
      period: string;
      title: string;
      summary: string;
      items: ReadonlyArray<string>;
    }>;
  };
  docsIndex: {
    eyebrow: string;
    title: string;
    description: string;
    sourcesTitle: string;
    sections: ReadonlyArray<{
      id: DocsSectionId;
      sourceIds?: ReadonlyArray<DocsSectionId>;
      eyebrow: string;
      title: string;
      description: string;
    }>;
  };
  commandPage: {
    eyebrow: string;
    breadcrumbs: {
      overview: string;
      commands: string;
      bestPractices: string;
      workflows: string;
      platforms: string;
      internals: string;
      concepts: string;
      faq: string;
      learningPath: string;
      recovery: string;
      devops: string;
      security: string;
      performance: string;
      migration: string;
      hosting: string;
    };
  };
  commandSlugs: readonly CommandSlug[];
  commandMeta: Record<CommandSlug, ReadonlyArray<{ label: string; value: string }>>;
};

export type SidebarSelection = { kind: "docs"; activePath?: string };

export function baseSidebar(locale: Locale, groups: NavGroup[]): SidebarContent {
  return {
    brandLabel: "GitOrg Atlas",
    searchLabel: locale === "zh" ? "搜索文档" : "Search docs",
    footerTitle: "Auto Doc",
    footerText: locale === "zh" ? "内容驱动文档站" : "Content-driven docs",
    localeLabel: locale === "zh" ? "语言" : "Language",
    localeNames: {
      zh: locale === "zh" ? "中文" : "Chinese",
      en: locale === "zh" ? "英文" : "English",
    },
    groups,
  };
}

export function buildBestPracticeNavItem(locale: Locale, activePath?: string): NavItem {
  const parentActive =
    activePath === "best-practices-index" ||
    bestPracticeSlugs.some((slug) => activePath === `best-practices/${slug}`);

  return {
    label: locale === "zh" ? "最佳实践" : "Best Practices",
    href: `/${locale}/best-practices`,
    active: parentActive,
  };
}

export function buildWorkflowNavItem(locale: Locale, activePath?: string): NavItem {
  const parentActive =
    activePath === "workflows-index" ||
    workflowSlugs.some((slug) => activePath === `workflows/${slug}`);

  return {
    label: locale === "zh" ? "工作流" : "Workflows",
    href: `/${locale}/workflows`,
    active: parentActive,
  };
}

export function buildRecoveryNavItem(locale: Locale, activePath?: string): NavItem {
  const parentActive =
    activePath === "recovery-index" ||
    recoverySlugs.some((slug) => activePath === `recovery/${slug}`);

  return {
    label: locale === "zh" ? "恢复与排障" : "Recovery",
    href: `/${locale}/recovery`,
    active: parentActive,
  };
}

export function buildInternalsNavItem(locale: Locale, activePath?: string): NavItem {
  const parentActive =
    activePath === "internals-index" ||
    internalsSlugs.some((slug) => activePath === `internals/${slug}`);

  return {
    label: locale === "zh" ? "Git 原理" : "Git Internals",
    href: `/${locale}/internals`,
    active: parentActive,
  };
}

export function buildPlatformsNavItem(locale: Locale, activePath?: string): NavItem {
  const parentActive =
    activePath === "platforms-index" ||
    platformsSlugs.some((slug) => activePath === `platforms/${slug}`);

  return {
    label: locale === "zh" ? "平台协作" : "Platforms",
    href: `/${locale}/platforms`,
    active: parentActive || activePath === "platforms",
  };
}

export function buildDevopsNavItem(locale: Locale, activePath?: string): NavItem {
  const parentActive =
    activePath === "devops-index" ||
    devopsSlugs.some((slug) => activePath === `devops/${slug}`);

  return {
    label: locale === "zh" ? "DevOps 工具链" : "DevOps Tooling",
    href: `/${locale}/devops`,
    active: parentActive,
  };
}

export function buildSecurityNavItem(locale: Locale, activePath?: string): NavItem {
  const parentActive =
    activePath === "security-index" ||
    securitySlugs.some((slug) => activePath === `security/${slug}`);

  return {
    label: locale === "zh" ? "安全" : "Security",
    href: `/${locale}/security`,
    active: parentActive,
  };
}

export function buildPerformanceNavItem(locale: Locale, activePath?: string): NavItem {
  const parentActive =
    activePath === "performance-index" ||
    performanceSlugs.some((slug) => activePath === `performance/${slug}`);

  return {
    label: locale === "zh" ? "性能优化" : "Performance",
    href: `/${locale}/performance`,
    active: parentActive,
  };
}

export function buildMigrationNavItem(locale: Locale, activePath?: string): NavItem {
  const parentActive =
    activePath === "migration-index" ||
    migrationSlugs.some((slug) => activePath === `migration/${slug}`);

  return {
    label: locale === "zh" ? "迁移指南" : "Migration",
    href: `/${locale}/migration`,
    active: parentActive,
  };
}

export function buildHostingNavItem(locale: Locale, activePath?: string): NavItem {
  const parentActive =
    activePath === "hosting-index" ||
    hostingSlugs.some((slug) => activePath === `hosting/${slug}`);

  return {
    label: locale === "zh" ? "托管方案" : "Hosting",
    href: `/${locale}/hosting`,
    active: parentActive,
  };
}

export function buildConceptsNavItem(locale: Locale, activePath?: string): NavItem {
  const parentActive =
    activePath === "concepts-index" ||
    conceptSlugs.some((slug) => activePath === `concepts/${slug}`) ||
    activePath === "concepts/git-history";

  return {
    label: locale === "zh" ? "概念基础" : "Concepts",
    href: `/${locale}/concepts`,
    active: parentActive,
  };
}

export function buildLearningPathNavItem(locale: Locale, activePath?: string): NavItem {
  const parentActive = learningPathSlugs.some((slug) => activePath === `learning-path/${slug}`);

  return {
    label: locale === "zh" ? "快速上手" : "Quick Start",
    href: `/${locale}/learning-path`,
    active: parentActive || activePath === "learning-path-index",
  };
}

export function buildCommandNavItem(
  locale: Locale,
  activePath?: string,
): NavItem {
  const baseHref = `/${locale}/commands`;
  const isActive =
    activePath === "commands-index" ||
    commandSlugs.some((slug) => activePath === `commands/${slug}`) ||
    activePath === "recovery/reflog-recovery";

  return {
    label: locale === "zh" ? "Git 命令" : "Git Commands",
    href: baseHref,
    active: isActive,
  };
}

import { zhDictionary } from "./zh";
import { enDictionary } from "./en";


const dictionaries: Record<Locale, Dictionary> = {
  zh: zhDictionary,
  en: enDictionary,
};

export function getDictionary(locale: Locale) {
  return dictionaries[locale];
}

export function getSidebarContent(locale: Locale, selection: SidebarSelection): SidebarContent {
  const dictionary = getDictionary(locale);
  return dictionary.sidebar.docs(selection.activePath);
}

export function getDocsSectionTitle(locale: Locale, sectionId: DocsSectionId) {
  const dictionary = getDictionary(locale);
  return dictionary.docsIndex.sections.find((section) => section.id === sectionId)?.title ?? "";
}
