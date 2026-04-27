export type CommandSlug =
  | "git-init"
  | "git-clone"
  | "git-status"
  | "git-add"
  | "git-commit"
  | "git-diff"
  | "git-show"
  | "git-log"
  | "git-rm"
  | "git-mv"
  | "git-fetch"
  | "git-pull"
  | "git-push"
  | "git-switch"
  | "git-branch"
  | "git-tag"
  | "git-remote"
  | "git-rebase"
  | "git-merge"
  | "git-cherry-pick"
  | "git-reset"
  | "git-stash"
  | "git-restore"
  | "git-revert"
  | "git-reflog"
  | "git-bisect"
  | "git-blame"
  | "git-checkout"
  | "git-clean"
  | "git-config"
  | "git-help"
  | "git-describe"
  | "git-grep"
  | "git-shortlog"
  | "git-show-ref"
  | "git-rev-parse"
  | "git-am"
  | "git-apply"
  | "git-format-patch"
  | "git-send-email"
  | "git-request-pull"
  | "git-archive"
  | "git-bundle"
  | "git-worktree"
  | "git-submodule"
  | "git-sparse-checkout"
  | "git-cat-file"
  | "git-ls-files"
  | "git-ls-tree"
  | "git-read-tree"
  | "git-update-index"
  | "git-update-ref"
  | "git-symbolic-ref"
  | "git-rev-list"
  | "git-merge-base"
  | "git-notes"
  | "git-range-diff"
  | "git-cherry"
  | "git-mergetool"
  | "git-fsck"
  | "git-gc"
  | "git-count-objects"
  | "git-verify-pack"
  | "git-verify-tag"
  | "git-rerere"
  | "git-difftool"
  | "git-replace"
  | "git-prune"
  | "git-hash-object"
  | "git-interpret-trailers";

export type BestPracticeSlug =
  | "commit-hygiene"
  | "topic-branches"
  | "branch-workflow-and-lifecycle"
  | "fetch-first-sync"
  | "shared-history-boundaries"
  | "review-and-safe-push"
  | "atomic-commits"
  | "focused-commits-and-topic-branch-hygiene"
  | "branch-naming"
  | "pull-request-prep"
  | "pull-request-review-readiness"
  | "conflict-resolution-routine"
  | "release-hygiene"
  | "safe-cherry-picks"
  | "small-batch-review"
  | "safe-force-push-protocol"
  | "commit-message-conventions"
  | "release-checklist-discipline"
  | "code-review-handoff-quality"
  | "git-aliases"
  | "commit-message-advanced"
  | "security-with-git"
  | "tagging-and-versioning"
  | "bisect-friendly-commits"
  | "backup-before-rewrite";

export type WorkflowSlug =
  | "fetch-vs-pull"
  | "feature-branch-collaboration"
  | "gitflow-workflow"
  | "multi-person-sync-routine"
  | "prepare-commits-before-pull-request"
  | "parallel-work-with-worktree"
  | "ai-agent-worktree-mode"
  | "monorepo-sparse-checkout-workflow"
  | "rerere-for-recurring-conflicts"
  | "shared-branch-sync-boundaries"
  | "sync-before-review"
  | "pr-merge-strategy-and-platform-settings"
  | "merge-queue-workflow"
  | "hotfix-and-urgent-fixes"
  | "hotfix-rollback-after-release"
  | "open-source-fork-pr-contribution"
  | "release-branch-workflow"
  | "backport-with-cherry-pick"
  | "post-release-multi-branch-backporting"
  | "fork-upstream-sync"
  | "squash-vs-rebase-merge"
  | "long-lived-branch-maintenance"
  | "long-lived-branch-conflict-governance"
  | "submodule-update-flow"
  | "trunk-based-development-workflow"
  | "stacked-pull-requests-workflow"
  | "bisect-regression-triage-workflow"
  | "code-freeze-and-release-candidate-workflow"
  | "revert-first-stabilization-workflow"
  | "feature-flag-rollout-workflow"
  | "release-train-workflow"
  | "cross-repo-integration-workflow"
  | "canary-release-workflow"
  | "database-migration-safety-workflow"
  | "api-versioning-change-workflow"
  | "incident-retro-to-guardrail-workflow"
  | "pre-release-checklist"
  | "ci-optimization-with-git"
  | "trunk-based-development"
  | "signing-commits-workflow"
  | "pre-commit-hook-workflow"
  | "large-file-handling-workflow"
  | "rollback-deployment-workflow";

