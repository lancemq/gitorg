import { readFile, stat } from "node:fs/promises";
import path from "node:path";
import type { ComponentType } from "react";
import { cache } from "react";

import {
  bestPracticeSlugs,
  commandSlugs,
  platformsSlugs,
  internalsSlugs,
  learningPathSlugs,
  recoverySlugs,
  workflowSlugs,
  devopsSlugs,
  securitySlugs,
  performanceSlugs,
  migrationSlugs,
  hostingSlugs,
  conceptSlugs,
  type CommandSlug,
  type InternalsSlug,
  type Locale,
  type RecoverySlug,
} from "@/lib/i18n";

export type DocSection =
  | "learning-path"
  | "commands"
  | "best-practices"
  | "workflows"
  | "internals"
  | "recovery"
  | "concepts"
  | "security"
  | "performance"
  | "migration"
  | "hosting"
  | "platforms"
  | "devops";

export type DocTier = "core" | "recommended" | "extended";

export type DocCitationKind = "official" | "book" | "discussion" | "blog" | "paper";

export type DocQuote = {
  /** Verbatim quote. Keep short — 1-3 sentences. */
  text: string;
  /** Who/what is being quoted, e.g. "Pro Git, 2nd Ed., §3.6" or "Linus Torvalds, LKML 2009". */
  attribution: string;
  /** Optional canonical URL for the quote source. */
  url?: string;
};

export type DocStat = {
  /** The numeric/quantitative value, e.g. "~2.3s", "115%", "10x". */
  value: string;
  /** Plain-language label, e.g. "1000 commit rebase vs merge extra time". */
  label: string;
  /** Source of the measurement, free-text. */
  source: string;
  /** Optional URL to the underlying benchmark/study. */
  url?: string;
};

export type DocCitation = {
  /** Display title. */
  title: string;
  /** Canonical URL. */
  url: string;
  /** Coarse classification for GEO ranking/diversity heuristics. */
  kind: DocCitationKind;
};

export type DocMetadata = {
  title: string;
  slug: string;
  locale: Locale;
  summary: string;
  sourceUrls: string[];
  section: DocSection;
  /**
   * Author slug, resolved against `content/authors/{slug}.mdx` and `/{locale}/authors/{slug}`.
   * Optional — when absent, structured data falls back to the site Organization as author.
   */
  author?: string;
  /**
   * ISO-8601 publish date (e.g. "2024-09-12"). Optional — when absent, falls back to
   * file mtime via getDocLastModified so BlogPosting still has a `datePublished`.
   */
  createdAt?: string;
  /**
   * Learning-path step number (1-based). Only set on learning-path articles.
   * Drives a "Step N / total" badge and the "what's next" card. Optional —
   * non-learning-path articles leave this unset.
   */
  step?: number;
  /**
   * GEO (Generative Engine Optimization) signals. The KDD '24 GEO paper
   * (arXiv 2311.09735) shows direct quotations (+41%), statistics (+30%),
   * fluency (+28%), and cited sources (+27%) drive LLM citation rates.
   *
   * All three fields are optional and parsed from MDX frontmatter when present.
   * Backfilled progressively per article; older articles without these fields
   * continue to work — downstream code treats `undefined` and `[]` the same.
   */
  quotes?: DocQuote[];
  stats?: DocStat[];
  citations?: DocCitation[];
};

