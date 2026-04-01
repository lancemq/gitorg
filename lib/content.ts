import { readFile } from "node:fs/promises";
import path from "node:path";
import type { ComponentType } from "react";
import { cache } from "react";

import {
  bestPracticeSlugs,
  commandSlugs,
  internalsSlugs,
  learningPathSlugs,
  workflowSlugs,
  type CommandSlug,
  type InternalsSlug,
  type Locale,
} from "@/lib/i18n";

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
export const docPathRegistry = [
  "learning-path/quick-start",
  "learning-path/setup-and-clone",
  "learning-path/stage-and-commit",
  "learning-path/sync-with-remote",
  "learning-path/first-feature-branch",
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
  "best-practices/fetch-first-sync",
  "best-practices/shared-history-boundaries",
  "best-practices/review-and-safe-push",
  "best-practices/atomic-commits",
  "best-practices/branch-naming",
  "best-practices/pull-request-prep",
  "best-practices/conflict-resolution-routine",
  "best-practices/release-hygiene",
  "best-practices/safe-cherry-picks",
  "best-practices/small-batch-review",
  "workflows/fetch-vs-pull",
  "workflows/feature-branch-collaboration",
  "workflows/parallel-work-with-worktree",
  "workflows/sync-before-review",
  "workflows/hotfix-and-urgent-fixes",
  "workflows/release-branch-workflow",
  "workflows/backport-with-cherry-pick",
  "workflows/fork-upstream-sync",
  "workflows/squash-vs-rebase-merge",
  "workflows/long-lived-branch-maintenance",
  "workflows/submodule-update-flow",
  "internals/object-database",
  "internals/index-and-working-tree",
  "internals/refs-and-head",
  "internals/remote-tracking-refs",
  "internals/commit-graph",
  "internals/packfiles-and-storage",
  "internals/reachability-and-garbage-collection",
  "internals/merge-base-and-ancestry",
  "internals/tree-objects-and-snapshots",
  "internals/blob-objects-and-content-addressing",
  "internals/commit-message-and-parents",
  "internals/refspec-and-ref-updates",
  "recovery/reflog-recovery",
  "concepts/git-history",
] as const;

