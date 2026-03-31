import type { ComponentType } from "react";

import type { CommandSlug, InternalsSlug, Locale } from "@/lib/i18n";

export type DocSection =
  | "learning-path"
  | "commands"
  | "best-practices"
  | "workflows"
  | "internals"
  | "recovery"
  | "concepts";

export type DocMetadata = {
  title: string;
  slug: string;
  locale: Locale;
  summary: string;
  sourceUrls: string[];
  section: DocSection;
};

type MdxModule = {
  default: ComponentType;
  metadata: DocMetadata;
};

type ContentLoader = () => Promise<MdxModule>;
const docPathRegistry = [
  "learning-path/quick-start",
  "commands/git-init",
  "commands/git-clone",
  "commands/git-status",
  "commands/git-add",
  "commands/git-commit",
  "commands/git-diff",
  "commands/git-show",
  "commands/git-log",
  "commands/git-rm",
  "commands/git-mv",
  "commands/git-pull",
  "commands/git-push",
  "commands/git-tag",
  "commands/git-remote",
  "commands/git-clean",
  "commands/git-rebase",
  "commands/git-merge",
  "commands/git-cherry-pick",
  "commands/git-reset",
  "commands/git-stash",
  "commands/git-fetch",
  "commands/git-restore",
  "commands/git-revert",
  "commands/git-switch",
  "commands/git-branch",
  "commands/git-reflog",
  "commands/git-bisect",
  "commands/git-blame",
  "commands/git-checkout",
  "best-practices/commit-hygiene",
  "best-practices/topic-branches",
  "best-practices/fetch-first-sync",
  "best-practices/shared-history-boundaries",
  "best-practices/review-and-safe-push",
  "workflows/fetch-vs-pull",
  "workflows/feature-branch-collaboration",
  "workflows/sync-before-review",
  "workflows/hotfix-and-urgent-fixes",
  "internals/object-database",
  "internals/index-and-working-tree",
  "internals/refs-and-head",
  "internals/remote-tracking-refs",
  "internals/commit-graph",
  "internals/packfiles-and-storage",
  "internals/reachability-and-garbage-collection",
  "recovery/reflog-recovery",
  "concepts/git-history",
] as const;