export const docPathRegistry = [
  "learning-path/quick-start",
  "learning-path/setup-and-clone",
  "learning-path/stage-and-commit",
  "learning-path/view-history-and-changes",
  "learning-path/undo-local-basics",
  "learning-path/sync-with-remote",
  "learning-path/first-feature-branch",
  "learning-path/open-first-pull-request",
  "learning-path/handle-review-feedback",
  "learning-path/merge-and-close-task",
  "learning-path/first-safe-hotfix",
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
  "commands/git-fetch",
  "commands/git-pull",
  "commands/git-push",
  "commands/git-switch",
  "commands/git-branch",
  "commands/git-tag",
  "commands/git-remote",
  "commands/git-rebase",
  "commands/git-merge",
  "commands/git-cherry-pick",
  "commands/git-reset",
  "commands/git-stash",
  "commands/git-restore",
  "commands/git-revert",
  "commands/git-reflog",
  "commands/git-bisect",
  "commands/git-blame",
  "commands/git-checkout",
  "commands/git-clean",
  "commands/git-config",
  "commands/git-help",
  "commands/git-describe",
  "commands/git-grep",
  "commands/git-shortlog",
  "commands/git-show-ref",
  "commands/git-rev-parse",
  "commands/git-am",
  "commands/git-apply",
  "commands/git-format-patch",
  "commands/git-send-email",
  "commands/git-request-pull",
  "commands/git-archive",
  "commands/git-bundle",
  "commands/git-worktree",
  "commands/git-submodule",
  "commands/git-sparse-checkout",
  "commands/git-cat-file",
  "commands/git-ls-files",
  "commands/git-ls-tree",
  "commands/git-read-tree",
  "commands/git-update-index",
  "commands/git-update-ref",
  "commands/git-symbolic-ref",
  "commands/git-rev-list",
  "commands/git-merge-base",
  "commands/git-notes",
  "commands/git-range-diff",
  "commands/git-cherry",
  "commands/git-mergetool",
  "commands/git-fsck",
  "commands/git-gc",
  "commands/git-count-objects",
  "commands/git-verify-pack",
  "commands/git-verify-tag",
  "best-practices/commit-hygiene",
  "best-practices/topic-branches",
  "best-practices/branch-workflow-and-lifecycle",
  "best-practices/fetch-first-sync",
  "best-practices/shared-history-boundaries",
  "best-practices/review-and-safe-push",
  "best-practices/atomic-commits",
  "best-practices/focused-commits-and-topic-branch-hygiene",
  "best-practices/branch-naming",
  "best-practices/pull-request-prep",
  "best-practices/pull-request-review-readiness",
  "best-practices/conflict-resolution-routine",
  "best-practices/release-hygiene",
  "best-practices/safe-cherry-picks",
  "best-practices/small-batch-review",
  "best-practices/safe-force-push-protocol",
  "best-practices/commit-message-conventions",
  "best-practices/release-checklist-discipline",
  "best-practices/code-review-handoff-quality",
  "workflows/fetch-vs-pull",
  "workflows/feature-branch-collaboration",
  "workflows/gitflow-workflow",
  "workflows/multi-person-sync-routine",
  "workflows/prepare-commits-before-pull-request",
  "workflows/parallel-work-with-worktree",
  "workflows/ai-agent-worktree-mode",
  "workflows/monorepo-sparse-checkout-workflow",
  "workflows/rerere-for-recurring-conflicts",
  "workflows/shared-branch-sync-boundaries",
  "workflows/sync-before-review",
  "workflows/pr-merge-strategy-and-platform-settings",
  "workflows/merge-queue-workflow",
  "workflows/hotfix-and-urgent-fixes",
  "workflows/hotfix-rollback-after-release",
  "workflows/open-source-fork-pr-contribution",
  "workflows/release-branch-workflow",
  "workflows/backport-with-cherry-pick",
  "workflows/post-release-multi-branch-backporting",
  "workflows/fork-upstream-sync",
  "workflows/squash-vs-rebase-merge",
  "workflows/long-lived-branch-maintenance",
  "workflows/long-lived-branch-conflict-governance",
  "workflows/submodule-update-flow",
  "workflows/trunk-based-development-workflow",
  "workflows/stacked-pull-requests-workflow",
  "workflows/bisect-regression-triage-workflow",
  "workflows/code-freeze-and-release-candidate-workflow",
  "workflows/revert-first-stabilization-workflow",
  "workflows/feature-flag-rollout-workflow",
  "workflows/release-train-workflow",
  "workflows/cross-repo-integration-workflow",
  "workflows/canary-release-workflow",
  "workflows/database-migration-safety-workflow",
  "workflows/api-versioning-change-workflow",
  "workflows/incident-retro-to-guardrail-workflow",
  "platforms/github-flow-basics",
  "platforms/pull-requests-and-reviews",
  "platforms/forks-and-open-source-contribution",
  "platforms/issues-projects-and-discussions",
  "platforms/github-actions-and-skills",
  "platforms/github-branch-protection-and-rulesets",
  "platforms/github-codeowners-and-review-ownership",
  "platforms/gitlab-flow-and-merge-requests",
  "platforms/gitlab-forks-and-contributions",
  "platforms/gitlab-issues-boards-and-milestones",
  "platforms/gitlab-groups-projects-and-permissions",
  "platforms/gitlab-ci-and-runners",
  "platforms/gitlab-protected-branches-and-approval-rules",
  "platforms/gitlab-merge-trains-and-merge-result-pipelines",
  "internals/object-database",
  "internals/plumbing-and-porcelain",
  "internals/index-and-working-tree",
  "internals/repository-layout-and-gitdir",
  "internals/refs-and-head",
  "internals/remote-tracking-refs",
  "internals/revision-selection-and-ranges",
  "internals/commit-graph",
  "internals/packfiles-and-storage",
  "internals/transfer-protocols-and-negotiation",
  "internals/environment-and-repository-variables",
  "internals/reachability-and-garbage-collection",
  "internals/merge-base-and-ancestry",
  "internals/tree-objects-and-snapshots",
  "internals/blob-objects-and-content-addressing",
  "internals/commit-message-and-parents",
  "internals/refspec-and-ref-updates",
  "internals/three-way-merge-mechanics",
  "internals/rename-detection-and-diff-algorithms",
  "internals/rebase-internals-and-sequencer",
  "internals/hooks-and-policy-enforcement",
  "recovery/reflog-recovery",
  "recovery/recover-after-reset",
  "recovery/recover-after-rebase",
  "recovery/recover-deleted-branch",
  "recovery/detached-head-rescue",
  "recovery/undo-after-pull",
  "recovery/assess-force-push-impact",
  "recovery/recover-lost-stash",
  "recovery/recover-after-wrong-cherry-pick",
  "recovery/recover-after-accidental-merge",
  "recovery/recover-after-git-clean",
  "recovery/recover-after-cherry-pick",
  "recovery/undo-merge-commit",
  "recovery/fix-broken-interactive-rebase",
  "recovery/recover-lost-commits",
  "recovery/recover-from-corrupted-repo",
  "recovery/fix-detached-head-accidentally-committed",
  "recovery/fix-wrong-author-or-commit-message",
  "best-practices/git-aliases",
  "best-practices/commit-message-advanced",
  "best-practices/security-with-git",
  "workflows/pre-release-checklist",
  "workflows/ci-optimization-with-git",
  "workflows/trunk-based-development",
  "concepts/three-layers",
  "concepts/git-history",
  "concepts/git-ignore",
  "concepts/git-attributes",
  "concepts/git-hooks",
  "concepts/git-subtree",
  "concepts/git-lfs",
  "concepts/git-shallow",
  "concepts/detached-head",
  "concepts/merge-strategies",
  "concepts/worktree",
  "concepts/stash",
  "concepts/git-lfs-deep",
  "concepts/git-hooks-deep",
  "concepts/git-rebase-deep",
  "concepts/git-merge-deep",
  "concepts/git-bisect-deep",
  "concepts/git-rerere-deep",
  "concepts/git-for-data",
  "commands/git-rerere",
  "commands/git-difftool",
  "commands/git-replace",
  "commands/git-prune",
  "commands/git-hash-object",
  "commands/git-interpret-trailers",
  "workflows/signing-commits-workflow",
  "workflows/pre-commit-hook-workflow",
  "workflows/large-file-handling-workflow",
  "workflows/rollback-deployment-workflow",
  "workflows/ai-assisted-git-workflows",
  "best-practices/tagging-and-versioning",
  "best-practices/bisect-friendly-commits",
  "best-practices/backup-before-rewrite",
  "devops/github-actions-basics",
  "devops/gitlab-ci-basics",
  "devops/jenkins-integration",
  "devops/ci-security-basics",
  "devops/vscode-git",
  "devops/jetbrains-git",
  "devops/github-desktop",
  "devops/terminal-git-ui",
  "security/ssh-key-management",
  "security/gpg-signing",
  "security/credential-helper",
  "security/signing-advanced",
  "performance/large-repo-optimization",
  "performance/partial-clone",
  "performance/shallow-clone-deep",
  "performance/gc-repack-strategies",
  "performance/git-maintenance",
  "performance/commit-graph-deep",
  "performance/bundle-uri",
  "performance/scalar-git",
  "migration/svn-to-git",
  "migration/hg-to-git",
  "migration/git-p4-perforce",
  "migration/platform-migration",
  "hosting/platform-comparison",
  "hosting/self-hosted-git",
  "hosting/github-deep-dive",
  "hosting/gitea-setup",
  "devops/circleci-git",
  "devops/ci-cd-testing-strategies",
  "devops/ci-cd-deployment-strategies",
  "devops/vim-neovim-git",
  "devops/intellij-git-deep",
  "devops/terminal-git-productivity",
  "security/secret-scanning",
  "security/secure-git-workflows",
  "security/git-security-audit",
  "migration/azure-devops-migration",
  "migration/git-filter-repo",
  "migration/migration-strategy-guide",
  "hosting/aws-codecommit",
  "hosting/gerrit-code-review",
  "hosting/chinese-hosting-platforms",
] as const;

