import type { SearchDoc } from "@/lib/content";
import type { Locale } from "@/lib/i18n";

export type SearchResult = SearchDoc & { score: number };

export type SearchGroup = {
  id: string;
  title: string;
  items: SearchResult[];
};

export const searchSynonyms: Record<Locale, Record<string, string[]>> = {
  zh: {
    撤销: ["reset", "revert", "restore"],
    回退: ["reset", "revert"],
    恢复: ["reflog", "restore", "recovery"],
    同步: ["fetch", "pull", "rebase"],
    合并: ["merge", "rebase", "cherry-pick"],
    变基: ["rebase"],
    强推: ["push", "shared-history", "safe-push"],
    暂存: ["add", "index", "staging"],
    储藏: ["stash"],
    冲突: ["merge", "rebase", "conflict"],
    分支: ["branch", "switch", "checkout"],
    标签: ["tag"],
    远端: ["remote", "fetch", "push", "pull"],
    对象: ["object", "database", "blob", "tree", "commit"],
    原理: ["internals", "object", "refs", "commit-graph"],
    历史: ["history", "rebase", "reflog", "log"],
  },
  en: {
    undo: ["reset", "revert", "restore"],
    rollback: ["reset", "revert"],
    recover: ["reflog", "restore", "recovery"],
    sync: ["fetch", "pull", "rebase"],
    synchronize: ["fetch", "pull", "rebase"],
    merge: ["merge", "rebase", "cherry-pick"],
    rewrite: ["rebase", "commit", "history"],
    stash: ["git-stash", "working-tree"],
    branch: ["switch", "checkout", "branch"],
    remote: ["fetch", "push", "pull", "origin"],
    conflict: ["merge", "rebase", "conflict"],
    internals: ["object", "refs", "commit-graph", "packfiles"],
    history: ["log", "reflog", "rebase"],
  },
};

export const tierScoreBonus: Record<SearchDoc["tier"], number> = {
  core: 5,
  recommended: 2,
  extended: 0,
};

export const tierPriority: Record<SearchDoc["tier"], number> = {
  core: 0,
  recommended: 1,
  extended: 2,
};

export const sectionOrder: SearchDoc["section"][] = [
  "learning-path",
  "commands",
  "workflows",
  "best-practices",
  "internals",
  "concepts",
  "recovery",
];

export const sectionLabels: Record<Locale, Record<SearchDoc["section"], string>> = {
  zh: {
    "learning-path": "学习路径",
    commands: "命令专题",
    "best-practices": "最佳实践",
    workflows: "工作流",
    github: "GitHub 专题",
    gitlab: "GitLab 专题",
    internals: "Git 原理",
    recovery: "恢复手册",
    concepts: "核心概念",
    "ci-cd": "CI/CD 集成",
    ide: "IDE 集成",
    security: "安全",
    performance: "性能优化",
    migration: "迁移指南",
    hosting: "托管方案",
  },
  en: {
    "learning-path": "Learning Path",
    commands: "Commands",
    "best-practices": "Best Practices",
    workflows: "Workflows",
    github: "GitHub",
    gitlab: "GitLab",
    internals: "Git Internals",
    recovery: "Recovery",
    concepts: "Concepts",
    "ci-cd": "CI/CD",
    ide: "IDE",
    security: "Security",
    performance: "Performance",
    migration: "Migration",
    hosting: "Hosting",
  },
};

export function expandQueryTerms(queryTokens: string[], locale: Locale): string[] {
  if (!queryTokens.length) {
    return [];
  }

  const synonyms = searchSynonyms[locale];
  return Array.from(
    new Set(queryTokens.flatMap((token) => [token, ...(synonyms[token] ?? [])])),
  );
}

