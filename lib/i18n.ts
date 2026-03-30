export const locales = ["zh", "en"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "zh";

export type CommandSlug = "git-rebase";

export function isValidLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

type NavItem = {
  label: string;
  href: string;
  active?: boolean;
};

type NavGroup = {
  title: string;
  items: NavItem[];
};

type SidebarContent = {
  brandLabel: string;
  searchLabel: string;
  footerTitle: string;
  footerText: string;
  localeLabel: string;
  localeNames: Record<Locale, string>;
  groups: NavGroup[];
};

type FaqItem = {
  question: string;
  answer: string;
};

type CommandDoc = {
  title: string;
  lead: string;
  meta: ReadonlyArray<{ label: string; value: string }>;
  tabs: ReadonlyArray<{
    id: string;
    label: string;
    sections: ReadonlyArray<{
      title: string;
      body?: string;
      list?: readonly string[];
      code?: string;
      warning?: boolean;
    }>;
    sideCards: ReadonlyArray<{
      title: string;
      description: string;
    }>;
  }>;
};

type Dictionary = {
  sidebar: {
    home: SidebarContent;
    command: (activeSlug: CommandSlug) => SidebarContent;
  };
  home: {
    hero: {
      eyebrow: string;
      title: string;
      description: string;
      primaryAction: string;
      secondaryAction: string;
    };
    meta: {
      modulesTitle: string;
      modules: number;
      modulesLabel: string;
      commandCardsTitle: string;
      commandCards: number;
      exercisesTitle: string;
      exercises: number;
      recommendedPathTitle: string;
      recommendedPath: string;
    };
    quickStart: {
      eyebrow: string;
      title: string;
      description: string;
      cards: ReadonlyArray<{
        kicker: string;
        title: string;
        description: string;
        command: string;
      }>;
    };
    knowledgeColumns: ReadonlyArray<{
      id: string;
      eyebrow: string;
      title: string;
      description: string;
      items: ReadonlyArray<{
        title: string;
        description: string;
      }>;
    }>;
    reference: {
      eyebrow: string;
      title: string;
      description: string;
      steps: ReadonlyArray<{
        step: string;
        title: string;
        description: string;
      }>;
    };
    faq: {
      eyebrow: string;
      title: string;
      description: string;
      items: ReadonlyArray<FaqItem>;
    };
    cta: {
      eyebrow: string;
      title: string;
      description: string;
      action: string;
    };
  };
  commandPage: {
    eyebrow: string;
    breadcrumbs: {
      docs: string;
      commands: string;
    };
  };
  commandDocs: Record<CommandSlug, CommandDoc>;
};

function homeSidebar(locale: Locale, groups: NavGroup[]): SidebarContent {
  return {
    brandLabel: "Git Academy",
    searchLabel: locale === "zh" ? "搜索文档" : "Search documentation",
    footerTitle: "Auto Doc",
    footerText: locale === "zh" ? "双语文档站" : "Bilingual docs",
    localeLabel: locale === "zh" ? "语言" : "Language",
    localeNames: {
      zh: locale === "zh" ? "中文" : "Chinese",
      en: locale === "zh" ? "英文" : "English",
    },
    groups,
  };
}

function commandSidebar(
  locale: Locale,
  groups: NavGroup[],
  footerText: string,
): SidebarContent {
  return {
    ...homeSidebar(locale, groups),
    searchLabel: locale === "zh" ? "搜索命令" : "Search commands",
    footerText,
  };
}

const zhDictionary: Dictionary = {
  sidebar: {
    home: homeSidebar("zh", [
      {
        title: "Learning Path",
        items: [
          { label: "总览", href: "/zh#overview", active: true },
          { label: "快速开始", href: "/zh#quick-start" },
          { label: "最佳实践", href: "/zh#best-practices" },
          { label: "Git 原理", href: "/zh#internals" },
        ],
      },
      {
        title: "Resources",
        items: [
          { label: "参考路线", href: "/zh#reference" },
          { label: "常见问题", href: "/zh#faq" },
        ],
      },
    ]),
    command: (activeSlug) =>
      commandSidebar(
        "zh",
        [
          {
            title: "Docs",
            items: [
              {
                label: "git rebase",
                href: "/zh/commands/git-rebase",
                active: activeSlug === "git-rebase",
              },
              { label: "git merge", href: "/zh#reference" },
              { label: "git reflog", href: "/zh#faq" },
            ],
          },
        ],
        "rebase 模块",
      ),
  },
  home: {
    hero: {
      eyebrow: "Source Control Learning Lab",
      title: "从提交、commit 到理解对象模型，系统学习 Git 的使用与原理。",
      description:
        "面向协作开发者的 Git 文档站，覆盖快速上手、常见工作流、风险操作恢复，以及 rebase、merge、reflog 等核心命令的实战说明。",
      primaryAction: "开始学习",
      secondaryAction: "查看参考资料",
    },
    meta: {
      modulesTitle: "核心模块",
      modules: 4,
      modulesLabel: "从工作流到对象模型",
      commandCardsTitle: "命令卡片",
      commandCards: 42,
      exercisesTitle: "练习题",
      exercises: 18,
      recommendedPathTitle: "Recommended path",
      recommendedPath: "Quick Start → Best Practices → Internals",
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
    ],
    reference: {
      eyebrow: "Reference",
      title: "命令参考路线",
      description: "把高频命令整理成渐进式学习路径。",
      steps: [
        {
          step: "01",
          title: "clone",
          description: "拉取仓库并建立本地副本，理解 origin 和默认分支。",
        },
        {
          step: "02",
          title: "add",
          description: "把改动加入暂存区，准备组成一个可提交的快照。",
        },
        {
          step: "03",
          title: "commit",
          description: "生成不可变提交对象，形成可回溯的历史节点。",
        },
        {
          step: "04",
          title: "rebase",
          description: "重写提交基底，整理特性分支历史。",
        },
      ],
    },
    faq: {
      eyebrow: "FAQ",
      title: "常见问题",
      description: "把最容易踩坑的 Git 问题讲清楚。",
      items: [
        {
          question: "`git pull` 为什么会产生我不想要的 merge commit？",
          answer:
            "因为 pull 默认会在 fetch 之后直接 merge。你可以改成先 git fetch，再手动选择 merge 或 rebase，或者配置 pull.rebase=true。",
        },
        {
          question: "误删分支或 reset 之后还能找回吗？",
          answer:
            "多数情况下可以。只要对象还没有被垃圾回收，git reflog 往往能帮你定位历史引用并恢复。",
        },
      ],
    },
    cta: {
      eyebrow: "Git Docs",
      title: "从 Git 快速指南，到对象模型和工作流实战。",
      description: "继续阅读命令详解，或者把这套页面扩展成你自己的团队文档站。",
      action: "去看命令页",
    },
  },
  commandPage: {
    eyebrow: "Command Reference",
    breadcrumbs: {
      docs: "文档",
      commands: "命令",
    },
  },
  commandDocs: {
    "git-rebase": {
      title: "git rebase",
      lead: "把当前分支上的提交挪到新的基底之上。它常用于清理特性分支历史、保持主干线性，或在合并前同步最新主分支。",
      meta: [
        { label: "复杂度", value: "中等偏高" },
        { label: "常见场景", value: "同步主分支、整理提交" },
        { label: "恢复手段", value: "reflog / ORIG_HEAD" },
      ],
      tabs: [
        {
          id: "overview",
          label: "总览",
          sections: [
            {
              title: "核心心智模型",
              body: "rebase 会找到一组提交，把它们按顺序重新应用到新的起点上，所以你看到的是同样的改动、不同的提交 ID。",
              code: "git checkout feature/login\ngit fetch origin\ngit rebase origin/main",
            },
            {
              title: "典型场景",
              list: [
                "让特性分支跟上最新 main。",
                "在合并前压缩、整理提交历史。",
                "交互式修改 commit message 或拆分提交。",
              ],
            },
            {
              title: "高频用法",
              body: "交互式 rebase 适合整理历史：",
              code: "git rebase -i HEAD~4\n\npick a1b2c3 feat: add login form\nreword d4e5f6 fix: improve validation\nsquash 9a0b1c chore: polish copy",
            },
          ],
          sideCards: [
            {
              title: "注意点",
              description: "已经推送给他人协作的公共分支，谨慎 rebase，避免改写共享历史。",
            },
            {
              title: "冲突处理",
              description: "解决冲突后执行 git add，再用 git rebase --continue 继续。",
            },
          ],
        },
        {
          id: "workflow",
          label: "流程",
          sections: [
            {
              title: "推荐流程",
              list: [
                "确认工作区干净，或者先 stash。",
                "git fetch origin 获取最新远端。",
                "git rebase origin/main 迁移提交基底。",
                "冲突解决后 git rebase --continue。",
                "必要时用 git push --force-with-lease 更新远端分支。",
              ],
            },
          ],
          sideCards: [
            {
              title: "为什么不用 force push",
              description: "--force-with-lease 会先检查远端是否被别人更新，安全性更高。",
            },
          ],
        },
        {
          id: "pitfalls",
          label: "风险点",
          sections: [
            {
              title: "常见坑位",
              list: [
                "把公共分支 rebase 后直接强推，导致同事历史错位。",
                "冲突解决后忘记继续，误以为 rebase 已经完成。",
                "交互式 rebase 时误删 commit 行，导致提交丢失。",
              ],
            },
            {
              title: "恢复思路",
              body: "如果 rebase 过程出错，优先看 git reflog。通常可以找到 rebase 前的 HEAD，然后用 git reset --hard <hash> 回到安全点。",
              warning: true,
            },
          ],
          sideCards: [
            {
              title: "撤销命令",
              description: "git rebase --abort 可在 rebase 进行中回到开始前状态。",
            },
          ],
        },
      ],
    },
  },
};

const enDictionary: Dictionary = {
  sidebar: {
    home: homeSidebar("en", [
      {
        title: "Learning Path",
        items: [
          { label: "Overview", href: "/en#overview", active: true },
          { label: "Quick Start", href: "/en#quick-start" },
          { label: "Best Practices", href: "/en#best-practices" },
          { label: "Git Internals", href: "/en#internals" },
        ],
      },
      {
        title: "Resources",
        items: [
          { label: "Reference", href: "/en#reference" },
          { label: "FAQ", href: "/en#faq" },
        ],
      },
    ]),
    command: (activeSlug) =>
      commandSidebar(
        "en",
        [
          {
            title: "Docs",
            items: [
              {
                label: "git rebase",
                href: "/en/commands/git-rebase",
                active: activeSlug === "git-rebase",
              },
              { label: "git merge", href: "/en#reference" },
              { label: "git reflog", href: "/en#faq" },
            ],
          },
        ],
        "rebase module",
      ),
  },
  home: {
    hero: {
      eyebrow: "Source Control Learning Lab",
      title: "Learn Git from commits to the object model, with both workflow and internals.",
      description:
        "A Git documentation site for collaborative developers, covering quick start, common workflows, recovery strategies, and hands-on guidance for rebase, merge, and reflog.",
      primaryAction: "Start learning",
      secondaryAction: "View references",
    },
    meta: {
      modulesTitle: "Core Modules",
      modules: 4,
      modulesLabel: "From workflow to object model",
      commandCardsTitle: "Command Cards",
      commandCards: 42,
      exercisesTitle: "Exercises",
      exercises: 18,
      recommendedPathTitle: "Recommended path",
      recommendedPath: "Quick Start → Best Practices → Internals",
    },
    quickStart: {
      eyebrow: "Quick Start",
      title: "Get Started Fast",
      description: "Build intuition for branches, commits, and synchronization through a few low-risk commands.",
      cards: [
        {
          kicker: "01 / setup",
          title: "Initialize a repository",
          description: "Understand git init, git clone, identity config, and the default branch.",
          command: "git clone repo-url",
        },
        {
          kicker: "02 / stage",
          title: "Stage and commit",
          description: "Learn the three-layer model of working tree, staging area, and history.",
          command: "git add . && git commit",
        },
        {
          kicker: "03 / sync",
          title: "Sync with remote",
          description: "Master how fetch, pull, and push work with local branches.",
          command: "git fetch origin",
        },
      ],
    },
    knowledgeColumns: [
      {
        id: "best-practices",
        eyebrow: "Best Practices",
        title: "Best Practices",
        description: "Reduce history noise and conflict cost.",
        items: [
          {
            title: "Keep commits small and intentional",
            description: "One clear intent per commit makes review, rollback, and cherry-pick easier.",
          },
          {
            title: "Fetch first, then choose merge or rebase",
            description: "Fetching before you decide gives you more control than a default pull.",
          },
          {
            title: "Check reflog before risky operations",
            description: "Before reset, rebase, or force push, confirm your recovery path.",
          },
        ],
      },
      {
        id: "internals",
        eyebrow: "Git Internals",
        title: "Under the Hood",
        description: "Map command behavior back to the object model.",
        items: [
          {
            title: "The object database",
            description: "See how blob, tree, and commit objects form a trackable history graph.",
          },
          {
            title: "References and HEAD",
            description: "Branches, tags, and remote-tracking refs all point to commits.",
          },
          {
            title: "Recoverability",
            description: "Reflog and garbage collection determine when lost objects can still be restored.",
          },
        ],
      },
    ],
    reference: {
      eyebrow: "Reference",
      title: "Command Learning Path",
      description: "Organize high-frequency commands into a progressive path.",
      steps: [
        {
          step: "01",
          title: "clone",
          description: "Create a local copy of a repository and understand origin and the default branch.",
        },
        {
          step: "02",
          title: "add",
          description: "Move changes into the staging area to prepare a snapshot.",
        },
        {
          step: "03",
          title: "commit",
          description: "Create an immutable commit object and build a traceable history.",
        },
        {
          step: "04",
          title: "rebase",
          description: "Rewrite the base of commits and clean up feature branch history.",
        },
      ],
    },
    faq: {
      eyebrow: "FAQ",
      title: "Common Questions",
      description: "Explain the Git pitfalls that confuse people most often.",
      items: [
        {
          question: "Why does `git pull` create a merge commit I did not want?",
          answer:
            "Because pull defaults to fetch plus merge. You can fetch first and then choose merge or rebase manually, or set pull.rebase=true.",
        },
        {
          question: "Can I recover after deleting a branch or running reset?",
          answer:
            "Often yes. As long as the objects have not been garbage collected, git reflog can usually help you locate and restore the previous reference.",
        },
      ],
    },
    cta: {
      eyebrow: "Git Docs",
      title: "From a fast Git guide to object model and workflow practice.",
      description: "Keep reading command deep-dives, or extend this into your own team documentation site.",
      action: "Open command page",
    },
  },
  commandPage: {
    eyebrow: "Command Reference",
    breadcrumbs: {
      docs: "Docs",
      commands: "Commands",
    },
  },
  commandDocs: {
    "git-rebase": {
      title: "git rebase",
      lead: "Move the current branch commits onto a new base. It is commonly used to keep history linear, clean up feature branch commits, or sync with the latest main branch before merging.",
      meta: [
        { label: "Complexity", value: "Medium to high" },
        { label: "Typical use", value: "Sync main branch, clean up commits" },
        { label: "Recovery", value: "reflog / ORIG_HEAD" },
      ],
      tabs: [
        {
          id: "overview",
          label: "Overview",
          sections: [
            {
              title: "Core mental model",
              body: "Rebase finds a set of commits and reapplies them one by one onto a new starting point, which is why you end up with the same changes but different commit IDs.",
              code: "git checkout feature/login\ngit fetch origin\ngit rebase origin/main",
            },
            {
              title: "Typical scenarios",
              list: [
                "Bring a feature branch up to date with main.",
                "Compress or polish commit history before merging.",
                "Interactively edit commit messages or split commits.",
              ],
            },
            {
              title: "Common workflow",
              body: "Interactive rebase is great for cleaning up history:",
              code: "git rebase -i HEAD~4\n\npick a1b2c3 feat: add login form\nreword d4e5f6 fix: improve validation\nsquash 9a0b1c chore: polish copy",
            },
          ],
          sideCards: [
            {
              title: "Watch out",
              description: "Be careful rebasing public branches that other people already depend on.",
            },
            {
              title: "Conflict handling",
              description: "After resolving conflicts, run git add and then git rebase --continue.",
            },
          ],
        },
        {
          id: "workflow",
          label: "Workflow",
          sections: [
            {
              title: "Recommended steps",
              list: [
                "Make sure your working tree is clean, or stash first.",
                "Run git fetch origin to get the latest remote state.",
                "Run git rebase origin/main to move your commit base.",
                "Resolve conflicts and continue with git rebase --continue.",
                "Use git push --force-with-lease if you need to update the remote branch.",
              ],
            },
          ],
          sideCards: [
            {
              title: "Why not plain force push",
              description: "--force-with-lease checks whether the remote was updated by someone else first.",
            },
          ],
        },
        {
          id: "pitfalls",
          label: "Pitfalls",
          sections: [
            {
              title: "Common mistakes",
              list: [
                "Rebasing a shared branch and force pushing it immediately.",
                "Solving conflicts but forgetting to continue the rebase.",
                "Deleting commit lines by mistake during interactive rebase.",
              ],
            },
            {
              title: "Recovery path",
              body: "If a rebase goes wrong, start with git reflog. In many cases you can find the previous HEAD and reset back to a safe point with git reset --hard <hash>.",
              warning: true,
            },
          ],
          sideCards: [
            {
              title: "Abort command",
              description: "git rebase --abort returns the branch to its pre-rebase state while the rebase is still in progress.",
            },
          ],
        },
      ],
    },
  },
};

const dictionaries: Record<Locale, Dictionary> = {
  zh: zhDictionary,
  en: enDictionary,
};

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