export type DocPath = (typeof docPathRegistry)[number];
import { getDocModule } from "./content-modules";

export type SearchDoc = {
  href: string;
  path: DocPath;
  section: DocSection;
  tier: DocTier;
  slug: string;
  title: string;
  summary: string;
  suggestions: Array<{
    type: "prerequisite" | "risk";
    title: string;
    href?: string;
  }>;
};

export type DocCard = {
  href: string;
  path: DocPath;
  section: DocSection;
  tier: DocTier;
  slug: string;
  title: string;
  summary: string;
};

export type DocNeighbors = {
  prev?: DocCard;
  next?: DocCard;
};


export type ContentStats = {
  totalDocs: number;
  commandDocs: number;
  sectionCounts: Record<DocSection, number>;
};

const coreDocPaths = new Set<DocPath>([
  "learning-path/quick-start",
  "learning-path/setup-and-clone",
  "learning-path/stage-and-commit",
  "learning-path/view-history-and-changes",
  "learning-path/undo-local-basics",
  "learning-path/sync-with-remote",
  "learning-path/first-feature-branch",
  "learning-path/open-first-pull-request",
  "learning-path/handle-review-feedback",
  "learning-path/merge-and-close-task",
  "learning-path/first-safe-hotfix",
  "commands/git-init",
  "commands/git-clone",
  "commands/git-status",
  "commands/git-add",
  "commands/git-commit",
  "commands/git-fetch",
  "commands/git-pull",
  "commands/git-push",
  "commands/git-switch",
  "commands/git-branch",
  "commands/git-log",
  "commands/git-rebase",
  "commands/git-merge",
  "commands/git-cherry-pick",
  "commands/git-reset",
  "commands/git-stash",
  "commands/git-restore",
  "commands/git-revert",
  "commands/git-reflog",
  "best-practices/commit-hygiene",
  "best-practices/fetch-first-sync",
  "best-practices/shared-history-boundaries",
  "best-practices/review-and-safe-push",
  "best-practices/atomic-commits",
  "workflows/fetch-vs-pull",
  "workflows/feature-branch-collaboration",
  "workflows/gitflow-workflow",
  "workflows/multi-person-sync-routine",
  "workflows/sync-before-review",
  "workflows/release-branch-workflow",
  "workflows/hotfix-and-urgent-fixes",
  "internals/object-database",
  "internals/index-and-working-tree",
  "internals/refs-and-head",
  "internals/commit-graph",
  "internals/remote-tracking-refs",
  "recovery/reflog-recovery",
  "recovery/recover-after-reset",
  "recovery/recover-after-rebase",
  "recovery/detached-head-rescue",
  "recovery/undo-after-pull",
  "concepts/git-history",
]);

const recommendedDocPaths = new Set<DocPath>([
  "commands/git-diff",
  "commands/git-show",
  "commands/git-remote",
  "commands/git-tag",
  "commands/git-checkout",
  "commands/git-clean",
  "commands/git-bisect",
  "commands/git-blame",
  "commands/git-worktree",
  "commands/git-submodule",
  "best-practices/topic-branches",
  "best-practices/pull-request-prep",
  "best-practices/conflict-resolution-routine",
  "best-practices/branch-naming",
  "best-practices/safe-force-push-protocol",
  "best-practices/commit-message-conventions",
  "best-practices/release-checklist-discipline",
  "best-practices/code-review-handoff-quality",
  "workflows/prepare-commits-before-pull-request",
  "workflows/ai-agent-worktree-mode",
  "workflows/gitflow-workflow",
  "workflows/hotfix-rollback-after-release",
  "workflows/backport-with-cherry-pick",
  "workflows/shared-branch-sync-boundaries",
  "workflows/submodule-update-flow",
  "workflows/trunk-based-development-workflow",
  "workflows/stacked-pull-requests-workflow",
  "workflows/bisect-regression-triage-workflow",
  "workflows/code-freeze-and-release-candidate-workflow",
  "workflows/revert-first-stabilization-workflow",
  "workflows/feature-flag-rollout-workflow",
  "workflows/release-train-workflow",
  "workflows/cross-repo-integration-workflow",
  "workflows/canary-release-workflow",
  "workflows/database-migration-safety-workflow",
  "workflows/api-versioning-change-workflow",
  "workflows/incident-retro-to-guardrail-workflow",
  "platforms/github-flow-basics",
  "platforms/pull-requests-and-reviews",
  "platforms/github-branch-protection-and-rulesets",
  "platforms/github-codeowners-and-review-ownership",
  "platforms/gitlab-flow-and-merge-requests",
  "platforms/gitlab-ci-and-runners",
  "platforms/gitlab-protected-branches-and-approval-rules",
  "platforms/gitlab-merge-trains-and-merge-result-pipelines",
  "internals/plumbing-and-porcelain",
  "internals/repository-layout-and-gitdir",
  "internals/merge-base-and-ancestry",
  "internals/reachability-and-garbage-collection",
  "internals/packfiles-and-storage",
  "internals/three-way-merge-mechanics",
  "internals/rename-detection-and-diff-algorithms",
  "internals/rebase-internals-and-sequencer",
  "internals/hooks-and-policy-enforcement",
  "devops/jenkins-integration",
  "devops/ci-security-basics",
  "devops/github-desktop",
  "devops/terminal-git-ui",
  "security/credential-helper",
  "security/signing-advanced",
  "performance/shallow-clone-deep",
  "performance/gc-repack-strategies",
  "performance/git-maintenance",
  "performance/commit-graph-deep",
  "performance/bundle-uri",
  "performance/scalar-git",
  "migration/git-p4-perforce",
  "migration/platform-migration",
  "hosting/github-deep-dive",
  "hosting/gitea-setup",
  "devops/circleci-git",
  "devops/ci-cd-testing-strategies",
  "devops/ci-cd-deployment-strategies",
  "devops/vim-neovim-git",
  "devops/intellij-git-deep",
  "devops/terminal-git-productivity",
  "security/secret-scanning",
  "security/secure-git-workflows",
  "security/git-security-audit",
  "migration/azure-devops-migration",
  "migration/git-filter-repo",
  "migration/migration-strategy-guide",
  "hosting/aws-codecommit",
  "hosting/gerrit-code-review",
  "hosting/chinese-hosting-platforms",
  "concepts/git-lfs-deep",
  "concepts/git-hooks-deep",
  "concepts/git-rebase-deep",
  "concepts/git-merge-deep",
  "concepts/git-bisect-deep",
  "concepts/git-rerere-deep",
  "recovery/recover-deleted-branch",
  "recovery/assess-force-push-impact",
]);