export type DocPath = (typeof docPathRegistry)[number];
const contentModules = {
  zh: {
    "learning-path/quick-start": () => import("@/content/zh/learning-path/quick-start.mdx"),
    "commands/git-init": () => import("@/content/zh/commands/git-init.mdx"),
    "commands/git-clone": () => import("@/content/zh/commands/git-clone.mdx"),
    "commands/git-status": () => import("@/content/zh/commands/git-status.mdx"),
    "commands/git-add": () => import("@/content/zh/commands/git-add.mdx"),
    "commands/git-commit": () => import("@/content/zh/commands/git-commit.mdx"),
    "commands/git-diff": () => import("@/content/zh/commands/git-diff.mdx"),
    "commands/git-show": () => import("@/content/zh/commands/git-show.mdx"),
    "commands/git-log": () => import("@/content/zh/commands/git-log.mdx"),
    "commands/git-rm": () => import("@/content/zh/commands/git-rm.mdx"),
    "commands/git-mv": () => import("@/content/zh/commands/git-mv.mdx"),
    "commands/git-pull": () => import("@/content/zh/commands/git-pull.mdx"),
    "commands/git-push": () => import("@/content/zh/commands/git-push.mdx"),
    "commands/git-tag": () => import("@/content/zh/commands/git-tag.mdx"),
    "commands/git-remote": () => import("@/content/zh/commands/git-remote.mdx"),
    "commands/git-clean": () => import("@/content/zh/commands/git-clean.mdx"),
    "commands/git-rebase": () => import("@/content/zh/commands/git-rebase.mdx"),
    "commands/git-merge": () => import("@/content/zh/commands/git-merge.mdx"),
    "commands/git-cherry-pick": () => import("@/content/zh/commands/git-cherry-pick.mdx"),
    "commands/git-reset": () => import("@/content/zh/commands/git-reset.mdx"),
    "commands/git-stash": () => import("@/content/zh/commands/git-stash.mdx"),
    "commands/git-fetch": () => import("@/content/zh/commands/git-fetch.mdx"),
    "commands/git-restore": () => import("@/content/zh/commands/git-restore.mdx"),
    "commands/git-revert": () => import("@/content/zh/commands/git-revert.mdx"),
    "commands/git-switch": () => import("@/content/zh/commands/git-switch.mdx"),
    "commands/git-branch": () => import("@/content/zh/commands/git-branch.mdx"),
    "commands/git-reflog": () => import("@/content/zh/commands/git-reflog.mdx"),
    "commands/git-bisect": () => import("@/content/zh/commands/git-bisect.mdx"),
    "commands/git-blame": () => import("@/content/zh/commands/git-blame.mdx"),
    "commands/git-checkout": () => import("@/content/zh/commands/git-checkout.mdx"),
    "best-practices/commit-hygiene": () => import("@/content/zh/best-practices/commit-hygiene.mdx"),
    "best-practices/topic-branches": () => import("@/content/zh/best-practices/topic-branches.mdx"),
    "best-practices/fetch-first-sync": () => import("@/content/zh/best-practices/fetch-first-sync.mdx"),
    "best-practices/shared-history-boundaries": () => import("@/content/zh/best-practices/shared-history-boundaries.mdx"),
    "best-practices/review-and-safe-push": () => import("@/content/zh/best-practices/review-and-safe-push.mdx"),
    "workflows/fetch-vs-pull": () => import("@/content/zh/workflows/fetch-vs-pull.mdx"),
    "workflows/feature-branch-collaboration": () => import("@/content/zh/workflows/feature-branch-collaboration.mdx"),
    "workflows/sync-before-review": () => import("@/content/zh/workflows/sync-before-review.mdx"),
    "workflows/hotfix-and-urgent-fixes": () => import("@/content/zh/workflows/hotfix-and-urgent-fixes.mdx"),
    "internals/object-database": () => import("@/content/zh/internals/object-database.mdx"),
    "internals/index-and-working-tree": () => import("@/content/zh/internals/index-and-working-tree.mdx"),
    "internals/refs-and-head": () => import("@/content/zh/internals/refs-and-head.mdx"),
    "internals/remote-tracking-refs": () => import("@/content/zh/internals/remote-tracking-refs.mdx"),
    "internals/commit-graph": () => import("@/content/zh/internals/commit-graph.mdx"),
    "internals/packfiles-and-storage": () => import("@/content/zh/internals/packfiles-and-storage.mdx"),
    "internals/reachability-and-garbage-collection": () => import("@/content/zh/internals/reachability-and-garbage-collection.mdx"),
    "recovery/reflog-recovery": () => import("@/content/zh/recovery/reflog-recovery.mdx"),
    "concepts/git-history": () => import("@/content/zh/concepts/git-history.mdx"),
  },
  en: {
    "learning-path/quick-start": () => import("@/content/en/learning-path/quick-start.mdx"),
    "commands/git-init": () => import("@/content/en/commands/git-init.mdx"),
    "commands/git-clone": () => import("@/content/en/commands/git-clone.mdx"),
    "commands/git-status": () => import("@/content/en/commands/git-status.mdx"),
    "commands/git-add": () => import("@/content/en/commands/git-add.mdx"),
    "commands/git-commit": () => import("@/content/en/commands/git-commit.mdx"),
    "commands/git-diff": () => import("@/content/en/commands/git-diff.mdx"),
    "commands/git-show": () => import("@/content/en/commands/git-show.mdx"),
    "commands/git-log": () => import("@/content/en/commands/git-log.mdx"),
    "commands/git-rm": () => import("@/content/en/commands/git-rm.mdx"),
    "commands/git-mv": () => import("@/content/en/commands/git-mv.mdx"),
    "commands/git-pull": () => import("@/content/en/commands/git-pull.mdx"),
    "commands/git-push": () => import("@/content/en/commands/git-push.mdx"),
    "commands/git-tag": () => import("@/content/en/commands/git-tag.mdx"),
    "commands/git-remote": () => import("@/content/en/commands/git-remote.mdx"),
    "commands/git-clean": () => import("@/content/en/commands/git-clean.mdx"),
    "commands/git-rebase": () => import("@/content/en/commands/git-rebase.mdx"),
    "commands/git-merge": () => import("@/content/en/commands/git-merge.mdx"),
    "commands/git-cherry-pick": () => import("@/content/en/commands/git-cherry-pick.mdx"),
    "commands/git-reset": () => import("@/content/en/commands/git-reset.mdx"),
    "commands/git-stash": () => import("@/content/en/commands/git-stash.mdx"),
    "commands/git-fetch": () => import("@/content/en/commands/git-fetch.mdx"),
    "commands/git-restore": () => import("@/content/en/commands/git-restore.mdx"),
    "commands/git-revert": () => import("@/content/en/commands/git-revert.mdx"),
    "commands/git-switch": () => import("@/content/en/commands/git-switch.mdx"),
    "commands/git-branch": () => import("@/content/en/commands/git-branch.mdx"),
    "commands/git-reflog": () => import("@/content/en/commands/git-reflog.mdx"),
    "commands/git-bisect": () => import("@/content/en/commands/git-bisect.mdx"),
    "commands/git-blame": () => import("@/content/en/commands/git-blame.mdx"),
    "commands/git-checkout": () => import("@/content/en/commands/git-checkout.mdx"),
    "best-practices/commit-hygiene": () => import("@/content/en/best-practices/commit-hygiene.mdx"),
    "best-practices/topic-branches": () => import("@/content/en/best-practices/topic-branches.mdx"),
    "best-practices/fetch-first-sync": () => import("@/content/en/best-practices/fetch-first-sync.mdx"),
    "best-practices/shared-history-boundaries": () => import("@/content/en/best-practices/shared-history-boundaries.mdx"),
    "best-practices/review-and-safe-push": () => import("@/content/en/best-practices/review-and-safe-push.mdx"),
    "workflows/fetch-vs-pull": () => import("@/content/en/workflows/fetch-vs-pull.mdx"),
    "workflows/feature-branch-collaboration": () => import("@/content/en/workflows/feature-branch-collaboration.mdx"),
    "workflows/sync-before-review": () => import("@/content/en/workflows/sync-before-review.mdx"),
    "workflows/hotfix-and-urgent-fixes": () => import("@/content/en/workflows/hotfix-and-urgent-fixes.mdx"),
    "internals/object-database": () => import("@/content/en/internals/object-database.mdx"),
    "internals/index-and-working-tree": () => import("@/content/en/internals/index-and-working-tree.mdx"),
    "internals/refs-and-head": () => import("@/content/en/internals/refs-and-head.mdx"),
    "internals/remote-tracking-refs": () => import("@/content/en/internals/remote-tracking-refs.mdx"),
    "internals/commit-graph": () => import("@/content/en/internals/commit-graph.mdx"),
    "internals/packfiles-and-storage": () => import("@/content/en/internals/packfiles-and-storage.mdx"),
    "internals/reachability-and-garbage-collection": () => import("@/content/en/internals/reachability-and-garbage-collection.mdx"),
    "recovery/reflog-recovery": () => import("@/content/en/recovery/reflog-recovery.mdx"),
    "concepts/git-history": () => import("@/content/en/concepts/git-history.mdx"),
  },
} satisfies Record<Locale, Record<DocPath, ContentLoader>>;