export function scoreAndFilterDocs(
  docs: SearchDoc[],
  normalizedQuery: string,
  expandedTerms: string[],
  activeSection: SearchDoc["section"] | "all",
): SearchResult[] {
  const scopedItems =
    activeSection === "all" ? docs : docs.filter((item) => item.section === activeSection);

  if (!normalizedQuery) {
    return scopedItems.slice(0, 8).map((item) => ({ ...item, score: 0 }));
  }

  return scopedItems
    .map((item) => {
      const haystack = [item.title, item.summary, item.slug, item.path]
        .join(" ")
        .toLowerCase();
      const directTitleHit = item.title.toLowerCase().includes(normalizedQuery);
      const directSlugHit = item.slug.toLowerCase().includes(normalizedQuery);
      const directPathHit = item.path.toLowerCase().includes(normalizedQuery);
      const directSummaryHit = item.summary.toLowerCase().includes(normalizedQuery);

      const score = expandedTerms.reduce((total, term) => {
        const titleHit = item.title.toLowerCase().includes(term);
        const slugHit = item.slug.toLowerCase().includes(term);
        const pathHit = item.path.toLowerCase().includes(term);
        const summaryHit = item.summary.toLowerCase().includes(term);
        const directTermBonus = term === normalizedQuery ? 3 : 0;

        return (
          total +
          (titleHit ? 5 : 0) +
          (slugHit ? 4 : 0) +
          (pathHit ? 3 : 0) +
          (summaryHit ? 2 : 0) +
          (haystack.startsWith(term) ? 1 : 0) +
          ((titleHit || slugHit || pathHit || summaryHit) ? directTermBonus : 0)
        );
      }, 0) +
        (directTitleHit ? 6 : 0) +
        (directSlugHit ? 4 : 0) +
        (directPathHit ? 3 : 0) +
        (directSummaryHit ? 2 : 0) +
        tierScoreBonus[item.tier];

      return { ...item, score };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score || a.title.localeCompare(b.title))
    .slice(0, 8);
}

export function getQuickLinkItems(
  items: SearchDoc[],
  recentItems: SearchDoc[],
): SearchDoc[] {
  return sectionOrder
    .map((section) =>
      items
        .filter((item) => item.section === section)
        .sort((a, b) => tierPriority[a.tier] - tierPriority[b.tier])[0],
    )
    .filter((item): item is SearchDoc => Boolean(item))
    .filter((item) => !recentItems.some((recentItem) => recentItem.href === item.href))
    .slice(0, 6);
}

export function getFallbackItems(
  items: SearchDoc[],
  normalizedQuery: string,
  expandedTerms: string[],
  quickLinkItems: SearchDoc[],
): SearchDoc[] {
  if (!normalizedQuery) {
    return [];
  }

  const suggestions = expandedTerms
    .filter((term) => term !== normalizedQuery)
    .flatMap((term) =>
      items.filter((item) =>
        [item.title, item.summary, item.slug, item.path]
          .join(" ")
          .toLowerCase()
          .includes(term),
      ),
    );

  return Array.from(
    new Map(
      [...suggestions, ...quickLinkItems].map((item) => [item.href, item]),
    ).values(),
  ).slice(0, 4);
}

export function buildDisplayGroups(
  results: SearchResult[],
  normalizedQuery: string,
  activeSection: SearchDoc["section"] | "all",
  locale: Locale,
  recentItems: SearchDoc[],
  quickLinkItems: SearchDoc[],
): SearchGroup[] {
  const isBrowsingState = !normalizedQuery && activeSection === "all";

  if (isBrowsingState) {
    return [
      { id: "recent", title: recentLabels[locale], items: recentItems.map((item) => ({ ...item, score: 0 })) },
      { id: "quick-links", title: quickLinkLabels[locale], items: quickLinkItems.map((item) => ({ ...item, score: 0 })) },
    ].filter((group) => group.items.length > 0);
  }

  if (activeSection !== "all") {
    return results.length
      ? [
          {
            id: activeSection,
            title: sectionLabels[locale][activeSection],
            items: results,
          },
        ]
      : [];
  }

  const availableSections = Array.from(new Set(results.map((item) => item.section))).sort((a, b) =>
    sectionLabels[locale][a].localeCompare(sectionLabels[locale][b]),
  );

  return availableSections
    .map((section) => ({
      id: section,
      title: sectionLabels[locale][section],
      items: results.filter((item) => item.section === section),
    }))
    .filter((group) => group.items.length > 0);
}

const recentLabels = {
  zh: "最近访问",
  en: "Recent Visits",
} as const;

const quickLinkLabels = {
  zh: "常用入口",
  en: "Quick Links",
} as const;
