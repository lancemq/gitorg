import type { ComponentType } from "react";

import type { CommandSlug, Locale } from "@/lib/i18n";

export type DocSection =
  | "learning-path"
  | "commands"
  | "best-practices"
  | "workflows"
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

const contentModules = {
  zh: {
    "learning-path/quick-start": () =>
      import("@/content/zh/learning-path/quick-start.mdx"),
    "commands/git-init": () => import("@/content/zh/commands/git-init.mdx"),
    "commands/git-clone": () => import("@/content/zh/commands/git-clone.mdx"),
    "commands/git-status": () => import("@/content/zh/commands/git-status.mdx"),
    "commands/git-add": () => import("@/content/zh/commands/git-add.mdx"),
    "commands/git-commit": () => import("@/content/zh/commands/git-commit.mdx"),
    "commands/git-diff": () => import("@/content/zh/commands/git-diff.mdx"),
    "commands/git-log": () => import("@/content/zh/commands/git-log.mdx"),
    "commands/git-pull": () => import("@/content/zh/commands/git-pull.mdx"),
    "commands/git-push": () => import("@/content/zh/commands/git-push.mdx"),
    "commands/git-tag": () => import("@/content/zh/commands/git-tag.mdx"),
    "commands/git-remote": () => import("@/content/zh/commands/git-remote.mdx"),
    "commands/git-clean": () => import("@/content/zh/commands/git-clean.mdx"),
    "commands/git-rebase": () => import("@/content/zh/commands/git-rebase.mdx"),
    "commands/git-merge": () => import("@/content/zh/commands/git-merge.mdx"),
    "commands/git-cherry-pick": () =>
      import("@/content/zh/commands/git-cherry-pick.mdx"),
    "commands/git-reset": () => import("@/content/zh/commands/git-reset.mdx"),
    "commands/git-stash": () => import("@/content/zh/commands/git-stash.mdx"),
    "commands/git-fetch": () => import("@/content/zh/commands/git-fetch.mdx"),
    "commands/git-restore": () =>
      import("@/content/zh/commands/git-restore.mdx"),
    "commands/git-revert": () => import("@/content/zh/commands/git-revert.mdx"),
    "commands/git-switch": () => import("@/content/zh/commands/git-switch.mdx"),
    "commands/git-branch": () => import("@/content/zh/commands/git-branch.mdx"),
    "commands/git-checkout": () =>
      import("@/content/zh/commands/git-checkout.mdx"),
    "best-practices/commit-hygiene": () =>
      import("@/content/zh/best-practices/commit-hygiene.mdx"),
    "best-practices/topic-branches": () =>
      import("@/content/zh/best-practices/topic-branches.mdx"),
    "best-practices/fetch-first-sync": () =>
      import("@/content/zh/best-practices/fetch-first-sync.mdx"),
    "best-practices/shared-history-boundaries": () =>
      import("@/content/zh/best-practices/shared-history-boundaries.mdx"),
    "best-practices/review-and-safe-push": () =>
      import("@/content/zh/best-practices/review-and-safe-push.mdx"),
    "workflows/fetch-vs-pull": () =>
      import("@/content/zh/workflows/fetch-vs-pull.mdx"),
    "workflows/feature-branch-collaboration": () =>
      import("@/content/zh/workflows/feature-branch-collaboration.mdx"),
    "workflows/sync-before-review": () =>
      import("@/content/zh/workflows/sync-before-review.mdx"),
    "workflows/hotfix-and-urgent-fixes": () =>
      import("@/content/zh/workflows/hotfix-and-urgent-fixes.mdx"),
    "recovery/reflog-recovery": () =>
      import("@/content/zh/recovery/reflog-recovery.mdx"),
    "concepts/git-internals": () =>
      import("@/content/zh/concepts/git-internals.mdx"),
    "concepts/git-history": () =>
      import("@/content/zh/concepts/git-history.mdx"),
    "concepts/refs-and-head": () =>
      import("@/content/zh/concepts/refs-and-head.mdx"),
  },
  en: {
    "learning-path/quick-start": () =>
      import("@/content/en/learning-path/quick-start.mdx"),
    "commands/git-init": () => import("@/content/en/commands/git-init.mdx"),
    "commands/git-clone": () => import("@/content/en/commands/git-clone.mdx"),
    "commands/git-status": () => import("@/content/en/commands/git-status.mdx"),
    "commands/git-add": () => import("@/content/en/commands/git-add.mdx"),
    "commands/git-commit": () => import("@/content/en/commands/git-commit.mdx"),
    "commands/git-diff": () => import("@/content/en/commands/git-diff.mdx"),
    "commands/git-log": () => import("@/content/en/commands/git-log.mdx"),
    "commands/git-pull": () => import("@/content/en/commands/git-pull.mdx"),
    "commands/git-push": () => import("@/content/en/commands/git-push.mdx"),
    "commands/git-tag": () => import("@/content/en/commands/git-tag.mdx"),
    "commands/git-remote": () => import("@/content/en/commands/git-remote.mdx"),
    "commands/git-clean": () => import("@/content/en/commands/git-clean.mdx"),
    "commands/git-rebase": () => import("@/content/en/commands/git-rebase.mdx"),
    "commands/git-merge": () => import("@/content/en/commands/git-merge.mdx"),
    "commands/git-cherry-pick": () =>
      import("@/content/en/commands/git-cherry-pick.mdx"),
    "commands/git-reset": () => import("@/content/en/commands/git-reset.mdx"),
    "commands/git-stash": () => import("@/content/en/commands/git-stash.mdx"),
    "commands/git-fetch": () => import("@/content/en/commands/git-fetch.mdx"),
    "commands/git-restore": () =>
      import("@/content/en/commands/git-restore.mdx"),
    "commands/git-revert": () => import("@/content/en/commands/git-revert.mdx"),
    "commands/git-switch": () => import("@/content/en/commands/git-switch.mdx"),
    "commands/git-branch": () => import("@/content/en/commands/git-branch.mdx"),
    "commands/git-checkout": () =>
      import("@/content/en/commands/git-checkout.mdx"),
    "best-practices/commit-hygiene": () =>
      import("@/content/en/best-practices/commit-hygiene.mdx"),
    "best-practices/topic-branches": () =>
      import("@/content/en/best-practices/topic-branches.mdx"),
    "best-practices/fetch-first-sync": () =>
      import("@/content/en/best-practices/fetch-first-sync.mdx"),
    "best-practices/shared-history-boundaries": () =>
      import("@/content/en/best-practices/shared-history-boundaries.mdx"),
    "best-practices/review-and-safe-push": () =>
      import("@/content/en/best-practices/review-and-safe-push.mdx"),
    "workflows/fetch-vs-pull": () =>
      import("@/content/en/workflows/fetch-vs-pull.mdx"),
    "workflows/feature-branch-collaboration": () =>
      import("@/content/en/workflows/feature-branch-collaboration.mdx"),
    "workflows/sync-before-review": () =>
      import("@/content/en/workflows/sync-before-review.mdx"),
    "workflows/hotfix-and-urgent-fixes": () =>
      import("@/content/en/workflows/hotfix-and-urgent-fixes.mdx"),
    "recovery/reflog-recovery": () =>
      import("@/content/en/recovery/reflog-recovery.mdx"),
    "concepts/git-internals": () =>
      import("@/content/en/concepts/git-internals.mdx"),
    "concepts/git-history": () =>
      import("@/content/en/concepts/git-history.mdx"),
    "concepts/refs-and-head": () =>
      import("@/content/en/concepts/refs-and-head.mdx"),
  },
} satisfies Record<Locale, Record<string, ContentLoader>>;

export type DocPath = keyof (typeof contentModules)["zh"];

export type SearchDoc = {
  href: string;
  path: DocPath;
  section: DocSection;
  slug: string;
  title: string;
  summary: string;
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

export function getDocHref(locale: Locale, docPath: DocPath) {
  if (docPath.startsWith("commands/")) {
    return `/${locale}/commands/${docPath.replace("commands/", "")}`;
  }

  if (docPath === "concepts/git-history") {
    return `/${locale}/history`;
  }

  if (docPath === "concepts/git-internals") {
    return `/${locale}/internals`;
  }

  if (docPath.startsWith("best-practices/")) {
    return `/${locale}/best-practices/${docPath.replace("best-practices/", "")}`;
  }

  if (docPath.startsWith("workflows/")) {
    return `/${locale}/workflows/${docPath.replace("workflows/", "")}`;
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

export async function getCommandDoc(locale: Locale, slug: CommandSlug) {
  const docPath = `commands/${slug}` as DocPath;
  return getDocByPath(locale, docPath);
}

export function getDocPathFromSlugParts(slugParts: string[]) {
  return slugParts.join("/") as DocPath;
}
