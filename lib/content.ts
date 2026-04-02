import { readFile, stat } from "node:fs/promises";
import path from "node:path";
import type { ComponentType } from "react";
import { cache } from "react";

import {
  bestPracticeSlugs,
  commandSlugs,
  githubSlugs,
  gitlabSlugs,
  internalsSlugs,
  learningPathSlugs,
  recoverySlugs,
  workflowSlugs,
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
  | "github"
  | "gitlab"
  | "internals"
  | "recovery"
  | "concepts";

export type DocTier = "core" | "recommended" | "extended";

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
  "github/github-flow-basics",
  "github/pull-requests-and-reviews",
  "github/forks-and-open-source-contribution",
  "github/issues-projects-and-discussions",
  "github/github-actions-and-skills",
  "gitlab/gitlab-flow-and-merge-requests",
  "gitlab/gitlab-forks-and-contributions",
  "gitlab/gitlab-issues-boards-and-milestones",
  "gitlab/gitlab-groups-projects-and-permissions",
  "gitlab/gitlab-ci-and-runners",
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
  "recovery/recover-after-reset",
  "recovery/recover-after-rebase",
  "recovery/recover-deleted-branch",
  "recovery/detached-head-rescue",
  "recovery/undo-after-pull",
  "recovery/assess-force-push-impact",
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
    "workflows/gitflow-workflow": () => import("@/content/zh/workflows/gitflow-workflow.mdx"),
    "workflows/multi-person-sync-routine": () => import("@/content/zh/workflows/multi-person-sync-routine.mdx"),
    "workflows/prepare-commits-before-pull-request": () => import("@/content/zh/workflows/prepare-commits-before-pull-request.mdx"),
    "workflows/parallel-work-with-worktree": () => import("@/content/zh/workflows/parallel-work-with-worktree.mdx"),
    "workflows/ai-agent-worktree-mode": () => import("@/content/zh/workflows/ai-agent-worktree-mode.mdx"),
    "workflows/monorepo-sparse-checkout-workflow": () => import("@/content/zh/workflows/monorepo-sparse-checkout-workflow.mdx"),
    "workflows/rerere-for-recurring-conflicts": () => import("@/content/zh/workflows/rerere-for-recurring-conflicts.mdx"),
    "workflows/shared-branch-sync-boundaries": () => import("@/content/zh/workflows/shared-branch-sync-boundaries.mdx"),
    "workflows/sync-before-review": () => import("@/content/zh/workflows/sync-before-review.mdx"),
    "workflows/pr-merge-strategy-and-platform-settings": () => import("@/content/zh/workflows/pr-merge-strategy-and-platform-settings.mdx"),
    "workflows/merge-queue-workflow": () => import("@/content/zh/workflows/merge-queue-workflow.mdx"),
    "workflows/hotfix-and-urgent-fixes": () => import("@/content/zh/workflows/hotfix-and-urgent-fixes.mdx"),
    "workflows/hotfix-rollback-after-release": () => import("@/content/zh/workflows/hotfix-rollback-after-release.mdx"),
    "workflows/open-source-fork-pr-contribution": () => import("@/content/zh/workflows/open-source-fork-pr-contribution.mdx"),
    "workflows/release-branch-workflow": () => import("@/content/zh/workflows/release-branch-workflow.mdx"),
    "workflows/backport-with-cherry-pick": () => import("@/content/zh/workflows/backport-with-cherry-pick.mdx"),
    "workflows/post-release-multi-branch-backporting": () => import("@/content/zh/workflows/post-release-multi-branch-backporting.mdx"),
    "workflows/fork-upstream-sync": () => import("@/content/zh/workflows/fork-upstream-sync.mdx"),
    "workflows/squash-vs-rebase-merge": () => import("@/content/zh/workflows/squash-vs-rebase-merge.mdx"),
    "workflows/long-lived-branch-maintenance": () => import("@/content/zh/workflows/long-lived-branch-maintenance.mdx"),
    "workflows/long-lived-branch-conflict-governance": () => import("@/content/zh/workflows/long-lived-branch-conflict-governance.mdx"),
    "workflows/submodule-update-flow": () => import("@/content/zh/workflows/submodule-update-flow.mdx"),
    "github/github-flow-basics": () => import("@/content/zh/github/github-flow-basics.mdx"),
    "github/pull-requests-and-reviews": () => import("@/content/zh/github/pull-requests-and-reviews.mdx"),
    "github/forks-and-open-source-contribution": () =>
      import("@/content/zh/github/forks-and-open-source-contribution.mdx"),
    "github/issues-projects-and-discussions": () =>
      import("@/content/zh/github/issues-projects-and-discussions.mdx"),
    "github/github-actions-and-skills": () => import("@/content/zh/github/github-actions-and-skills.mdx"),
    "gitlab/gitlab-flow-and-merge-requests": () =>
      import("@/content/zh/gitlab/gitlab-flow-and-merge-requests.mdx"),
    "gitlab/gitlab-forks-and-contributions": () =>
      import("@/content/zh/gitlab/gitlab-forks-and-contributions.mdx"),
    "gitlab/gitlab-issues-boards-and-milestones": () =>
      import("@/content/zh/gitlab/gitlab-issues-boards-and-milestones.mdx"),
    "gitlab/gitlab-groups-projects-and-permissions": () =>
      import("@/content/zh/gitlab/gitlab-groups-projects-and-permissions.mdx"),
    "gitlab/gitlab-ci-and-runners": () => import("@/content/zh/gitlab/gitlab-ci-and-runners.mdx"),
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
    "recovery/recover-after-reset": () => import("@/content/zh/recovery/recover-after-reset.mdx"),
    "recovery/recover-after-rebase": () => import("@/content/zh/recovery/recover-after-rebase.mdx"),
    "recovery/recover-deleted-branch": () => import("@/content/zh/recovery/recover-deleted-branch.mdx"),
    "recovery/detached-head-rescue": () => import("@/content/zh/recovery/detached-head-rescue.mdx"),
    "recovery/undo-after-pull": () => import("@/content/zh/recovery/undo-after-pull.mdx"),
    "recovery/assess-force-push-impact": () => import("@/content/zh/recovery/assess-force-push-impact.mdx"),
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
    "workflows/gitflow-workflow": () => import("@/content/en/workflows/gitflow-workflow.mdx"),
    "workflows/multi-person-sync-routine": () => import("@/content/en/workflows/multi-person-sync-routine.mdx"),
    "workflows/prepare-commits-before-pull-request": () => import("@/content/en/workflows/prepare-commits-before-pull-request.mdx"),
    "workflows/parallel-work-with-worktree": () => import("@/content/en/workflows/parallel-work-with-worktree.mdx"),
    "workflows/ai-agent-worktree-mode": () => import("@/content/en/workflows/ai-agent-worktree-mode.mdx"),
    "workflows/monorepo-sparse-checkout-workflow": () => import("@/content/en/workflows/monorepo-sparse-checkout-workflow.mdx"),
    "workflows/rerere-for-recurring-conflicts": () => import("@/content/en/workflows/rerere-for-recurring-conflicts.mdx"),
    "workflows/shared-branch-sync-boundaries": () => import("@/content/en/workflows/shared-branch-sync-boundaries.mdx"),
    "workflows/sync-before-review": () => import("@/content/en/workflows/sync-before-review.mdx"),
    "workflows/pr-merge-strategy-and-platform-settings": () => import("@/content/en/workflows/pr-merge-strategy-and-platform-settings.mdx"),
    "workflows/merge-queue-workflow": () => import("@/content/en/workflows/merge-queue-workflow.mdx"),
    "workflows/hotfix-and-urgent-fixes": () => import("@/content/en/workflows/hotfix-and-urgent-fixes.mdx"),
    "workflows/hotfix-rollback-after-release": () => import("@/content/en/workflows/hotfix-rollback-after-release.mdx"),
    "workflows/open-source-fork-pr-contribution": () => import("@/content/en/workflows/open-source-fork-pr-contribution.mdx"),
    "workflows/release-branch-workflow": () => import("@/content/en/workflows/release-branch-workflow.mdx"),
    "workflows/backport-with-cherry-pick": () => import("@/content/en/workflows/backport-with-cherry-pick.mdx"),
    "workflows/post-release-multi-branch-backporting": () => import("@/content/en/workflows/post-release-multi-branch-backporting.mdx"),
    "workflows/fork-upstream-sync": () => import("@/content/en/workflows/fork-upstream-sync.mdx"),
    "workflows/squash-vs-rebase-merge": () => import("@/content/en/workflows/squash-vs-rebase-merge.mdx"),
    "workflows/long-lived-branch-maintenance": () => import("@/content/en/workflows/long-lived-branch-maintenance.mdx"),
    "workflows/long-lived-branch-conflict-governance": () => import("@/content/en/workflows/long-lived-branch-conflict-governance.mdx"),
    "workflows/submodule-update-flow": () => import("@/content/en/workflows/submodule-update-flow.mdx"),
    "github/github-flow-basics": () => import("@/content/en/github/github-flow-basics.mdx"),
    "github/pull-requests-and-reviews": () => import("@/content/en/github/pull-requests-and-reviews.mdx"),
    "github/forks-and-open-source-contribution": () =>
      import("@/content/en/github/forks-and-open-source-contribution.mdx"),
    "github/issues-projects-and-discussions": () =>
      import("@/content/en/github/issues-projects-and-discussions.mdx"),
    "github/github-actions-and-skills": () => import("@/content/en/github/github-actions-and-skills.mdx"),
    "gitlab/gitlab-flow-and-merge-requests": () =>
      import("@/content/en/gitlab/gitlab-flow-and-merge-requests.mdx"),
    "gitlab/gitlab-forks-and-contributions": () =>
      import("@/content/en/gitlab/gitlab-forks-and-contributions.mdx"),
    "gitlab/gitlab-issues-boards-and-milestones": () =>
      import("@/content/en/gitlab/gitlab-issues-boards-and-milestones.mdx"),
    "gitlab/gitlab-groups-projects-and-permissions": () =>
      import("@/content/en/gitlab/gitlab-groups-projects-and-permissions.mdx"),
    "gitlab/gitlab-ci-and-runners": () => import("@/content/en/gitlab/gitlab-ci-and-runners.mdx"),
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
    "recovery/recover-after-reset": () => import("@/content/en/recovery/recover-after-reset.mdx"),
    "recovery/recover-after-rebase": () => import("@/content/en/recovery/recover-after-rebase.mdx"),
    "recovery/recover-deleted-branch": () => import("@/content/en/recovery/recover-deleted-branch.mdx"),
    "recovery/detached-head-rescue": () => import("@/content/en/recovery/detached-head-rescue.mdx"),
    "recovery/undo-after-pull": () => import("@/content/en/recovery/undo-after-pull.mdx"),
    "recovery/assess-force-push-impact": () => import("@/content/en/recovery/assess-force-push-impact.mdx"),
    "concepts/git-history": () => import("@/content/en/concepts/git-history.mdx"),
  },
} satisfies Record<Locale, Record<DocPath, ContentLoader>>;

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