export type GithubSlug =
  | "github-flow-basics"
  | "pull-requests-and-reviews"
  | "forks-and-open-source-contribution"
  | "issues-projects-and-discussions"
  | "github-actions-and-skills"
  | "github-branch-protection-and-rulesets"
  | "github-codeowners-and-review-ownership";

export type GitlabSlug =
  | "gitlab-flow-and-merge-requests"
  | "gitlab-forks-and-contributions"
  | "gitlab-issues-boards-and-milestones"
  | "gitlab-groups-projects-and-permissions"
  | "gitlab-ci-and-runners"
  | "gitlab-protected-branches-and-approval-rules"
  | "gitlab-merge-trains-and-merge-result-pipelines";

export type InternalsSlug =
  | "object-database"
  | "plumbing-and-porcelain"
  | "index-and-working-tree"
  | "repository-layout-and-gitdir"
  | "refs-and-head"
  | "remote-tracking-refs"
  | "revision-selection-and-ranges"
  | "commit-graph"
  | "packfiles-and-storage"
  | "transfer-protocols-and-negotiation"
  | "environment-and-repository-variables"
  | "reachability-and-garbage-collection"
  | "merge-base-and-ancestry"
  | "tree-objects-and-snapshots"
  | "blob-objects-and-content-addressing"
  | "commit-message-and-parents"
  | "refspec-and-ref-updates"
  | "three-way-merge-mechanics"
  | "rename-detection-and-diff-algorithms"
  | "rebase-internals-and-sequencer"
  | "hooks-and-policy-enforcement";

export type RecoverySlug =
  | "reflog-recovery"
  | "recover-after-reset"
  | "recover-after-rebase"
  | "recover-deleted-branch"
  | "detached-head-rescue"
  | "undo-after-pull"
  | "assess-force-push-impact"
  | "recover-lost-stash"
  | "recover-after-wrong-cherry-pick"
  | "recover-after-accidental-merge"
  | "recover-after-git-clean"
  | "recover-after-cherry-pick"
  | "undo-merge-commit"
  | "fix-broken-interactive-rebase"
  | "recover-lost-commits"
  | "recover-from-corrupted-repo"
  | "fix-detached-head-accidentally-committed"
  | "fix-wrong-author-or-commit-message";

export type LearningPathSlug =
  | "quick-start"
  | "setup-and-clone"
  | "stage-and-commit"
  | "sync-with-remote"
  | "first-feature-branch"
  | "open-first-pull-request"
  | "handle-review-feedback"
  | "merge-and-close-task"
  | "first-safe-hotfix";

export type ConceptsSlug =
  | "three-layers"
  | "git-history"
  | "git-ignore"
  | "git-attributes"
  | "git-hooks"
  | "git-subtree"
  | "git-lfs"
  | "git-shallow";

export const learningPathSlugs = [
  "quick-start",
  "setup-and-clone",
  "stage-and-commit",
  "sync-with-remote",
  "first-feature-branch",
  "open-first-pull-request",
  "handle-review-feedback",
  "merge-and-close-task",
  "first-safe-hotfix",
] as const satisfies readonly LearningPathSlug[];

export const githubSlugs = [
  "github-flow-basics",
  "pull-requests-and-reviews",
  "forks-and-open-source-contribution",
  "issues-projects-and-discussions",
  "github-actions-and-skills",
  "github-branch-protection-and-rulesets",
  "github-codeowners-and-review-ownership",
] as const satisfies readonly GithubSlug[];

