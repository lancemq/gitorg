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
import { contentModules } from "./content-modules";

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
    platforms: {
      audience: ["已经会基础 Git、准备系统学习 GitHub / GitLab 平台协作的人", "要在团队里使用 PR、Issue、MR、Actions 的开发者"],
      prerequisites: ["知道 branch、commit、push、remote 的基本作用", "愿意把平台功能和 Git 操作一起理解"],
      risks: ["只记平台按钮流程却忽略底层 Git 边界", "把平台规则当成可以替代本地历史判断"],
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
    devops: {
      audience: ["要在 CI/CD 与 IDE 中使用 Git 的开发者", "想理解管线中 Git 操作的边界和安全性"],
      prerequisites: ["知道 branch、commit、push 的基本用法", "有基础 CI/CD 概念"],
      risks: ["在 CI 中误用 GITHUB_TOKEN 导致安全风险", "不理解 shallow clone 和 partial clone 的区别", "依赖 IDE 操作而不理解底层 Git 行为"],
    },
    security: {
      audience: ["需要配置 Git 安全认证的开发者"],
      prerequisites: ["知道 SSH 的基本概念", "有命令行操作经验"],
      risks: ["密钥管理不当导致安全泄露", "不理解签名策略导致提效验证失败"],
    },
    performance: {
      audience: ["管理大型 Git 仓库的开发者", "需要优化 CI 流水线速度的人"],
      prerequisites: ["知道克隆和 fetch 的基本机制", "了解对象数据库的基本概念"],
      risks: ["在不支持 partial clone 的服务端使用", "sparse checkout 配置不当导致工作区不完整"],
    },
    migration: {
      audience: ["正在从 SVN 或 Hg 迁移到 Git 的团队"],
      prerequisites: ["知道 SVN 或 Hg 的基本操作", "有 Git 基础使用经验"],
      risks: ["迁移后作者信息丢失或映射错误", "大文件未处理导致迁移后仓库膨胀"],
    },
    hosting: {
      audience: ["正在选择 Git 托管方案的团队负责人或开发者"],
      prerequisites: ["知道 Git 远端操作的基础知识", "理解代码托管的基本需求"],
      risks: ["只对比功能列表而忽略运维成本", "自建方案选型后维护能力跟不上的风险"],
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
    platforms: {
      audience: ["Readers who know basic Git and now need GitHub or GitLab collaboration fluency", "Developers using pull requests, merge requests, issues, and Actions in real teams"],
      prerequisites: ["A basic sense of branches, commits, pushes, and remotes", "Willingness to connect platform features back to Git behavior"],
      risks: ["Memorizing platform UI steps without understanding the Git boundary underneath", "Assuming platform policy replaces local history judgment"],
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
    devops: {
      audience: ["Developers using Git in CI/CD pipelines and IDE integrations", "Readers who want to understand Git operation boundaries in automation"],
      prerequisites: ["Basic understanding of branch, commit, and push", "Basic CI/CD concepts"],
      risks: ["Misusing GITHUB_TOKEN causing security issues", "Not understanding the trade-off between shallow and partial clone", "Relying on IDE operations without understanding underlying Git behavior"],
    },
    security: {
      audience: ["Developers who need to configure Git security and authentication"],
      prerequisites: ["Basic SSH concepts", "Command-line experience"],
      risks: ["Poor key management leading to security leaks", "Not understanding signing policy causing verification failures"],
    },
    performance: {
      audience: ["Developers managing large Git repositories", "Developers optimizing CI pipeline speed"],
      prerequisites: ["Basic understanding of clone and fetch mechanisms", "Awareness of the object database concept"],
      risks: ["Using partial clone on unsupported servers", "Misconfigured sparse checkout leading to incomplete workspace"],
    },
    migration: {
      audience: ["Teams migrating from SVN or Hg to Git"],
      prerequisites: ["Basic knowledge of SVN or Hg operations", "Basic Git experience"],
      risks: ["Author information lost or mis-mapped after migration", "Large files not handled, causing repository bloat after migration"],
    },
    hosting: {
      audience: ["Team leads or developers choosing a Git hosting solution"],
      prerequisites: ["Basic Git remote operation knowledge", "Understanding of code hosting requirements"],
      risks: ["Comparing only feature lists while ignoring operational costs", "Choosing a self-hosted solution without sufficient maintenance capacity"],
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
  const mdxModule = (await contentModules[locale][docPath]()) as {
    default: ComponentType;
    // MDX modules declare `metadata` with a literal shape based on what each
    // file happens to set. We widen to DocMetadata here so callers can read
    // optional fields (author, createdAt, and GEO fields in later PRs)
    // without each file needing them — TypeScript would otherwise narrow
    // per-file and reject access.
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
  "learning-path/view-history-and-changes",
  "learning-path/undo-local-basics",
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
  "learning-path/view-history-and-changes": [
    "commands/git-status",
    "commands/git-diff",
    "commands/git-log",
  ],
  "learning-path/undo-local-basics": [
    "commands/git-restore",
    "commands/git-reset",
    "recovery/reflog-recovery",
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
  "learning-path/open-first-pull-request": [
    "platforms/pull-requests-and-reviews",
    "best-practices/pull-request-prep",
    "workflows/prepare-commits-before-pull-request",
  ],
  "learning-path/handle-review-feedback": [
    "best-practices/small-batch-review",
    "best-practices/code-review-handoff-quality",
    "commands/git-range-diff",
  ],
  "learning-path/merge-and-close-task": [
    "workflows/pr-merge-strategy-and-platform-settings",
    "commands/git-merge",
    "best-practices/review-and-safe-push",
  ],
  "learning-path/first-safe-hotfix": [
    "workflows/hotfix-and-urgent-fixes",
    "workflows/revert-first-stabilization-workflow",
    "recovery/recover-after-accidental-merge",
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
  "platforms/github-flow-basics": [
    "workflows/feature-branch-collaboration",
    "workflows/prepare-commits-before-pull-request",
    "platforms/pull-requests-and-reviews",
  ],
  "platforms/pull-requests-and-reviews": [
    "best-practices/pull-request-prep",
    "workflows/pr-merge-strategy-and-platform-settings",
    "platforms/issues-projects-and-discussions",
  ],
  "platforms/forks-and-open-source-contribution": [
    "workflows/open-source-fork-pr-contribution",
    "workflows/fork-upstream-sync",
    "best-practices/topic-branches",
  ],
  "platforms/issues-projects-and-discussions": [
    "workflows/feature-branch-collaboration",
    "best-practices/small-batch-review",
    "platforms/github-actions-and-skills",
  ],
  "platforms/github-actions-and-skills": [
    "workflows/merge-queue-workflow",
    "workflows/pr-merge-strategy-and-platform-settings",
    "commands/git-worktree",
  ],
  "platforms/github-branch-protection-and-rulesets": [
    "workflows/pr-merge-strategy-and-platform-settings",
    "best-practices/shared-history-boundaries",
    "platforms/pull-requests-and-reviews",
  ],
  "platforms/github-codeowners-and-review-ownership": [
    "best-practices/code-review-handoff-quality",
    "best-practices/small-batch-review",
    "platforms/pull-requests-and-reviews",
  ],
  "platforms/gitlab-flow-and-merge-requests": [
    "workflows/feature-branch-collaboration",
    "platforms/pull-requests-and-reviews",
    "best-practices/pull-request-prep",
  ],
  "platforms/gitlab-forks-and-contributions": [
    "workflows/open-source-fork-pr-contribution",
    "workflows/fork-upstream-sync",
    "best-practices/topic-branches",
  ],
  "platforms/gitlab-issues-boards-and-milestones": [
    "platforms/issues-projects-and-discussions",
    "workflows/feature-branch-collaboration",
    "best-practices/small-batch-review",
  ],
  "platforms/gitlab-groups-projects-and-permissions": [
    "best-practices/shared-history-boundaries",
    "workflows/shared-branch-sync-boundaries",
    "platforms/forks-and-open-source-contribution",
  ],
  "platforms/gitlab-ci-and-runners": [
    "platforms/github-actions-and-skills",
    "workflows/merge-queue-workflow",
    "workflows/pr-merge-strategy-and-platform-settings",
  ],
  "platforms/gitlab-protected-branches-and-approval-rules": [
    "platforms/gitlab-flow-and-merge-requests",
    "best-practices/shared-history-boundaries",
    "workflows/pr-merge-strategy-and-platform-settings",
  ],
  "platforms/gitlab-merge-trains-and-merge-result-pipelines": [
    "workflows/merge-queue-workflow",
    "platforms/gitlab-ci-and-runners",
    "platforms/gitlab-flow-and-merge-requests",
  ],
  "internals/plumbing-and-porcelain": [
    "commands/git-cat-file",
    "commands/git-update-index",
    "internals/object-database",
  ],
  "internals/repository-layout-and-gitdir": [
    "commands/git-worktree",
    "internals/object-database",
    "internals/environment-and-repository-variables",
  ],
  "internals/revision-selection-and-ranges": [
    "commands/git-log",
    "commands/git-rev-list",
    "internals/commit-graph",
  ],
  "internals/transfer-protocols-and-negotiation": [
    "commands/git-fetch",
    "commands/git-push",
    "internals/packfiles-and-storage",
  ],
  "internals/environment-and-repository-variables": [
    "commands/git-config",
    "commands/git-rev-parse",
    "internals/repository-layout-and-gitdir",
  ],
  "internals/three-way-merge-mechanics": [
    "internals/merge-base-and-ancestry",
    "commands/git-merge",
    "commands/git-merge-base",
  ],
  "internals/rename-detection-and-diff-algorithms": [
    "commands/git-diff",
    "commands/git-log",
    "internals/tree-objects-and-snapshots",
  ],
  "internals/rebase-internals-and-sequencer": [
    "commands/git-rebase",
    "internals/commit-graph",
    "recovery/recover-after-rebase",
  ],
  "internals/hooks-and-policy-enforcement": [
    "commands/git-commit",
    "commands/git-push",
    "best-practices/review-and-safe-push",
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
  "workflows/trunk-based-development-workflow": [
    "workflows/feature-branch-collaboration",
    "workflows/sync-before-review",
    "workflows/merge-queue-workflow",
  ],
  "workflows/stacked-pull-requests-workflow": [
    "commands/git-range-diff",
    "commands/git-rebase",
    "workflows/prepare-commits-before-pull-request",
  ],
  "workflows/bisect-regression-triage-workflow": [
    "commands/git-bisect",
    "commands/git-rev-list",
    "workflows/hotfix-and-urgent-fixes",
  ],
  "workflows/code-freeze-and-release-candidate-workflow": [
    "workflows/release-branch-workflow",
    "workflows/hotfix-and-urgent-fixes",
    "commands/git-tag",
  ],
  "workflows/revert-first-stabilization-workflow": [
    "commands/git-revert",
    "workflows/hotfix-and-urgent-fixes",
    "workflows/hotfix-rollback-after-release",
  ],
  "workflows/feature-flag-rollout-workflow": [
    "workflows/trunk-based-development-workflow",
    "workflows/sync-before-review",
    "workflows/release-branch-workflow",
  ],
  "workflows/release-train-workflow": [
    "workflows/code-freeze-and-release-candidate-workflow",
    "workflows/release-branch-workflow",
    "workflows/post-release-multi-branch-backporting",
  ],
  "workflows/cross-repo-integration-workflow": [
    "workflows/feature-branch-collaboration",
    "workflows/fork-upstream-sync",
    "workflows/merge-queue-workflow",
  ],
  "workflows/canary-release-workflow": [
    "workflows/feature-flag-rollout-workflow",
    "workflows/code-freeze-and-release-candidate-workflow",
    "workflows/revert-first-stabilization-workflow",
  ],
  "workflows/database-migration-safety-workflow": [
    "workflows/code-freeze-and-release-candidate-workflow",
    "workflows/release-branch-workflow",
    "workflows/hotfix-rollback-after-release",
  ],
  "workflows/api-versioning-change-workflow": [
    "workflows/cross-repo-integration-workflow",
    "workflows/feature-flag-rollout-workflow",
    "workflows/release-train-workflow",
  ],
  "workflows/incident-retro-to-guardrail-workflow": [
    "workflows/revert-first-stabilization-workflow",
    "workflows/bisect-regression-triage-workflow",
    "best-practices/release-hygiene",
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
  "best-practices/safe-force-push-protocol": [
    "best-practices/shared-history-boundaries",
    "recovery/assess-force-push-impact",
    "commands/git-push",
  ],
  "best-practices/commit-message-conventions": [
    "best-practices/commit-hygiene",
    "commands/git-commit",
    "workflows/prepare-commits-before-pull-request",
  ],
  "best-practices/release-checklist-discipline": [
    "best-practices/release-hygiene",
    "workflows/code-freeze-and-release-candidate-workflow",
    "workflows/release-branch-workflow",
  ],
  "best-practices/code-review-handoff-quality": [
    "best-practices/small-batch-review",
    "best-practices/pull-request-prep",
    "workflows/sync-before-review",
  ],
  "recovery/recover-lost-stash": [
    "commands/git-stash",
    "commands/git-reflog",
    "recovery/reflog-recovery",
  ],
  "recovery/recover-after-wrong-cherry-pick": [
    "commands/git-cherry-pick",
    "commands/git-revert",
    "recovery/recover-after-reset",
  ],
  "recovery/recover-after-accidental-merge": [
    "commands/git-merge",
    "commands/git-reset",
    "recovery/undo-after-pull",
  ],
  "recovery/recover-after-git-clean": [
    "commands/git-clean",
    "commands/git-stash",
    "recovery/reflog-recovery",
  ],
  "devops/jenkins-integration": [
    "devops/github-actions-basics",
    "devops/gitlab-ci-basics",
    "devops/ci-security-basics",
  ],
  "devops/ci-security-basics": [
    "security/credential-helper",
    "security/ssh-key-management",
    "devops/jenkins-integration",
  ],
  "devops/github-desktop": [
    "devops/terminal-git-ui",
    "devops/vscode-git",
    "learning-path/quick-start",
  ],
  "devops/terminal-git-ui": [
    "devops/github-desktop",
    "commands/git-log",
    "commands/git-diff",
  ],
  "security/credential-helper": [
    "security/ssh-key-management",
    "security/signing-advanced",
    "commands/git-config",
  ],
  "security/signing-advanced": [
    "security/gpg-signing",
    "security/credential-helper",
    "workflows/signing-commits-workflow",
  ],
  "performance/shallow-clone-deep": [
    "performance/partial-clone",
    "performance/large-repo-optimization",
    "commands/git-clone",
  ],
  "performance/gc-repack-strategies": [
    "internals/packfiles-and-storage",
    "performance/large-repo-optimization",
    "commands/git-gc",
  ],
  "migration/git-p4-perforce": [
    "migration/svn-to-git",
    "migration/hg-to-git",
    "migration/platform-migration",
  ],
  "migration/platform-migration": [
    "hosting/platform-comparison",
    "migration/svn-to-git",
    "migration/git-p4-perforce",
  ],
  "hosting/github-deep-dive": [
    "hosting/platform-comparison",
    "platforms/github-flow-basics",
    "hosting/gitea-setup",
  ],
  "hosting/gitea-setup": [
    "hosting/self-hosted-git",
    "hosting/github-deep-dive",
    "hosting/platform-comparison",
  ],
  "devops/circleci-git": [
    "devops/github-actions-basics",
    "devops/gitlab-ci-basics",
    "devops/ci-cd-testing-strategies",
  ],
  "devops/ci-cd-testing-strategies": [
    "devops/github-actions-basics",
    "devops/circleci-git",
    "devops/ci-cd-deployment-strategies",
  ],
  "devops/ci-cd-deployment-strategies": [
    "devops/ci-cd-testing-strategies",
    "devops/ci-security-basics",
    "workflows/release-branch-workflow",
  ],
  "devops/vim-neovim-git": [
    "devops/terminal-git-productivity",
    "devops/vscode-git",
    "commands/git-diff",
  ],
  "devops/intellij-git-deep": [
    "devops/jetbrains-git",
    "devops/vscode-git",
    "commands/git-log",
  ],
  "devops/terminal-git-productivity": [
    "devops/terminal-git-ui",
    "commands/git-config",
    "devops/vim-neovim-git",
  ],
  "security/secret-scanning": [
    "security/credential-helper",
    "security/git-security-audit",
    "best-practices/security-with-git",
  ],
  "security/secure-git-workflows": [
    "security/ssh-key-management",
    "security/gpg-signing",
    "workflows/signing-commits-workflow",
  ],
  "security/git-security-audit": [
    "security/secret-scanning",
    "security/secure-git-workflows",
    "commands/git-fsck",
  ],
  "migration/azure-devops-migration": [
    "migration/svn-to-git",
    "migration/migration-strategy-guide",
    "hosting/platform-comparison",
  ],
  "migration/git-filter-repo": [
    "migration/svn-to-git",
    "migration/migration-strategy-guide",
    "internals/reachability-and-garbage-collection",
  ],
  "migration/migration-strategy-guide": [
    "migration/svn-to-git",
    "migration/azure-devops-migration",
    "migration/git-filter-repo",
  ],
  "hosting/aws-codecommit": [
    "hosting/platform-comparison",
    "hosting/gerrit-code-review",
    "devops/ci-cd-deployment-strategies",
  ],
  "hosting/gerrit-code-review": [
    "hosting/github-deep-dive",
    "hosting/gitea-setup",
    "workflows/feature-branch-collaboration",
  ],
  "hosting/chinese-hosting-platforms": [
    "hosting/platform-comparison",
    "hosting/gitea-setup",
    "hosting/self-hosted-git",
  ],
  "concepts/git-lfs-deep": [
    "concepts/git-lfs",
    "concepts/git-hooks-deep",
    "performance/large-repo-optimization",
  ],
  "concepts/git-hooks-deep": [
    "concepts/git-hooks",
    "concepts/git-lfs-deep",
    "workflows/pre-commit-hook-workflow",
  ],
  "performance/git-maintenance": [
    "performance/gc-repack-strategies",
    "internals/packfiles-and-storage",
    "performance/large-repo-optimization",
  ],
  "performance/commit-graph-deep": [
    "internals/commit-graph",
    "performance/large-repo-optimization",
    "performance/git-maintenance",
  ],
  "performance/bundle-uri": [
    "performance/partial-clone",
    "internals/packfiles-and-storage",
    "commands/git-bundle",
  ],
  "performance/scalar-git": [
    "performance/large-repo-optimization",
    "performance/partial-clone",
    "performance/git-maintenance",
  ],
  "concepts/git-rebase-deep": [
    "commands/git-rebase",
    "internals/rebase-internals-and-sequencer",
    "concepts/merge-strategies",
  ],
  "concepts/git-merge-deep": [
    "commands/git-merge",
    "internals/three-way-merge-mechanics",
    "concepts/merge-strategies",
  ],
  "concepts/git-bisect-deep": [
    "commands/git-bisect",
    "workflows/bisect-regression-triage-workflow",
    "internals/commit-graph",
  ],
  "concepts/git-rerere-deep": [
    "commands/git-rerere",
    "workflows/rerere-for-recurring-conflicts",
    "concepts/git-merge-deep",
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
  const paths = representativeSectionPaths[section] ?? [];
  const docs = await Promise.all(paths.slice(0, limit).map((docPath) => getDocByPath(locale, docPath)));
  return docs.map((doc) => toDocCard(locale, doc));
}

export async function getLatestHomeDocs(locale: Locale, limit = 4): Promise<DocCard[]> {
  const candidatePaths: DocPath[] = [
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