export type DocPrimer = {
  audience: string[];
  prerequisites: string[];
  risks: string[];
};

type DocPrimerSeed = {
  audience: readonly string[];
  prerequisites: readonly string[];
  risks: readonly string[];
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
  "learning-path/sync-with-remote",
  "learning-path/first-feature-branch",
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
  "workflows/prepare-commits-before-pull-request",
  "workflows/ai-agent-worktree-mode",
  "workflows/gitflow-workflow",
  "workflows/hotfix-rollback-after-release",
  "workflows/backport-with-cherry-pick",
  "workflows/shared-branch-sync-boundaries",
  "workflows/submodule-update-flow",
  "github/github-flow-basics",
  "github/pull-requests-and-reviews",
  "gitlab/gitlab-flow-and-merge-requests",
  "gitlab/gitlab-ci-and-runners",
  "internals/merge-base-and-ancestry",
  "internals/reachability-and-garbage-collection",
  "internals/packfiles-and-storage",
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
  github: {
    prerequisite: "learning-path/first-feature-branch",
    risk: "best-practices/shared-history-boundaries",
  },
  gitlab: {
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

const primerDefaults: Record<Locale, Record<DocSection, DocPrimerSeed>> = {
  zh: {
    commands: {
      audience: ["已经会基本提交和分支操作的开发者", "想理解命令边界与风险的人"],
      prerequisites: ["知道工作区、暂存区、提交的基本关系", "能读懂 `git status` 和简单历史图"],
      risks: ["误把本地整理命令用到共享历史", "在没确认恢复路径前直接继续改写历史"],
    },
    "best-practices": {
      audience: ["希望把 Git 用得更稳的个人或团队", "准备建立协作规范的维护者"],
      prerequisites: ["至少有一次真实协作经验", "知道常见命令但还没形成稳定习惯"],
      risks: ["把建议当硬规则而忽略上下文", "只记流程，不理解背后的协作边界"],
    },
    workflows: {
      audience: ["要把命令组合成稳定流程的团队成员", "需要处理协作顺序和分支边界的人"],
      prerequisites: ["知道 fetch / pull / push / branch 的基本作用", "能理解一条分支为什么会分叉"],
      risks: ["照抄流程却没确认当前分支关系", "在共享分支上用错整合方式"],
    },
    github: {
      audience: ["已经会基础 Git、准备系统学习 GitHub 协作的人", "要在团队里使用 PR、Issue、Actions 的开发者"],
      prerequisites: ["知道 branch、commit、push、remote 的基本作用", "愿意把平台功能和 Git 操作一起理解"],
      risks: ["只记 GitHub 按钮流程却忽略底层 Git 边界", "把平台规则当成可以替代本地历史判断"],
    },
    gitlab: {
      audience: ["已经会基础 Git、准备系统学习 GitLab 协作的人", "要在团队里使用 Merge Request、Issue Board 和 CI/CD 的开发者"],
      prerequisites: ["知道 branch、commit、push、remote 的基本作用", "愿意把平台功能和 Git 操作一起理解"],
      risks: ["只记 GitLab 页面操作却忽略底层 Git 边界", "把平台策略误当成可以替代本地历史判断"],
    },
    internals: {
      audience: ["想建立稳定 Git 心智模型的学习者", "经常遇到历史、引用、恢复问题的开发者"],
      prerequisites: ["会看基础命令输出", "知道提交、分支、HEAD 这些名词"],
      risks: ["只背底层术语却不连接到实际命令", "把对象、引用、工作区混成一层理解"],
    },
    recovery: {
      audience: ["正在处理 Git 误操作的人", "想提前建立保守恢复习惯的协作者"],
      prerequisites: ["先停手，不继续乱试命令", "能执行 `git reflog`、`git status`、`git log --graph`"],
      risks: ["还没保住旧位置就继续 reset / rebase", "在没判断影响面时直接改共享历史"],
    },
    "learning-path": {
      audience: ["刚开始系统学 Git 的新手", "想补齐最小协作闭环的人"],
      prerequisites: ["会打开终端并进入仓库目录", "知道本地和远端仓库的基本区别"],
      risks: ["跳过顺序直接学高风险命令", "把示例命令直接用到当前工作仓库"],
    },
    concepts: {
      audience: ["想先理解历史图再看命令的人"],
      prerequisites: ["知道提交不是文件快照列表那么简单"],
      risks: ["把概念页当命令说明页使用"],
    },
  },
  en: {
    commands: {
      audience: ["Developers who already know basic commit and branch actions", "Readers who want to understand command boundaries and risk"],
      prerequisites: ["A basic mental model of worktree, index, and commits", "Comfort reading `git status` and a small commit graph"],
      risks: ["Using local cleanup commands on already shared history", "Continuing to rewrite before confirming a recovery path"],
    },
    "best-practices": {
      audience: ["Individuals or teams who want more predictable Git habits", "Maintainers setting collaboration expectations"],
      prerequisites: ["At least one real collaboration loop", "Basic command familiarity without a stable routine yet"],
      risks: ["Treating guidance as absolute law without context", "Memorizing process without understanding team boundaries"],
    },
    workflows: {
      audience: ["Teams turning commands into repeatable routines", "Readers who need sequencing, branch, and sync discipline"],
      prerequisites: ["Basic understanding of fetch, pull, push, and branches", "A sense of how and why branches diverge"],
      risks: ["Copying a workflow without checking branch state", "Choosing the wrong integration path on shared branches"],
    },
    github: {
      audience: ["Readers who know basic Git and now need GitHub collaboration fluency", "Developers using pull requests, issues, and Actions in real teams"],
      prerequisites: ["A basic sense of branches, commits, pushes, and remotes", "Willingness to connect platform features back to Git behavior"],
      risks: ["Memorizing GitHub UI steps without understanding the Git boundary underneath", "Assuming platform policy replaces local history judgment"],
    },
    gitlab: {
      audience: ["Readers who know basic Git and now need GitLab collaboration fluency", "Developers using merge requests, issue boards, and CI/CD in real teams"],
      prerequisites: ["A basic sense of branches, commits, pushes, and remotes", "Willingness to connect platform features back to Git behavior"],
      risks: ["Memorizing GitLab UI steps without understanding the Git boundary underneath", "Assuming platform policy replaces local history judgment"],
    },
    internals: {
      audience: ["Readers building a durable Git mental model", "Developers who keep running into history, ref, or recovery confusion"],
      prerequisites: ["Comfort reading basic Git output", "A rough idea of commits, branches, and HEAD"],
      risks: ["Learning low-level terms without connecting them to commands", "Collapsing objects, refs, and working state into one concept"],
    },
    recovery: {
      audience: ["Anyone actively handling a Git mistake", "Readers who want a conservative rescue habit before trouble happens"],
      prerequisites: ["Stop mutating the repo further", "Be ready to inspect `git reflog`, `git status`, and `git log --graph`"],
      risks: ["Running more reset or rebase commands before preserving a checkpoint", "Changing shared history before assessing blast radius"],
    },
    "learning-path": {
      audience: ["Beginners learning Git as a system", "Developers who want a reliable first collaboration loop"],
      prerequisites: ["Basic terminal comfort", "A rough distinction between local and remote repositories"],
      risks: ["Skipping ahead to high-risk commands", "Running sample commands directly in the wrong repository"],
    },
    concepts: {
      audience: ["Readers who want the history model before advanced commands"],
      prerequisites: ["A basic sense that commits are not just a file list"],
      risks: ["Treating a concepts page like a command how-to"],
    },
  },
} as const;

const primerOverrides: Record<Locale, Partial<Record<DocPath, DocPrimerSeed>>> = {
  zh: {
    "commands/git-rebase": {
      audience: ["已经会 merge / pull 的开发者", "想整理本地提交历史的人"],
      prerequisites: ["知道共享历史和本地历史的区别", "愿意先看 reflog 再做改写"],
      risks: ["对已共享提交做 rebase", "冲突时不先保住旧位置就继续重试"],
    },
    "commands/git-reset": {
      audience: ["想撤回提交、取消暂存或回到旧位置的人"],
      prerequisites: ["知道 HEAD、暂存区、工作区是三层", "能接受先建救援分支再操作"],
      risks: ["误用 `--hard` 覆盖工作区", "没确认共享边界就移动历史"],
    },
    "commands/git-reflog": {
      audience: ["正在处理 reset、rebase、删分支事故的人"],
      prerequisites: ["知道 reflog 记录的是引用位置变化", "愿意先查位置再动分支"],
      risks: ["把 reflog 当永久保险箱", "看到旧位置后直接覆盖原分支而不先建救援分支"],
    },
    "commands/git-cherry-pick": {
      audience: ["要把补丁带到另一个分支的人", "维护发布分支和回补修复的人"],
      prerequisites: ["知道目标提交可能依赖前置提交", "会判断是 pick 单个补丁还是整合整条分支"],
      risks: ["在多分支重复 pick 造成历史混乱", "忽略前置依赖导致目标分支状态不完整"],
    },
    "commands/git-merge": {
      audience: ["需要整合分支历史的协作者"],
      prerequisites: ["知道分支为什么会分叉", "能看懂 merge commit 的含义"],
      risks: ["在冲突没理解清楚时强行继续", "把 merge 和 rebase 的适用边界混掉"],
    },
    "commands/git-stash": {
      audience: ["要临时切任务但不想立刻提交的人"],
      prerequisites: ["知道 stash 默认不等于完整备份", "知道 apply 和 pop 的区别"],
      risks: ["误以为 stash 会自动保存一切", "长期堆积 stash 导致上下文难以追踪"],
    },
  },
  en: {
    "commands/git-rebase": {
      audience: ["Developers who already understand merge and pull", "Readers cleaning up local commit history"],
      prerequisites: ["A clear distinction between private and shared history", "A willingness to inspect reflog before rewriting"],
      risks: ["Rebasing commits that are already shared", "Retrying through conflict states without preserving a checkpoint"],
    },
    "commands/git-reset": {
      audience: ["Readers who want to uncommit, unstage, or move back to an earlier point"],
      prerequisites: ["A three-layer model of HEAD, index, and worktree", "A habit of creating a rescue branch first"],
      risks: ["Using `--hard` and overwriting local file state", "Moving history before checking the sharing boundary"],
    },
    "commands/git-reflog": {
      audience: ["Readers handling reset, rebase, and branch-loss incidents"],
      prerequisites: ["Knowing that reflog tracks ref movement", "A habit of inspecting positions before moving branches"],
      risks: ["Treating reflog as permanent storage", "Jumping straight to overwrite the branch instead of making a rescue branch"],
    },
    "commands/git-cherry-pick": {
      audience: ["Readers backporting patches across branches", "Maintainers moving fixes into release lines"],
      prerequisites: ["Awareness that a picked commit may depend on earlier commits", "A judgment about patch transfer versus full branch integration"],
      risks: ["Creating duplicated or diverging history across branches", "Ignoring dependency chains and replaying an incomplete patch"],
    },
    "commands/git-merge": {
      audience: ["Collaborators integrating branch history"],
      prerequisites: ["A basic model of branch divergence", "Comfort reading what a merge commit means"],
      risks: ["Forcing through conflicts without understanding them", "Blurring the boundary between merge and rebase"],
    },
    "commands/git-stash": {
      audience: ["Readers pausing work without making a real commit yet"],
      prerequisites: ["Understanding that stash is not an all-purpose backup", "Knowing the difference between apply and pop"],
      risks: ["Assuming stash preserved everything automatically", "Letting the stash stack become untracked long-term context"],
    },
  },
} as const;

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
  const absolutePath = getDocAbsolutePath(locale, docPath);
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

function getDocAbsolutePath(locale: Locale, docPath: DocPath) {
  return path.join(process.cwd(), "content", locale, `${docPath}.mdx`);
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
    case "github":
      return githubSlugs.map((slug) => `github/${slug}` as DocPath);
    case "gitlab":
      return gitlabSlugs.map((slug) => `gitlab/${slug}` as DocPath);
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
      return [];
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
      ...getOrderedPathSeries("github"),
      ...getOrderedPathSeries("gitlab"),
      ...getOrderedPathSeries("internals"),
      ...getOrderedPathSeries("recovery"),
      ...getOrderedPathSeries("concepts"),
    ].map((path, index) => [path, index]),
  );

  return [...docs].sort(
    (a, b) => (order.get(a.path) ?? Number.MAX_SAFE_INTEGER) - (order.get(b.path) ?? Number.MAX_SAFE_INTEGER),
  );
}