export const gitlabSlugs = [
  "gitlab-flow-and-merge-requests",
  "gitlab-forks-and-contributions",
  "gitlab-issues-boards-and-milestones",
  "gitlab-groups-projects-and-permissions",
  "gitlab-ci-and-runners",
  "gitlab-protected-branches-and-approval-rules",
  "gitlab-merge-trains-and-merge-result-pipelines",
] as const satisfies readonly GitlabSlug[];

export const commandSlugs = [
  "git-init",
  "git-clone",
  "git-status",
  "git-add",
  "git-commit",
  "git-diff",
  "git-show",
  "git-log",
  "git-rm",
  "git-mv",
  "git-fetch",
  "git-pull",
  "git-push",
  "git-switch",
  "git-branch",
  "git-tag",
  "git-remote",
  "git-rebase",
  "git-merge",
  "git-cherry-pick",
  "git-reset",
  "git-stash",
  "git-restore",
  "git-revert",
  "git-reflog",
  "git-bisect",
  "git-blame",
  "git-checkout",
  "git-clean",
  "git-config",
  "git-help",
  "git-describe",
  "git-grep",
  "git-shortlog",
  "git-show-ref",
  "git-rev-parse",
  "git-am",
  "git-apply",
  "git-format-patch",
  "git-send-email",
  "git-request-pull",
  "git-archive",
  "git-bundle",
  "git-worktree",
  "git-submodule",
  "git-sparse-checkout",
  "git-cat-file",
  "git-ls-files",
  "git-ls-tree",
  "git-read-tree",
  "git-update-index",
  "git-update-ref",
  "git-symbolic-ref",
  "git-rev-list",
  "git-merge-base",
  "git-notes",
  "git-range-diff",
  "git-cherry",
  "git-mergetool",
  "git-fsck",
  "git-gc",
  "git-count-objects",
  "git-verify-pack",
  "git-verify-tag",
  "git-rerere",
  "git-difftool",
  "git-replace",
  "git-prune",
  "git-hash-object",
  "git-interpret-trailers",
] as const;

export const basicCommandSlugs = [
  "git-init",
  "git-clone",
  "git-status",
  "git-add",
  "git-commit",
  "git-diff",
  "git-show",
  "git-log",
  "git-rm",
  "git-mv",
  "git-fetch",
  "git-pull",
  "git-push",
  "git-switch",
  "git-branch",
  "git-tag",
  "git-remote",
  "git-config",
  "git-help",
  "git-describe",
  "git-grep",
  "git-shortlog",
  "git-show-ref",
  "git-rev-parse",
] as const satisfies readonly CommandSlug[];

export const advancedCommandSlugs = [
  "git-rebase",
  "git-merge",
  "git-cherry-pick",
  "git-reset",
  "git-stash",
  "git-restore",
  "git-revert",
  "git-reflog",
  "git-bisect",
  "git-blame",
  "git-checkout",
  "git-clean",
  "git-am",
  "git-apply",
  "git-format-patch",
  "git-send-email",
  "git-request-pull",
  "git-archive",
  "git-bundle",
  "git-worktree",
  "git-submodule",
  "git-sparse-checkout",
  "git-cat-file",
  "git-ls-files",
  "git-ls-tree",
  "git-read-tree",
  "git-update-index",
  "git-update-ref",
  "git-symbolic-ref",
  "git-rev-list",
  "git-merge-base",
  "git-notes",
  "git-range-diff",
  "git-cherry",
  "git-mergetool",
  "git-fsck",
  "git-gc",
  "git-count-objects",
  "git-verify-pack",
  "git-verify-tag",
  "git-rerere",
  "git-difftool",
  "git-replace",
  "git-prune",
  "git-hash-object",
  "git-interpret-trailers",
] as const satisfies readonly CommandSlug[];