const tierRank: Record<DocTier, number> = {
  core: 0,
  recommended: 1,
  extended: 2,
};

const sectionSearchSuggestionDefaults: Partial<
  Record<DocSection, { prerequisite?: DocPath; risk?: DocPath }>
> = {
  commands: {
    prerequisite: "internals/index-and-working-tree",
    risk: "recovery/reflog-recovery",
  },
  workflows: {
    prerequisite: "learning-path/sync-with-remote",
    risk: "best-practices/shared-history-boundaries",
  },
  platforms: {
    prerequisite: "learning-path/first-feature-branch",
    risk: "best-practices/shared-history-boundaries",
  },
  internals: {
    prerequisite: "concepts/git-history",
    risk: "recovery/reflog-recovery",
  },
  recovery: {
    prerequisite: "commands/git-reflog",
    risk: "best-practices/shared-history-boundaries",
  },
  devops: {
    prerequisite: "learning-path/sync-with-remote",
    risk: "best-practices/shared-history-boundaries",
  },
  security: {
    prerequisite: "commands/git-config",
    risk: "best-practices/shared-history-boundaries",
  },
  performance: {
    prerequisite: "internals/packfiles-and-storage",
    risk: "recovery/reflog-recovery",
  },
  migration: {
    prerequisite: "learning-path/quick-start",
    risk: "best-practices/shared-history-boundaries",
  },
  hosting: {
    prerequisite: "learning-path/sync-with-remote",
    risk: "best-practices/shared-history-boundaries",
  },
  concepts: {
    prerequisite: "learning-path/stage-and-commit",
    risk: "recovery/reflog-recovery",
  },
};

const searchSuggestionOverrides: Partial<
  Record<DocPath, { prerequisite?: DocPath; risk?: DocPath }>
> = {
  "commands/git-rebase": {
    prerequisite: "internals/commit-graph",
    risk: "recovery/recover-after-rebase",
  },
  "commands/git-reset": {
    prerequisite: "internals/index-and-working-tree",
    risk: "recovery/recover-after-reset",
  },
  "commands/git-reflog": {
    prerequisite: "internals/refs-and-head",
    risk: "recovery/reflog-recovery",
  },
  "commands/git-cherry-pick": {
    prerequisite: "internals/commit-graph",
    risk: "workflows/backport-with-cherry-pick",
  },
  "commands/git-merge": {
    prerequisite: "internals/commit-graph",
    risk: "workflows/pr-merge-strategy-and-platform-settings",
  },
  "commands/git-stash": {
    prerequisite: "internals/index-and-working-tree",
    risk: "recovery/detached-head-rescue",
  },
  "commands/git-pull": {
    prerequisite: "workflows/fetch-vs-pull",
    risk: "recovery/undo-after-pull",
  },
  "internals/refs-and-head": {
    prerequisite: "concepts/git-history",
    risk: "recovery/detached-head-rescue",
  },
  "internals/index-and-working-tree": {
    prerequisite: "commands/git-status",
    risk: "commands/git-reset",
  },
  "internals/commit-graph": {
    prerequisite: "concepts/git-history",
    risk: "commands/git-rebase",
  },
};

type IndexedDoc = {
  path: DocPath;
  metadata: DocMetadata;
};

const metadataBlockPattern = /export const metadata = \{([\s\S]*?)\n\};/;

function extractMetadataField(source: string, key: keyof Omit<DocMetadata, "sourceUrls">) {
  const match = source.match(new RegExp(`${key}:\\s*"([^"]+)"`));
  return match?.[1];
}

/** Extract a numeric metadata field (e.g. `step: 3`). Returns undefined if absent or non-numeric. */
function extractMetadataNumber(source: string, key: string): number | undefined {
  const match = source.match(new RegExp(`${key}:\\s*(\\d+)`));
  if (!match) return undefined;
  const n = Number(match[1]);
  return Number.isFinite(n) ? n : undefined;
}

function extractMetadataSourceUrls(source: string) {
  const sourceUrlsBlock = source.match(/sourceUrls:\s*\[([\s\S]*?)\]/)?.[1] ?? "";
  return Array.from(sourceUrlsBlock.matchAll(/"([^"]+)"/g), (match) => match[1]);
}

async function readDocMetadata(locale: Locale, docPath: DocPath): Promise<DocMetadata> {
  const absolutePath = getDocAbsolutePath(locale, docPath);
  const source = await readFile(absolutePath, "utf8");
  const metadataBlock = source.match(metadataBlockPattern)?.[1] ?? "";
  const title = extractMetadataField(metadataBlock, "title");
  const slug = extractMetadataField(metadataBlock, "slug");
  const summary = extractMetadataField(metadataBlock, "summary");
  const section = extractMetadataField(metadataBlock, "section") as DocSection | undefined;
  const author = extractMetadataField(metadataBlock, "author");
  const createdAt = extractMetadataField(metadataBlock, "createdAt");
  const step = extractMetadataNumber(metadataBlock, "step");

  if (!title || !slug || !summary || !section) {
    throw new Error(`Unable to parse metadata from ${absolutePath}`);
  }

  return {
    title,
    slug,
    locale,
    summary,
    section,
    sourceUrls: extractMetadataSourceUrls(metadataBlock),
    ...(author ? { author } : {}),
    ...(createdAt ? { createdAt } : {}),
    ...(step ? { step } : {}),
  };
}

function getDocAbsolutePath(locale: Locale, docPath: DocPath) {
  return path.join(process.cwd(), "content", locale, `${docPath}.mdx`);
}