function sortByTierAndSeriesOrder<T extends { path: DocPath }>(docs: T[]) {
  const ordered = sortBySeriesOrder(docs);
  return [...ordered].sort(
    (a, b) =>
      tierRank[getDocTier(a.path)] - tierRank[getDocTier(b.path)] ||
      ordered.findIndex((doc) => doc.path === a.path) - ordered.findIndex((doc) => doc.path === b.path),
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

export async function getGithubDocs(locale: Locale) {
  const docs = await getIndexedDocs(locale);
  return sortBySeriesOrder(docs.filter((doc) => doc.path.startsWith("github/")));
}

export async function getGitlabDocs(locale: Locale) {
  const docs = await getIndexedDocs(locale);
  return sortBySeriesOrder(docs.filter((doc) => doc.path.startsWith("gitlab/")));
}

export async function getInternalsDocs(locale: Locale) {
  const docs = await getIndexedDocs(locale);
  return sortBySeriesOrder(docs.filter((doc) => doc.metadata.section === "internals"));
}

export async function getRecoveryDocs(locale: Locale) {
  const docs = await getIndexedDocs(locale);
  return sortBySeriesOrder(docs.filter((doc) => doc.path.startsWith("recovery/")));
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

  if (docPath.startsWith("github/")) {
    return `/${locale}/github/${docPath.replace("github/", "")}`;
  }

  if (docPath.startsWith("gitlab/")) {
    return `/${locale}/gitlab/${docPath.replace("gitlab/", "")}`;
  }

  if (docPath.startsWith("internals/")) {
    return `/${locale}/internals/${docPath.replace("internals/", "")}`;
  }

  if (docPath.startsWith("recovery/")) {
    return `/${locale}/recovery/${docPath.replace("recovery/", "")}`;
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
  const paths = section
    ? docPathRegistry.filter((docPath) => docPath.startsWith(`${section}/`))
    : docPathRegistry;

  const modifiedTimes = await Promise.all(
    paths.map(async (docPath) => getDocLastModified(locale, docPath)),
  );

  return modifiedTimes.reduce(
    (latest, current) => (current > latest ? current : latest),
    new Date(0),
  );
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
  "workflows/ai-agent-worktree-mode": [
    "workflows/parallel-work-with-worktree",
    "commands/git-worktree",
    "workflows/prepare-commits-before-pull-request",
  ],
  "workflows/gitflow-workflow": [
    "workflows/feature-branch-collaboration",
    "workflows/release-branch-workflow",
    "workflows/hotfix-and-urgent-fixes",
  ],
  "github/github-flow-basics": [
    "workflows/feature-branch-collaboration",
    "workflows/prepare-commits-before-pull-request",
    "github/pull-requests-and-reviews",
  ],
  "github/pull-requests-and-reviews": [
    "best-practices/pull-request-prep",
    "workflows/pr-merge-strategy-and-platform-settings",
    "github/issues-projects-and-discussions",
  ],
  "github/forks-and-open-source-contribution": [
    "workflows/open-source-fork-pr-contribution",
    "workflows/fork-upstream-sync",
    "best-practices/topic-branches",
  ],
  "github/issues-projects-and-discussions": [
    "workflows/feature-branch-collaboration",
    "best-practices/small-batch-review",
    "github/github-actions-and-skills",
  ],
  "github/github-actions-and-skills": [
    "workflows/merge-queue-workflow",
    "workflows/pr-merge-strategy-and-platform-settings",
    "commands/git-worktree",
  ],
  "gitlab/gitlab-flow-and-merge-requests": [
    "workflows/feature-branch-collaboration",
    "github/pull-requests-and-reviews",
    "best-practices/pull-request-prep",
  ],
  "gitlab/gitlab-forks-and-contributions": [
    "workflows/open-source-fork-pr-contribution",
    "workflows/fork-upstream-sync",
    "best-practices/topic-branches",
  ],
  "gitlab/gitlab-issues-boards-and-milestones": [
    "github/issues-projects-and-discussions",
    "workflows/feature-branch-collaboration",
    "best-practices/small-batch-review",
  ],
  "gitlab/gitlab-groups-projects-and-permissions": [
    "best-practices/shared-history-boundaries",
    "workflows/shared-branch-sync-boundaries",
    "github/forks-and-open-source-contribution",
  ],
  "gitlab/gitlab-ci-and-runners": [
    "github/github-actions-and-skills",
    "workflows/merge-queue-workflow",
    "workflows/pr-merge-strategy-and-platform-settings",
  ],
  "workflows/multi-person-sync-routine": [
    "commands/git-fetch",
    "commands/git-pull",
    "workflows/shared-branch-sync-boundaries",
  ],
  "workflows/prepare-commits-before-pull-request": [
    "commands/git-rebase",
    "best-practices/pull-request-prep",
    "workflows/sync-before-review",
  ],
  "workflows/monorepo-sparse-checkout-workflow": [
    "commands/git-sparse-checkout",
    "commands/git-worktree",
    "workflows/submodule-update-flow",
  ],
  "workflows/rerere-for-recurring-conflicts": [
    "commands/git-rebase",
    "commands/git-mergetool",
    "workflows/long-lived-branch-conflict-governance",
  ],
  "workflows/shared-branch-sync-boundaries": [
    "commands/git-pull",
    "commands/git-push",
    "workflows/fetch-vs-pull",
  ],
  "workflows/pr-merge-strategy-and-platform-settings": [
    "commands/git-merge",
    "commands/git-rebase",
    "workflows/squash-vs-rebase-merge",
  ],
  "workflows/merge-queue-workflow": [
    "workflows/pr-merge-strategy-and-platform-settings",
    "workflows/sync-before-review",
    "commands/git-merge",
  ],
  "workflows/open-source-fork-pr-contribution": [
    "workflows/fork-upstream-sync",
    "workflows/feature-branch-collaboration",
    "commands/git-request-pull",
  ],
  "workflows/post-release-multi-branch-backporting": [
    "workflows/backport-with-cherry-pick",
    "workflows/release-branch-workflow",
    "workflows/hotfix-and-urgent-fixes",
  ],
  "workflows/hotfix-rollback-after-release": [
    "commands/git-revert",
    "workflows/release-branch-workflow",
    "workflows/hotfix-and-urgent-fixes",
  ],
  "workflows/long-lived-branch-conflict-governance": [
    "workflows/long-lived-branch-maintenance",
    "workflows/rerere-for-recurring-conflicts",
    "commands/git-rebase",
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
  "recovery/recover-after-reset": [
    "commands/git-reset",
    "commands/git-reflog",
    "commands/git-revert",
  ],
  "recovery/recover-after-rebase": [
    "commands/git-rebase",
    "commands/git-reflog",
    "internals/refs-and-head",
  ],
  "recovery/recover-deleted-branch": [
    "commands/git-branch",
    "commands/git-reflog",
    "internals/reachability-and-garbage-collection",
  ],
  "recovery/detached-head-rescue": [
    "commands/git-switch",
    "commands/git-reflog",
    "internals/refs-and-head",
  ],
  "recovery/undo-after-pull": [
    "commands/git-pull",
    "commands/git-reset",
    "commands/git-reflog",
  ],
  "recovery/assess-force-push-impact": [
    "commands/git-push",
    "commands/git-reflog",
    "best-practices/shared-history-boundaries",
  ],
};

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
  github: [
    "github/github-flow-basics",
    "github/pull-requests-and-reviews",
    "github/github-actions-and-skills",
  ],
  gitlab: [
    "gitlab/gitlab-flow-and-merge-requests",
    "gitlab/gitlab-issues-boards-and-milestones",
    "gitlab/gitlab-ci-and-runners",
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
} as const satisfies Partial<Record<DocSection, readonly DocPath[]>>;

const latestHomeDocPaths = [
  "workflows/gitflow-workflow",
  "workflows/ai-agent-worktree-mode",
  "recovery/undo-after-pull",
  "commands/git-worktree",
] as const satisfies readonly DocPath[];

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
  section: Extract<DocSection, "learning-path" | "commands" | "best-practices" | "workflows" | "github" | "gitlab" | "internals" | "recovery">,
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
          : section === "github"
            ? await getGithubDocs(locale)
            : section === "gitlab"
              ? await getGitlabDocs(locale)
            : section === "internals"
              ? await getInternalsDocs(locale)
              : await getRecoveryDocs(locale);

  return sortByTierAndSeriesOrder(docs).slice(0, limit).map((doc) => toIndexedDocCard(locale, doc));
}

export async function getRepresentativeSectionDocs(
  locale: Locale,
  section: Extract<DocSection, "learning-path" | "commands" | "best-practices" | "workflows" | "github" | "gitlab" | "internals" | "recovery">,
  limit = 3,
): Promise<DocCard[]> {
  const paths = representativeSectionPaths[section] ?? [];
  const docs = await Promise.all(paths.slice(0, limit).map((docPath) => getDocByPath(locale, docPath)));
  return docs.map((doc) => toDocCard(locale, doc));
}

export async function getLatestHomeDocs(locale: Locale, limit = 4): Promise<DocCard[]> {
  const docs = await Promise.all(
    latestHomeDocPaths.slice(0, limit).map((docPath) => getDocByPath(locale, docPath)),
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
      github: 0,
      gitlab: 0,
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

export async function getRecoveryDoc(locale: Locale, slug: RecoverySlug) {
  const docPath = `recovery/${slug}` as DocPath;
  return getDocByPath(locale, docPath);
}

export function getDocPathFromSlugParts(slugParts: string[]) {
  return slugParts.join("/") as DocPath;
}

export function getDocPrimer(locale: Locale, docPath: DocPath): DocPrimer {
  const section = docPath.split("/")[0] as DocSection;
  const defaults = primerDefaults[locale][section];
  const override = primerOverrides[locale][docPath];

  return {
    audience: Array.from(override?.audience ?? defaults.audience),
    prerequisites: Array.from(override?.prerequisites ?? defaults.prerequisites),
    risks: Array.from(override?.risks ?? defaults.risks),
  };
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
  const primer = getDocPrimer(locale, docPath);
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
  } else if (primer.prerequisites[0]) {
    suggestions.push({
      type: "prerequisite",
      title: primer.prerequisites[0],
    });
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
  } else if (primer.risks[0]) {
    suggestions.push({
      type: "risk",
      title: primer.risks[0],
    });
  }

  return suggestions.slice(0, 2);
}
