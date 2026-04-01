# Content Library

本目录用于维护 GitOrg Atlas 的教程素材，统一采用 Markdown / MDX 存储。

## 目录约定

- `content/zh/` 中文内容
- `content/en/` 英文内容
- 二级目录按主题拆分：
  - `learning-path/`
  - `commands/`
  - `best-practices/`
  - `workflows/`
  - `internals/`
  - `recovery/`
  - `concepts/`：仅保留历史页的独立路由内容载体，不再作为持续扩容的独立主题分区

## 内容边界

- `learning-path/`：面向新手和课程式上手，强调顺序和闭环
- `internals/`：面向模型理解，覆盖对象、引用、历史图和底层存储
- `recovery/`：面向误操作恢复、撤回和事故排查
- `concepts/`：当前仅用于承载 `/history` 独立页面，内容归属到 internals 知识线理解

## 内容质量分层

所有文档在内容层会被标记为以下三档，用于频道推荐、搜索排序和相关推荐：

- `core`：核心必读，优先推荐给第一次进入该主题的读者
- `recommended`：推荐进阶，适合核心内容之后继续扩展
- `extended`：延伸阅读，适合带着明确问题继续深挖

## 文档规范

每篇 MDX 文档建议包含：

1. `export const metadata = { ... }`
2. 标题与摘要
3. 核心概念
4. 操作步骤或示例
5. 常见误区 / 风险提示
6. 来源链接

## 当前已整理

- `zh/learning-path/quick-start.mdx`
- `zh/commands/git-rebase.mdx`
- `zh/commands/git-merge.mdx`
- `zh/commands/git-cherry-pick.mdx`
- `zh/commands/git-reset.mdx`
- `zh/commands/git-stash.mdx`
- `zh/commands/git-fetch.mdx`
- `zh/commands/git-init.mdx`
- `zh/commands/git-clone.mdx`
- `zh/commands/git-status.mdx`
- `zh/commands/git-add.mdx`
- `zh/commands/git-commit.mdx`
- `zh/commands/git-diff.mdx`
- `zh/commands/git-show.mdx`
- `zh/commands/git-log.mdx`
- `zh/commands/git-rm.mdx`
- `zh/commands/git-mv.mdx`
- `zh/commands/git-pull.mdx`
- `zh/commands/git-push.mdx`
- `zh/commands/git-tag.mdx`
- `zh/commands/git-remote.mdx`
- `zh/commands/git-clean.mdx`
- `zh/commands/git-restore.mdx`
- `zh/commands/git-revert.mdx`
- `zh/commands/git-switch.mdx`
- `zh/commands/git-branch.mdx`
- `zh/commands/git-reflog.mdx`
- `zh/commands/git-bisect.mdx`
- `zh/commands/git-blame.mdx`
- `zh/commands/git-checkout.mdx`
- `zh/best-practices/commit-hygiene.mdx`
- `zh/best-practices/topic-branches.mdx`
- `zh/best-practices/fetch-first-sync.mdx`
- `zh/best-practices/shared-history-boundaries.mdx`
- `zh/best-practices/review-and-safe-push.mdx`
- `zh/workflows/fetch-vs-pull.mdx`
- `zh/workflows/feature-branch-collaboration.mdx`
- `zh/workflows/sync-before-review.mdx`
- `zh/workflows/hotfix-and-urgent-fixes.mdx`
- `zh/workflows/multi-person-sync-routine.mdx`
- `zh/workflows/prepare-commits-before-pull-request.mdx`
- `zh/workflows/monorepo-sparse-checkout-workflow.mdx`
- `zh/workflows/hotfix-rollback-after-release.mdx`
- `zh/internals/object-database.mdx`
- `zh/internals/index-and-working-tree.mdx`
- `zh/internals/refs-and-head.mdx`
- `zh/internals/remote-tracking-refs.mdx`
- `zh/internals/commit-graph.mdx`
- `zh/internals/packfiles-and-storage.mdx`
- `zh/internals/reachability-and-garbage-collection.mdx`
- `zh/recovery/reflog-recovery.mdx`
- `zh/recovery/recover-after-reset.mdx`
- `zh/recovery/recover-after-rebase.mdx`
- `zh/recovery/recover-deleted-branch.mdx`
- `zh/recovery/detached-head-rescue.mdx`
- `zh/recovery/undo-after-pull.mdx`
- `zh/recovery/assess-force-push-impact.mdx`
- `zh/concepts/git-history.mdx`
- `en/learning-path/quick-start.mdx`
- `en/commands/git-rebase.mdx`
- `en/commands/git-merge.mdx`
- `en/commands/git-cherry-pick.mdx`
- `en/commands/git-reset.mdx`
- `en/commands/git-stash.mdx`
- `en/commands/git-fetch.mdx`
- `en/commands/git-init.mdx`
- `en/commands/git-clone.mdx`
- `en/commands/git-status.mdx`
- `en/commands/git-add.mdx`
- `en/commands/git-commit.mdx`
- `en/commands/git-diff.mdx`
- `en/commands/git-show.mdx`
- `en/commands/git-log.mdx`
- `en/commands/git-rm.mdx`
- `en/commands/git-mv.mdx`
- `en/commands/git-pull.mdx`
- `en/commands/git-push.mdx`
- `en/commands/git-tag.mdx`
- `en/commands/git-remote.mdx`
- `en/commands/git-clean.mdx`
- `en/commands/git-restore.mdx`
- `en/commands/git-revert.mdx`
- `en/commands/git-switch.mdx`
- `en/commands/git-branch.mdx`
- `en/commands/git-reflog.mdx`
- `en/commands/git-bisect.mdx`
- `en/commands/git-blame.mdx`
- `en/commands/git-checkout.mdx`
- `en/best-practices/commit-hygiene.mdx`
- `en/best-practices/topic-branches.mdx`
- `en/best-practices/fetch-first-sync.mdx`
- `en/best-practices/shared-history-boundaries.mdx`
- `en/best-practices/review-and-safe-push.mdx`
- `en/workflows/fetch-vs-pull.mdx`
- `en/workflows/feature-branch-collaboration.mdx`
- `en/workflows/sync-before-review.mdx`
- `en/workflows/hotfix-and-urgent-fixes.mdx`
- `en/workflows/multi-person-sync-routine.mdx`
- `en/workflows/prepare-commits-before-pull-request.mdx`
- `en/workflows/monorepo-sparse-checkout-workflow.mdx`
- `en/workflows/hotfix-rollback-after-release.mdx`
- `en/internals/object-database.mdx`
- `en/internals/index-and-working-tree.mdx`
- `en/internals/refs-and-head.mdx`
- `en/internals/remote-tracking-refs.mdx`
- `en/internals/commit-graph.mdx`
- `en/internals/packfiles-and-storage.mdx`
- `en/internals/reachability-and-garbage-collection.mdx`
- `en/recovery/reflog-recovery.mdx`
- `en/recovery/recover-after-reset.mdx`
- `en/recovery/recover-after-rebase.mdx`
- `en/recovery/recover-deleted-branch.mdx`
- `en/recovery/detached-head-rescue.mdx`
- `en/recovery/undo-after-pull.mdx`
- `en/recovery/assess-force-push-impact.mdx`
- `en/concepts/git-history.mdx`