/* EN-only offline docs (low-quality template skeletons, archived under content/_archive/en/). ZH counterparts remain online. */
export const enOfflineDocPaths: ReadonlySet<string> = new Set([
  "best-practices/atomic-commits",
  "best-practices/backup-before-rewrite",
  "best-practices/bisect-friendly-commits",
  "best-practices/branch-naming",
  "best-practices/code-review-handoff-quality",
  "best-practices/conflict-resolution-routine",
  "best-practices/fetch-first-sync",
  "best-practices/git-aliases",
  "best-practices/pull-request-prep",
  "best-practices/release-checklist-discipline",
  "best-practices/release-hygiene",
  "best-practices/review-and-safe-push",
  "best-practices/safe-cherry-picks",
  "best-practices/safe-force-push-protocol",
  "best-practices/security-with-git",
  "best-practices/shared-history-boundaries",
  "best-practices/small-batch-review",
  "best-practices/tagging-and-versioning",
  "best-practices/topic-branches",
  "commands/git-blame",
  "commands/git-mv",
  "commands/git-reflog",
  "commands/git-rm",
  "commands/git-show",
  "concepts/git-bisect-deep",
  "concepts/git-hooks-deep",
  "concepts/git-lfs-deep",
  "concepts/git-merge-deep",
  "concepts/git-rebase-deep",
  "concepts/git-rerere-deep",
  "devops/ci-cd-testing-strategies",
  "devops/circleci-git",
  "devops/github-desktop",
  "devops/intellij-git-deep",
  "devops/jenkins-integration",
  "devops/terminal-git-productivity",
  "devops/terminal-git-ui",
  "devops/vim-neovim-git",
  "hosting/aws-codecommit",
  "hosting/gerrit-code-review",
  "hosting/platform-comparison",
  "internals/hooks-and-policy-enforcement",
  "internals/rebase-internals-and-sequencer",
  "internals/rename-detection-and-diff-algorithms",
  "internals/three-way-merge-mechanics",
  "learning-path/first-safe-hotfix",
  "learning-path/handle-review-feedback",
  "learning-path/merge-and-close-task",
  "learning-path/open-first-pull-request",
  "learning-path/view-history-and-changes",
  "migration/azure-devops-migration",
  "migration/git-filter-repo",
  "migration/git-p4-perforce",
  "migration/hg-to-git",
  "migration/migration-strategy-guide",
  "migration/platform-migration",
  "performance/bundle-uri",
  "performance/commit-graph-deep",
  "performance/gc-repack-strategies",
  "performance/git-maintenance",
  "performance/large-repo-optimization",
  "performance/scalar-git",
  "performance/shallow-clone-deep",
  "platforms/github-branch-protection-and-rulesets",
  "platforms/github-codeowners-and-review-ownership",
  "platforms/gitlab-ci-and-runners",
  "platforms/gitlab-protected-branches-and-approval-rules",
  "recovery/detached-head-rescue",
  "recovery/recover-after-accidental-merge",
  "recovery/recover-after-git-clean",
  "recovery/recover-after-rebase",
  "recovery/recover-after-wrong-cherry-pick",
  "recovery/recover-deleted-branch",
  "recovery/recover-lost-stash",
  "recovery/undo-after-pull",
  "security/credential-helper",
  "security/secret-scanning",
  "security/secure-git-workflows",
  "security/signing-advanced",
  "workflows/api-versioning-change-workflow",
  "workflows/backport-with-cherry-pick",
  "workflows/bisect-regression-triage-workflow",
  "workflows/canary-release-workflow",
  "workflows/code-freeze-and-release-candidate-workflow",
  "workflows/cross-repo-integration-workflow",
  "workflows/database-migration-safety-workflow",
  "workflows/feature-branch-collaboration",
  "workflows/feature-flag-rollout-workflow",
  "workflows/incident-retro-to-guardrail-workflow",
  "workflows/large-file-handling-workflow",
  "workflows/long-lived-branch-conflict-governance",
  "workflows/monorepo-sparse-checkout-workflow",
  "workflows/pre-commit-hook-workflow",
  "workflows/pre-release-checklist",
  "workflows/release-branch-workflow",
  "workflows/release-train-workflow",
  "workflows/rerere-for-recurring-conflicts",
  "workflows/revert-first-stabilization-workflow",
  "workflows/rollback-deployment-workflow",
  "workflows/signing-commits-workflow",
  "workflows/squash-vs-rebase-merge",
  "workflows/stacked-pull-requests-workflow",
]);

const getIndexedDocs = cache(async (locale: Locale): Promise<IndexedDoc[]> => {
  const registry =
    locale === "en"
      ? docPathRegistry.filter((docPath) => !enOfflineDocPaths.has(docPath))
      : docPathRegistry;
  const docs = await Promise.all(
    registry.map(async (docPath) => ({
      path: docPath,
      metadata: await readDocMetadata(locale, docPath),
    })),
  );

  return docs.sort((a, b) => a.metadata.title.localeCompare(b.metadata.title));
});

export function getDocPaths(locale: Locale) {
  if (locale === "en") {
    return ([...docPathRegistry] as DocPath[]).filter(
      (docPath) => !enOfflineDocPaths.has(docPath),
    );
  }
  return [...docPathRegistry] as DocPath[];
}

export async function getDocByPath(locale: Locale, docPath: DocPath) {
  // EN offline docs (archived MDX) have no module — the loader returns
  // undefined and callers treat that as "doc not found".
  const load = getDocModule(locale, docPath);
  if (!load) {
    throw new Error(`Doc module not found: ${locale}/${docPath}`);
  }
  const mdxModule = (await load()) as {
    default: ComponentType;
    // MDX modules declare `metadata` with a literal shape based on what each
    // file happens to set. We widen to DocMetadata here so callers can read
    // optional fields (author, createdAt, quotes/stats/citations) without
    // each file needing them — TypeScript would otherwise narrow per-file
    // and reject access.
    metadata: DocMetadata;
  };
  return {
    path: docPath,
    Component: mdxModule.default,
    metadata: mdxModule.metadata,
  };
}

export async function getAllDocs(locale: Locale) {
  const indexedDocs = await getIndexedDocs(locale);
  const docs = await Promise.all(indexedDocs.map(async ({ path: docPath }) => getDocByPath(locale, docPath)));

  return docs;
}

