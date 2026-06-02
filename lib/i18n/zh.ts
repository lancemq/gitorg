import type { Dictionary } from "./index";
import {
  baseSidebar,
  buildLearningPathNavItem,
  buildWorkflowNavItem,
  buildCommandNavItem,
  buildBestPracticeNavItem,
  buildInternalsNavItem,
  buildGithubNavItem,
  buildGitlabNavItem,
  buildRecoveryNavItem,
  buildCicdNavItem,
  buildIdeNavItem,
  buildSecurityNavItem,
  buildPerformanceNavItem,
  buildMigrationNavItem,
  buildHostingNavItem,
  buildConceptsNavItem,
} from "./index";
import { commandSlugs } from "./slugs";

export const zhDictionary: Dictionary = {
  sidebar: {
    docs: (activePath) =>
      baseSidebar("zh", [
        {
          title: "Overview",
          items: [{ label: "总览", href: "/zh", active: !activePath || activePath === "overview" }],
        },
        {
          title: "Learning Path",
          items: [
            buildLearningPathNavItem("zh", activePath),
            buildWorkflowNavItem("zh", activePath),
            buildCommandNavItem("zh", activePath),
          ],
        },
        {
          title: "Topics",
          items: [
            buildBestPracticeNavItem("zh", activePath),
            buildInternalsNavItem("zh", activePath),
            buildGithubNavItem("zh", activePath),
            buildGitlabNavItem("zh", activePath),
            buildCicdNavItem("zh", activePath),
            buildIdeNavItem("zh", activePath),
            buildSecurityNavItem("zh", activePath),
            buildPerformanceNavItem("zh", activePath),
            buildMigrationNavItem("zh", activePath),
            buildHostingNavItem("zh", activePath),
            buildConceptsNavItem("zh", activePath),
            buildRecoveryNavItem("zh", activePath),
          ],
        },
        {
          title: "Resources",
          items: [
            {
              label: "Git 历史",
              href: "/zh/history",
              active: activePath === "concepts/git-history",
            },
            {
              label: "更新日志",
              href: "/zh/updates",
              active: activePath === "updates",
            },
            {
              label: "常见问题",
              href: "/zh/faq",
              active: activePath === "faq",
            },
          ],
        },
      ]),
  },
  commandIndex: {
    eyebrow: "Command Hub",
    title: "Git 命令专题",
    description: "先进入命令聚合页，再按学习路径选择具体命令详情，避免在左侧菜单里直接平铺过长列表。",
  },
  bestPracticeIndex: {
    eyebrow: "Best Practices",
    title: "Git 最佳实践频道",
    description: "把协作习惯拆成多个可独立阅读的专题，从提交质量、主题分支、同步策略，到共享历史边界与安全推送。",
  },
  workflowIndex: {
    eyebrow: "Workflows",
    title: "Git 工作流频道",
    description: "把日常协作中的关键流程拆成多个专题，包括同步策略、功能分支协作、评审前同步，以及紧急修复场景。",
  },
  recoveryIndex: {
    eyebrow: "Recovery",
    title: "Git 恢复与排障频道",
    description: "把最常见的 Git 误操作和恢复路径拆成多个专题，包括 reset、rebase、误删分支、detached HEAD 与 reflog 自救。",
  },
  githubIndex: {
    eyebrow: "GitHub Topic",
    title: "GitHub 协作专题",
    description: "把 GitHub 常见能力拆成本地教程，从 GitHub Flow、PR 与 review，到 fork 贡献、Issues、Projects、Discussions 与 Actions。",
  },
  gitlabIndex: {
    eyebrow: "GitLab Topic",
    title: "GitLab 协作专题",
    description: "把 GitLab 常见能力拆成本地教程，从 GitLab Flow、Merge Request，到 Issues / Boards、Groups / 权限与 CI/CD 基础。",
  },
  learningPathIndex: {
    eyebrow: "Quick Start",
    title: "Git 快速上手专题",
    description: "把快速上手拆成一组循序渐进的子页面，覆盖环境准备、暂存与提交、远端同步，以及第一次分支协作。",
  },
  internalsIndex: {
    eyebrow: "Git Internals",
    title: "Git 原理频道",
    description: "把 Git 原理拆成多个原理点专题，从对象数据库、引用与 HEAD，到提交图与 packfiles，帮助你建立更稳定的底层心智模型。",
  },
  ciCdIndex: {
    eyebrow: "CI/CD",
    title: "CI/CD 集成",
    description: "系统介绍 Git 与 CI/CD 管线的集成方式，包括 GitHub Actions、GitLab CI 的触发策略、认证与安全实践。",
  },
  ideIndex: {
    eyebrow: "IDE",
    title: "IDE 集成",
    description: "掌握主流 IDE 中的 Git 集成功能，包括 VS Code 和 JetBrains 的源代码管理、差异对比与冲突解决。",
  },
  securityIndex: {
    eyebrow: "Security",
    title: "安全",
    description: "系统学习 SSH 密钥管理与 GPG 签名，确保 Git 操作的认证安全与提交验证。",
  },
  performanceIndex: {
    eyebrow: "Performance",
    title: "性能优化",
    description: "深入了解 Git 大仓库性能优化策略，包括 partial clone、sparse checkout、浅克隆与 Git LFS。",
  },
  migrationIndex: {
    eyebrow: "Migration",
    title: "迁移指南",
    description: "从 Subversion（SVN）和 Mercurial（Hg）迁移到 Git 的完整流程、工具选择与常见陷阱。",
  },
  hostingIndex: {
    eyebrow: "Hosting",
    title: "托管方案",
    description: "对比 GitHub、GitLab、Bitbucket 等托管平台，以及 GitLab CE、Gitea 等自建方案的选择与部署。",
  },
  conceptsIndex: {
    eyebrow: "Concepts",
    title: "概念基础",
    description: "理解 Git 的核心概念，包括三层结构、历史模型、忽略文件、detached HEAD 等关键知识点。",
  },
  home: {
    hero: {
      eyebrow: "Source Control Learning Lab",
      title: "学会 Git，写出更好的历史。",
      description:
        "面向协作开发者的 Git 文档站，覆盖快速上手、常见工作流、风险操作恢复，以及 rebase、merge、reflog 等核心命令的实战说明。",
      primaryAction: "开始学习",
      secondaryAction: "查看参考资料",
    },
    meta: {
      modulesTitle: "内容频道",
      modules: 0,
      modulesLabel: "当前已接入的教程频道",
      commandCardsTitle: "命令专题",
      commandCards: 0,
      exercisesTitle: "教程总数",
      exercises: 0,
      recommendedPathTitle: "Recommended path",
      recommendedPath: "Quick Start → fetch/pull → rebase → reflog",
    },
    quickStart: {
      eyebrow: "Quick Start",
      title: "快速开始",
      description: "先用几个低风险命令建立对分支、提交和同步的直觉。",
      cards: [
        {
          kicker: "01 / setup",
          title: "初始化仓库",
          description: "了解 git init、git clone、身份配置和默认分支。",
          command: "git clone repo-url",
        },
        {
          kicker: "02 / stage",
          title: "暂存与提交",
          description: "理解工作区、暂存区和提交历史的三层关系。",
          command: "git add . && git commit",
        },
        {
          kicker: "03 / sync",
          title: "同步远端",
          description: "掌握 fetch、pull、push 与本地分支的协同方式。",
          command: "git fetch origin",
        },
      ],
    },
    knowledgeColumns: [
      {
        id: "best-practices",
        eyebrow: "Best Practices",
        title: "最佳实践",
        description: "减少历史污染和冲突成本。",
        items: [
          {
            title: "保持提交小而明确",
            description: "每次提交只表达一个意图，便于 review、回滚和 cherry-pick。",
          },
          {
            title: "优先 fetch，再决定 merge 或 rebase",
            description: "先获取远端状态，再显式选择同步策略，比默认 pull 更可控。",
          },
          {
            title: "危险操作前先看 reflog",
            description: "reset、rebase、force push 之前确认可恢复路径，降低误操作损失。",
          },
        ],
      },
      {
        id: "internals",
        eyebrow: "Git Internals",
        title: "底层原理",
        description: "把命令行为和对象模型对应起来。",
        items: [
          {
            title: "对象数据库",
            description: "blob、tree、commit 如何组合成可追踪的历史图。",
          },
          {
            title: "引用与 HEAD",
            description: "分支、本地标签、远端跟踪分支都是指向提交的引用。",
          },
          {
            title: "可恢复性",
            description: "reflog 与 gc 机制决定对象什么时候还能被找回。",
          },
        ],
      },
      {
        id: "workflows",
        eyebrow: "Workflows",
        title: "常见工作流",
        description: "把日常协作流程拆成可复用的模式。",
        items: [
          {
            title: "先 fetch 再决定",
            description: "把观察和整合拆成两步，比默认 pull 更可控。",
          },
          {
            title: "功能分支协作",
            description: "通过主题分支隔离开发，降低主分支的不稳定风险。",
          },
          {
            title: "紧急修复流程",
            description: "hotfix 分支的创建、修复、合并与回滚全流程。",
          },
        ],
      },
      {
        id: "recovery",
        eyebrow: "Recovery",
        title: "误操作恢复",
        description: "误操作后的定位、判断与恢复路径。",
        items: [
          {
            title: "先查 reflog 再操作",
            description: "reset、rebase、删分支前确认可恢复位置。",
          },
          {
            title: "reset 自救分级",
            description: "--soft、--mixed、--hard 三级的风险与适用场景。",
          },
          {
            title: "detached HEAD 处理",
            description: "进入 detached HEAD 后如何安全回到正常状态。",
          },
        ],
      },
    ],
    reference: {
      eyebrow: "Reference",
      title: "命令参考路线",
      description: "把高频命令整理成渐进式学习路径。",
      steps: [
        { step: "01", title: "clone", description: "拉取仓库并建立本地副本。" },
        { step: "02", title: "add", description: "把改动加入暂存区。" },
        { step: "03", title: "commit", description: "生成新的提交对象。" },
        { step: "04", title: "rebase", description: "重写提交基底并整理历史。" },
      ],
    },
    faq: {
      eyebrow: "FAQ",
      title: "常见问题",
      description: "基于 Git 官方文档与官方书中的高频问题整理出一组上手最常见的答疑。",
      action: "查看全部问题",
      items: [
        {
          question: "`git pull` 到底做了什么，为什么结果有时和我预期不同？",
          answer:
            "`git pull` 会先执行 fetch，再把上游分支整合进当前分支。官方文档说明它可以走 `--ff-only`、`--rebase`、`--no-rebase` 或 `--squash` 等不同路径，所以结果取决于你的命令参数和 `pull.rebase`、`pull.ff` 等配置。想减少意外，最稳妥的习惯仍然是先 fetch，再明确决定是 merge 还是 rebase。",
        },
        {
          question: "`git reset --soft`、`--mixed`、`--hard` 有什么本质区别？",
          answer:
            "官方手册把区别讲得很明确：`--soft` 只移动 HEAD，保留暂存区和工作区；`--mixed` 会把暂存区重置到目标提交，但保留工作区改动；`--hard` 会同时改写 HEAD、暂存区和工作区。也就是说，真正危险的是 `--hard`，因为它会直接覆盖当前文件状态。",
        },
        {
          question: "误删分支、reset 过头，或者 pull 之后后悔了，还能找回吗？",
          answer:
            "很多时候可以。Git 官方在 `git reset` 文档里专门说明了 `ORIG_HEAD` 和 reflog 的用途：reset、merge、pull 这类操作通常会留下可回溯的引用。只要对象还没被垃圾回收清理掉，通常都能先通过 reflog 找到原来的提交，再决定是新建分支还是回退引用。",
        },
        {
          question: "为什么 `git stash` 没有把我的新文件一起存起来？",
          answer:
            "因为 stash 默认保存的是已跟踪文件在工作区和暂存区中的改动。官方文档说明，如果你还想把未跟踪文件一起收进去，需要用 `git stash push -u`；如果连忽略文件也要一起处理，则使用 `-a`。另外，`git stash apply` 会保留 stash，而 `git stash pop` 会在成功应用后尝试把它移出列表。",
        },
        {
          question: "什么是 detached HEAD，遇到它是不是就出问题了？",
          answer:
            "不一定。官方 `git switch` 文档把 detached HEAD 描述成一种用于检查历史提交或做临时实验的状态，此时 HEAD 指向的是某个提交而不是分支名。它本身不是错误；如果你在这个状态下做出的提交值得保留，只要立刻新建一个分支把它接住就可以。",
        },
        {
          question: "我到底该用 merge 还是 rebase？",
          answer:
            "Git 官方书把两者都视为整合历史的正常方式：merge 会保留分叉结构，rebase 会把你的提交重新放到新的基底上，让历史更线性。但官方书也特别强调，不要 rebase 那些已经离开你本地仓库、并且别人可能已经基于它继续工作的提交。简单说，个人本地整理历史常用 rebase，已共享历史默认更安全的是 merge。",
        },
        {
          question: "为什么切换分支时 Git 拒绝我继续操作？",
          answer:
            "官方 `git switch` 文档说明，当切换分支会导致本地改动丢失时，Git 会直接中止操作。这不是故障，而是保护机制。通常你有三种稳妥处理方式：先提交、先 stash，或者在你确认可以丢弃本地改动时再显式使用 `--discard-changes`。",
        },
      ],
    },
    latest: {
      eyebrow: "Changelog",
      title: "最新更新",
      description: "这里优先展示最近补入或扩写的教材入口，方便快速跟进新增内容。",
    },
  },
  faqPage: {
    eyebrow: "FAQ Library",
    title: "全部常见问题",
    description: "把首页里的高频问答整理成一页更完整的 Git FAQ，方便集中阅读和后续持续扩充。",
    groups: [
      {
        id: "pull-sync",
        title: "pull 与同步",
        description: "围绕 fetch、pull、push 以及远端同步节奏，把最常见的理解偏差拆开说明。",
        items: [
          {
            question: "`git pull` 到底做了什么，为什么结果有时和我预期不同？",
            answer:
              "`git pull` 会先执行 fetch，再把上游分支整合进当前分支。官方文档说明它可以走 `--ff-only`、`--rebase`、`--no-rebase` 或 `--squash` 等不同路径，所以结果取决于你的命令参数和 `pull.rebase`、`pull.ff` 等配置。想减少意外，最稳妥的习惯仍然是先 fetch，再明确决定是 merge 还是 rebase。",
          },
          {
            question: "为什么我明明已经 pull 了，还是觉得本地和远端对不上？",
            answer:
              "因为 pull 解决的是“获取并整合上游变化”，但它不保证你对当前分支、跟踪关系和历史状态的理解一定正确。更稳的排查顺序通常是先看 `git branch -vv`，确认当前分支跟踪谁，再看 `git log --oneline --graph --decorate --all`，确认分叉位置。很多“pull 了还是不一样”的问题，本质上是站错了分支，或者在错误的远端关系上做了同步。",
          },
          {
            question: "为什么 push 会失败，Git 说远端比我更新？",
            answer:
              "最常见的原因是远端分支已经有了你本地没有的新提交，Git 不允许你直接把历史覆盖掉。通常更稳的动作不是立刻强推，而是先 `git fetch origin`，再判断应该 merge、rebase，还是只是站错了分支。只有在你完全明确历史覆盖风险的情况下，才考虑 force push，而且这通常不应该发生在共享分支上。",
          },
          {
            question: "什么情况下适合 `pull --ff-only`？",
            answer:
              "`--ff-only` 最适合你希望“只接受快进更新，不做额外整合动作”的场景。它的价值在于：如果当前分支已经和远端分叉，它会直接失败，而不是替你创建 merge commit 或触发其他整合路径。所以在稳定主分支、发布分支或你想强制保持同步动作可解释的时候，这个参数特别有用。",
          },
          {
            question: "为什么很多团队强调先 fetch 再决定下一步？",
            answer:
              "因为 fetch 把“观察远端状态”和“改动当前分支”拆成了两步。你可以先看清远端有没有变化、当前分支有没有分叉、接下来更适合 merge、rebase 还是继续等待。对于初学者和团队协作来说，这种先观察再整合的节奏通常比直接 pull 更容易控制风险。",
          },
        ],
      },
      {
        id: "reset-recovery",
        title: "reset 与恢复",
        description: "围绕 reset、reflog、回滚与找回，把常见误操作后的判断路径说明清楚。",
        items: [
          {
            question: "`git reset --soft`、`--mixed`、`--hard` 有什么本质区别？",
            answer:
              "官方手册把区别讲得很明确：`--soft` 只移动 HEAD，保留暂存区和工作区；`--mixed` 会把暂存区重置到目标提交，但保留工作区改动；`--hard` 会同时改写 HEAD、暂存区和工作区。也就是说，真正危险的是 `--hard`，因为它会直接覆盖当前文件状态。",
          },
          {
            question: "误删分支、reset 过头，或者 pull 之后后悔了，还能找回吗？",
            answer:
              "很多时候可以。Git 官方在 `git reset` 文档里专门说明了 `ORIG_HEAD` 和 reflog 的用途：reset、merge、pull 这类操作通常会留下可回溯的引用。只要对象还没被垃圾回收清理掉，通常都能先通过 reflog 找到原来的提交，再决定是新建分支还是回退引用。",
          },
          {
            question: "`git revert` 和 `git reset` 应该怎么选？",
            answer:
              "可以简单理解为：`revert` 是通过新提交“抵消旧提交”，更适合已经共享出去的历史；`reset` 是直接移动分支引用，更适合你还在本地整理、撤销或重排历史的时候。高风险点在于，如果一段历史已经被别人拉走了，再用 reset 改写它，往往会把自己的整理动作变成团队同步问题。",
          },
          {
            question: "reflog 到底记录的是什么，为什么它经常能救命？",
            answer:
              "reflog 记录的是引用移动历史，而不是“你做过的全部事情”。像 HEAD、分支、merge、reset、rebase 这类会移动引用的位置，通常都会留下 reflog 记录。它之所以常常能救命，是因为你哪怕把分支指针挪走了，Git 仍然可能暂时记得它曾经指向哪里，从而让你重新找到那个提交。",
          },
          {
            question: "为什么有时候我明明看到过的提交，后来却真的找不回来了？",
            answer:
              "因为 reflog 和底层对象都不是永久保存的。只要对象不再被任何引用保留，而且超过了垃圾回收窗口，就可能被 Git 清理掉。所以恢复动作通常越早越好；一旦你意识到自己可能误删或误 reset，最好先停止继续折腾仓库，先把 reflog、log 和当前引用位置看清楚。",
          },
        ],
      },
      {
        id: "stash-switch",
        title: "stash、切换与历史边界",
        description: "围绕 stash、切换分支、detached HEAD 以及 merge/rebase 选择，补齐最常见的判断边界。",
        items: [
          {
            question: "为什么 `git stash` 没有把我的新文件一起存起来？",
            answer:
              "因为 stash 默认保存的是已跟踪文件在工作区和暂存区中的改动。官方文档说明，如果你还想把未跟踪文件一起收进去，需要用 `git stash push -u`；如果连忽略文件也要一起处理，则使用 `-a`。另外，`git stash apply` 会保留 stash，而 `git stash pop` 会在成功应用后尝试把它移出列表。",
          },
          {
            question: "什么是 detached HEAD，遇到它是不是就出问题了？",
            answer:
              "不一定。官方 `git switch` 文档把 detached HEAD 描述成一种用于检查历史提交或做临时实验的状态，此时 HEAD 指向的是某个提交而不是分支名。它本身不是错误；如果你在这个状态下做出的提交值得保留，只要立刻新建一个分支把它接住就可以。",
          },
          {
            question: "我到底该用 merge 还是 rebase？",
            answer:
              "Git 官方书把两者都视为整合历史的正常方式：merge 会保留分叉结构，rebase 会把你的提交重新放到新的基底上，让历史更线性。但官方书也特别强调，不要 rebase 那些已经离开你本地仓库、并且别人可能已经基于它继续工作的提交。简单说，个人本地整理历史常用 rebase，已共享历史默认更安全的是 merge。",
          },
          {
            question: "为什么切换分支时 Git 拒绝我继续操作？",
            answer:
              "官方 `git switch` 文档说明，当切换分支会导致本地改动丢失时，Git 会直接中止操作。这不是故障，而是保护机制。通常你有三种稳妥处理方式：先提交、先 stash，或者在你确认可以丢弃本地改动时再显式使用 `--discard-changes`。",
          },
          {
            question: "stash、commit、临时分支，这三种临时保存方式该怎么选？",
            answer:
              "如果你只是短时间切任务、且当前改动还不适合形成提交，stash 往往最方便；如果这些改动已经具备明确边界，而且你希望保留上下文，直接 commit 到当前分支通常更清晰；如果改动既不适合进正式分支、又可能需要较长时间保留，切一个临时分支往往比长期堆 stash 更容易追踪。核心判断标准不是命令偏好，而是这些改动值不值得被长期命名和保留。",
          },
        ],
      },
    ],
  },
  updatesPage: {
    eyebrow: "Changelog",
    title: "更新日志",
    description: "按时间记录本站教材内容的新增与扩写，重点说明最近补了哪些命令、工作流、原理与恢复类教程。",
    entries: [
      {
        id: "2026-q2",
        period: "2026 Q2",
        title: "工作流与恢复类教材继续扩充",
        summary: "围绕真实协作与排障场景，继续补强 Gitflow、恢复排障和 AI agent 并行开发相关教程。",
        items: [
          "新增 Gitflow Workflow 教程，系统讲清 main、develop、feature、release、hotfix 的分工与适用边界。",
          "扩充恢复与排障频道，覆盖 pull 后撤回、force push 影响判断、reset/rebase 后恢复等高频误操作场景。",
          "补充 AI coding agent 下的 git worktree 使用场景，帮助理解并行任务和隔离工作目录的协作方式。",
        ],
      },
      {
        id: "2026-q1-content",
        period: "2026 Q1",
        title: "教程规模扩展到 100+ 主题",
        summary: "大幅补齐 Git 命令、工作流、原理和最佳实践专题，让站点从入门到进阶的内容骨架基本成形。",
        items: [
          "命令教程显著扩展，补入 config、worktree、submodule、format-patch、show、rm、mv、reflog、bisect、blame 等专题。",
          "原理频道继续补齐，新增对象、引用、提交图、垃圾回收、remote-tracking refs、merge-base 等底层知识点。",
          "高风险命令如 rebase、reset、reflog、cherry-pick、stash、merge 增加更多图例、练习和风险说明。",
        ],
      },
      {
        id: "2026-q1-architecture",
        period: "2026 Q1",
        title: "频道型教材体系成形",
        summary: "把原本零散的内容重组成更清晰的教材频道，让读者可以按主题连续学习。",
        items: [
          "建立 Git 命令、最佳实践、工作流、Git 原理、恢复与排障等独立教材频道。",
          "把最佳实践拆成多个专题页，避免把协作建议堆成一篇过长文章。",
          "把 Git 原理改造成专题频道，并拆出对象数据库、引用与 HEAD、提交图、packfiles 等详情页。",
        ],
      },
      {
        id: "2025-q4",
        period: "2025 Q4",
        title: "双语教材库起步",
        summary: "完成 Markdown / MDX 教材内容源建设，并开始按中英文两套内容系统维护。",
        items: [
          "把教程内容迁移到 `content/` 下统一维护，形成可持续扩展的教材库。",
          "建立 `/zh` 与 `/en` 两套内容路由，让核心教程同步支持中英文阅读。",
          "最早的一批快速上手、rebase、fetch vs pull、reflog recovery、refs 与 HEAD 教材在这一阶段成形。",
        ],
      },
    ],
  },
  docsIndex: {
    eyebrow: "Docs Library",
    title: "文档",
    description: "首页已经直接承载全部文档聚合内容，所有教程仍然来自 content/ 目录下的 Markdown / MDX 文件。",
    sourcesTitle: "参考来源",
    sections: [
      {
        id: "learning-path",
        eyebrow: "Learning Path",
        title: "学习路径",
        description: "适合从零开始构建 Git 使用闭环。",
      },
      {
        id: "commands",
        eyebrow: "Commands",
        title: "命令专题",
        description: "围绕高频命令提供结构化教程。",
      },
      {
        id: "best-practices",
        eyebrow: "Best Practices",
        title: "最佳实践",
        description: "把团队协作中的高频习惯拆成多个专题单独学习。",
      },
      {
        id: "workflows",
        eyebrow: "Workflows",
        title: "工作流",
        description: "围绕日常协作流程拆出更适合团队落地的专题。",
      },
      {
        id: "recovery",
        eyebrow: "Recovery",
        title: "恢复与排障",
        description: "误操作后的定位、判断与恢复路径。",
      },
      {
        id: "concepts",
        eyebrow: "Concepts",
        title: "概念基础",
        description: "理解 Git 的对象、引用和 HEAD。",
      },
      {
        id: "ci-cd",
        eyebrow: "CI/CD",
        title: "CI/CD 集成",
        description: "Git 与 CI/CD 管线集成。",
      },
      {
        id: "ide",
        eyebrow: "IDE",
        title: "IDE 集成",
        description: "主流 IDE 中的 Git 功能。",
      },
      {
        id: "security",
        eyebrow: "Security",
        title: "安全",
        description: "SSH 密钥与 GPG 签名。",
      },
      {
        id: "performance",
        eyebrow: "Performance",
        title: "性能优化",
        description: "大仓库性能优化策略。",
      },
      {
        id: "migration",
        eyebrow: "Migration",
        title: "迁移指南",
        description: "SVN/Hg 到 Git 迁移。",
      },
      {
        id: "hosting",
        eyebrow: "Hosting",
        title: "托管方案",
        description: "托管平台与自建方案。",
      },
      {
        id: "concepts",
        eyebrow: "Concepts",
        title: "概念基础",
        description: "理解 Git 的对象、引用和 HEAD。",
      },
    ],
  },
  commandPage: {
    eyebrow: "Command Reference",
    breadcrumbs: {
      overview: "总揽",
      commands: "命令",
      bestPractices: "最佳实践",
      workflows: "工作流",
      github: "GitHub 专题",
      gitlab: "GitLab 专题",
      internals: "Git 原理",
      concepts: "概念",
      faq: "常见问题",
      learningPath: "学习路径",
      recovery: "恢复与排障",
      "ci-cd": "CI/CD 集成",
      ide: "IDE 集成",
      security: "安全",
      performance: "性能优化",
      migration: "迁移指南",
      hosting: "托管方案",
    },
  },
  commandSlugs,
  commandMeta: {
    "git-init": [
      { label: "复杂度", value: "基础" },
      { label: "常见场景", value: "初始化新仓库" },
    ],
    "git-clone": [
      { label: "复杂度", value: "基础" },
      { label: "常见场景", value: "复制远端仓库" },
    ],
    "git-status": [
      { label: "复杂度", value: "基础" },
      { label: "常见场景", value: "查看工作区和暂存区状态" },
    ],
    "git-add": [
      { label: "复杂度", value: "基础" },
      { label: "常见场景", value: "把改动加入暂存区" },
    ],
    "git-commit": [
      { label: "复杂度", value: "基础" },
      { label: "常见场景", value: "生成提交记录" },
    ],
    "git-diff": [
      { label: "复杂度", value: "基础到中等" },
      { label: "常见场景", value: "比较工作区、暂存区和提交差异" },
    ],
    "git-show": [
      { label: "复杂度", value: "基础到中等" },
      { label: "常见场景", value: "查看单个提交、标签或对象详情" },
    ],
    "git-log": [
      { label: "复杂度", value: "基础到中等" },
      { label: "常见场景", value: "查看提交历史" },
    ],
    "git-rm": [
      { label: "复杂度", value: "基础到中等" },
      { label: "常见场景", value: "删除已跟踪文件并同步删除记录" },
    ],
    "git-mv": [
      { label: "复杂度", value: "基础到中等" },
      { label: "常见场景", value: "重命名或移动已跟踪文件" },
    ],
    "git-fetch": [
      { label: "复杂度", value: "基础" },
      { label: "常见场景", value: "同步远端引用，不改动工作区" },
    ],
    "git-pull": [
      { label: "复杂度", value: "基础到中等" },
      { label: "常见场景", value: "抓取并整合远端更新" },
    ],
    "git-push": [
      { label: "复杂度", value: "基础到中等" },
      { label: "常见场景", value: "推送本地分支到远端" },
    ],
    "git-switch": [
      { label: "复杂度", value: "基础" },
      { label: "常见场景", value: "切换或创建分支" },
    ],
    "git-branch": [
      { label: "复杂度", value: "基础到中等" },
      { label: "常见场景", value: "查看、创建、重命名分支" },
    ],
    "git-tag": [
      { label: "复杂度", value: "基础到中等" },
      { label: "常见场景", value: "标记版本或重要里程碑" },
    ],
    "git-remote": [
      { label: "复杂度", value: "基础到中等" },
      { label: "常见场景", value: "管理远端仓库别名和地址" },
    ],
    "git-rebase": [
      { label: "复杂度", value: "中等偏高" },
      { label: "常见场景", value: "同步主分支、整理提交" },
    ],
    "git-merge": [
      { label: "复杂度", value: "中等" },
      { label: "常见场景", value: "整合分支历史" },
    ],
    "git-cherry-pick": [
      { label: "复杂度", value: "中等偏高" },
      { label: "常见场景", value: "挑选特定提交" },
    ],
    "git-reset": [
      { label: "复杂度", value: "高" },
      { label: "常见场景", value: "撤销、回退、取消暂存" },
    ],
    "git-stash": [
      { label: "复杂度", value: "中等" },
      { label: "常见场景", value: "临时保存未提交改动" },
    ],
    "git-restore": [
      { label: "复杂度", value: "中等" },
      { label: "常见场景", value: "恢复工作区或暂存区文件" },
    ],
    "git-revert": [
      { label: "复杂度", value: "中等偏高" },
      { label: "常见场景", value: "通过新提交安全撤销变更" },
    ],
    "git-reflog": [
      { label: "复杂度", value: "高" },
      { label: "常见场景", value: "定位引用移动历史并恢复位置" },
    ],
    "git-bisect": [
      { label: "复杂度", value: "高" },
      { label: "常见场景", value: "二分查找引入问题的提交" },
    ],
    "git-blame": [
      { label: "复杂度", value: "中等" },
      { label: "常见场景", value: "追踪某行代码来自哪个提交" },
    ],
    "git-checkout": [
      { label: "复杂度", value: "中等" },
      { label: "常见场景", value: "旧式切分支或恢复路径" },
    ],
    "git-clean": [
      { label: "复杂度", value: "中等偏高" },
      { label: "常见场景", value: "清理未跟踪文件" },
    ],
    "git-config": [
      { label: "复杂度", value: "基础到中等" },
      { label: "常见场景", value: "管理仓库和全局配置" },
    ],
    "git-help": [
      { label: "复杂度", value: "基础" },
      { label: "常见场景", value: "查阅参数和官方说明" },
    ],
    "git-describe": [
      { label: "复杂度", value: "基础到中等" },
      { label: "常见场景", value: "生成人类可读版本标识" },
    ],
    "git-grep": [
      { label: "复杂度", value: "基础到中等" },
      { label: "常见场景", value: "在 Git 管理的内容中检索代码" },
    ],
    "git-shortlog": [
      { label: "复杂度", value: "基础到中等" },
      { label: "常见场景", value: "统计贡献与整理发布说明" },
    ],
    "git-show-ref": [
      { label: "复杂度", value: "中等" },
      { label: "常见场景", value: "查看分支和标签引用" },
    ],
    "git-rev-parse": [
      { label: "复杂度", value: "中等" },
      { label: "常见场景", value: "脚本里解析引用和路径" },
    ],
    "git-am": [
      { label: "复杂度", value: "中等偏高" },
      { label: "常见场景", value: "应用补丁邮件序列" },
    ],
    "git-apply": [
      { label: "复杂度", value: "中等" },
      { label: "常见场景", value: "预演或应用补丁" },
    ],
    "git-format-patch": [
      { label: "复杂度", value: "中等" },
      { label: "常见场景", value: "生成补丁系列" },
    ],
    "git-send-email": [
      { label: "复杂度", value: "高" },
      { label: "常见场景", value: "发送补丁邮件" },
    ],
    "git-request-pull": [
      { label: "复杂度", value: "中等" },
      { label: "常见场景", value: "整理交付说明" },
    ],
    "git-archive": [
      { label: "复杂度", value: "中等" },
      { label: "常见场景", value: "导出源码快照" },
    ],
    "git-bundle": [
      { label: "复杂度", value: "中等偏高" },
      { label: "常见场景", value: "离线传输历史" },
    ],
    "git-worktree": [
      { label: "复杂度", value: "中等" },
      { label: "常见场景", value: "并行处理多个分支" },
    ],
    "git-submodule": [
      { label: "复杂度", value: "高" },
      { label: "常见场景", value: "管理子模块仓库" },
    ],
    "git-sparse-checkout": [
      { label: "复杂度", value: "中等偏高" },
      { label: "常见场景", value: "缩小工作区范围" },
    ],
    "git-cat-file": [
      { label: "复杂度", value: "高" },
      { label: "常见场景", value: "查看对象数据库内容" },
    ],
    "git-ls-files": [
      { label: "复杂度", value: "中等" },
      { label: "常见场景", value: "检查索引中的路径" },
    ],
    "git-ls-tree": [
      { label: "复杂度", value: "中等" },
      { label: "常见场景", value: "查看提交快照结构" },
    ],
    "git-read-tree": [
      { label: "复杂度", value: "高" },
      { label: "常见场景", value: "底层索引操作" },
    ],
    "git-update-index": [
      { label: "复杂度", value: "高" },
      { label: "常见场景", value: "直接控制索引状态" },
    ],
    "git-update-ref": [
      { label: "复杂度", value: "高" },
      { label: "常见场景", value: "脚本化更新引用" },
    ],
    "git-symbolic-ref": [
      { label: "复杂度", value: "高" },
      { label: "常见场景", value: "理解和操作符号引用" },
    ],
    "git-rev-list": [
      { label: "复杂度", value: "高" },
      { label: "常见场景", value: "遍历和筛选提交集合" },
    ],
    "git-merge-base": [
      { label: "复杂度", value: "中等偏高" },
      { label: "常见场景", value: "分析分支共同祖先" },
    ],
    "git-notes": [
      { label: "复杂度", value: "中等" },
      { label: "常见场景", value: "给提交附加元信息" },
    ],
    "git-range-diff": [
      { label: "复杂度", value: "高" },
      { label: "常见场景", value: "比较补丁序列版本" },
    ],
    "git-cherry": [
      { label: "复杂度", value: "中等偏高" },
      { label: "常见场景", value: "判断提交是否已被吸收" },
    ],
    "git-mergetool": [
      { label: "复杂度", value: "中等" },
      { label: "常见场景", value: "用图形工具处理冲突" },
    ],
    "git-fsck": [
      { label: "复杂度", value: "高" },
      { label: "常见场景", value: "检查仓库一致性" },
    ],
    "git-gc": [
      { label: "复杂度", value: "高" },
      { label: "常见场景", value: "整理仓库存储" },
    ],
    "git-count-objects": [
      { label: "复杂度", value: "中等偏高" },
      { label: "常见场景", value: "检查对象数量和包体积" },
    ],
    "git-verify-pack": [
      { label: "复杂度", value: "高" },
      { label: "常见场景", value: "分析 pack 文件内容" },
    ],
    "git-verify-tag": [
      { label: "复杂度", value: "中等偏高" },
      { label: "常见场景", value: "验证签名标签" },
    ],
    "git-rerere": [
      { label: "复杂度", value: "中等偏高" },
      { label: "常见场景", value: "自动重用已解决的冲突方案" },
    ],
    "git-difftool": [
      { label: "复杂度", value: "中等" },
      { label: "常见场景", value: "使用外部工具进行差异对比" },
    ],
    "git-replace": [
      { label: "复杂度", value: "高" },
      { label: "常见场景", value: "替换历史中的对象而不重写历史" },
    ],
    "git-prune": [
      { label: "复杂度", value: "中等" },
      { label: "常见场景", value: "清理不可达对象和过期引用" },
    ],
    "git-hash-object": [
      { label: "复杂度", value: "中等" },
      { label: "常见场景", value: "计算内容哈希并存储为 Git 对象" },
    ],
    "git-interpret-trailers": [
      { label: "复杂度", value: "中等" },
      { label: "常见场景", value: "解析和编辑提交尾部字段" },
    ],
  },
};