export type SearchDoc = {
  href: string;
  path: DocPath;
  section: DocSection;
  slug: string;
  title: string;
  summary: string;
};

export type ContentStats = {
  totalDocs: number;
  commandDocs: number;
  sectionCounts: Record<DocSection, number>;
};

export function getDocPaths(_locale: Locale) {
  void _locale;
  return [...docPathRegistry] as DocPath[];
}

export async function getDocByPath(locale: Locale, docPath: DocPath) {
  const mdxModule = await contentModules[locale][docPath]();
  return {
    path: docPath,
    Component: mdxModule.default,
    metadata: mdxModule.metadata,
  };
}

export async function getAllDocs(locale: Locale) {
  const docs = await Promise.all(
    getDocPaths(locale).map(async (docPath) => getDocByPath(locale, docPath)),
  );

  return docs.sort((a, b) => a.metadata.title.localeCompare(b.metadata.title));
}

export async function getCommandDocs(locale: Locale) {
  const docs = await getAllDocs(locale);
  return docs.filter((doc) => doc.metadata.section === "commands");
}

export async function getBestPracticeDocs(locale: Locale) {
  const docs = await getAllDocs(locale);
  return docs.filter((doc) => doc.path.startsWith("best-practices/"));
}

export async function getWorkflowDocs(locale: Locale) {
  const docs = await getAllDocs(locale);
  return docs.filter((doc) => doc.path.startsWith("workflows/"));
}

export async function getInternalsDocs(locale: Locale) {
  const docs = await getAllDocs(locale);
  return docs.filter((doc) => doc.path.startsWith("internals/"));
}

export function getDocHref(locale: Locale, docPath: DocPath) {
  if (docPath.startsWith("commands/")) {
    return `/${locale}/commands/${docPath.replace("commands/", "")}`;
  }

  if (docPath === "concepts/git-history") {
    return `/${locale}/history`;
  }

  if (docPath.startsWith("best-practices/")) {
    return `/${locale}/best-practices/${docPath.replace("best-practices/", "")}`;
  }

  if (docPath.startsWith("workflows/")) {
    return `/${locale}/workflows/${docPath.replace("workflows/", "")}`;
  }

  if (docPath.startsWith("internals/")) {
    return `/${locale}/internals/${docPath.replace("internals/", "")}`;
  }

  return `/${locale}/docs/${docPath}`;
}

export async function getSearchDocs(locale: Locale): Promise<SearchDoc[]> {
  const docs = await getAllDocs(locale);

  return docs.map((doc) => ({
    href: getDocHref(locale, doc.path),
    path: doc.path,
    section: doc.metadata.section,
    slug: doc.metadata.slug,
    title: doc.metadata.title,
    summary: doc.metadata.summary,
  }));
}

export async function getContentStats(locale: Locale): Promise<ContentStats> {
  const docs = await getAllDocs(locale);
  const sectionCounts = docs.reduce(
    (acc, doc) => {
      acc[doc.metadata.section] += 1;
      return acc;
    },
    {
      "learning-path": 0,
      commands: 0,
      "best-practices": 0,
      workflows: 0,
      internals: 0,
      recovery: 0,
      concepts: 0,
    } as Record<DocSection, number>,
  );

  return {
    totalDocs: docs.length,
    commandDocs: sectionCounts.commands,
    sectionCounts,
  };
}

export async function getCommandDoc(locale: Locale, slug: CommandSlug) {
  const docPath = `commands/${slug}` as DocPath;
  return getDocByPath(locale, docPath);
}

export async function getInternalDoc(locale: Locale, slug: InternalsSlug) {
  const docPath = `internals/${slug}` as DocPath;
  return getDocByPath(locale, docPath);
}

export function getDocPathFromSlugParts(slugParts: string[]) {
  return slugParts.join("/") as DocPath;
}