export async function getAllDocMetadata(locale: Locale) {
  return getIndexedDocs(locale);
}

function toDocCard(locale: Locale, doc: Awaited<ReturnType<typeof getDocByPath>>): DocCard {
  return {
    href: getDocHref(locale, doc.path),
    path: doc.path,
    section: doc.metadata.section,
    tier: getDocTier(doc.path),
    slug: doc.metadata.slug,
    title: doc.metadata.title,
    summary: doc.metadata.summary,
  };
}

function toIndexedDocCard(locale: Locale, doc: IndexedDoc): DocCard {
  return {
    href: getDocHref(locale, doc.path),
    path: doc.path,
    section: doc.metadata.section,
    tier: getDocTier(doc.path),
    slug: doc.metadata.slug,
    title: doc.metadata.title,
    summary: doc.metadata.summary,
  };
}

function getOrderedPathSeries(section: DocSection): DocPath[] {
  switch (section) {
    case "commands":
      return commandSlugs.map((slug) => `commands/${slug}` as DocPath);
    case "best-practices":
      return bestPracticeSlugs.map((slug) => `best-practices/${slug}` as DocPath);
    case "workflows":
      return workflowSlugs.map((slug) => `workflows/${slug}` as DocPath);
    case "platforms":
      return platformsSlugs.map((slug) => `platforms/${slug}` as DocPath);
    case "internals":
      return [
        "concepts/git-history",
        ...internalsSlugs.map((slug) => `internals/${slug}` as DocPath),
      ];
    case "learning-path":
      return learningPathSlugs.map((slug) => `learning-path/${slug}` as DocPath);
    case "recovery":
      return recoverySlugs.map((slug) => `recovery/${slug}` as DocPath);
    case "concepts":
      return conceptSlugs.map((slug) => `concepts/${slug}` as DocPath);
    case "devops":
      return devopsSlugs.map((slug) => `devops/${slug}` as DocPath);
    case "security":
      return securitySlugs.map((slug) => `security/${slug}` as DocPath);
    case "performance":
      return performanceSlugs.map((slug) => `performance/${slug}` as DocPath);
    case "migration":
      return migrationSlugs.map((slug) => `migration/${slug}` as DocPath);
    case "hosting":
      return hostingSlugs.map((slug) => `hosting/${slug}` as DocPath);
    default:
      return [];
  }
}

function sortBySeriesOrder<T extends { path: DocPath }>(docs: T[]) {
  const order = new Map(
    [
      ...getOrderedPathSeries("learning-path"),
      ...getOrderedPathSeries("commands"),
      ...getOrderedPathSeries("best-practices"),
      ...getOrderedPathSeries("workflows"),
      ...getOrderedPathSeries("platforms"),
      ...getOrderedPathSeries("internals"),
      ...getOrderedPathSeries("recovery"),
      ...getOrderedPathSeries("concepts"),
      ...getOrderedPathSeries("devops"),
      ...getOrderedPathSeries("security"),
      ...getOrderedPathSeries("performance"),
      ...getOrderedPathSeries("migration"),
      ...getOrderedPathSeries("hosting"),
    ].map((path, index) => [path, index]),
  );

  return [...docs].sort(
    (a, b) => (order.get(a.path) ?? Number.MAX_SAFE_INTEGER) - (order.get(b.path) ?? Number.MAX_SAFE_INTEGER),
  );
}

function sortByTierAndSeriesOrder<T extends { path: DocPath }>(docs: T[]) {
  const ordered = sortBySeriesOrder(docs);
  const order = new Map(ordered.map((doc, index) => [doc.path, index]));

  return [...ordered].sort(
    (a, b) =>
      tierRank[getDocTier(a.path)] - tierRank[getDocTier(b.path)] ||
      (order.get(a.path) ?? Number.MAX_SAFE_INTEGER) - (order.get(b.path) ?? Number.MAX_SAFE_INTEGER),
  );
}

export async function getCommandDocs(locale: Locale) {
  const docs = await getIndexedDocs(locale);
  return sortBySeriesOrder(docs.filter((doc) => doc.metadata.section === "commands"));
}

export async function getBestPracticeDocs(locale: Locale) {
  const docs = await getIndexedDocs(locale);
  return sortBySeriesOrder(docs.filter((doc) => doc.path.startsWith("best-practices/")));
}

export async function getWorkflowDocs(locale: Locale) {
  const docs = await getIndexedDocs(locale);
  return sortBySeriesOrder(docs.filter((doc) => doc.path.startsWith("workflows/")));
}

export async function getLearningPathDocs(locale: Locale) {
  const docs = await getIndexedDocs(locale);
  return sortBySeriesOrder(docs.filter((doc) => doc.path.startsWith("learning-path/")));
}

export async function getPlatformsDocs(locale: Locale) {
  const docs = await getIndexedDocs(locale);
  return sortBySeriesOrder(docs.filter((doc) => doc.path.startsWith("platforms/")));
}

export async function getInternalsDocs(locale: Locale) {
  const docs = await getIndexedDocs(locale);
  return sortBySeriesOrder(docs.filter((doc) => doc.metadata.section === "internals"));
}

export async function getRecoveryDocs(locale: Locale) {
  const docs = await getIndexedDocs(locale);
  return sortBySeriesOrder(docs.filter((doc) => doc.path.startsWith("recovery/")));
}

export async function getDevopsDocs(locale: Locale) {
  const docs = await getIndexedDocs(locale);
  return sortBySeriesOrder(docs.filter((doc) => doc.path.startsWith("devops/")));
}

export async function getSecurityDocs(locale: Locale) {
  const docs = await getIndexedDocs(locale);
  return sortBySeriesOrder(docs.filter((doc) => doc.path.startsWith("security/")));
}

export async function getPerformanceDocs(locale: Locale) {
  const docs = await getIndexedDocs(locale);
  return sortBySeriesOrder(docs.filter((doc) => doc.path.startsWith("performance/")));
}

export async function getMigrationDocs(locale: Locale) {
  const docs = await getIndexedDocs(locale);
  return sortBySeriesOrder(docs.filter((doc) => doc.path.startsWith("migration/")));
}

export async function getHostingDocs(locale: Locale) {
  const docs = await getIndexedDocs(locale);
  return sortBySeriesOrder(docs.filter((doc) => doc.path.startsWith("hosting/")));
}

