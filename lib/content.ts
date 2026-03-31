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

function createContentLoader(locale: Locale, docPath: DocPath): ContentLoader {
  return () => import(`@/content/${locale}/${docPath}.mdx`) as Promise<MdxModule>;
}

function buildLocaleContentModules(locale: Locale) {
  return Object.fromEntries(
    docPathRegistry.map((docPath) => [docPath, createContentLoader(locale, docPath)]),
  ) as Record<DocPath, ContentLoader>;
}

const contentModules = {
  zh: buildLocaleContentModules("zh"),
  en: buildLocaleContentModules("en"),
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

export function getDocPaths(locale: Locale) {
  return Object.keys(contentModules[locale]) as DocPath[];
}

export async function getDocByPath(locale: Locale, docPath: DocPath) {
  const module = await contentModules[locale][docPath]();
  return {
    path: docPath,
    Component: module.default,
    metadata: module.metadata,
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