export const bestPracticeSlugs = [
  "commit-hygiene",
  "topic-branches",
  "branch-workflow-and-lifecycle",
  "fetch-first-sync",
  "shared-history-boundaries",
  "review-and-safe-push",
  "atomic-commits",
  "focused-commits-and-topic-branch-hygiene",
  "branch-naming",
  "pull-request-prep",
  "pull-request-review-readiness",
  "conflict-resolution-routine",
  "release-hygiene",
  "safe-cherry-picks",
  "small-batch-review",
  "safe-force-push-protocol",
  "commit-message-conventions",
  "release-checklist-discipline",
  "code-review-handoff-quality",
  "git-aliases",
  "commit-message-advanced",
  "security-with-git",
  "tagging-and-versioning",
  "bisect-friendly-commits",
  "backup-before-rewrite",
] as const satisfies readonly BestPracticeSlug[];

export const workflowSlugs = [
  "fetch-vs-pull",
  "feature-branch-collaboration",
  "gitflow-workflow",
  "multi-person-sync-routine",
  "prepare-commits-before-pull-request",
  "parallel-work-with-worktree",
  "ai-agent-worktree-mode",
  "monorepo-sparse-checkout-workflow",
  "rerere-for-recurring-conflicts",
  "shared-branch-sync-boundaries",
  "sync-before-review",
  "pr-merge-strategy-and-platform-settings",
  "merge-queue-workflow",
  "hotfix-and-urgent-fixes",
  "hotfix-rollback-after-release",
  "open-source-fork-pr-contribution",
  "release-branch-workflow",
  "backport-with-cherry-pick",
  "post-release-multi-branch-backporting",
  "fork-upstream-sync",
  "squash-vs-rebase-merge",
  "long-lived-branch-maintenance",
  "long-lived-branch-conflict-governance",
  "submodule-update-flow",
  "trunk-based-development-workflow",
  "stacked-pull-requests-workflow",
  "bisect-regression-triage-workflow",
  "code-freeze-and-release-candidate-workflow",
  "revert-first-stabilization-workflow",
  "feature-flag-rollout-workflow",
  "release-train-workflow",
  "cross-repo-integration-workflow",
  "canary-release-workflow",
  "database-migration-safety-workflow",
  "api-versioning-change-workflow",
  "incident-retro-to-guardrail-workflow",
  "pre-release-checklist",
  "ci-optimization-with-git",
  "trunk-based-development",
  "signing-commits-workflow",
  "pre-commit-hook-workflow",
  "large-file-handling-workflow",
  "rollback-deployment-workflow",
] as const satisfies readonly WorkflowSlug[];

export const recoverySlugs = [
  "reflog-recovery",
  "recover-after-reset",
  "recover-after-rebase",
  "recover-deleted-branch",
  "detached-head-rescue",
  "undo-after-pull",
  "assess-force-push-impact",
  "recover-lost-stash",
  "recover-after-wrong-cherry-pick",
  "recover-after-accidental-merge",
  "recover-after-git-clean",
  "recover-after-cherry-pick",
  "undo-merge-commit",
  "fix-broken-interactive-rebase",
  "recover-lost-commits",
  "recover-from-corrupted-repo",
  "fix-detached-head-accidentally-committed",
  "fix-wrong-author-or-commit-message",
] as const satisfies readonly RecoverySlug[];

export const conceptSlugs = [
  "three-layers",
  "git-history",
  "git-ignore",
  "git-attributes",
  "git-hooks",
  "git-subtree",
  "git-lfs",
  "git-shallow",
] as const satisfies readonly ConceptsSlug[];

export const internalsSlugs = [
  "object-database",
  "plumbing-and-porcelain",
  "index-and-working-tree",
  "repository-layout-and-gitdir",
  "refs-and-head",
  "remote-tracking-refs",
  "revision-selection-and-ranges",
  "commit-graph",
  "packfiles-and-storage",
  "transfer-protocols-and-negotiation",
  "environment-and-repository-variables",
  "reachability-and-garbage-collection",
  "merge-base-and-ancestry",
  "tree-objects-and-snapshots",
  "blob-objects-and-content-addressing",
  "commit-message-and-parents",
  "refspec-and-ref-updates",
  "three-way-merge-mechanics",
  "rename-detection-and-diff-algorithms",
  "rebase-internals-and-sequencer",
  "hooks-and-policy-enforcement",
] as const satisfies readonly InternalsSlug[];