export async function getConceptsDocs(locale: Locale) {
  const docs = await getIndexedDocs(locale);
  return sortBySeriesOrder(docs.filter((doc) => doc.path.startsWith("concepts/")));
}

export function getDocHref(locale: Locale, docPath: DocPath) {
  if (docPath.startsWith("commands/")) {
    return `/${locale}/commands/${docPath.replace("commands/", "")}`;
  }

  if (docPath === "concepts/git-history") {
    return `/${locale}/history`;
  }

  if (docPath.startsWith("concepts/")) {
    return `/${locale}/concepts/${docPath.replace("concepts/", "")}`;
  }

  if (docPath.startsWith("best-practices/")) {
    return `/${locale}/best-practices/${docPath.replace("best-practices/", "")}`;
  }

  if (docPath.startsWith("workflows/")) {
    return `/${locale}/workflows/${docPath.replace("workflows/", "")}`;
  }

  if (docPath.startsWith("platforms/")) {
    return `/${locale}/platforms/${docPath.replace("platforms/", "")}`;
  }

  if (docPath.startsWith("internals/")) {
    return `/${locale}/internals/${docPath.replace("internals/", "")}`;
  }

  if (docPath.startsWith("recovery/")) {
    return `/${locale}/recovery/${docPath.replace("recovery/", "")}`;
  }

  if (docPath.startsWith("devops/")) {
    return `/${locale}/devops/${docPath.replace("devops/", "")}`;
  }

  if (docPath.startsWith("security/")) {
    return `/${locale}/security/${docPath.replace("security/", "")}`;
  }

  if (docPath.startsWith("performance/")) {
    return `/${locale}/performance/${docPath.replace("performance/", "")}`;
  }

  if (docPath.startsWith("migration/")) {
    return `/${locale}/migration/${docPath.replace("migration/", "")}`;
  }

  if (docPath.startsWith("hosting/")) {
    return `/${locale}/hosting/${docPath.replace("hosting/", "")}`;
  }

  if (docPath === "learning-path/quick-start") {
    return `/${locale}/learning-path`;
  }

  return `/${locale}/docs/${docPath}`;
}

export async function getSearchDocs(locale: Locale): Promise<SearchDoc[]> {
  const docs = await getIndexedDocs(locale);
  const metadataByPath = new Map(docs.map((doc) => [doc.path, doc.metadata]));

  return docs.map((doc) => ({
    href: getDocHref(locale, doc.path),
    path: doc.path,
    section: doc.metadata.section,
    tier: getDocTier(doc.path),
    slug: doc.metadata.slug,
    title: doc.metadata.title,
    summary: doc.metadata.summary,
    suggestions: buildSearchSuggestions(locale, doc.path, metadataByPath),
  }));
}

export async function getDocLastModified(locale: Locale, docPath: DocPath) {
  const fileStat = await stat(getDocAbsolutePath(locale, docPath));
  return fileStat.mtime;
}

export async function getLatestDocLastModified(
  locale: Locale,
  section?: DocSection,
) {
  let paths = section
    ? docPathRegistry.filter((docPath) => docPath.startsWith(`${section}/`))
    : docPathRegistry;

  if (locale === "en") {
    paths = paths.filter((docPath) => !enOfflineDocPaths.has(docPath));
  }

  const modifiedTimes = await Promise.all(
    paths.map(async (docPath) => getDocLastModified(locale, docPath)),
  );

  return modifiedTimes.reduce(
    (latest, current) => (current > latest ? current : latest),
    new Date(0),
  );
}

/** Like getDocByPath but returns null instead of throwing for archived/offline docs. */
export async function getDocByPathIfAvailable(locale: Locale, docPath: DocPath) {
  try {
    return await getDocByPath(locale, docPath);
  } catch {
    return null;
  }
}

export async function getDocNeighbors(locale: Locale, docPath: DocPath): Promise<DocNeighbors> {  const doc = await getDocByPath(locale, docPath);
  const series = getOrderedPathSeries(doc.metadata.section);
  const index = series.indexOf(docPath);

  if (index === -1) {
    return {};
  }

  const prevPath = series[index - 1];
  const nextPath = series[index + 1];

  const [prevDoc, nextDoc] = await Promise.all([
    prevPath ? getDocByPathIfAvailable(locale, prevPath) : Promise.resolve(null),
    nextPath ? getDocByPathIfAvailable(locale, nextPath) : Promise.resolve(null),
  ]);

  return {
    prev: prevDoc ? toDocCard(locale, prevDoc) : undefined,
    next: nextDoc ? toDocCard(locale, nextDoc) : undefined,
  };
}

const representativeSectionPaths = {
  "learning-path": [
    "learning-path/setup-and-clone",
    "learning-path/first-feature-branch",
    "recovery/reflog-recovery",
  ],
  commands: [
    "commands/git-status",
    "commands/git-rebase",
    "commands/git-reflog",
  ],
  "best-practices": [
    "best-practices/commit-hygiene",
    "best-practices/shared-history-boundaries",
    "best-practices/review-and-safe-push",
  ],
  workflows: [
    "workflows/fetch-vs-pull",
    "workflows/sync-before-review",
    "workflows/hotfix-and-urgent-fixes",
  ],
  platforms: [
    "platforms/github-flow-basics",
    "platforms/pull-requests-and-reviews",
    "platforms/github-actions-and-skills",
    "platforms/gitlab-flow-and-merge-requests",
    "platforms/gitlab-ci-and-runners",
  ],
  internals: [
    "internals/object-database",
    "internals/refs-and-head",
    "internals/reachability-and-garbage-collection",
  ],
  recovery: [
    "recovery/reflog-recovery",
    "recovery/recover-after-reset",
    "recovery/undo-after-pull",
  ],
  devops: [
    "devops/github-actions-basics",
    "devops/gitlab-ci-basics",
    "devops/vscode-git",
    "devops/jetbrains-git",
  ],
  concepts: [
    "concepts/three-layers",
    "concepts/git-history",
    "concepts/detached-head",
  ],
  security: [
    "security/ssh-key-management",
    "security/gpg-signing",
  ],
  performance: [
    "performance/large-repo-optimization",
  ],
  migration: [
    "migration/svn-to-git",
    "migration/hg-to-git",
  ],
  hosting: [
    "hosting/platform-comparison",
    "hosting/self-hosted-git",
  ],
} as const satisfies Partial<Record<DocSection, readonly DocPath[]>>;

