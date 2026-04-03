import type { SearchDoc } from "@/lib/content";
import type { Locale } from "@/lib/i18n";

export const staticSearchIndex: Record<Locale, SearchDoc[]> = {
  "zh": [
    {
      "href": "/zh/learning-path",
      "path": "learning-path/quick-start",
      "section": "learning-path",
      "tier": "core",
      "slug": "quick-start",
      "title": "Git 快速上手专题",
      "summary": "把 Git 初学者最需要建立的最小闭环拆成一个可分步学习的专题，包括环境准备、暂存与提交、远端同步和第一个特性分支。",
      "suggestions": []
    },
    {
      "href": "/zh/docs/learning-path/setup-and-clone",
      "path": "learning-path/setup-and-clone",
      "section": "learning-path",
      "tier": "core",
      "slug": "setup-and-clone",
      "title": "环境与 clone",
      "summary": "完成 Git 初学阶段最基础的准备动作：配置身份、拿到仓库、看懂首次 clone 后本地到底多了什么。",
      "suggestions": []
    },
    {
      "href": "/zh/docs/learning-path/stage-and-commit",
      "path": "learning-path/stage-and-commit",
      "section": "learning-path",
      "tier": "core",
      "slug": "stage-and-commit",
      "title": "暂存与 commit",
      "summary": "理解工作区、暂存区和提交历史三层模型，并把文件修改稳定地变成清晰、可复用的本地提交。",
      "suggestions": []
    },
    {
      "href": "/zh/docs/learning-path/sync-with-remote",
      "path": "learning-path/sync-with-remote",
      "section": "learning-path",
      "tier": "core",
      "slug": "sync-with-remote",
      "title": "远端同步",
      "summary": "把 fetch、pull、push 拆成“观察、整合、发布”三个动作来理解，减少初学者对同步操作的误判。",
      "suggestions": []
    },
    {
      "href": "/zh/docs/learning-path/first-feature-branch",
      "path": "learning-path/first-feature-branch",
      "section": "learning-path",
      "tier": "core",
      "slug": "first-feature-branch",
      "title": "第一个特性分支",
      "summary": "从单人闭环进入最简单的协作节奏：创建特性分支、提交改动、同步主分支，并理解 merge 与 rebase 的边界。",
      "suggestions": []
    },
    {
      "href": "/zh/commands/git-init",
      "path": "commands/git-init",
      "section": "commands",
      "tier": "core",
      "slug": "git-init",
      "title": "git init 教程",
      "summary": "解释 git init 如何初始化仓库、默认分支如何产生，以及它在新项目和已有目录中的常见用法。",
      "suggestions": []
    },
    {
      "href": "/zh/commands/git-clone",
      "path": "commands/git-clone",
      "section": "commands",
      "tier": "core",
      "slug": "git-clone",
      "title": "git clone 教程",
      "summary": "说明 git clone 如何复制仓库、默认远端 origin 的作用，以及克隆后本地分支与远端分支的基本关系。",
      "suggestions": []
    },
    {
      "href": "/zh/commands/git-status",
      "path": "commands/git-status",
      "section": "commands",
      "tier": "core",
      "slug": "git-status",
      "title": "git status 教程",
      "summary": "讲清 git status 如何查看工作区、暂存区和分支状态，以及它为什么是日常最应该频繁使用的命令之一。",
      "suggestions": []
    },
    {
      "href": "/zh/commands/git-add",
      "path": "commands/git-add",
      "section": "commands",
      "tier": "core",
      "slug": "git-add",
      "title": "git add 教程",
      "summary": "说明 git add 如何把工作区改动加入暂存区，以及为什么理解暂存区是学会提交质量的关键。",
      "suggestions": []
    },
    {
      "href": "/zh/commands/git-commit",
      "path": "commands/git-commit",
      "section": "commands",
      "tier": "core",
      "slug": "git-commit",
      "title": "git commit 教程",
      "summary": "解释 git commit 如何生成新历史节点、写好提交信息，以及 amend 与普通提交的边界。",
      "suggestions": []
    },
    {
      "href": "/zh/commands/git-diff",
      "path": "commands/git-diff",
      "section": "commands",
      "tier": "recommended",
      "slug": "git-diff",
      "title": "git diff 教程",
      "summary": "讲清 git diff 如何比较工作区、暂存区和提交之间的差异，以及最常见的几种比较方式。",
      "suggestions": []
    },
    {
      "href": "/zh/commands/git-show",
      "path": "commands/git-show",
      "section": "commands",
      "tier": "recommended",
      "slug": "git-show",
      "title": "git show",
      "summary": "查看某个提交、标签或对象的详细内容，是把历史节点和对象读清楚的高频命令。",
      "suggestions": []
    },
    {
      "href": "/zh/commands/git-log",
      "path": "commands/git-log",
      "section": "commands",
      "tier": "core",
      "slug": "git-log",
      "title": "git log 教程",
      "summary": "说明 git log 如何查看提交历史、图结构和作者信息，以及哪些参数最适合日常排查和阅读历史。",
      "suggestions": []
    },
    {
      "href": "/zh/commands/git-rm",
      "path": "commands/git-rm",
      "section": "commands",
      "tier": "extended",
      "slug": "git-rm",
      "title": "git rm",
      "summary": "删除已跟踪文件并同步到暂存区，理解它有助于区分文件系统删除和 Git 记录删除。",
      "suggestions": []
    },
    {
      "href": "/zh/commands/git-mv",
      "path": "commands/git-mv",
      "section": "commands",
      "tier": "extended",
      "slug": "git-mv",
      "title": "git mv",
      "summary": "用于重命名或移动已跟踪文件，帮助你把文件系统变化和暂存区状态一次保持一致。",
      "suggestions": []
    },
    {
      "href": "/zh/commands/git-fetch",
      "path": "commands/git-fetch",
      "section": "commands",
      "tier": "core",
      "slug": "git-fetch",
      "title": "git fetch 教程",
      "summary": "解释 git fetch 如何更新远端引用、为何它比 pull 更可控，以及它在日常同步中的最佳位置。",
      "suggestions": []
    },
    {
      "href": "/zh/commands/git-pull",
      "path": "commands/git-pull",
      "section": "commands",
      "tier": "core",
      "slug": "git-pull",
      "title": "git pull 教程",
      "summary": "解释 git pull 是 fetch 加整合的组合命令，以及为何很多团队更推荐 fetch-first 或 ff-only 的保守策略。",
      "suggestions": []
    },
    {
      "href": "/zh/commands/git-push",
      "path": "commands/git-push",
      "section": "commands",
      "tier": "core",
      "slug": "git-push",
      "title": "git push 教程",
      "summary": "说明 git push 如何发布本地分支、设置上游分支，以及 force-with-lease 为什么比裸 force 更安全。",
      "suggestions": []
    },
    {
      "href": "/zh/commands/git-switch",
      "path": "commands/git-switch",
      "section": "commands",
      "tier": "core",
      "slug": "git-switch",
      "title": "git switch 教程",
      "summary": "介绍 git switch 如何负责切换和创建分支，以及它相对 checkout 更清晰的职责边界。",
      "suggestions": []
    },
    {
      "href": "/zh/commands/git-branch",
      "path": "commands/git-branch",
      "section": "commands",
      "tier": "core",
      "slug": "git-branch",
      "title": "git branch 教程",
      "summary": "系统说明 git branch 如何查看、创建、重命名和删除分支，以及它与远端跟踪分支的关系。",
      "suggestions": []
    },
    {
      "href": "/zh/commands/git-tag",
      "path": "commands/git-tag",
      "section": "commands",
      "tier": "recommended",
      "slug": "git-tag",
      "title": "git tag 教程",
      "summary": "介绍 git tag 如何标记发布点、轻量标签和附注标签的区别，以及标签推送的基本方式。",
      "suggestions": []
    },
    {
      "href": "/zh/commands/git-remote",
      "path": "commands/git-remote",
      "section": "commands",
      "tier": "recommended",
      "slug": "git-remote",
      "title": "git remote 教程",
      "summary": "讲清 git remote 如何查看、添加、修改和删除远端仓库定义，以及 origin 在协作中的典型角色。",
      "suggestions": []
    },
    {
      "href": "/zh/commands/git-rebase",
      "path": "commands/git-rebase",
      "section": "commands",
      "tier": "core",
      "slug": "git-rebase",
      "title": "git rebase 教程",
      "summary": "解释 git rebase 的核心模型、推荐流程、风险边界和恢复办法。",
      "suggestions": []
    },
    {
      "href": "/zh/commands/git-merge",
      "path": "commands/git-merge",
      "section": "commands",
      "tier": "core",
      "slug": "git-merge",
      "title": "git merge 教程",
      "summary": "解释 git merge 的核心作用、fast-forward 与 merge commit 的区别，以及冲突处理策略。",
      "suggestions": []
    },
    {
      "href": "/zh/commands/git-cherry-pick",
      "path": "commands/git-cherry-pick",
      "section": "commands",
      "tier": "core",
      "slug": "git-cherry-pick",
      "title": "git cherry-pick 教程",
      "summary": "解释如何把某个提交的改动拣选到当前分支，以及 cherry-pick 的典型适用边界。",
      "suggestions": []
    },
    {
      "href": "/zh/commands/git-reset",
      "path": "commands/git-reset",
      "section": "commands",
      "tier": "core",
      "slug": "git-reset",
      "title": "git reset 教程",
      "summary": "解释 git reset 如何移动 HEAD、分支和暂存区，并区分 --soft、--mixed、--hard 的影响范围。",
      "suggestions": []
    },
    {
      "href": "/zh/commands/git-stash",
      "path": "commands/git-stash",
      "section": "commands",
      "tier": "core",
      "slug": "git-stash",
      "title": "git stash 教程",
      "summary": "解释如何用 git stash 临时保存未提交改动，并在后续恢复、查看和清理 stash 条目。",
      "suggestions": []
    },
    {
      "href": "/zh/commands/git-restore",
      "path": "commands/git-restore",
      "section": "commands",
      "tier": "core",
      "slug": "git-restore",
      "title": "git restore 教程",
      "summary": "说明 git restore 如何恢复工作区和暂存区中的文件状态，以及它和 reset、checkout 的边界。",
      "suggestions": []
    },
    {
      "href": "/zh/commands/git-revert",
      "path": "commands/git-revert",
      "section": "commands",
      "tier": "core",
      "slug": "git-revert",
      "title": "git revert 教程",
      "summary": "讲清 git revert 为什么适合撤销已共享提交，以及它和 reset 在历史表达上的关键区别。",
      "suggestions": []
    },
    {
      "href": "/zh/commands/git-reflog",
      "path": "commands/git-reflog",
      "section": "commands",
      "tier": "core",
      "slug": "git-reflog",
      "title": "git reflog",
      "summary": "查看引用移动历史，是 reset、rebase、误删分支等恢复场景里最常用的自救命令之一。",
      "suggestions": []
    },
    {
      "href": "/zh/commands/git-bisect",
      "path": "commands/git-bisect",
      "section": "commands",
      "tier": "recommended",
      "slug": "git-bisect",
      "title": "git bisect",
      "summary": "通过二分法定位引入 bug 的提交，是排查回归问题时最有价值的高级命令之一。",
      "suggestions": []
    },
    {
      "href": "/zh/commands/git-blame",
      "path": "commands/git-blame",
      "section": "commands",
      "tier": "recommended",
      "slug": "git-blame",
      "title": "git blame",
      "summary": "定位某一行代码最后由哪个提交引入或修改，适合排查行为来源和上下文。",
      "suggestions": []
    },
    {
      "href": "/zh/commands/git-checkout",
      "path": "commands/git-checkout",
      "section": "commands",
      "tier": "recommended",
      "slug": "git-checkout",
      "title": "git checkout 教程",
      "summary": "说明 git checkout 作为旧式多用途命令的两大职责，以及它与 switch、restore 的现代分工。",
      "suggestions": []
    },
    {
      "href": "/zh/commands/git-clean",
      "path": "commands/git-clean",
      "section": "commands",
      "tier": "recommended",
      "slug": "git-clean",
      "title": "git clean 教程",
      "summary": "解释 git clean 如何删除未跟踪文件和目录，以及为什么 dry-run 和 force 标志在这里非常重要。",
      "suggestions": []
    },
    {
      "href": "/zh/commands/git-config",
      "path": "commands/git-config",
      "section": "commands",
      "tier": "extended",
      "slug": "git-config",
      "title": "git-config 教程",
      "summary": "解释如何用 git-config 查看和修改 Git 配置。",
      "suggestions": []
    },
    {
      "href": "/zh/commands/git-help",
      "path": "commands/git-help",
      "section": "commands",
      "tier": "extended",
      "slug": "git-help",
      "title": "git-help 教程",
      "summary": "解释如何用 git-help 查阅命令帮助和手册页。",
      "suggestions": []
    },
    {
      "href": "/zh/commands/git-describe",
      "path": "commands/git-describe",
      "section": "commands",
      "tier": "extended",
      "slug": "git-describe",
      "title": "git-describe 教程",
      "summary": "解释如何用 git-describe 用最近标签描述当前提交。",
      "suggestions": []
    },
    {
      "href": "/zh/commands/git-grep",
      "path": "commands/git-grep",
      "section": "commands",
      "tier": "extended",
      "slug": "git-grep",
      "title": "git-grep 教程",
      "summary": "解释如何用 git-grep 在仓库内容中搜索文本。",
      "suggestions": []
    },
    {
      "href": "/zh/commands/git-shortlog",
      "path": "commands/git-shortlog",
      "section": "commands",
      "tier": "extended",
      "slug": "git-shortlog",
      "title": "git-shortlog 教程",
      "summary": "解释如何用 git-shortlog 按作者和主题汇总提交历史。",
      "suggestions": []
    },
    {
      "href": "/zh/commands/git-show-ref",
      "path": "commands/git-show-ref",
      "section": "commands",
      "tier": "extended",
      "slug": "git-show-ref",
      "title": "git-show-ref 教程",
      "summary": "解释如何用 git-show-ref 列出仓库中的引用及其目标。",
      "suggestions": []
    },
    {
      "href": "/zh/commands/git-rev-parse",
      "path": "commands/git-rev-parse",
      "section": "commands",
      "tier": "extended",
      "slug": "git-rev-parse",
      "title": "git-rev-parse 教程",
      "summary": "解释如何用 git-rev-parse 解析修订表达式和仓库路径信息。",
      "suggestions": []
    },
    {
      "href": "/zh/commands/git-am",
      "path": "commands/git-am",
      "section": "commands",
      "tier": "extended",
      "slug": "git-am",
      "title": "git-am 教程",
      "summary": "解释如何用 git-am 把邮件格式的补丁序列应用到当前分支。",
      "suggestions": []
    },
    {
      "href": "/zh/commands/git-apply",
      "path": "commands/git-apply",
      "section": "commands",
      "tier": "extended",
      "slug": "git-apply",
      "title": "git-apply 教程",
      "summary": "解释如何用 git-apply 把补丁内容应用到工作区或暂存区。",
      "suggestions": []
    },
    {
      "href": "/zh/commands/git-format-patch",
      "path": "commands/git-format-patch",
      "section": "commands",
      "tier": "extended",
      "slug": "git-format-patch",
      "title": "git-format-patch 教程",
      "summary": "解释如何用 git-format-patch 把提交导出成可发送的补丁文件。",
      "suggestions": []
    },
    {
      "href": "/zh/commands/git-send-email",
      "path": "commands/git-send-email",
      "section": "commands",
      "tier": "extended",
      "slug": "git-send-email",
      "title": "git-send-email 教程",
      "summary": "解释如何用 git-send-email 把补丁邮件发送到邮件列表或评审流程。",
      "suggestions": []
    },
    {
      "href": "/zh/commands/git-request-pull",
      "path": "commands/git-request-pull",
      "section": "commands",
      "tier": "extended",
      "slug": "git-request-pull",
      "title": "git-request-pull 教程",
      "summary": "解释如何用 git-request-pull 生成一段可交给维护者的拉取说明。",
      "suggestions": []
    },
    {
      "href": "/zh/commands/git-archive",
      "path": "commands/git-archive",
      "section": "commands",
      "tier": "extended",
      "slug": "git-archive",
      "title": "git-archive 教程",
      "summary": "解释如何用 git-archive 从某个提交或树对象导出归档包。",
      "suggestions": []
    },
    {
      "href": "/zh/commands/git-bundle",
      "path": "commands/git-bundle",
      "section": "commands",
      "tier": "extended",
      "slug": "git-bundle",
      "title": "git-bundle 教程",
      "summary": "解释如何用 git-bundle 把仓库历史打包成可离线传输的 bundle。",
      "suggestions": []
    },
    {
      "href": "/zh/commands/git-worktree",
      "path": "commands/git-worktree",
      "section": "commands",
      "tier": "recommended",
      "slug": "git-worktree",
      "title": "git-worktree 教程",
      "summary": "解释如何用 git-worktree 为同一仓库创建多个工作树。",
      "suggestions": []
    },
    {
      "href": "/zh/commands/git-submodule",
      "path": "commands/git-submodule",
      "section": "commands",
      "tier": "recommended",
      "slug": "git-submodule",
      "title": "git-submodule 教程",
      "summary": "解释如何用 git-submodule 管理嵌入仓库中的子模块依赖。",
      "suggestions": []
    },
    {
      "href": "/zh/commands/git-sparse-checkout",
      "path": "commands/git-sparse-checkout",
      "section": "commands",
      "tier": "extended",
      "slug": "git-sparse-checkout",
      "title": "git-sparse-checkout 教程",
      "summary": "解释如何用 git-sparse-checkout 只检出仓库中的部分目录。",
      "suggestions": []
    },
    {
      "href": "/zh/commands/git-cat-file",
      "path": "commands/git-cat-file",
      "section": "commands",
      "tier": "extended",
      "slug": "git-cat-file",
      "title": "git-cat-file 教程",
      "summary": "解释如何用 git-cat-file 直接查看 Git 对象的类型和内容。",
      "suggestions": []
    },
    {
      "href": "/zh/commands/git-ls-files",
      "path": "commands/git-ls-files",
      "section": "commands",
      "tier": "extended",
      "slug": "git-ls-files",
      "title": "git-ls-files 教程",
      "summary": "解释如何用 git-ls-files 列出索引和工作区里的受跟踪路径。",
      "suggestions": []
    },
    {
      "href": "/zh/commands/git-ls-tree",
      "path": "commands/git-ls-tree",
      "section": "commands",
      "tier": "extended",
      "slug": "git-ls-tree",
      "title": "git-ls-tree 教程",
      "summary": "解释如何用 git-ls-tree 列出某个树对象中的目录和文件条目。",
      "suggestions": []
    },
    {
      "href": "/zh/commands/git-read-tree",
      "path": "commands/git-read-tree",
      "section": "commands",
      "tier": "extended",
      "slug": "git-read-tree",
      "title": "git-read-tree 教程",
      "summary": "解释如何用 git-read-tree 把树对象读入索引进行底层操作。",
      "suggestions": []
    },
    {
      "href": "/zh/commands/git-update-index",
      "path": "commands/git-update-index",
      "section": "commands",
      "tier": "extended",
      "slug": "git-update-index",
      "title": "git-update-index 教程",
      "summary": "解释如何用 git-update-index 直接修改索引中的条目和属性。",
      "suggestions": []
    },
    {
      "href": "/zh/commands/git-update-ref",
      "path": "commands/git-update-ref",
      "section": "commands",
      "tier": "extended",
      "slug": "git-update-ref",
      "title": "git-update-ref 教程",
      "summary": "解释如何用 git-update-ref 以更底层的方式更新引用。",
      "suggestions": []
    },
    {
      "href": "/zh/commands/git-symbolic-ref",
      "path": "commands/git-symbolic-ref",
      "section": "commands",
      "tier": "extended",
      "slug": "git-symbolic-ref",
      "title": "git-symbolic-ref 教程",
      "summary": "解释如何用 git-symbolic-ref 读取或修改符号引用如 HEAD。",
      "suggestions": []
    },
    {
      "href": "/zh/commands/git-rev-list",
      "path": "commands/git-rev-list",
      "section": "commands",
      "tier": "extended",
      "slug": "git-rev-list",
      "title": "git-rev-list 教程",
      "summary": "解释如何用 git-rev-list 以脚本友好的方式枚举提交集合。",
      "suggestions": []
    },
    {
      "href": "/zh/commands/git-merge-base",
      "path": "commands/git-merge-base",
      "section": "commands",
      "tier": "extended",
      "slug": "git-merge-base",
      "title": "git-merge-base 教程",
      "summary": "解释如何用 git-merge-base 找出两个历史之间的最佳共同祖先。",
      "suggestions": []
    },
    {
      "href": "/zh/commands/git-notes",
      "path": "commands/git-notes",
      "section": "commands",
      "tier": "extended",
      "slug": "git-notes",
      "title": "git-notes 教程",
      "summary": "解释如何用 git-notes 给提交附加额外说明而不改写原提交。",
      "suggestions": []
    },
    {
      "href": "/zh/commands/git-range-diff",
      "path": "commands/git-range-diff",
      "section": "commands",
      "tier": "extended",
      "slug": "git-range-diff",
      "title": "git-range-diff 教程",
      "summary": "解释如何用 git-range-diff 比较两组提交序列之间的差异。",
      "suggestions": []
    },
    {
      "href": "/zh/commands/git-cherry",
      "path": "commands/git-cherry",
      "section": "commands",
      "tier": "extended",
      "slug": "git-cherry",
      "title": "git-cherry 教程",
      "summary": "解释如何用 git-cherry 判断哪些提交尚未被另一条历史吸收。",
      "suggestions": []
    },
    {
      "href": "/zh/commands/git-mergetool",
      "path": "commands/git-mergetool",
      "section": "commands",
      "tier": "extended",
      "slug": "git-mergetool",
      "title": "git-mergetool 教程",
      "summary": "解释如何用 git-mergetool 调用外部工具辅助解决合并冲突。",
      "suggestions": []
    },
    {
      "href": "/zh/commands/git-fsck",
      "path": "commands/git-fsck",
      "section": "commands",
      "tier": "extended",
      "slug": "git-fsck",
      "title": "git-fsck 教程",
      "summary": "解释如何用 git-fsck 检查对象库和引用的完整性。",
      "suggestions": []
    },
    {
      "href": "/zh/commands/git-gc",
      "path": "commands/git-gc",
      "section": "commands",
      "tier": "extended",
      "slug": "git-gc",
      "title": "git-gc 教程",
      "summary": "解释如何用 git-gc 执行垃圾回收和仓库整理。",
      "suggestions": []
    },
    {
      "href": "/zh/commands/git-count-objects",
      "path": "commands/git-count-objects",
      "section": "commands",
      "tier": "extended",
      "slug": "git-count-objects",
      "title": "git-count-objects 教程",
      "summary": "解释如何用 git-count-objects 统计松散对象和包文件的数量。",
      "suggestions": []
    },
    {
      "href": "/zh/commands/git-verify-pack",
      "path": "commands/git-verify-pack",
      "section": "commands",
      "tier": "extended",
      "slug": "git-verify-pack",
      "title": "git-verify-pack 教程",
      "summary": "解释如何用 git-verify-pack 检查 pack 文件中的对象和偏移信息。",
      "suggestions": []
    },
    {
      "href": "/zh/commands/git-verify-tag",
      "path": "commands/git-verify-tag",
      "section": "commands",
      "tier": "extended",
      "slug": "git-verify-tag",
      "title": "git-verify-tag 教程",
      "summary": "解释如何用 git-verify-tag 验证带签名标签的真实性。",
      "suggestions": []
    },
    {
      "href": "/zh/best-practices/commit-hygiene",
      "path": "best-practices/commit-hygiene",
      "section": "best-practices",
      "tier": "core",
      "slug": "commit-hygiene",
      "title": "提交卫生与提交信息",
      "summary": "把提交拆成逻辑独立的 changeset，并用可读的提交信息表达意图、动机和边界，让 review、revert 和 cherry-pick 都更轻。",
      "suggestions": []
    },
    {
      "href": "/zh/best-practices/topic-branches",
      "path": "best-practices/topic-branches",
      "section": "best-practices",
      "tier": "recommended",
      "slug": "topic-branches",
      "title": "主题分支策略",
      "summary": "用 topic branch 隔离单项工作，让并行开发、回滚、rebase、review 和发布边界都更清楚。",
      "suggestions": []
    },
    {
      "href": "/zh/best-practices/fetch-first-sync",
      "path": "best-practices/fetch-first-sync",
      "section": "best-practices",
      "tier": "core",
      "slug": "fetch-first-sync",
      "title": "先 fetch 再同步",
      "summary": "把观察远端状态和真正改写本地分支分开，避免把同步决策完全交给默认 pull 行为。",
      "suggestions": []
    },
    {
      "href": "/zh/best-practices/shared-history-boundaries",
      "path": "best-practices/shared-history-boundaries",
      "section": "best-practices",
      "tier": "core",
      "slug": "shared-history-boundaries",
      "title": "共享历史的改写边界",
      "summary": "明确哪些历史可以放心整理，哪些历史应该默认视为共享并谨慎处理，避免 rebase、amend、reset 和 force push 伤到别人。",
      "suggestions": []
    },
    {
      "href": "/zh/best-practices/review-and-safe-push",
      "path": "best-practices/review-and-safe-push",
      "section": "best-practices",
      "tier": "core",
      "slug": "review-and-safe-push",
      "title": "评审前整理与安全推送",
      "summary": "在发起评审和推送之前，用一套轻量检查动作整理提交栈、确认差异范围，并优先采用更保守的推送方式。",
      "suggestions": []
    },
    {
      "href": "/zh/best-practices/atomic-commits",
      "path": "best-practices/atomic-commits",
      "section": "best-practices",
      "tier": "core",
      "slug": "atomic-commits",
      "title": "原子提交专题",
      "summary": "把一次提交收敛成单一逻辑变更，降低 review 和回滚成本。",
      "suggestions": []
    },
    {
      "href": "/zh/best-practices/branch-naming",
      "path": "best-practices/branch-naming",
      "section": "best-practices",
      "tier": "recommended",
      "slug": "branch-naming",
      "title": "分支命名约定专题",
      "summary": "建立稳定的分支命名模式，提升协作、自动化和排错效率。",
      "suggestions": []
    },
    {
      "href": "/zh/best-practices/pull-request-prep",
      "path": "best-practices/pull-request-prep",
      "section": "best-practices",
      "tier": "recommended",
      "slug": "pull-request-prep",
      "title": "提交评审前准备专题",
      "summary": "在发起评审前收敛提交、同步基线并清理噪音改动。",
      "suggestions": []
    },
    {
      "href": "/zh/best-practices/conflict-resolution-routine",
      "path": "best-practices/conflict-resolution-routine",
      "section": "best-practices",
      "tier": "recommended",
      "slug": "conflict-resolution-routine",
      "title": "冲突处理惯例专题",
      "summary": "把冲突处理变成固定流程，减少临时操作带来的遗漏和误判。",
      "suggestions": []
    },
    {
      "href": "/zh/best-practices/release-hygiene",
      "path": "best-practices/release-hygiene",
      "section": "best-practices",
      "tier": "extended",
      "slug": "release-hygiene",
      "title": "发布前 Git 卫生专题",
      "summary": "在发布前用一组 Git 检查动作降低标签、分支和版本记录出错概率。",
      "suggestions": []
    },
    {
      "href": "/zh/best-practices/safe-cherry-picks",
      "path": "best-practices/safe-cherry-picks",
      "section": "best-practices",
      "tier": "extended",
      "slug": "safe-cherry-picks",
      "title": "安全使用 cherry-pick专题",
      "summary": "在回移修复或选择性复用提交时，避免重复、漏拣和上下文错配。",
      "suggestions": []
    },
    {
      "href": "/zh/best-practices/small-batch-review",
      "path": "best-practices/small-batch-review",
      "section": "best-practices",
      "tier": "extended",
      "slug": "small-batch-review",
      "title": "小批量评审专题",
      "summary": "用更小的提交批次和更短的生命周期换取更快的 review 节奏。",
      "suggestions": []
    },
    {
      "href": "/zh/workflows/fetch-vs-pull",
      "path": "workflows/fetch-vs-pull",
      "section": "workflows",
      "tier": "core",
      "slug": "fetch-vs-pull",
      "title": "fetch 与 pull 的区别",
      "summary": "解释为什么先 fetch 再决定 merge 或 rebase，往往比直接 pull 更可控。",
      "suggestions": []
    },
    {
      "href": "/zh/workflows/feature-branch-collaboration",
      "path": "workflows/feature-branch-collaboration",
      "section": "workflows",
      "tier": "core",
      "slug": "feature-branch-collaboration",
      "title": "功能分支协作流",
      "summary": "围绕 feature branch 的日常协作流程，整理从切分支、同步主线、提交整理到发起评审的稳定做法。",
      "suggestions": []
    },
    {
      "href": "/zh/workflows/gitflow-workflow",
      "path": "workflows/gitflow-workflow",
      "section": "workflows",
      "tier": "core",
      "slug": "gitflow-workflow",
      "title": "Gitflow 工作流教程",
      "summary": "基于 Atlassian 对 Gitflow 的说明，梳理 main、develop、feature、release、hotfix 的职责，以及它在现代团队中的适用边界。",
      "suggestions": []
    },
    {
      "href": "/zh/workflows/multi-person-sync-routine",
      "path": "workflows/multi-person-sync-routine",
      "section": "workflows",
      "tier": "core",
      "slug": "multi-person-sync-routine",
      "title": "多人协作时的同步节奏",
      "summary": "围绕多人并行开发，建立一套先 fetch、再观察、再整合的同步节奏，减少 pull 惊喜和共享历史误操作。",
      "suggestions": []
    },
    {
      "href": "/zh/workflows/prepare-commits-before-pull-request",
      "path": "workflows/prepare-commits-before-pull-request",
      "section": "workflows",
      "tier": "recommended",
      "slug": "prepare-commits-before-pull-request",
      "title": "PR 前如何整理提交历史",
      "summary": "在发起 PR 之前，围绕同步、提交整理、风险确认和 review 友好度，建立一套稳定的准备动作。",
      "suggestions": []
    },
    {
      "href": "/zh/workflows/parallel-work-with-worktree",
      "path": "workflows/parallel-work-with-worktree",
      "section": "workflows",
      "tier": "extended",
      "slug": "parallel-work-with-worktree",
      "title": "用 worktree 并行处理多个任务",
      "summary": "当你需要同时处理当前功能、紧急修复或评审修改时，用 git worktree 在同一个仓库上开出多个独立工作目录。",
      "suggestions": []
    },
    {
      "href": "/zh/workflows/ai-agent-worktree-mode",
      "path": "workflows/ai-agent-worktree-mode",
      "section": "workflows",
      "tier": "recommended",
      "slug": "ai-agent-worktree-mode",
      "title": "AI Coding Agent 下的 git worktree 模式",
      "summary": "把 git worktree 变成 AI coding agent 的默认并行工作模式，减少上下文污染、提升回滚安全性，并让多任务协作更清晰。",
      "suggestions": []
    },
    {
      "href": "/zh/workflows/monorepo-sparse-checkout-workflow",
      "path": "workflows/monorepo-sparse-checkout-workflow",
      "section": "workflows",
      "tier": "extended",
      "slug": "monorepo-sparse-checkout-workflow",
      "title": "monorepo 场景下的稀疏检出与多工作树协作",
      "summary": "在 monorepo 场景里，用 sparse-checkout 和 worktree 限定工作范围，降低上下文负担并支持并行任务。",
      "suggestions": []
    },
    {
      "href": "/zh/workflows/rerere-for-recurring-conflicts",
      "path": "workflows/rerere-for-recurring-conflicts",
      "section": "workflows",
      "tier": "extended",
      "slug": "rerere-for-recurring-conflicts",
      "title": "用 rerere 处理重复冲突",
      "summary": "当同一类冲突反复出现时，用 rerere 记录并复用你的解决结果，减少长期分支和频繁同步里的重复劳动。",
      "suggestions": []
    },
    {
      "href": "/zh/workflows/shared-branch-sync-boundaries",
      "path": "workflows/shared-branch-sync-boundaries",
      "section": "workflows",
      "tier": "recommended",
      "slug": "shared-branch-sync-boundaries",
      "title": "多人共享分支的同步边界",
      "summary": "当多人同时在同一分支协作时，明确什么动作可以做、什么动作不该做，减少同步混乱和历史覆盖。",
      "suggestions": []
    },
    {
      "href": "/zh/workflows/sync-before-review",
      "path": "workflows/sync-before-review",
      "section": "workflows",
      "tier": "core",
      "slug": "sync-before-review",
      "title": "评审前同步主线",
      "summary": "在发起评审前先同步主线并检查差异范围，减少 reviewer 面对过期基底、重复冲突和历史噪声的成本。",
      "suggestions": []
    },
    {
      "href": "/zh/workflows/pr-merge-strategy-and-platform-settings",
      "path": "workflows/pr-merge-strategy-and-platform-settings",
      "section": "workflows",
      "tier": "extended",
      "slug": "pr-merge-strategy-and-platform-settings",
      "title": "PR 合并策略与平台配置",
      "summary": "把 squash merge、rebase merge、merge commit 和平台配置放到同一个决策框架里，帮助团队统一 PR 落地方式。",
      "suggestions": []
    },
    {
      "href": "/zh/workflows/merge-queue-workflow",
      "path": "workflows/merge-queue-workflow",
      "section": "workflows",
      "tier": "extended",
      "slug": "merge-queue-workflow",
      "title": "Merge Queue 工作流",
      "summary": "当团队并发合并很多 PR 时，用 merge queue 降低串行抢占主线、重复排队和基底过期的问题。",
      "suggestions": []
    },
    {
      "href": "/zh/workflows/hotfix-and-urgent-fixes",
      "path": "workflows/hotfix-and-urgent-fixes",
      "section": "workflows",
      "tier": "core",
      "slug": "hotfix-and-urgent-fixes",
      "title": "紧急修复工作流",
      "summary": "当线上或发布链路出现高优先级问题时，如何从稳定分支切出 hotfix，快速修复并有序回流主线。",
      "suggestions": []
    },
    {
      "href": "/zh/workflows/hotfix-rollback-after-release",
      "path": "workflows/hotfix-rollback-after-release",
      "section": "workflows",
      "tier": "recommended",
      "slug": "hotfix-rollback-after-release",
      "title": "发布后热修失败，如何回滚与稳定主线",
      "summary": "当发布后热修本身引入问题时，优先判断回滚粒度、共享影响和后续补丁路径，而不是立刻继续叠加修复。",
      "suggestions": []
    },
    {
      "href": "/zh/workflows/open-source-fork-pr-contribution",
      "path": "workflows/open-source-fork-pr-contribution",
      "section": "workflows",
      "tier": "extended",
      "slug": "open-source-fork-pr-contribution",
      "title": "开源贡献 / fork + PR 完整提交流程",
      "summary": "把开源贡献里从 fork、同步上游、切分支、提交改动到发起 PR 的完整节奏串起来。",
      "suggestions": []
    },
    {
      "href": "/zh/workflows/release-branch-workflow",
      "path": "workflows/release-branch-workflow",
      "section": "workflows",
      "tier": "core",
      "slug": "release-branch-workflow",
      "title": "发布分支工作流教程",
      "summary": "梳理何时切发布分支、何时冻结功能、以及如何把修复回流主线。",
      "suggestions": []
    },
    {
      "href": "/zh/workflows/backport-with-cherry-pick",
      "path": "workflows/backport-with-cherry-pick",
      "section": "workflows",
      "tier": "recommended",
      "slug": "backport-with-cherry-pick",
      "title": "用 cherry-pick 回移修复教程",
      "summary": "在旧版本维护线中按提交精确回移修复，而不是整条分支整合。",
      "suggestions": []
    },
    {
      "href": "/zh/workflows/post-release-multi-branch-backporting",
      "path": "workflows/post-release-multi-branch-backporting",
      "section": "workflows",
      "tier": "extended",
      "slug": "post-release-multi-branch-backporting",
      "title": "发布后多维护线回移策略",
      "summary": "当一个修复需要在多个已发布版本之间回移时，如何控制顺序、验证范围和分支边界。",
      "suggestions": []
    },
    {
      "href": "/zh/workflows/fork-upstream-sync",
      "path": "workflows/fork-upstream-sync",
      "section": "workflows",
      "tier": "extended",
      "slug": "fork-upstream-sync",
      "title": "Fork 与上游同步教程",
      "summary": "在 fork 模式协作中维持 origin 与 upstream 的清晰边界，稳定同步上游更新，并把自己的改动安全推回个人 fork。",
      "suggestions": []
    },
    {
      "href": "/zh/workflows/squash-vs-rebase-merge",
      "path": "workflows/squash-vs-rebase-merge",
      "section": "workflows",
      "tier": "extended",
      "slug": "squash-vs-rebase-merge",
      "title": "Squash Merge 与 Rebase Merge 选择教程",
      "summary": "比较两种常见合并策略对历史可读性、追踪性和回滚方式的影响。",
      "suggestions": []
    },
    {
      "href": "/zh/workflows/long-lived-branch-maintenance",
      "path": "workflows/long-lived-branch-maintenance",
      "section": "workflows",
      "tier": "extended",
      "slug": "long-lived-branch-maintenance",
      "title": "长期分支维护教程",
      "summary": "说明长期存在的分支如何同步主线、控制漂移，并减少大爆炸式合并。",
      "suggestions": []
    },
    {
      "href": "/zh/workflows/long-lived-branch-conflict-governance",
      "path": "workflows/long-lived-branch-conflict-governance",
      "section": "workflows",
      "tier": "extended",
      "slug": "long-lived-branch-conflict-governance",
      "title": "长期分支冲突治理",
      "summary": "把长期分支里的冲突处理从临时救火升级成可治理的流程，包括同步节奏、冲突热区识别和重复冲突复用。",
      "suggestions": []
    },
    {
      "href": "/zh/workflows/submodule-update-flow",
      "path": "workflows/submodule-update-flow",
      "section": "workflows",
      "tier": "recommended",
      "slug": "submodule-update-flow",
      "title": "子模块更新流程教程",
      "summary": "梳理子模块仓库更新、锁定版本和主仓库同步的基本流程。",
      "suggestions": []
    },
    {
      "href": "/zh/github/github-flow-basics",
      "path": "github/github-flow-basics",
      "section": "github",
      "tier": "recommended",
      "slug": "github-flow-basics",
      "title": "GitHub Flow 基础教程",
      "summary": "用 GitHub 官方的轻量协作模型理解 branch、pull request、review 与 merge 的最小闭环。",
      "suggestions": []
    },
    {
      "href": "/zh/github/pull-requests-and-reviews",
      "path": "github/pull-requests-and-reviews",
      "section": "github",
      "tier": "recommended",
      "slug": "pull-requests-and-reviews",
      "title": "Pull Request 与 Code Review 教程",
      "summary": "理解 Pull Request、review、分支保护和合并策略在团队协作中的位置，而不只是学会界面操作。",
      "suggestions": []
    },
    {
      "href": "/zh/github/forks-and-open-source-contribution",
      "path": "github/forks-and-open-source-contribution",
      "section": "github",
      "tier": "extended",
      "slug": "forks-and-open-source-contribution",
      "title": "Fork 与开源贡献教程",
      "summary": "把 fork、upstream、issue、贡献规范和 Pull Request 贡献节奏串成一条更真实的开源协作路径。",
      "suggestions": []
    },
    {
      "href": "/zh/github/issues-projects-and-discussions",
      "path": "github/issues-projects-and-discussions",
      "section": "github",
      "tier": "extended",
      "slug": "issues-projects-and-discussions",
      "title": "Issues、Projects 与 Discussions 教程",
      "summary": "理解 GitHub 上需求、任务、讨论和协作节奏的组织方式，而不把所有沟通都堆进 PR。",
      "suggestions": []
    },
    {
      "href": "/zh/github/github-actions-and-skills",
      "path": "github/github-actions-and-skills",
      "section": "github",
      "tier": "extended",
      "slug": "github-actions-and-skills",
      "title": "GitHub Actions 与 GitHub Skills 入门",
      "summary": "理解 GitHub Actions 的最小自动化模型，并用 GitHub Skills 建立更低成本的动手练习路径。",
      "suggestions": []
    },
    {
      "href": "/zh/gitlab/gitlab-flow-and-merge-requests",
      "path": "gitlab/gitlab-flow-and-merge-requests",
      "section": "gitlab",
      "tier": "recommended",
      "slug": "gitlab-flow-and-merge-requests",
      "title": "GitLab Flow 与 Merge Request 教程",
      "summary": "理解 GitLab Flow、分支环境和 Merge Request 在团队协作里的关系，而不只是学会在哪点合并。",
      "suggestions": []
    },
    {
      "href": "/zh/gitlab/gitlab-forks-and-contributions",
      "path": "gitlab/gitlab-forks-and-contributions",
      "section": "gitlab",
      "tier": "extended",
      "slug": "gitlab-forks-and-contributions",
      "title": "GitLab Fork 与贡献流程",
      "summary": "把 GitLab 上的 fork、贡献分支、合并请求和上游同步串成一条更真实的外部协作路径。",
      "suggestions": []
    },
    {
      "href": "/zh/gitlab/gitlab-issues-boards-and-milestones",
      "path": "gitlab/gitlab-issues-boards-and-milestones",
      "section": "gitlab",
      "tier": "extended",
      "slug": "gitlab-issues-boards-and-milestones",
      "title": "GitLab Issues、Boards 与 Milestones",
      "summary": "理解 GitLab 如何把 issue、board、milestone 和交付节奏组织在一起，而不是把所有协作都丢进 Merge Request。",
      "suggestions": []
    },
    {
      "href": "/zh/gitlab/gitlab-groups-projects-and-permissions",
      "path": "gitlab/gitlab-groups-projects-and-permissions",
      "section": "gitlab",
      "tier": "extended",
      "slug": "gitlab-groups-projects-and-permissions",
      "title": "GitLab Groups、Projects 与权限模型",
      "summary": "理解 GitLab 里 group、project、role 和权限继承的关系，避免团队协作一开始就把访问边界做乱。",
      "suggestions": []
    },
    {
      "href": "/zh/gitlab/gitlab-ci-and-runners",
      "path": "gitlab/gitlab-ci-and-runners",
      "section": "gitlab",
      "tier": "recommended",
      "slug": "gitlab-ci-and-runners",
      "title": "GitLab CI/CD 与 Runners 入门",
      "summary": "建立 GitLab CI/CD、pipeline、job、runner 的最小心智模型，理解它们怎样和 Merge Request 协作。",
      "suggestions": []
    },
    {
      "href": "/zh/internals/object-database",
      "path": "internals/object-database",
      "section": "internals",
      "tier": "core",
      "slug": "object-database",
      "title": "Git 对象数据库",
      "summary": "理解 blob、tree、commit、tag 四类对象，以及 Git 为什么说自己是内容寻址的对象数据库。",
      "suggestions": []
    },
    {
      "href": "/zh/internals/plumbing-and-porcelain",
      "path": "internals/plumbing-and-porcelain",
      "section": "internals",
      "tier": "recommended",
      "slug": "plumbing-and-porcelain",
      "title": "Plumbing 与 Porcelain：Git 两层命令世界",
      "summary": "理解 porcelain 与 plumbing 的分层，能帮助你看懂为什么有些 Git 命令偏“日常操作”，有些命令更像底层原语。",
      "suggestions": []
    },
    {
      "href": "/zh/internals/index-and-working-tree",
      "path": "internals/index-and-working-tree",
      "section": "internals",
      "tier": "core",
      "slug": "index-and-working-tree",
      "title": "工作区、暂存区与对象库",
      "summary": "理解 working tree、index 和 object database 这三层，是看懂 add、commit、restore、reset 的关键前提。",
      "suggestions": []
    },
    {
      "href": "/zh/internals/repository-layout-and-gitdir",
      "path": "internals/repository-layout-and-gitdir",
      "section": "internals",
      "tier": "recommended",
      "slug": "repository-layout-and-gitdir",
      "title": "仓库布局、.git 目录与 GIT_DIR",
      "summary": "理解 `.git` 目录、工作区、gitdir、common dir 和 worktree 之间的关系，能帮助你看懂仓库到底把什么放在了哪里。",
      "suggestions": []
    },
    {
      "href": "/zh/internals/refs-and-head",
      "path": "internals/refs-and-head",
      "section": "internals",
      "tier": "core",
      "slug": "refs-and-head",
      "title": "Git 中的引用与 HEAD",
      "summary": "把分支、标签、远端跟踪引用和 HEAD 放到同一个模型里，理解 Git 如何用名字指向提交。",
      "suggestions": []
    },
    {
      "href": "/zh/internals/remote-tracking-refs",
      "path": "internals/remote-tracking-refs",
      "section": "internals",
      "tier": "core",
      "slug": "remote-tracking-refs",
      "title": "远端跟踪引用",
      "summary": "理解 `main` 与 `origin/main` 的区别，能够帮助你更稳定地掌握 fetch、pull、push 和分支同步。",
      "suggestions": []
    },
    {
      "href": "/zh/internals/revision-selection-and-ranges",
      "path": "internals/revision-selection-and-ranges",
      "section": "internals",
      "tier": "extended",
      "slug": "revision-selection-and-ranges",
      "title": "修订选择、范围表达式与提交集合",
      "summary": "很多 Git 命令真正处理的不是“一个提交”，而是一组通过 revision syntax 表达出来的提交集合。",
      "suggestions": []
    },
    {
      "href": "/zh/internals/commit-graph",
      "path": "internals/commit-graph",
      "section": "internals",
      "tier": "core",
      "slug": "commit-graph",
      "title": "Git 提交图与历史表达",
      "summary": "理解为什么 Git 历史本质上是提交图，而不是简单时间线，以及 merge、rebase 如何重新表达这张图。",
      "suggestions": []
    },
    {
      "href": "/zh/internals/packfiles-and-storage",
      "path": "internals/packfiles-and-storage",
      "section": "internals",
      "tier": "recommended",
      "slug": "packfiles-and-storage",
      "title": "Git Packfiles 与对象存储",
      "summary": "理解 Git 如何通过 packfiles、压缩和对象复用来高效存储与传输历史，而不是简单复制整份仓库。",
      "suggestions": []
    },
    {
      "href": "/zh/internals/transfer-protocols-and-negotiation",
      "path": "internals/transfer-protocols-and-negotiation",
      "section": "internals",
      "tier": "extended",
      "slug": "transfer-protocols-and-negotiation",
      "title": "传输协议、协商与 pack 交换",
      "summary": "理解 fetch / clone / push 时的协商过程，能帮助你看懂 Git 不是在“整仓同步”，而是在交换对象与引用状态。",
      "suggestions": []
    },
    {
      "href": "/zh/internals/environment-and-repository-variables",
      "path": "internals/environment-and-repository-variables",
      "section": "internals",
      "tier": "extended",
      "slug": "environment-and-repository-variables",
      "title": "环境变量、仓库变量与 Git 运行上下文",
      "summary": "理解 GIT_DIR、GIT_WORK_TREE、GIT_INDEX_FILE 等环境变量，能帮助你看懂 Git 如何决定“当前仓库上下文”到底是什么。",
      "suggestions": []
    },
    {
      "href": "/zh/internals/reachability-and-garbage-collection",
      "path": "internals/reachability-and-garbage-collection",
      "section": "internals",
      "tier": "recommended",
      "slug": "reachability-and-garbage-collection",
      "title": "对象可达性与垃圾回收",
      "summary": "理解对象为什么有时还能恢复、有时会永久丢失，本质上取决于可达性和垃圾回收，而不只是命令本身。",
      "suggestions": []
    },
    {
      "href": "/zh/internals/merge-base-and-ancestry",
      "path": "internals/merge-base-and-ancestry",
      "section": "internals",
      "tier": "recommended",
      "slug": "merge-base-and-ancestry",
      "title": "共同祖先与历史祖先关系教程",
      "summary": "解释 Git 如何基于共同祖先判断分支差异、合并基础和历史可达性。",
      "suggestions": []
    },
    {
      "href": "/zh/internals/tree-objects-and-snapshots",
      "path": "internals/tree-objects-and-snapshots",
      "section": "internals",
      "tier": "extended",
      "slug": "tree-objects-and-snapshots",
      "title": "Tree 对象与目录快照教程",
      "summary": "说明 tree 对象如何表达目录层级，以及提交为何能表示完整文件树快照。",
      "suggestions": []
    },
    {
      "href": "/zh/internals/blob-objects-and-content-addressing",
      "path": "internals/blob-objects-and-content-addressing",
      "section": "internals",
      "tier": "extended",
      "slug": "blob-objects-and-content-addressing",
      "title": "Blob 对象与内容寻址教程",
      "summary": "解释 blob 如何只按内容存储，以及哈希为什么成为对象身份。",
      "suggestions": []
    },
    {
      "href": "/zh/internals/commit-message-and-parents",
      "path": "internals/commit-message-and-parents",
      "section": "internals",
      "tier": "extended",
      "slug": "commit-message-and-parents",
      "title": "提交对象、父提交与提交说明教程",
      "summary": "说明提交对象如何把 tree、父提交和说明文本连接成历史图。",
      "suggestions": []
    },
    {
      "href": "/zh/internals/refspec-and-ref-updates",
      "path": "internals/refspec-and-ref-updates",
      "section": "internals",
      "tier": "extended",
      "slug": "refspec-and-ref-updates",
      "title": "Refspec 与引用更新教程",
      "summary": "解释 fetch 和 push 时 refspec 如何决定哪些引用被映射和更新。",
      "suggestions": []
    },
    {
      "href": "/zh/recovery/reflog-recovery",
      "path": "recovery/reflog-recovery",
      "section": "recovery",
      "tier": "core",
      "slug": "reflog-recovery",
      "title": "reflog 恢复手册",
      "summary": "当 reset、rebase、pull 或误删分支后找不到原来位置时，优先用 reflog 重新定位并建立恢复路径。",
      "suggestions": []
    },
    {
      "href": "/zh/recovery/recover-after-reset",
      "path": "recovery/recover-after-reset",
      "section": "recovery",
      "tier": "core",
      "slug": "recover-after-reset",
      "title": "reset 过头后怎么恢复",
      "summary": "当 reset 把分支、暂存区或工作区挪得太远时，先分清是哪一层变了，再用 reflog、ORIG_HEAD 或救援分支恢复。",
      "suggestions": []
    },
    {
      "href": "/zh/recovery/recover-after-rebase",
      "path": "recovery/recover-after-rebase",
      "section": "recovery",
      "tier": "core",
      "slug": "recover-after-rebase",
      "title": "rebase 出错后怎么恢复",
      "summary": "当 rebase 过程中冲突、提交丢失或结果不对时，先停止继续改写历史，再用 reflog、abort 和救援分支恢复可控状态。",
      "suggestions": []
    },
    {
      "href": "/zh/recovery/recover-deleted-branch",
      "path": "recovery/recover-deleted-branch",
      "section": "recovery",
      "tier": "recommended",
      "slug": "recover-deleted-branch",
      "title": "误删分支后怎么找回",
      "summary": "分支删掉后，通常先确认是名字没了还是提交也不可达了，再用 reflog、merge-base 和旧引用位置把分支接回来。",
      "suggestions": []
    },
    {
      "href": "/zh/recovery/detached-head-rescue",
      "path": "recovery/detached-head-rescue",
      "section": "recovery",
      "tier": "core",
      "slug": "detached-head-rescue",
      "title": "detached HEAD 状态下如何自救",
      "summary": "detached HEAD 本身不是错误，真正的风险是你在这个状态下产生了值得保留的提交却没有立刻接住它们。",
      "suggestions": []
    },
    {
      "href": "/zh/recovery/undo-after-pull",
      "path": "recovery/undo-after-pull",
      "section": "recovery",
      "tier": "core",
      "slug": "undo-after-pull",
      "title": "pull 之后后悔了怎么撤回",
      "summary": "当 pull 之后发现分支状态不对、自动 merge 不符合预期，或者 rebase 结果混乱时，先判断 pull 实际做了什么，再选择 ORIG_HEAD、reflog 或救援分支。",
      "suggestions": []
    },
    {
      "href": "/zh/recovery/assess-force-push-impact",
      "path": "recovery/assess-force-push-impact",
      "section": "recovery",
      "tier": "recommended",
      "slug": "assess-force-push-impact",
      "title": "force push 之后怎么判断影响范围",
      "summary": "force push 之后，真正关键的不是立刻再推一次，而是先判断哪些引用被覆盖、哪些同事可能已基于旧历史继续工作，以及恢复窗口还有多大。",
      "suggestions": []
    },
    {
      "href": "/zh/history",
      "path": "concepts/git-history",
      "section": "internals",
      "tier": "core",
      "slug": "git-history",
      "title": "Git 历史说明",
      "summary": "系统解释 Git 如何记录历史、为什么提交历史是一个有向图，以及这对协作、恢复和变更审查意味着什么。",
      "suggestions": []
    }
  ],
  "en": [
    {
      "href": "/en/learning-path",
      "path": "learning-path/quick-start",
      "section": "learning-path",
      "tier": "core",
      "slug": "quick-start",
      "title": "Git Quick Start Series",
      "summary": "Turn Git quick start into a small guided series: prepare your environment, learn staging and commit, understand remote sync, and open your first feature branch.",
      "suggestions": []
    },
    {
      "href": "/en/docs/learning-path/setup-and-clone",
      "path": "learning-path/setup-and-clone",
      "section": "learning-path",
      "tier": "core",
      "slug": "setup-and-clone",
      "title": "Setup and Clone",
      "summary": "Handle the first low-risk setup tasks in Git: configure identity, clone a repository, and inspect what actually appears locally afterward.",
      "suggestions": []
    },
    {
      "href": "/en/docs/learning-path/stage-and-commit",
      "path": "learning-path/stage-and-commit",
      "section": "learning-path",
      "tier": "core",
      "slug": "stage-and-commit",
      "title": "Staging and Commit",
      "summary": "Understand the three-layer model of working tree, staging area, and commit history, then turn file edits into stable local commits.",
      "suggestions": []
    },
    {
      "href": "/en/docs/learning-path/sync-with-remote",
      "path": "learning-path/sync-with-remote",
      "section": "learning-path",
      "tier": "core",
      "slug": "sync-with-remote",
      "title": "Remote Sync",
      "summary": "Understand fetch, pull, and push as three different actions: observe upstream state, integrate changes, and publish local commits.",
      "suggestions": []
    },
    {
      "href": "/en/docs/learning-path/first-feature-branch",
      "path": "learning-path/first-feature-branch",
      "section": "learning-path",
      "tier": "core",
      "slug": "first-feature-branch",
      "title": "First Feature Branch",
      "summary": "Move from a solo Git loop into the simplest collaboration rhythm: create a feature branch, commit work there, and keep an eye on the main branch.",
      "suggestions": []
    },
    {
      "href": "/en/commands/git-init",
      "path": "commands/git-init",
      "section": "commands",
      "tier": "core",
      "slug": "git-init",
      "title": "git init Tutorial",
      "summary": "Explains how git init creates a repository, how the initial branch is defined, and how it is used for both new and existing directories.",
      "suggestions": []
    },
    {
      "href": "/en/commands/git-clone",
      "path": "commands/git-clone",
      "section": "commands",
      "tier": "core",
      "slug": "git-clone",
      "title": "git clone Tutorial",
      "summary": "Explains how git clone copies a repository, what origin means by default, and what local branch setup usually looks like after cloning.",
      "suggestions": []
    },
    {
      "href": "/en/commands/git-status",
      "path": "commands/git-status",
      "section": "commands",
      "tier": "core",
      "slug": "git-status",
      "title": "git status Tutorial",
      "summary": "Covers how git status shows working tree, staging area, and branch state, and why it should be part of nearly every Git workflow.",
      "suggestions": []
    },
    {
      "href": "/en/commands/git-add",
      "path": "commands/git-add",
      "section": "commands",
      "tier": "core",
      "slug": "git-add",
      "title": "git add Tutorial",
      "summary": "Explains how git add stages changes for the next commit, and why the index is central to creating cleaner history.",
      "suggestions": []
    },
    {
      "href": "/en/commands/git-commit",
      "path": "commands/git-commit",
      "section": "commands",
      "tier": "core",
      "slug": "git-commit",
      "title": "git commit Tutorial",
      "summary": "Explains how git commit creates new history nodes, how to write useful messages, and when amend is appropriate.",
      "suggestions": []
    },
    {
      "href": "/en/commands/git-diff",
      "path": "commands/git-diff",
      "section": "commands",
      "tier": "recommended",
      "slug": "git-diff",
      "title": "git diff Tutorial",
      "summary": "Explains how git diff compares working tree, index, and commit states, and which forms are most useful day to day.",
      "suggestions": []
    },
    {
      "href": "/en/commands/git-show",
      "path": "commands/git-show",
      "section": "commands",
      "tier": "recommended",
      "slug": "git-show",
      "title": "git show",
      "summary": "Inspect a specific commit, tag, or object in detail, making it one of the most useful commands for reading history precisely.",
      "suggestions": []
    },
    {
      "href": "/en/commands/git-log",
      "path": "commands/git-log",
      "section": "commands",
      "tier": "core",
      "slug": "git-log",
      "title": "git log Tutorial",
      "summary": "Shows how git log inspects commit history, graph structure, authorship, and filtered history for debugging and review.",
      "suggestions": []
    },
    {
      "href": "/en/commands/git-rm",
      "path": "commands/git-rm",
      "section": "commands",
      "tier": "extended",
      "slug": "git-rm",
      "title": "git rm",
      "summary": "Remove tracked files and stage that removal, which makes it easier to separate filesystem deletion from Git history changes.",
      "suggestions": []
    },
    {
      "href": "/en/commands/git-mv",
      "path": "commands/git-mv",
      "section": "commands",
      "tier": "extended",
      "slug": "git-mv",
      "title": "git mv",
      "summary": "Rename or move tracked files while keeping the index in sync, which makes large refactors easier to stage consistently.",
      "suggestions": []
    },
    {
      "href": "/en/commands/git-fetch",
      "path": "commands/git-fetch",
      "section": "commands",
      "tier": "core",
      "slug": "git-fetch",
      "title": "git fetch Tutorial",
      "summary": "Explains how git fetch updates remote refs, why it is often safer than pull, and where it fits in a daily sync workflow.",
      "suggestions": []
    },
    {
      "href": "/en/commands/git-pull",
      "path": "commands/git-pull",
      "section": "commands",
      "tier": "core",
      "slug": "git-pull",
      "title": "git pull Tutorial",
      "summary": "Explains git pull as fetch plus integration, and why many teams prefer fetch-first or ff-only synchronization habits.",
      "suggestions": []
    },
    {
      "href": "/en/commands/git-push",
      "path": "commands/git-push",
      "section": "commands",
      "tier": "core",
      "slug": "git-push",
      "title": "git push Tutorial",
      "summary": "Explains how git push publishes local branches, how upstream tracking works, and why force-with-lease is safer than raw force push.",
      "suggestions": []
    },
    {
      "href": "/en/commands/git-switch",
      "path": "commands/git-switch",
      "section": "commands",
      "tier": "core",
      "slug": "git-switch",
      "title": "git switch Tutorial",
      "summary": "Introduces git switch as the dedicated branch-switching command and clarifies how it differs from checkout.",
      "suggestions": []
    },
    {
      "href": "/en/commands/git-branch",
      "path": "commands/git-branch",
      "section": "commands",
      "tier": "core",
      "slug": "git-branch",
      "title": "git branch Tutorial",
      "summary": "Covers how git branch lists, creates, renames, and deletes branches, and how it relates to remote-tracking branches.",
      "suggestions": []
    },
    {
      "href": "/en/commands/git-tag",
      "path": "commands/git-tag",
      "section": "commands",
      "tier": "recommended",
      "slug": "git-tag",
      "title": "git tag Tutorial",
      "summary": "Introduces git tag for release points, explains lightweight versus annotated tags, and covers basic tag publishing.",
      "suggestions": []
    },
    {
      "href": "/en/commands/git-remote",
      "path": "commands/git-remote",
      "section": "commands",
      "tier": "recommended",
      "slug": "git-remote",
      "title": "git remote Tutorial",
      "summary": "Explains how git remote lists, adds, renames, and removes remote definitions, and how origin fits into common collaboration flows.",
      "suggestions": []
    },
    {
      "href": "/en/commands/git-rebase",
      "path": "commands/git-rebase",
      "section": "commands",
      "tier": "core",
      "slug": "git-rebase",
      "title": "git rebase Tutorial",
      "summary": "Explains the core model of git rebase, recommended workflows, risks, and recovery options.",
      "suggestions": []
    },
    {
      "href": "/en/commands/git-merge",
      "path": "commands/git-merge",
      "section": "commands",
      "tier": "core",
      "slug": "git-merge",
      "title": "git merge Tutorial",
      "summary": "Explains the purpose of git merge, the difference between fast-forward and merge commits, and how to handle conflicts.",
      "suggestions": []
    },
    {
      "href": "/en/commands/git-cherry-pick",
      "path": "commands/git-cherry-pick",
      "section": "commands",
      "tier": "core",
      "slug": "git-cherry-pick",
      "title": "git cherry-pick Tutorial",
      "summary": "Explains how to apply a selected commit onto the current branch and when cherry-pick is the right tool.",
      "suggestions": []
    },
    {
      "href": "/en/commands/git-reset",
      "path": "commands/git-reset",
      "section": "commands",
      "tier": "core",
      "slug": "git-reset",
      "title": "git reset Tutorial",
      "summary": "Explains how git reset moves HEAD, updates the index, and optionally overwrites the working tree through soft, mixed, and hard modes.",
      "suggestions": []
    },
    {
      "href": "/en/commands/git-stash",
      "path": "commands/git-stash",
      "section": "commands",
      "tier": "core",
      "slug": "git-stash",
      "title": "git stash Tutorial",
      "summary": "Explains how to temporarily shelve local changes with git stash and later inspect, restore, or remove stash entries.",
      "suggestions": []
    },
    {
      "href": "/en/commands/git-restore",
      "path": "commands/git-restore",
      "section": "commands",
      "tier": "core",
      "slug": "git-restore",
      "title": "git restore Tutorial",
      "summary": "Explains how git restore recovers file state in the working tree or index, and how it differs from reset and checkout.",
      "suggestions": []
    },
    {
      "href": "/en/commands/git-revert",
      "path": "commands/git-revert",
      "section": "commands",
      "tier": "core",
      "slug": "git-revert",
      "title": "git revert Tutorial",
      "summary": "Explains why git revert is the safe way to undo shared commits, and how it differs from reset at the history level.",
      "suggestions": []
    },
    {
      "href": "/en/commands/git-reflog",
      "path": "commands/git-reflog",
      "section": "commands",
      "tier": "core",
      "slug": "git-reflog",
      "title": "git reflog",
      "summary": "Read reference movement history, which makes reflog one of the most important commands for recovery after reset, rebase, and branch mistakes.",
      "suggestions": []
    },
    {
      "href": "/en/commands/git-bisect",
      "path": "commands/git-bisect",
      "section": "commands",
      "tier": "recommended",
      "slug": "git-bisect",
      "title": "git bisect",
      "summary": "Use binary search across history to locate the commit that introduced a regression, making it one of the most valuable debugging commands in Git.",
      "suggestions": []
    },
    {
      "href": "/en/commands/git-blame",
      "path": "commands/git-blame",
      "section": "commands",
      "tier": "recommended",
      "slug": "git-blame",
      "title": "git blame",
      "summary": "Track which commit last changed each line in a file, making it useful for recovering context around why a line looks the way it does now.",
      "suggestions": []
    },
    {
      "href": "/en/commands/git-checkout",
      "path": "commands/git-checkout",
      "section": "commands",
      "tier": "recommended",
      "slug": "git-checkout",
      "title": "git checkout Tutorial",
      "summary": "Explains git checkout as the older multi-purpose command for branch switching and path restoration, and how it relates to switch and restore.",
      "suggestions": []
    },
    {
      "href": "/en/commands/git-clean",
      "path": "commands/git-clean",
      "section": "commands",
      "tier": "recommended",
      "slug": "git-clean",
      "title": "git clean Tutorial",
      "summary": "Explains how git clean removes untracked files and directories, and why dry-run and force flags are essential here.",
      "suggestions": []
    },
    {
      "href": "/en/commands/git-config",
      "path": "commands/git-config",
      "section": "commands",
      "tier": "extended",
      "slug": "git-config",
      "title": "git-config Tutorial",
      "summary": "Explains how to use git-config to inspect and edit Git configuration.",
      "suggestions": []
    },
    {
      "href": "/en/commands/git-help",
      "path": "commands/git-help",
      "section": "commands",
      "tier": "extended",
      "slug": "git-help",
      "title": "git-help Tutorial",
      "summary": "Explains how to use git-help to open command help and man pages.",
      "suggestions": []
    },
    {
      "href": "/en/commands/git-describe",
      "path": "commands/git-describe",
      "section": "commands",
      "tier": "extended",
      "slug": "git-describe",
      "title": "git-describe Tutorial",
      "summary": "Explains how to use git-describe to describe a commit by the nearest reachable tag.",
      "suggestions": []
    },
    {
      "href": "/en/commands/git-grep",
      "path": "commands/git-grep",
      "section": "commands",
      "tier": "extended",
      "slug": "git-grep",
      "title": "git-grep Tutorial",
      "summary": "Explains how to use git-grep to search text inside the repository.",
      "suggestions": []
    },
    {
      "href": "/en/commands/git-shortlog",
      "path": "commands/git-shortlog",
      "section": "commands",
      "tier": "extended",
      "slug": "git-shortlog",
      "title": "git-shortlog Tutorial",
      "summary": "Explains how to use git-shortlog to summarize commit history by author and subject.",
      "suggestions": []
    },
    {
      "href": "/en/commands/git-show-ref",
      "path": "commands/git-show-ref",
      "section": "commands",
      "tier": "extended",
      "slug": "git-show-ref",
      "title": "git-show-ref Tutorial",
      "summary": "Explains how to use git-show-ref to list refs and the objects they point to.",
      "suggestions": []
    },
    {
      "href": "/en/commands/git-rev-parse",
      "path": "commands/git-rev-parse",
      "section": "commands",
      "tier": "extended",
      "slug": "git-rev-parse",
      "title": "git-rev-parse Tutorial",
      "summary": "Explains how to use git-rev-parse to parse revision expressions and repository path details.",
      "suggestions": []
    },
    {
      "href": "/en/commands/git-am",
      "path": "commands/git-am",
      "section": "commands",
      "tier": "extended",
      "slug": "git-am",
      "title": "git-am Tutorial",
      "summary": "Explains how to use git-am to apply a mailbox patch series onto the current branch.",
      "suggestions": []
    },
    {
      "href": "/en/commands/git-apply",
      "path": "commands/git-apply",
      "section": "commands",
      "tier": "extended",
      "slug": "git-apply",
      "title": "git-apply Tutorial",
      "summary": "Explains how to use git-apply to apply patch content to the working tree or index.",
      "suggestions": []
    },
    {
      "href": "/en/commands/git-format-patch",
      "path": "commands/git-format-patch",
      "section": "commands",
      "tier": "extended",
      "slug": "git-format-patch",
      "title": "git-format-patch Tutorial",
      "summary": "Explains how to use git-format-patch to export commits as patch files.",
      "suggestions": []
    },
    {
      "href": "/en/commands/git-send-email",
      "path": "commands/git-send-email",
      "section": "commands",
      "tier": "extended",
      "slug": "git-send-email",
      "title": "git-send-email Tutorial",
      "summary": "Explains how to use git-send-email to send patch emails to a mailing list or review flow.",
      "suggestions": []
    },
    {
      "href": "/en/commands/git-request-pull",
      "path": "commands/git-request-pull",
      "section": "commands",
      "tier": "extended",
      "slug": "git-request-pull",
      "title": "git-request-pull Tutorial",
      "summary": "Explains how to use git-request-pull to generate a pull request summary for maintainers.",
      "suggestions": []
    },
    {
      "href": "/en/commands/git-archive",
      "path": "commands/git-archive",
      "section": "commands",
      "tier": "extended",
      "slug": "git-archive",
      "title": "git-archive Tutorial",
      "summary": "Explains how to use git-archive to export an archive from a commit or tree object.",
      "suggestions": []
    },
    {
      "href": "/en/commands/git-bundle",
      "path": "commands/git-bundle",
      "section": "commands",
      "tier": "extended",
      "slug": "git-bundle",
      "title": "git-bundle Tutorial",
      "summary": "Explains how to use git-bundle to package repository history into an offline-transfer bundle.",
      "suggestions": []
    },
    {
      "href": "/en/commands/git-worktree",
      "path": "commands/git-worktree",
      "section": "commands",
      "tier": "recommended",
      "slug": "git-worktree",
      "title": "git-worktree Tutorial",
      "summary": "Explains how to use git-worktree to manage multiple working trees for the same repository.",
      "suggestions": []
    },
    {
      "href": "/en/commands/git-submodule",
      "path": "commands/git-submodule",
      "section": "commands",
      "tier": "recommended",
      "slug": "git-submodule",
      "title": "git-submodule Tutorial",
      "summary": "Explains how to use git-submodule to manage nested repositories as submodules.",
      "suggestions": []
    },
    {
      "href": "/en/commands/git-sparse-checkout",
      "path": "commands/git-sparse-checkout",
      "section": "commands",
      "tier": "extended",
      "slug": "git-sparse-checkout",
      "title": "git-sparse-checkout Tutorial",
      "summary": "Explains how to use git-sparse-checkout to check out only selected paths from a repository.",
      "suggestions": []
    },
    {
      "href": "/en/commands/git-cat-file",
      "path": "commands/git-cat-file",
      "section": "commands",
      "tier": "extended",
      "slug": "git-cat-file",
      "title": "git-cat-file Tutorial",
      "summary": "Explains how to use git-cat-file to inspect Git object types and contents directly.",
      "suggestions": []
    },
    {
      "href": "/en/commands/git-ls-files",
      "path": "commands/git-ls-files",
      "section": "commands",
      "tier": "extended",
      "slug": "git-ls-files",
      "title": "git-ls-files Tutorial",
      "summary": "Explains how to use git-ls-files to list tracked paths from the index and working tree.",
      "suggestions": []
    },
    {
      "href": "/en/commands/git-ls-tree",
      "path": "commands/git-ls-tree",
      "section": "commands",
      "tier": "extended",
      "slug": "git-ls-tree",
      "title": "git-ls-tree Tutorial",
      "summary": "Explains how to use git-ls-tree to list entries inside a tree object.",
      "suggestions": []
    },
    {
      "href": "/en/commands/git-read-tree",
      "path": "commands/git-read-tree",
      "section": "commands",
      "tier": "extended",
      "slug": "git-read-tree",
      "title": "git-read-tree Tutorial",
      "summary": "Explains how to use git-read-tree to read tree objects into the index for lower-level operations.",
      "suggestions": []
    },
    {
      "href": "/en/commands/git-update-index",
      "path": "commands/git-update-index",
      "section": "commands",
      "tier": "extended",
      "slug": "git-update-index",
      "title": "git-update-index Tutorial",
      "summary": "Explains how to use git-update-index to update index entries and attributes directly.",
      "suggestions": []
    },
    {
      "href": "/en/commands/git-update-ref",
      "path": "commands/git-update-ref",
      "section": "commands",
      "tier": "extended",
      "slug": "git-update-ref",
      "title": "git-update-ref Tutorial",
      "summary": "Explains how to use git-update-ref to update refs through a lower-level interface.",
      "suggestions": []
    },
    {
      "href": "/en/commands/git-symbolic-ref",
      "path": "commands/git-symbolic-ref",
      "section": "commands",
      "tier": "extended",
      "slug": "git-symbolic-ref",
      "title": "git-symbolic-ref Tutorial",
      "summary": "Explains how to use git-symbolic-ref to read or update symbolic refs such as HEAD.",
      "suggestions": []
    },
    {
      "href": "/en/commands/git-rev-list",
      "path": "commands/git-rev-list",
      "section": "commands",
      "tier": "extended",
      "slug": "git-rev-list",
      "title": "git-rev-list Tutorial",
      "summary": "Explains how to use git-rev-list to enumerate commit sets in a script-friendly way.",
      "suggestions": []
    },
    {
      "href": "/en/commands/git-merge-base",
      "path": "commands/git-merge-base",
      "section": "commands",
      "tier": "extended",
      "slug": "git-merge-base",
      "title": "git-merge-base Tutorial",
      "summary": "Explains how to use git-merge-base to find the best common ancestor between histories.",
      "suggestions": []
    },
    {
      "href": "/en/commands/git-notes",
      "path": "commands/git-notes",
      "section": "commands",
      "tier": "extended",
      "slug": "git-notes",
      "title": "git-notes Tutorial",
      "summary": "Explains how to use git-notes to attach extra notes to commits without rewriting them.",
      "suggestions": []
    },
    {
      "href": "/en/commands/git-range-diff",
      "path": "commands/git-range-diff",
      "section": "commands",
      "tier": "extended",
      "slug": "git-range-diff",
      "title": "git-range-diff Tutorial",
      "summary": "Explains how to use git-range-diff to compare the differences between two commit series.",
      "suggestions": []
    },
    {
      "href": "/en/commands/git-cherry",
      "path": "commands/git-cherry",
      "section": "commands",
      "tier": "extended",
      "slug": "git-cherry",
      "title": "git-cherry Tutorial",
      "summary": "Explains how to use git-cherry to check which commits have not yet been integrated elsewhere.",
      "suggestions": []
    },
    {
      "href": "/en/commands/git-mergetool",
      "path": "commands/git-mergetool",
      "section": "commands",
      "tier": "extended",
      "slug": "git-mergetool",
      "title": "git-mergetool Tutorial",
      "summary": "Explains how to use git-mergetool to launch an external merge tool for conflict resolution.",
      "suggestions": []
    },
    {
      "href": "/en/commands/git-fsck",
      "path": "commands/git-fsck",
      "section": "commands",
      "tier": "extended",
      "slug": "git-fsck",
      "title": "git-fsck Tutorial",
      "summary": "Explains how to use git-fsck to verify the integrity of objects and refs.",
      "suggestions": []
    },
    {
      "href": "/en/commands/git-gc",
      "path": "commands/git-gc",
      "section": "commands",
      "tier": "extended",
      "slug": "git-gc",
      "title": "git-gc Tutorial",
      "summary": "Explains how to use git-gc to run garbage collection and housekeeping.",
      "suggestions": []
    },
    {
      "href": "/en/commands/git-count-objects",
      "path": "commands/git-count-objects",
      "section": "commands",
      "tier": "extended",
      "slug": "git-count-objects",
      "title": "git-count-objects Tutorial",
      "summary": "Explains how to use git-count-objects to count loose objects and pack usage.",
      "suggestions": []
    },
    {
      "href": "/en/commands/git-verify-pack",
      "path": "commands/git-verify-pack",
      "section": "commands",
      "tier": "extended",
      "slug": "git-verify-pack",
      "title": "git-verify-pack Tutorial",
      "summary": "Explains how to use git-verify-pack to inspect objects stored inside a pack file.",
      "suggestions": []
    },
    {
      "href": "/en/commands/git-verify-tag",
      "path": "commands/git-verify-tag",
      "section": "commands",
      "tier": "extended",
      "slug": "git-verify-tag",
      "title": "git-verify-tag Tutorial",
      "summary": "Explains how to use git-verify-tag to verify signed tag authenticity.",
      "suggestions": []
    },
    {
      "href": "/en/best-practices/commit-hygiene",
      "path": "best-practices/commit-hygiene",
      "section": "best-practices",
      "tier": "core",
      "slug": "commit-hygiene",
      "title": "Commit Hygiene and Messages",
      "summary": "Keep commits as logically separate changesets and write messages that explain intent and motivation, so review, revert, and cherry-pick stay lightweight.",
      "suggestions": []
    },
    {
      "href": "/en/best-practices/topic-branches",
      "path": "best-practices/topic-branches",
      "section": "best-practices",
      "tier": "recommended",
      "slug": "topic-branches",
      "title": "Topic Branch Strategy",
      "summary": "Use topic branches to isolate units of work so parallel development, review, rollback, and history cleanup all stay easier to manage.",
      "suggestions": []
    },
    {
      "href": "/en/best-practices/fetch-first-sync",
      "path": "best-practices/fetch-first-sync",
      "section": "best-practices",
      "tier": "core",
      "slug": "fetch-first-sync",
      "title": "Fetch-First Sync",
      "summary": "Separate observing remote state from mutating your local branch so integration choices stay explicit instead of being hidden inside default pull behavior.",
      "suggestions": []
    },
    {
      "href": "/en/best-practices/shared-history-boundaries",
      "path": "best-practices/shared-history-boundaries",
      "section": "best-practices",
      "tier": "core",
      "slug": "shared-history-boundaries",
      "title": "Shared History Boundaries",
      "summary": "Know which history can still be cleaned up freely and which history should be treated as shared, so rebase, amend, reset, and force-push do not break other people.",
      "suggestions": []
    },
    {
      "href": "/en/best-practices/review-and-safe-push",
      "path": "best-practices/review-and-safe-push",
      "section": "best-practices",
      "tier": "core",
      "slug": "review-and-safe-push",
      "title": "Review-Ready History and Safe Push",
      "summary": "Before review or push, clean up the commit stack, inspect the actual diff range, and prefer safer push defaults so you publish history intentionally.",
      "suggestions": []
    },
    {
      "href": "/en/best-practices/atomic-commits",
      "path": "best-practices/atomic-commits",
      "section": "best-practices",
      "tier": "core",
      "slug": "atomic-commits",
      "title": "Atomic Commits",
      "summary": "Keep each commit focused on one logical change to simplify review and rollback.",
      "suggestions": []
    },
    {
      "href": "/en/best-practices/branch-naming",
      "path": "best-practices/branch-naming",
      "section": "best-practices",
      "tier": "recommended",
      "slug": "branch-naming",
      "title": "Branch Naming Conventions",
      "summary": "Adopt predictable branch naming patterns to improve collaboration, automation, and debugging.",
      "suggestions": []
    },
    {
      "href": "/en/best-practices/pull-request-prep",
      "path": "best-practices/pull-request-prep",
      "section": "best-practices",
      "tier": "recommended",
      "slug": "pull-request-prep",
      "title": "Preparing a Branch for Review",
      "summary": "Clean up commits, sync with the latest base, and remove noise before asking for review.",
      "suggestions": []
    },
    {
      "href": "/en/best-practices/conflict-resolution-routine",
      "path": "best-practices/conflict-resolution-routine",
      "section": "best-practices",
      "tier": "recommended",
      "slug": "conflict-resolution-routine",
      "title": "Conflict Resolution Routine",
      "summary": "Turn conflict handling into a repeatable routine so fewer steps are missed under pressure.",
      "suggestions": []
    },
    {
      "href": "/en/best-practices/release-hygiene",
      "path": "best-practices/release-hygiene",
      "section": "best-practices",
      "tier": "extended",
      "slug": "release-hygiene",
      "title": "Release Hygiene",
      "summary": "Use a small set of Git checks before release to reduce mistakes around tags, branches, and version state.",
      "suggestions": []
    },
    {
      "href": "/en/best-practices/safe-cherry-picks",
      "path": "best-practices/safe-cherry-picks",
      "section": "best-practices",
      "tier": "extended",
      "slug": "safe-cherry-picks",
      "title": "Safe Cherry-picks",
      "summary": "Use cherry-pick safely when backporting fixes or selectively reusing commits.",
      "suggestions": []
    },
    {
      "href": "/en/best-practices/small-batch-review",
      "path": "best-practices/small-batch-review",
      "section": "best-practices",
      "tier": "extended",
      "slug": "small-batch-review",
      "title": "Small-batch Review",
      "summary": "Use smaller commit batches and shorter branch lifecycles to keep review fast and clear.",
      "suggestions": []
    },
    {
      "href": "/en/workflows/fetch-vs-pull",
      "path": "workflows/fetch-vs-pull",
      "section": "workflows",
      "tier": "core",
      "slug": "fetch-vs-pull",
      "title": "fetch vs pull",
      "summary": "Explains why fetch-first workflows are often more controllable than pulling directly.",
      "suggestions": []
    },
    {
      "href": "/en/workflows/feature-branch-collaboration",
      "path": "workflows/feature-branch-collaboration",
      "section": "workflows",
      "tier": "core",
      "slug": "feature-branch-collaboration",
      "title": "Feature Branch Collaboration",
      "summary": "A practical feature-branch workflow for day-to-day teamwork, from cutting the branch and syncing main to cleaning the stack before review.",
      "suggestions": []
    },
    {
      "href": "/en/workflows/gitflow-workflow",
      "path": "workflows/gitflow-workflow",
      "section": "workflows",
      "tier": "core",
      "slug": "gitflow-workflow",
      "title": "Gitflow Workflow",
      "summary": "Use Atlassian's Gitflow explanation to clarify the roles of main, develop, feature, release, and hotfix branches, plus where Gitflow still fits today.",
      "suggestions": []
    },
    {
      "href": "/en/workflows/multi-person-sync-routine",
      "path": "workflows/multi-person-sync-routine",
      "section": "workflows",
      "tier": "core",
      "slug": "multi-person-sync-routine",
      "title": "A sync routine for multi-person collaboration",
      "summary": "Use a fetch-first, inspect-first sync rhythm in team collaboration so pull does not become a source of surprise or silent history mutation.",
      "suggestions": []
    },
    {
      "href": "/en/workflows/prepare-commits-before-pull-request",
      "path": "workflows/prepare-commits-before-pull-request",
      "section": "workflows",
      "tier": "recommended",
      "slug": "prepare-commits-before-pull-request",
      "title": "Prepare commit history before opening a pull request",
      "summary": "Build a stable pre-PR routine around syncing, commit cleanup, risk checks, and review-friendly history.",
      "suggestions": []
    },
    {
      "href": "/en/workflows/parallel-work-with-worktree",
      "path": "workflows/parallel-work-with-worktree",
      "section": "workflows",
      "tier": "extended",
      "slug": "parallel-work-with-worktree",
      "title": "Parallel Task Handling with Worktree",
      "summary": "Use git worktree to open multiple working directories from the same repository when feature work, review fixes, and urgent tasks overlap.",
      "suggestions": []
    },
    {
      "href": "/en/workflows/ai-agent-worktree-mode",
      "path": "workflows/ai-agent-worktree-mode",
      "section": "workflows",
      "tier": "recommended",
      "slug": "ai-agent-worktree-mode",
      "title": "Using git worktree as the default mode for AI coding agents",
      "summary": "Turn git worktree into the default parallel-task mode for AI coding agents so implementation, review, validation, and hotfix work stay isolated and recoverable.",
      "suggestions": []
    },
    {
      "href": "/en/workflows/monorepo-sparse-checkout-workflow",
      "path": "workflows/monorepo-sparse-checkout-workflow",
      "section": "workflows",
      "tier": "extended",
      "slug": "monorepo-sparse-checkout-workflow",
      "title": "Sparse-checkout and worktree flow for monorepos",
      "summary": "Use sparse-checkout and worktree together in a monorepo to reduce context load and support parallel task work without loading the whole tree every time.",
      "suggestions": []
    },
    {
      "href": "/en/workflows/rerere-for-recurring-conflicts",
      "path": "workflows/rerere-for-recurring-conflicts",
      "section": "workflows",
      "tier": "extended",
      "slug": "rerere-for-recurring-conflicts",
      "title": "Rerere for Recurring Conflicts",
      "summary": "Use rerere to record and reuse conflict resolutions when the same merge or rebase conflicts appear again and again.",
      "suggestions": []
    },
    {
      "href": "/en/workflows/shared-branch-sync-boundaries",
      "path": "workflows/shared-branch-sync-boundaries",
      "section": "workflows",
      "tier": "recommended",
      "slug": "shared-branch-sync-boundaries",
      "title": "Sync Boundaries on Shared Branches",
      "summary": "Define what is safe and unsafe on a branch shared by multiple people so sync stays predictable and history rewrites do not turn into team-wide incidents.",
      "suggestions": []
    },
    {
      "href": "/en/workflows/sync-before-review",
      "path": "workflows/sync-before-review",
      "section": "workflows",
      "tier": "core",
      "slug": "sync-before-review",
      "title": "Sync Before Review",
      "summary": "Sync your branch with main before opening review so reviewers see current, focused diffs instead of stale base noise.",
      "suggestions": []
    },
    {
      "href": "/en/workflows/pr-merge-strategy-and-platform-settings",
      "path": "workflows/pr-merge-strategy-and-platform-settings",
      "section": "workflows",
      "tier": "extended",
      "slug": "pr-merge-strategy-and-platform-settings",
      "title": "PR Merge Strategy and Platform Settings",
      "summary": "Make pull request merge policy and platform configuration part of the same decision so history shape and repository settings stay aligned.",
      "suggestions": []
    },
    {
      "href": "/en/workflows/merge-queue-workflow",
      "path": "workflows/merge-queue-workflow",
      "section": "workflows",
      "tier": "extended",
      "slug": "merge-queue-workflow",
      "title": "Merge Queue Workflow",
      "summary": "Use merge queues to control high-throughput PR merges, reduce stale-base retries, and make protected-branch integration more predictable.",
      "suggestions": []
    },
    {
      "href": "/en/workflows/hotfix-and-urgent-fixes",
      "path": "workflows/hotfix-and-urgent-fixes",
      "section": "workflows",
      "tier": "core",
      "slug": "hotfix-and-urgent-fixes",
      "title": "Hotfix and Urgent Fixes",
      "summary": "Handle urgent fixes on a stable base, ship the smallest repair possible, and then flow that repair back into the branches that still need it.",
      "suggestions": []
    },
    {
      "href": "/en/workflows/hotfix-rollback-after-release",
      "path": "workflows/hotfix-rollback-after-release",
      "section": "workflows",
      "tier": "recommended",
      "slug": "hotfix-rollback-after-release",
      "title": "Rollback a failed hotfix after release",
      "summary": "When a production hotfix causes new problems, first choose the rollback scope and stabilize the branch model before layering on more fixes.",
      "suggestions": []
    },
    {
      "href": "/en/workflows/open-source-fork-pr-contribution",
      "path": "workflows/open-source-fork-pr-contribution",
      "section": "workflows",
      "tier": "extended",
      "slug": "open-source-fork-pr-contribution",
      "title": "Open Source Contribution with Fork + PR",
      "summary": "Connect the full open-source contribution loop from fork and upstream sync through branch creation, pushing to your fork, and opening a pull request.",
      "suggestions": []
    },
    {
      "href": "/en/workflows/release-branch-workflow",
      "path": "workflows/release-branch-workflow",
      "section": "workflows",
      "tier": "core",
      "slug": "release-branch-workflow",
      "title": "Release Branch Workflow",
      "summary": "Explain when to cut a release branch, when to freeze features, and how to flow fixes back to main.",
      "suggestions": []
    },
    {
      "href": "/en/workflows/backport-with-cherry-pick",
      "path": "workflows/backport-with-cherry-pick",
      "section": "workflows",
      "tier": "recommended",
      "slug": "backport-with-cherry-pick",
      "title": "Backporting with Cherry-pick",
      "summary": "Backport precise fixes onto maintenance branches without merging an entire feature branch.",
      "suggestions": []
    },
    {
      "href": "/en/workflows/post-release-multi-branch-backporting",
      "path": "workflows/post-release-multi-branch-backporting",
      "section": "workflows",
      "tier": "extended",
      "slug": "post-release-multi-branch-backporting",
      "title": "Post-release Multi-branch Backporting",
      "summary": "Control order, validation, and branch boundaries when one fix must be backported into multiple released maintenance lines.",
      "suggestions": []
    },
    {
      "href": "/en/workflows/fork-upstream-sync",
      "path": "workflows/fork-upstream-sync",
      "section": "workflows",
      "tier": "extended",
      "slug": "fork-upstream-sync",
      "title": "Fork and Upstream Sync",
      "summary": "Keep origin and upstream roles clear when collaborating through a fork workflow.",
      "suggestions": []
    },
    {
      "href": "/en/workflows/squash-vs-rebase-merge",
      "path": "workflows/squash-vs-rebase-merge",
      "section": "workflows",
      "tier": "extended",
      "slug": "squash-vs-rebase-merge",
      "title": "Choosing Squash Merge vs Rebase Merge",
      "summary": "Compare how squash merge and rebase merge affect readability, traceability, and rollback options.",
      "suggestions": []
    },
    {
      "href": "/en/workflows/long-lived-branch-maintenance",
      "path": "workflows/long-lived-branch-maintenance",
      "section": "workflows",
      "tier": "extended",
      "slug": "long-lived-branch-maintenance",
      "title": "Maintaining Long-lived Branches",
      "summary": "Show how long-lived branches can stay aligned with main and avoid painful late merges.",
      "suggestions": []
    },
    {
      "href": "/en/workflows/long-lived-branch-conflict-governance",
      "path": "workflows/long-lived-branch-conflict-governance",
      "section": "workflows",
      "tier": "extended",
      "slug": "long-lived-branch-conflict-governance",
      "title": "Conflict Governance for Long-lived Branches",
      "summary": "Turn repeated long-branch conflicts from ad hoc firefighting into a managed process with sync cadence, hotspot tracking, and reusable conflict resolution.",
      "suggestions": []
    },
    {
      "href": "/en/workflows/submodule-update-flow",
      "path": "workflows/submodule-update-flow",
      "section": "workflows",
      "tier": "recommended",
      "slug": "submodule-update-flow",
      "title": "Submodule Update Flow",
      "summary": "Outline a safe routine for updating submodules, locking revisions, and syncing the parent repository.",
      "suggestions": []
    },
    {
      "href": "/en/github/github-flow-basics",
      "path": "github/github-flow-basics",
      "section": "github",
      "tier": "recommended",
      "slug": "github-flow-basics",
      "title": "GitHub Flow Basics",
      "summary": "Use GitHub's own lightweight collaboration model to understand branches, pull requests, reviews, and merges as one practical loop.",
      "suggestions": []
    },
    {
      "href": "/en/github/pull-requests-and-reviews",
      "path": "github/pull-requests-and-reviews",
      "section": "github",
      "tier": "recommended",
      "slug": "pull-requests-and-reviews",
      "title": "Pull Requests and Code Review",
      "summary": "Understand pull requests, reviews, protected branches, and merge decisions as collaboration mechanics rather than just UI actions.",
      "suggestions": []
    },
    {
      "href": "/en/github/forks-and-open-source-contribution",
      "path": "github/forks-and-open-source-contribution",
      "section": "github",
      "tier": "extended",
      "slug": "forks-and-open-source-contribution",
      "title": "Forks and Open Source Contribution",
      "summary": "Connect forks, upstream sync, contribution expectations, and pull-request etiquette into a realistic open-source workflow.",
      "suggestions": []
    },
    {
      "href": "/en/github/issues-projects-and-discussions",
      "path": "github/issues-projects-and-discussions",
      "section": "github",
      "tier": "extended",
      "slug": "issues-projects-and-discussions",
      "title": "Issues, Projects, and Discussions",
      "summary": "Learn how GitHub organizes requests, work tracking, and community discussion so collaboration does not collapse into pull requests alone.",
      "suggestions": []
    },
    {
      "href": "/en/github/github-actions-and-skills",
      "path": "github/github-actions-and-skills",
      "section": "github",
      "tier": "extended",
      "slug": "github-actions-and-skills",
      "title": "GitHub Actions and GitHub Skills",
      "summary": "Build a practical mental model for GitHub Actions and use GitHub Skills as a lower-risk practice path for platform learning.",
      "suggestions": []
    },
    {
      "href": "/en/gitlab/gitlab-flow-and-merge-requests",
      "path": "gitlab/gitlab-flow-and-merge-requests",
      "section": "gitlab",
      "tier": "recommended",
      "slug": "gitlab-flow-and-merge-requests",
      "title": "GitLab Flow and Merge Requests",
      "summary": "Understand GitLab Flow, environment-aware branching, and merge requests as one collaboration model instead of a collection of UI features.",
      "suggestions": []
    },
    {
      "href": "/en/gitlab/gitlab-forks-and-contributions",
      "path": "gitlab/gitlab-forks-and-contributions",
      "section": "gitlab",
      "tier": "extended",
      "slug": "gitlab-forks-and-contributions",
      "title": "GitLab Forks and Contribution Flow",
      "summary": "Connect GitLab forks, contribution branches, merge requests, and upstream sync into a more realistic external collaboration flow.",
      "suggestions": []
    },
    {
      "href": "/en/gitlab/gitlab-issues-boards-and-milestones",
      "path": "gitlab/gitlab-issues-boards-and-milestones",
      "section": "gitlab",
      "tier": "extended",
      "slug": "gitlab-issues-boards-and-milestones",
      "title": "GitLab Issues, Boards, and Milestones",
      "summary": "Learn how GitLab organizes issues, boards, and milestones so planning and delivery do not collapse into merge requests alone.",
      "suggestions": []
    },
    {
      "href": "/en/gitlab/gitlab-groups-projects-and-permissions",
      "path": "gitlab/gitlab-groups-projects-and-permissions",
      "section": "gitlab",
      "tier": "extended",
      "slug": "gitlab-groups-projects-and-permissions",
      "title": "GitLab Groups, Projects, and Permissions",
      "summary": "Understand how groups, projects, roles, and inherited permissions shape collaboration boundaries in GitLab before those boundaries become messy.",
      "suggestions": []
    },
    {
      "href": "/en/gitlab/gitlab-ci-and-runners",
      "path": "gitlab/gitlab-ci-and-runners",
      "section": "gitlab",
      "tier": "recommended",
      "slug": "gitlab-ci-and-runners",
      "title": "GitLab CI/CD and Runners",
      "summary": "Build the smallest useful mental model for GitLab CI/CD, pipelines, jobs, and runners, and understand how they work with merge requests.",
      "suggestions": []
    },
    {
      "href": "/en/internals/object-database",
      "path": "internals/object-database",
      "section": "internals",
      "tier": "core",
      "slug": "object-database",
      "title": "Git Object Database",
      "summary": "Understand blob, tree, commit, and tag objects, and why Git describes itself as a content-addressable object database.",
      "suggestions": []
    },
    {
      "href": "/en/internals/plumbing-and-porcelain",
      "path": "internals/plumbing-and-porcelain",
      "section": "internals",
      "tier": "recommended",
      "slug": "plumbing-and-porcelain",
      "title": "Plumbing and Porcelain",
      "summary": "Understanding the split between porcelain and plumbing makes it easier to see why some Git commands feel task-oriented while others expose internal primitives directly.",
      "suggestions": []
    },
    {
      "href": "/en/internals/index-and-working-tree",
      "path": "internals/index-and-working-tree",
      "section": "internals",
      "tier": "core",
      "slug": "index-and-working-tree",
      "title": "Working Tree, Index, and Object Store",
      "summary": "Separating the working tree, index, and object database is the clearest way to understand add, commit, restore, and reset.",
      "suggestions": []
    },
    {
      "href": "/en/internals/repository-layout-and-gitdir",
      "path": "internals/repository-layout-and-gitdir",
      "section": "internals",
      "tier": "recommended",
      "slug": "repository-layout-and-gitdir",
      "title": "Repository Layout, .git, and GIT_DIR",
      "summary": "Understanding working trees, gitdirs, common directories, and worktrees helps explain where Git really stores repository state.",
      "suggestions": []
    },
    {
      "href": "/en/internals/refs-and-head",
      "path": "internals/refs-and-head",
      "section": "internals",
      "tier": "core",
      "slug": "refs-and-head",
      "title": "Git References and HEAD",
      "summary": "Put branches, tags, remote-tracking refs, and HEAD into one model so Git's pointer behavior becomes easier to reason about.",
      "suggestions": []
    },
    {
      "href": "/en/internals/remote-tracking-refs",
      "path": "internals/remote-tracking-refs",
      "section": "internals",
      "tier": "core",
      "slug": "remote-tracking-refs",
      "title": "Remote-Tracking References",
      "summary": "Understand the difference between `main` and `origin/main` so fetch, pull, push, and branch sync become easier to reason about.",
      "suggestions": []
    },
    {
      "href": "/en/internals/revision-selection-and-ranges",
      "path": "internals/revision-selection-and-ranges",
      "section": "internals",
      "tier": "extended",
      "slug": "revision-selection-and-ranges",
      "title": "Revision Selection and Commit Ranges",
      "summary": "Many advanced Git commands are really working over sets of commits expressed through revision syntax, not just single named commits.",
      "suggestions": []
    },
    {
      "href": "/en/internals/commit-graph",
      "path": "internals/commit-graph",
      "section": "internals",
      "tier": "core",
      "slug": "commit-graph",
      "title": "Git Commit Graph and History Shape",
      "summary": "Understand why Git history is fundamentally a graph rather than a simple timeline, and how merge and rebase reshape that graph.",
      "suggestions": []
    },
    {
      "href": "/en/internals/packfiles-and-storage",
      "path": "internals/packfiles-and-storage",
      "section": "internals",
      "tier": "recommended",
      "slug": "packfiles-and-storage",
      "title": "Git Packfiles and Object Storage",
      "summary": "Learn how Git uses packfiles, compression, and object reuse to store and transfer history efficiently instead of copying full project snapshots every time.",
      "suggestions": []
    },
    {
      "href": "/en/internals/transfer-protocols-and-negotiation",
      "path": "internals/transfer-protocols-and-negotiation",
      "section": "internals",
      "tier": "extended",
      "slug": "transfer-protocols-and-negotiation",
      "title": "Transfer Protocols and Negotiation",
      "summary": "Understanding fetch, clone, and push as negotiated object exchange helps explain why Git sync is not just copying whole repositories back and forth.",
      "suggestions": []
    },
    {
      "href": "/en/internals/environment-and-repository-variables",
      "path": "internals/environment-and-repository-variables",
      "section": "internals",
      "tier": "extended",
      "slug": "environment-and-repository-variables",
      "title": "Environment Variables and Repository Context",
      "summary": "Variables like GIT_DIR, GIT_WORK_TREE, and GIT_INDEX_FILE help explain how Git decides what repository context it is actually operating in.",
      "suggestions": []
    },
    {
      "href": "/en/internals/reachability-and-garbage-collection",
      "path": "internals/reachability-and-garbage-collection",
      "section": "internals",
      "tier": "recommended",
      "slug": "reachability-and-garbage-collection",
      "title": "Reachability and Garbage Collection",
      "summary": "Whether objects can still be recovered often depends more on reachability and garbage collection than on the command that made them harder to find.",
      "suggestions": []
    },
    {
      "href": "/en/internals/merge-base-and-ancestry",
      "path": "internals/merge-base-and-ancestry",
      "section": "internals",
      "tier": "recommended",
      "slug": "merge-base-and-ancestry",
      "title": "Merge Bases and Ancestry",
      "summary": "Explain how Git uses common ancestors to reason about branch differences, merge inputs, and reachability.",
      "suggestions": []
    },
    {
      "href": "/en/internals/tree-objects-and-snapshots",
      "path": "internals/tree-objects-and-snapshots",
      "section": "internals",
      "tier": "extended",
      "slug": "tree-objects-and-snapshots",
      "title": "Tree Objects and Snapshots",
      "summary": "Explain how tree objects encode directory structure and why commits represent full snapshot trees.",
      "suggestions": []
    },
    {
      "href": "/en/internals/blob-objects-and-content-addressing",
      "path": "internals/blob-objects-and-content-addressing",
      "section": "internals",
      "tier": "extended",
      "slug": "blob-objects-and-content-addressing",
      "title": "Blob Objects and Content Addressing",
      "summary": "Explain how blobs store raw content and why hashes become the identity of Git objects.",
      "suggestions": []
    },
    {
      "href": "/en/internals/commit-message-and-parents",
      "path": "internals/commit-message-and-parents",
      "section": "internals",
      "tier": "extended",
      "slug": "commit-message-and-parents",
      "title": "Commit Objects, Parents, and Messages",
      "summary": "Show how commit objects connect trees, parent commits, and messages into the history graph.",
      "suggestions": []
    },
    {
      "href": "/en/internals/refspec-and-ref-updates",
      "path": "internals/refspec-and-ref-updates",
      "section": "internals",
      "tier": "extended",
      "slug": "refspec-and-ref-updates",
      "title": "Refspecs and Ref Updates",
      "summary": "Explain how refspecs determine which refs are mapped and updated during fetch and push.",
      "suggestions": []
    },
    {
      "href": "/en/recovery/reflog-recovery",
      "path": "recovery/reflog-recovery",
      "section": "recovery",
      "tier": "core",
      "slug": "reflog-recovery",
      "title": "Recovering with reflog",
      "summary": "Use reflog to locate previous references and recover from reset, rebase, or lost branch states.",
      "suggestions": []
    },
    {
      "href": "/en/recovery/recover-after-reset",
      "path": "recovery/recover-after-reset",
      "section": "recovery",
      "tier": "core",
      "slug": "recover-after-reset",
      "title": "Recover after an over-aggressive reset",
      "summary": "When reset moves the branch, index, or working tree farther than expected, first identify which layer changed, then recover with reflog, ORIG_HEAD, or a rescue branch.",
      "suggestions": []
    },
    {
      "href": "/en/recovery/recover-after-rebase",
      "path": "recovery/recover-after-rebase",
      "section": "recovery",
      "tier": "core",
      "slug": "recover-after-rebase",
      "title": "Recover after a bad rebase",
      "summary": "When rebase introduces conflicts, missing commits, or a result you no longer trust, stop rewriting history and recover control with abort, reflog, and rescue branches.",
      "suggestions": []
    },
    {
      "href": "/en/recovery/recover-deleted-branch",
      "path": "recovery/recover-deleted-branch",
      "section": "recovery",
      "tier": "recommended",
      "slug": "recover-deleted-branch",
      "title": "Recover a deleted branch",
      "summary": "When a branch disappears, first determine whether only the name is gone or whether the commits have become hard to reach, then restore it from reflog or another surviving reference.",
      "suggestions": []
    },
    {
      "href": "/en/recovery/detached-head-rescue",
      "path": "recovery/detached-head-rescue",
      "section": "recovery",
      "tier": "core",
      "slug": "detached-head-rescue",
      "title": "Rescue work from detached HEAD",
      "summary": "Detached HEAD is not an error by itself. The real risk is creating commits there and leaving them without a branch name that preserves them.",
      "suggestions": []
    },
    {
      "href": "/en/recovery/undo-after-pull",
      "path": "recovery/undo-after-pull",
      "section": "recovery",
      "tier": "core",
      "slug": "undo-after-pull",
      "title": "Undo after a pull you regret",
      "summary": "When a pull leaves your branch in an unexpected state, first determine what pull actually did, then recover with ORIG_HEAD, reflog, or a rescue branch.",
      "suggestions": []
    },
    {
      "href": "/en/recovery/assess-force-push-impact",
      "path": "recovery/assess-force-push-impact",
      "section": "recovery",
      "tier": "recommended",
      "slug": "assess-force-push-impact",
      "title": "Assess the impact after a force push",
      "summary": "After a force push, the urgent task is not another push. First identify which refs were replaced, who may still depend on the old history, and what recovery window still exists.",
      "suggestions": []
    },
    {
      "href": "/en/history",
      "path": "concepts/git-history",
      "section": "internals",
      "tier": "core",
      "slug": "git-history",
      "title": "Git History Explained",
      "summary": "Explains how Git records history, why commit history is a graph, and what that means for collaboration, recovery, and code review.",
      "suggestions": []
    }
  ]
};