export type DocPath = (typeof docPathRegistry)[number];
const contentModules = {
  zh: {
    "learning-path/quick-start": () => import("@/content/zh/learning-path/quick-start.mdx"),
    "learning-path/setup-and-clone": () => import("@/content/zh/learning-path/setup-and-clone.mdx"),
    "learning-path/stage-and-commit": () => import("@/content/zh/learning-path/stage-and-commit.mdx"),
    "learning-path/sync-with-remote": () => import("@/content/zh/learning-path/sync-with-remote.mdx"),
    "learning-path/first-feature-branch": () => import("@/content/zh/learning-path/first-feature-branch.mdx"),
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
    "commands/git-fetch": () => import("@/content/zh/commands/git-fetch.mdx"),
    "commands/git-pull": () => import("@/content/zh/commands/git-pull.mdx"),
    "commands/git-push": () => import("@/content/zh/commands/git-push.mdx"),
    "commands/git-switch": () => import("@/content/zh/commands/git-switch.mdx"),
    "commands/git-branch": () => import("@/content/zh/commands/git-branch.mdx"),
    "commands/git-tag": () => import("@/content/zh/commands/git-tag.mdx"),
    "commands/git-remote": () => import("@/content/zh/commands/git-remote.mdx"),
    "commands/git-rebase": () => import("@/content/zh/commands/git-rebase.mdx"),
    "commands/git-merge": () => import("@/content/zh/commands/git-merge.mdx"),
    "commands/git-cherry-pick": () => import("@/content/zh/commands/git-cherry-pick.mdx"),
    "commands/git-reset": () => import("@/content/zh/commands/git-reset.mdx"),
    "commands/git-stash": () => import("@/content/zh/commands/git-stash.mdx"),
    "commands/git-restore": () => import("@/content/zh/commands/git-restore.mdx"),
    "commands/git-revert": () => import("@/content/zh/commands/git-revert.mdx"),
    "commands/git-reflog": () => import("@/content/zh/commands/git-reflog.mdx"),
    "commands/git-bisect": () => import("@/content/zh/commands/git-bisect.mdx"),
    "commands/git-blame": () => import("@/content/zh/commands/git-blame.mdx"),
    "commands/git-checkout": () => import("@/content/zh/commands/git-checkout.mdx"),
    "commands/git-clean": () => import("@/content/zh/commands/git-clean.mdx"),
    "commands/git-config": () => import("@/content/zh/commands/git-config.mdx"),
    "commands/git-help": () => import("@/content/zh/commands/git-help.mdx"),
    "commands/git-describe": () => import("@/content/zh/commands/git-describe.mdx"),
    "commands/git-grep": () => import("@/content/zh/commands/git-grep.mdx"),
    "commands/git-shortlog": () => import("@/content/zh/commands/git-shortlog.mdx"),
    "commands/git-show-ref": () => import("@/content/zh/commands/git-show-ref.mdx"),
    "commands/git-rev-parse": () => import("@/content/zh/commands/git-rev-parse.mdx"),
    "commands/git-am": () => import("@/content/zh/commands/git-am.mdx"),
    "commands/git-apply": () => import("@/content/zh/commands/git-apply.mdx"),
    "commands/git-format-patch": () => import("@/content/zh/commands/git-format-patch.mdx"),
    "commands/git-send-email": () => import("@/content/zh/commands/git-send-email.mdx"),
    "commands/git-request-pull": () => import("@/content/zh/commands/git-request-pull.mdx"),
    "commands/git-archive": () => import("@/content/zh/commands/git-archive.mdx"),
    "commands/git-bundle": () => import("@/content/zh/commands/git-bundle.mdx"),
    "commands/git-worktree": () => import("@/content/zh/commands/git-worktree.mdx"),
    "commands/git-submodule": () => import("@/content/zh/commands/git-submodule.mdx"),
    "commands/git-sparse-checkout": () => import("@/content/zh/commands/git-sparse-checkout.mdx"),
    "commands/git-cat-file": () => import("@/content/zh/commands/git-cat-file.mdx"),
    "commands/git-ls-files": () => import("@/content/zh/commands/git-ls-files.mdx"),
    "commands/git-ls-tree": () => import("@/content/zh/commands/git-ls-tree.mdx"),
    "commands/git-read-tree": () => import("@/content/zh/commands/git-read-tree.mdx"),
    "commands/git-update-index": () => import("@/content/zh/commands/git-update-index.mdx"),
    "commands/git-update-ref": () => import("@/content/zh/commands/git-update-ref.mdx"),
    "commands/git-symbolic-ref": () => import("@/content/zh/commands/git-symbolic-ref.mdx"),
    "commands/git-rev-list": () => import("@/content/zh/commands/git-rev-list.mdx"),
    "commands/git-merge-base": () => import("@/content/zh/commands/git-merge-base.mdx"),
    "commands/git-notes": () => import("@/content/zh/commands/git-notes.mdx"),
    "commands/git-range-diff": () => import("@/content/zh/commands/git-range-diff.mdx"),
    "commands/git-cherry": () => import("@/content/zh/commands/git-cherry.mdx"),
    "commands/git-mergetool": () => import("@/content/zh/commands/git-mergetool.mdx"),
    "commands/git-fsck": () => import("@/content/zh/commands/git-fsck.mdx"),
    "commands/git-gc": () => import("@/content/zh/commands/git-gc.mdx"),
    "commands/git-count-objects": () => import("@/content/zh/commands/git-count-objects.mdx"),
    "commands/git-verify-pack": () => import("@/content/zh/commands/git-verify-pack.mdx"),
    "commands/git-verify-tag": () => import("@/content/zh/commands/git-verify-tag.mdx"),
    "best-practices/commit-hygiene": () => import("@/content/zh/best-practices/commit-hygiene.mdx"),
    "best-practices/topic-branches": () => import("@/content/zh/best-practices/topic-branches.mdx"),
    "best-practices/fetch-first-sync": () => import("@/content/zh/best-practices/fetch-first-sync.mdx"),
    "best-practices/shared-history-boundaries": () => import("@/content/zh/best-practices/shared-history-boundaries.mdx"),
    "best-practices/review-and-safe-push": () => import("@/content/zh/best-practices/review-and-safe-push.mdx"),
    "best-practices/atomic-commits": () => import("@/content/zh/best-practices/atomic-commits.mdx"),
    "best-practices/branch-naming": () => import("@/content/zh/best-practices/branch-naming.mdx"),
    "best-practices/pull-request-prep": () => import("@/content/zh/best-practices/pull-request-prep.mdx"),
    "best-practices/conflict-resolution-routine": () => import("@/content/zh/best-practices/conflict-resolution-routine.mdx"),
    "best-practices/release-hygiene": () => import("@/content/zh/best-practices/release-hygiene.mdx"),
    "best-practices/safe-cherry-picks": () => import("@/content/zh/best-practices/safe-cherry-picks.mdx"),
    "best-practices/small-batch-review": () => import("@/content/zh/best-practices/small-batch-review.mdx"),
    "workflows/fetch-vs-pull": () => import("@/content/zh/workflows/fetch-vs-pull.mdx"),
    "workflows/feature-branch-collaboration": () => import("@/content/zh/workflows/feature-branch-collaboration.mdx"),
    "workflows/parallel-work-with-worktree": () => import("@/content/zh/workflows/parallel-work-with-worktree.mdx"),
    "workflows/sync-before-review": () => import("@/content/zh/workflows/sync-before-review.mdx"),
    "workflows/hotfix-and-urgent-fixes": () => import("@/content/zh/workflows/hotfix-and-urgent-fixes.mdx"),
    "workflows/release-branch-workflow": () => import("@/content/zh/workflows/release-branch-workflow.mdx"),
    "workflows/backport-with-cherry-pick": () => import("@/content/zh/workflows/backport-with-cherry-pick.mdx"),
    "workflows/fork-upstream-sync": () => import("@/content/zh/workflows/fork-upstream-sync.mdx"),
    "workflows/squash-vs-rebase-merge": () => import("@/content/zh/workflows/squash-vs-rebase-merge.mdx"),
    "workflows/long-lived-branch-maintenance": () => import("@/content/zh/workflows/long-lived-branch-maintenance.mdx"),
    "workflows/submodule-update-flow": () => import("@/content/zh/workflows/submodule-update-flow.mdx"),
    "internals/object-database": () => import("@/content/zh/internals/object-database.mdx"),
    "internals/index-and-working-tree": () => import("@/content/zh/internals/index-and-working-tree.mdx"),
    "internals/refs-and-head": () => import("@/content/zh/internals/refs-and-head.mdx"),
    "internals/remote-tracking-refs": () => import("@/content/zh/internals/remote-tracking-refs.mdx"),
    "internals/commit-graph": () => import("@/content/zh/internals/commit-graph.mdx"),
    "internals/packfiles-and-storage": () => import("@/content/zh/internals/packfiles-and-storage.mdx"),
    "internals/reachability-and-garbage-collection": () => import("@/content/zh/internals/reachability-and-garbage-collection.mdx"),
    "internals/merge-base-and-ancestry": () => import("@/content/zh/internals/merge-base-and-ancestry.mdx"),
    "internals/tree-objects-and-snapshots": () => import("@/content/zh/internals/tree-objects-and-snapshots.mdx"),
    "internals/blob-objects-and-content-addressing": () => import("@/content/zh/internals/blob-objects-and-content-addressing.mdx"),
    "internals/commit-message-and-parents": () => import("@/content/zh/internals/commit-message-and-parents.mdx"),
    "internals/refspec-and-ref-updates": () => import("@/content/zh/internals/refspec-and-ref-updates.mdx"),
    "recovery/reflog-recovery": () => import("@/content/zh/recovery/reflog-recovery.mdx"),
    "concepts/git-history": () => import("@/content/zh/concepts/git-history.mdx"),
  },
  en: {
    "learning-path/quick-start": () => import("@/content/en/learning-path/quick-start.mdx"),
    "learning-path/setup-and-clone": () => import("@/content/en/learning-path/setup-and-clone.mdx"),
    "learning-path/stage-and-commit": () => import("@/content/en/learning-path/stage-and-commit.mdx"),
    "learning-path/sync-with-remote": () => import("@/content/en/learning-path/sync-with-remote.mdx"),
    "learning-path/first-feature-branch": () => import("@/content/en/learning-path/first-feature-branch.mdx"),
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
    "commands/git-fetch": () => import("@/content/en/commands/git-fetch.mdx"),
    "commands/git-pull": () => import("@/content/en/commands/git-pull.mdx"),
    "commands/git-push": () => import("@/content/en/commands/git-push.mdx"),
    "commands/git-switch": () => import("@/content/en/commands/git-switch.mdx"),
    "commands/git-branch": () => import("@/content/en/commands/git-branch.mdx"),
    "commands/git-tag": () => import("@/content/en/commands/git-tag.mdx"),
    "commands/git-remote": () => import("@/content/en/commands/git-remote.mdx"),
    "commands/git-rebase": () => import("@/content/en/commands/git-rebase.mdx"),
    "commands/git-merge": () => import("@/content/en/commands/git-merge.mdx"),
    "commands/git-cherry-pick": () => import("@/content/en/commands/git-cherry-pick.mdx"),
    "commands/git-reset": () => import("@/content/en/commands/git-reset.mdx"),
    "commands/git-stash": () => import("@/content/en/commands/git-stash.mdx"),
    "commands/git-restore": () => import("@/content/en/commands/git-restore.mdx"),
    "commands/git-revert": () => import("@/content/en/commands/git-revert.mdx"),
    "commands/git-reflog": () => import("@/content/en/commands/git-reflog.mdx"),
    "commands/git-bisect": () => import("@/content/en/commands/git-bisect.mdx"),
    "commands/git-blame": () => import("@/content/en/commands/git-blame.mdx"),
    "commands/git-checkout": () => import("@/content/en/commands/git-checkout.mdx"),
    "commands/git-clean": () => import("@/content/en/commands/git-clean.mdx"),
    "commands/git-config": () => import("@/content/en/commands/git-config.mdx"),
    "commands/git-help": () => import("@/content/en/commands/git-help.mdx"),
    "commands/git-describe": () => import("@/content/en/commands/git-describe.mdx"),
    "commands/git-grep": () => import("@/content/en/commands/git-grep.mdx"),
    "commands/git-shortlog": () => import("@/content/en/commands/git-shortlog.mdx"),
    "commands/git-show-ref": () => import("@/content/en/commands/git-show-ref.mdx"),
    "commands/git-rev-parse": () => import("@/content/en/commands/git-rev-parse.mdx"),
    "commands/git-am": () => import("@/content/en/commands/git-am.mdx"),
    "commands/git-apply": () => import("@/content/en/commands/git-apply.mdx"),
    "commands/git-format-patch": () => import("@/content/en/commands/git-format-patch.mdx"),
    "commands/git-send-email": () => import("@/content/en/commands/git-send-email.mdx"),
    "commands/git-request-pull": () => import("@/content/en/commands/git-request-pull.mdx"),
    "commands/git-archive": () => import("@/content/en/commands/git-archive.mdx"),
    "commands/git-bundle": () => import("@/content/en/commands/git-bundle.mdx"),
    "commands/git-worktree": () => import("@/content/en/commands/git-worktree.mdx"),
    "commands/git-submodule": () => import("@/content/en/commands/git-submodule.mdx"),
    "commands/git-sparse-checkout": () => import("@/content/en/commands/git-sparse-checkout.mdx"),
    "commands/git-cat-file": () => import("@/content/en/commands/git-cat-file.mdx"),
    "commands/git-ls-files": () => import("@/content/en/commands/git-ls-files.mdx"),
    "commands/git-ls-tree": () => import("@/content/en/commands/git-ls-tree.mdx"),
    "commands/git-read-tree": () => import("@/content/en/commands/git-read-tree.mdx"),
    "commands/git-update-index": () => import("@/content/en/commands/git-update-index.mdx"),
    "commands/git-update-ref": () => import("@/content/en/commands/git-update-ref.mdx"),
    "commands/git-symbolic-ref": () => import("@/content/en/commands/git-symbolic-ref.mdx"),
    "commands/git-rev-list": () => import("@/content/en/commands/git-rev-list.mdx"),
    "commands/git-merge-base": () => import("@/content/en/commands/git-merge-base.mdx"),
    "commands/git-notes": () => import("@/content/en/commands/git-notes.mdx"),
    "commands/git-range-diff": () => import("@/content/en/commands/git-range-diff.mdx"),
    "commands/git-cherry": () => import("@/content/en/commands/git-cherry.mdx"),
    "commands/git-mergetool": () => import("@/content/en/commands/git-mergetool.mdx"),
    "commands/git-fsck": () => import("@/content/en/commands/git-fsck.mdx"),
    "commands/git-gc": () => import("@/content/en/commands/git-gc.mdx"),
    "commands/git-count-objects": () => import("@/content/en/commands/git-count-objects.mdx"),
    "commands/git-verify-pack": () => import("@/content/en/commands/git-verify-pack.mdx"),
    "commands/git-verify-tag": () => import("@/content/en/commands/git-verify-tag.mdx"),
    "best-practices/commit-hygiene": () => import("@/content/en/best-practices/commit-hygiene.mdx"),
    "best-practices/topic-branches": () => import("@/content/en/best-practices/topic-branches.mdx"),
    "best-practices/fetch-first-sync": () => import("@/content/en/best-practices/fetch-first-sync.mdx"),
    "best-practices/shared-history-boundaries": () => import("@/content/en/best-practices/shared-history-boundaries.mdx"),
    "best-practices/review-and-safe-push": () => import("@/content/en/best-practices/review-and-safe-push.mdx"),
    "best-practices/atomic-commits": () => import("@/content/en/best-practices/atomic-commits.mdx"),
    "best-practices/branch-naming": () => import("@/content/en/best-practices/branch-naming.mdx"),
    "best-practices/pull-request-prep": () => import("@/content/en/best-practices/pull-request-prep.mdx"),
    "best-practices/conflict-resolution-routine": () => import("@/content/en/best-practices/conflict-resolution-routine.mdx"),
    "best-practices/release-hygiene": () => import("@/content/en/best-practices/release-hygiene.mdx"),
    "best-practices/safe-cherry-picks": () => import("@/content/en/best-practices/safe-cherry-picks.mdx"),
    "best-practices/small-batch-review": () => import("@/content/en/best-practices/small-batch-review.mdx"),
    "workflows/fetch-vs-pull": () => import("@/content/en/workflows/fetch-vs-pull.mdx"),
    "workflows/feature-branch-collaboration": () => import("@/content/en/workflows/feature-branch-collaboration.mdx"),
    "workflows/parallel-work-with-worktree": () => import("@/content/en/workflows/parallel-work-with-worktree.mdx"),
    "workflows/sync-before-review": () => import("@/content/en/workflows/sync-before-review.mdx"),
    "workflows/hotfix-and-urgent-fixes": () => import("@/content/en/workflows/hotfix-and-urgent-fixes.mdx"),
    "workflows/release-branch-workflow": () => import("@/content/en/workflows/release-branch-workflow.mdx"),
    "workflows/backport-with-cherry-pick": () => import("@/content/en/workflows/backport-with-cherry-pick.mdx"),
    "workflows/fork-upstream-sync": () => import("@/content/en/workflows/fork-upstream-sync.mdx"),
    "workflows/squash-vs-rebase-merge": () => import("@/content/en/workflows/squash-vs-rebase-merge.mdx"),
    "workflows/long-lived-branch-maintenance": () => import("@/content/en/workflows/long-lived-branch-maintenance.mdx"),
    "workflows/submodule-update-flow": () => import("@/content/en/workflows/submodule-update-flow.mdx"),
    "internals/object-database": () => import("@/content/en/internals/object-database.mdx"),
    "internals/index-and-working-tree": () => import("@/content/en/internals/index-and-working-tree.mdx"),
    "internals/refs-and-head": () => import("@/content/en/internals/refs-and-head.mdx"),
    "internals/remote-tracking-refs": () => import("@/content/en/internals/remote-tracking-refs.mdx"),
    "internals/commit-graph": () => import("@/content/en/internals/commit-graph.mdx"),
    "internals/packfiles-and-storage": () => import("@/content/en/internals/packfiles-and-storage.mdx"),
    "internals/reachability-and-garbage-collection": () => import("@/content/en/internals/reachability-and-garbage-collection.mdx"),
    "internals/merge-base-and-ancestry": () => import("@/content/en/internals/merge-base-and-ancestry.mdx"),
    "internals/tree-objects-and-snapshots": () => import("@/content/en/internals/tree-objects-and-snapshots.mdx"),
    "internals/blob-objects-and-content-addressing": () => import("@/content/en/internals/blob-objects-and-content-addressing.mdx"),
    "internals/commit-message-and-parents": () => import("@/content/en/internals/commit-message-and-parents.mdx"),
    "internals/refspec-and-ref-updates": () => import("@/content/en/internals/refspec-and-ref-updates.mdx"),
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

export type DocCard = {
  href: string;
  path: DocPath;
  section: DocSection;
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

type IndexedDoc = {
  path: DocPath;
  metadata: DocMetadata;
};

const metadataBlockPattern = /export const metadata = \{([\s\S]*?)\n\};/;

function extractMetadataField(source: string, key: keyof Omit<DocMetadata, "sourceUrls">) {
  const match = source.match(new RegExp(`${key}:\\s*"([^"]+)"`));
  return match?.[1];
}

async function readDocMetadata(locale: Locale, docPath: DocPath): Promise<DocMetadata> {
  const absolutePath = path.join(process.cwd(), "content", locale, `${docPath}.mdx`);
  const source = await readFile(absolutePath, "utf8");
  const metadataBlock = source.match(metadataBlockPattern)?.[1] ?? "";
  const title = extractMetadataField(metadataBlock, "title");
  const slug = extractMetadataField(metadataBlock, "slug");
  const summary = extractMetadataField(metadataBlock, "summary");
  const section = extractMetadataField(metadataBlock, "section") as DocSection | undefined;

  if (!title || !slug || !summary || !section) {
    throw new Error(`Unable to parse metadata from ${absolutePath}`);
  }

  return {
    title,
    slug,
    locale,
    summary,
    section,
    sourceUrls: [],
  };
}

const getIndexedDocs = cache(async (locale: Locale): Promise<IndexedDoc[]> => {
  const docs = await Promise.all(
    docPathRegistry.map(async (docPath) => ({
      path: docPath,
      metadata: await readDocMetadata(locale, docPath),
    })),
  );

  return docs.sort((a, b) => a.metadata.title.localeCompare(b.metadata.title));
});

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
  const indexedDocs = await getIndexedDocs(locale);
  const docs = await Promise.all(indexedDocs.map(async ({ path: docPath }) => getDocByPath(locale, docPath)));

  return docs;
}

function toDocCard(locale: Locale, doc: Awaited<ReturnType<typeof getDocByPath>>): DocCard {
  return {
    href: getDocHref(locale, doc.path),
    path: doc.path,
    section: doc.metadata.section,
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
    case "internals":
      return internalsSlugs.map((slug) => `internals/${slug}` as DocPath);
    case "learning-path":
      return learningPathSlugs.map((slug) => `learning-path/${slug}` as DocPath);
    case "recovery":
      return ["recovery/reflog-recovery"];
    case "concepts":
      return ["concepts/git-history"];
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
      ...getOrderedPathSeries("internals"),
      ...getOrderedPathSeries("recovery"),
      ...getOrderedPathSeries("concepts"),
    ].map((path, index) => [path, index]),
  );

  return [...docs].sort(
    (a, b) => (order.get(a.path) ?? Number.MAX_SAFE_INTEGER) - (order.get(b.path) ?? Number.MAX_SAFE_INTEGER),
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

export async function getInternalsDocs(locale: Locale) {
  const docs = await getIndexedDocs(locale);
  return sortBySeriesOrder(docs.filter((doc) => doc.path.startsWith("internals/")));
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

  if (docPath === "learning-path/quick-start") {
    return `/${locale}/learning-path`;
  }

  return `/${locale}/docs/${docPath}`;
}

export async function getSearchDocs(locale: Locale): Promise<SearchDoc[]> {
  const docs = await getIndexedDocs(locale);

  return docs.map((doc) => ({
    href: getDocHref(locale, doc.path),
    path: doc.path,
    section: doc.metadata.section,
    slug: doc.metadata.slug,
    title: doc.metadata.title,
    summary: doc.metadata.summary,
  }));
}

export async function getDocNeighbors(locale: Locale, docPath: DocPath): Promise<DocNeighbors> {
  const doc = await getDocByPath(locale, docPath);
  const series = getOrderedPathSeries(doc.metadata.section);
  const index = series.indexOf(docPath);

  if (index === -1) {
    return {};
  }

  const prevPath = series[index - 1];
  const nextPath = series[index + 1];

  const [prevDoc, nextDoc] = await Promise.all([
    prevPath ? getDocByPath(locale, prevPath) : Promise.resolve(null),
    nextPath ? getDocByPath(locale, nextPath) : Promise.resolve(null),
  ]);

  return {
    prev: prevDoc ? toDocCard(locale, prevDoc) : undefined,
    next: nextDoc ? toDocCard(locale, nextDoc) : undefined,
  };
}

const relatedOverrides: Partial<Record<DocPath, readonly DocPath[]>> = {
  "learning-path/quick-start": [
    "learning-path/setup-and-clone",
    "learning-path/stage-and-commit",
    "learning-path/sync-with-remote",
  ],
  "learning-path/setup-and-clone": [
    "commands/git-clone",
    "commands/git-config",
    "learning-path/stage-and-commit",
  ],
  "learning-path/stage-and-commit": [
    "commands/git-add",
    "commands/git-commit",
    "learning-path/sync-with-remote",
  ],
  "learning-path/sync-with-remote": [
    "commands/git-fetch",
    "commands/git-pull",
    "commands/git-push",
  ],
  "learning-path/first-feature-branch": [
    "commands/git-switch",
    "commands/git-branch",
    "workflows/feature-branch-collaboration",
  ],
  "workflows/parallel-work-with-worktree": [
    "commands/git-worktree",
    "commands/git-switch",
    "workflows/hotfix-and-urgent-fixes",
  ],
  "concepts/git-history": [
    "internals/commit-graph",
    "internals/refs-and-head",
    "commands/git-reflog",
  ],
  "recovery/reflog-recovery": [
    "commands/git-reflog",
    "commands/git-reset",
    "commands/git-rebase",
  ],
};

export async function getRelatedDocs(
  locale: Locale,
  docPath: DocPath,
  limit = 3,
): Promise<DocCard[]> {
  const overridePaths = relatedOverrides[docPath];

  if (overridePaths?.length) {
    const docs = await Promise.all(
      overridePaths.slice(0, limit).map((path) => getDocByPath(locale, path)),
    );
    return docs.map((doc) => toDocCard(locale, doc));
  }

  const doc = await getDocByPath(locale, docPath);
  const series = getOrderedPathSeries(doc.metadata.section).filter((path) => path !== docPath);
  const docs = await Promise.all(series.slice(0, limit).map((path) => getDocByPath(locale, path)));
  return docs.map((entry) => toDocCard(locale, entry));
}

export async function getFeaturedSectionDocs(
  locale: Locale,
  section: Extract<DocSection, "learning-path" | "commands" | "best-practices" | "workflows" | "internals">,
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
          : await getInternalsDocs(locale);

  return docs.slice(0, limit).map((doc) => toIndexedDocCard(locale, doc));
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