export async function getFeaturedSectionDocs(
  locale: Locale,
  section: Extract<DocSection, "learning-path" | "commands" | "best-practices" | "workflows" | "platforms" | "internals" | "recovery" | "devops" | "security" | "performance" | "migration" | "hosting" | "concepts">,
  limit = 3,
): Promise<DocCard[]> {
   const docs =
    section === "learning-path"
      ? await getLearningPathDocs(locale)
      : section === "commands"
      ? await getCommandDocs(locale)
      : section === "best-practices"
        ? await getBestPracticeDocs(locale)
        : section === "workflows"
          ? await getWorkflowDocs(locale)
          : section === "platforms"
            ? await getPlatformsDocs(locale)
            : section === "internals"
              ? await getInternalsDocs(locale)
              : section === "recovery"
                ? await getRecoveryDocs(locale)
                : section === "devops"
                  ? await getDevopsDocs(locale)
                  : section === "security"
                    ? await getSecurityDocs(locale)
                    : section === "performance"
                      ? await getPerformanceDocs(locale)
                      : section === "migration"
                  ? await getMigrationDocs(locale)
                  : section === "hosting"
                    ? await getHostingDocs(locale)
                    : await getConceptsDocs(locale);

  return sortByTierAndSeriesOrder(docs).slice(0, limit).map((doc) => toIndexedDocCard(locale, doc));
}

export async function getRepresentativeSectionDocs(
  locale: Locale,
  section: Extract<DocSection, "learning-path" | "commands" | "best-practices" | "workflows" | "platforms" | "internals" | "recovery" | "devops" | "security" | "performance" | "migration" | "hosting" | "concepts">,
  limit = 3,
): Promise<DocCard[]> {
  const allPaths = representativeSectionPaths[section] ?? [];
  const paths =
    locale === "en"
      ? allPaths.filter((docPath) => !enOfflineDocPaths.has(docPath))
      : allPaths;
  const docs = await Promise.all(paths.slice(0, limit).map((docPath) => getDocByPath(locale, docPath)));
  return docs.map((doc) => toDocCard(locale, doc));
}

export async function getLatestHomeDocs(locale: Locale, limit = 4): Promise<DocCard[]> {
  // Skip EN offline docs so the home page never stats archived files.
  const allCandidatePaths: DocPath[] = [
    "workflows/gitflow-workflow",
    "workflows/ai-agent-worktree-mode",
    "workflows/stacked-pull-requests-workflow",
    "workflows/bisect-regression-triage-workflow",
    "workflows/merge-queue-workflow",
    "workflows/trunk-based-development-workflow",
    "workflows/revert-first-stabilization-workflow",
    "recovery/undo-after-pull",
    "recovery/recover-after-rebase",
    "recovery/recover-deleted-branch",
    "recovery/detached-head-rescue",
    "commands/git-worktree",
    "commands/git-sparse-checkout",
    "commands/git-range-diff",
    "commands/git-bisect",
    "commands/git-switch",
    "devops/jenkins-integration",
    "devops/ci-security-basics",
    "devops/github-desktop",
    "devops/terminal-git-ui",
    "security/credential-helper",
    "security/signing-advanced",
    "performance/shallow-clone-deep",
    "performance/gc-repack-strategies",
    "migration/git-p4-perforce",
    "migration/platform-migration",
    "hosting/github-deep-dive",
    "hosting/gitea-setup",
    "learning-path/view-history-and-changes",
    "learning-path/undo-local-basics",
    "concepts/git-lfs-deep",
    "concepts/git-hooks-deep",
    "concepts/git-rebase-deep",
    "concepts/git-merge-deep",
    "concepts/git-bisect-deep",
    "concepts/git-rerere-deep",
    "performance/git-maintenance",
    "performance/commit-graph-deep",
    "performance/bundle-uri",
    "performance/scalar-git",
  ];

  const candidatePaths =
    locale === "en"
      ? allCandidatePaths.filter((docPath) => !enOfflineDocPaths.has(docPath))
      : allCandidatePaths;

  const modifiedTimes = await Promise.all(
    candidatePaths.map(async (docPath) => ({
      path: docPath,
      mtime: await getDocLastModified(locale, docPath),
    })),
  );

  const latestPaths = modifiedTimes
    .sort((a, b) => b.mtime.getTime() - a.mtime.getTime())
    .slice(0, limit)
    .map((entry) => entry.path);

  const docs = await Promise.all(
    latestPaths.map((docPath) => getDocByPath(locale, docPath)),
  );

  return docs.map((doc) => toDocCard(locale, doc));
}

export async function getContentStats(locale: Locale): Promise<ContentStats> {
  const docs = await getIndexedDocs(locale);
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
      platforms: 0,
      internals: 0,
      recovery: 0,
      concepts: 0,
      devops: 0,
      security: 0,
      performance: 0,
      migration: 0,
      hosting: 0,
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

export async function getRecoveryDoc(locale: Locale, slug: RecoverySlug) {
  const docPath = `recovery/${slug}` as DocPath;
  return getDocByPath(locale, docPath);
}

export function getDocPathFromSlugParts(slugParts: string[]) {
  return slugParts.join("/") as DocPath;
}

export function getDocTier(docPath: DocPath): DocTier {
  if (coreDocPaths.has(docPath)) {
    return "core";
  }

  if (recommendedDocPaths.has(docPath)) {
    return "recommended";
  }

  return "extended";
}

function buildSearchSuggestions(
  locale: Locale,
  docPath: DocPath,
  metadataByPath: Map<DocPath, DocMetadata>,
) {
  const section = docPath.split("/")[0] as DocSection;
  const override = searchSuggestionOverrides[docPath];
  const defaults = sectionSearchSuggestionDefaults[section];
  const prerequisitePath = override?.prerequisite ?? defaults?.prerequisite;
  const riskPath = override?.risk ?? defaults?.risk;

  const suggestions: SearchDoc["suggestions"] = [];

  if (prerequisitePath) {
    const metadata = metadataByPath.get(prerequisitePath);
    if (metadata) {
      suggestions.push({
        type: "prerequisite",
        title: metadata.title,
        href: getDocHref(locale, prerequisitePath),
      });
    }
  }

  if (riskPath) {
    const metadata = metadataByPath.get(riskPath);
    if (metadata) {
      suggestions.push({
        type: "risk",
        title: metadata.title,
        href: getDocHref(locale, riskPath),
      });
    }
  }

  return suggestions.slice(0, 2);
}
