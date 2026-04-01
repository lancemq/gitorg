import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { FaqList } from "@/components/faq-list";
import { SiteShell } from "@/components/site-shell";
import { StructuredData } from "@/components/structured-data";
import { getContentStats } from "@/lib/content";
import {
  getDictionary,
  getSidebarContent,
  isValidLocale,
  locales,
  type Locale,
} from "@/lib/i18n";
import { buildPageMetadata } from "@/lib/seo";
import { getSiteUrl } from "@/lib/site";

type Props = {
  params: Promise<{
    lang: string;
  }>;
};

const audiencePaths = {
  zh: [
    {
      title: "Git 新手入口",
      description: "从 clone、add、commit、fetch、pull、push 建立最小闭环。",
      href: "/learning-path",
    },
    {
      title: "团队协作入口",
      description: "先理解 fetch、pull、review 前同步和共享历史边界。",
      href: "/workflows",
    },
    {
      title: "排障恢复入口",
      description: "误操作、历史写乱、想撤回时，先从 reflog 和恢复手册开始。",
      href: "/recovery",
    },
  ],
  en: [
    {
      title: "Start with Git Basics",
      description: "Build a reliable loop around clone, add, commit, fetch, pull, and push.",
      href: "/learning-path",
    },
    {
      title: "Team Collaboration Path",
      description: "Focus on fetch, pull boundaries, pre-review sync, and shared-history safety.",
      href: "/workflows",
    },
    {
      title: "Recovery and Undo Path",
      description: "When history goes sideways, start with reflog and recovery-oriented guides.",
      href: "/recovery",
    },
  ],
} as const;

const scenarioLinks = {
  zh: [
    { label: "我要同步远端但不想直接改当前分支", href: "/workflows/fetch-vs-pull" },
    { label: "我想整理提交历史但担心风险", href: "/commands/git-rebase" },
    { label: "我把东西弄丢了，想找回提交", href: "/recovery/reflog-recovery" },
    { label: "我想理解 Git 到底在保存什么", href: "/internals/object-database" },
  ],
  en: [
    { label: "I want upstream changes without mutating my branch yet", href: "/workflows/fetch-vs-pull" },
    { label: "I want to clean up history without losing control", href: "/commands/git-rebase" },
    { label: "I lost work and need to recover commits", href: "/recovery/reflog-recovery" },
    { label: "I want to understand what Git actually stores", href: "/internals/object-database" },
  ],
} as const;

const heroSignals = {
  zh: ["命令 · 工作流 · 原理", "图解 + 练习 + 恢复", "双语教程体系"],
  en: ["Commands · Workflows · Internals", "Figures + Practice + Recovery", "Bilingual learning system"],
} as const;

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;

  if (!isValidLocale(lang)) {
    return {};
  }

  const locale = lang as Locale;
  const dict = getDictionary(locale);

  return buildPageMetadata({
    locale,
    pathname: "",
    title: dict.home.hero.title,
    description: dict.home.hero.description,
  });
}

export default async function LocalizedHomePage({ params }: Props) {
  const { lang } = await params;

  if (!isValidLocale(lang)) {
    notFound();
  }

  const locale = lang as Locale;
  const dict = getDictionary(locale);
  const stats = await getContentStats(locale);
  const moduleCount = Object.values(stats.sectionCounts).filter((count) => count > 0).length;
  const siteUrl = getSiteUrl();
  const pageUrl = `${siteUrl}/${locale}`;
  const inLanguage = locale === "zh" ? "zh-CN" : "en";
  const journeys = audiencePaths[locale];
  const scenarios = scenarioLinks[locale];
  const signals = heroSignals[locale];

  return (
    <SiteShell locale={locale} sidebar={getSidebarContent(locale, { kind: "docs", activePath: "overview" })}>
      <StructuredData
        data={[
          {
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "GitOrg Atlas",
            url: pageUrl,
            inLanguage,
            description: dict.home.hero.description,
            about: [
              "Git commands",
              "Git workflows",
              "Git internals",
              "Git recovery",
            ],
          },
          {
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: dict.home.hero.title,
            description: dict.home.hero.description,
            inLanguage,
            url: pageUrl,
            isPartOf: {
              "@type": "WebSite",
              name: "GitOrg Atlas",
              url: siteUrl,
            },
          },
        ]}
      />
      <section className="hero panel" id="overview">
        <div className="hero-backdrop" aria-hidden="true">
          <span className="hero-orb hero-orb-primary" />
          <span className="hero-orb hero-orb-secondary" />
          <span className="hero-grid" />
        </div>
        <div className="hero-copy">
          <p className="eyebrow">{dict.home.hero.eyebrow}</p>
          <h1>{dict.home.hero.title}</h1>
          <p className="lead">{dict.home.hero.description}</p>
          <div className="hero-signals" aria-label={locale === "zh" ? "重点内容" : "Highlights"}>
            {signals.map((signal) => (
              <span className="hero-signal" key={signal}>
                {signal}
              </span>
            ))}
          </div>
          <div className="hero-actions">
            <Link className="button button-primary" href={`/${locale}/learning-path`}>
              {dict.home.hero.primaryAction}
            </Link>
            <Link className="button button-secondary" href={`/${locale}/commands`}>
              {dict.home.hero.secondaryAction}
            </Link>
          </div>
        </div>

        <div className="hero-meta">
          <div className="meta-card">
            <p className="meta-label">{dict.home.meta.modulesTitle}</p>
            <strong>{moduleCount}</strong>
            <span>{dict.home.meta.modulesLabel}</span>
          </div>
          <div className="meta-grid">
            <article className="stat-card">
              <span>{dict.home.meta.commandCardsTitle}</span>
              <strong>{stats.commandDocs}</strong>
            </article>
            <article className="stat-card">
              <span>{dict.home.meta.exercisesTitle}</span>
              <strong>{stats.totalDocs}</strong>
            </article>
          </div>
          <article className="note-card">
            <p>{dict.home.meta.recommendedPathTitle}</p>
            <strong>{dict.home.meta.recommendedPath}</strong>
          </article>
        </div>
      </section>

      <section className="section" id="quick-start">
        <div className="section-head">
          <div>
            <p className="eyebrow">{dict.home.quickStart.eyebrow}</p>
            <h2>{dict.home.quickStart.title}</h2>
          </div>
          <p>{dict.home.quickStart.description}</p>
        </div>

        <div className="card-grid card-grid-three">
          {dict.home.quickStart.cards.map((card) => (
            <article className="info-card" key={card.title}>
              <span className="card-kicker">{card.kicker}</span>
              <h3>{card.title}</h3>
              <p>{card.description}</p>
              <code>{card.command}</code>
            </article>
          ))}
        </div>
      </section>

      <section className="section section-learning" id="journeys">
        <div className="section-head">
          <div>
            <p className="eyebrow">{locale === "zh" ? "Start Here" : "Start Here"}</p>
            <h2>{locale === "zh" ? "按你的目标进入" : "Choose Your Track"}</h2>
          </div>
          <p>
            {locale === "zh"
              ? "把首页从内容目录变成行动入口，先选学习目标，再进入对应路径。"
              : "Use the homepage as an entry point, not just a content shelf. Pick the job you need to do next."}
          </p>
        </div>

        <div className="docs-list">
          {journeys.map((item) => (
            <Link className="docs-card" href={`/${locale}${item.href}`} key={item.href}>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="section section-recovery" id="scenarios">
        <div className="section-head">
          <div>
            <p className="eyebrow">{locale === "zh" ? "Scenarios" : "Scenarios"}</p>
            <h2>{locale === "zh" ? "按问题直接进入" : "Jump In By Scenario"}</h2>
          </div>
          <p>
            {locale === "zh"
              ? "很多人不是按目录学习，而是带着问题来。把高频问题直接变成入口。"
              : "Many readers arrive with a concrete problem. These shortcuts get them to the right answer faster."}
          </p>
        </div>

        <div className="scenario-grid">
          {scenarios.map((item) => (
            <Link className="scenario-link" href={`/${locale}${item.href}`} key={item.href}>
              <span>{item.label}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="section dual-section" id="best-practices">
        {dict.home.knowledgeColumns.map((column) => (
          <article className={`column-card column-card-${column.id}`} id={column.id} key={column.id}>
            <div className="section-head compact">
              <div>
                <p className="eyebrow">{column.eyebrow}</p>
                {column.id === "best-practices" ? (
                  <h2>
                    <Link className="column-heading-link" href={`/${locale}/best-practices`}>
                      {column.title}
                    </Link>
                  </h2>
                ) : column.id === "internals" ? (
                  <h2>
                    <Link className="column-heading-link" href={`/${locale}/internals`}>
                      {column.title}
                    </Link>
                  </h2>
                ) : (
                  <h2>{column.title}</h2>
                )}
              </div>
              <p>{column.description}</p>
            </div>

            <div className="stack-list">
              {column.items.map((item) => (
                column.id === "best-practices" ? (
                  <Link
                    className="stack-item stack-item-link"
                    href={`/${locale}/best-practices`}
                    key={item.title}
                  >
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </Link>
                ) : column.id === "internals" ? (
                  <Link
                    className="stack-item stack-item-link"
                    href={`/${locale}/internals`}
                    key={item.title}
                  >
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </Link>
                ) : (
                  <article className="stack-item" key={item.title}>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </article>
                )
              ))}
            </div>

          </article>
        ))}
      </section>

      <section className="section section-commands" id="reference">
        <div className="section-head">
          <div>
            <p className="eyebrow">{dict.home.reference.eyebrow}</p>
            <h2>{dict.home.reference.title}</h2>
          </div>
          <p>{dict.home.reference.description}</p>
        </div>

        <div className="roadmap">
          {dict.home.reference.steps.map((step) => (
            <Link className="roadmap-item roadmap-link" href={`/${locale}/commands/git-${step.title}`} key={step.step}>
              <span className="roadmap-step">{step.step}</span>
              <div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="section section-resources" id="faq">
        <div className="section-head">
          <div>
            <p className="eyebrow">{dict.home.faq.eyebrow}</p>
            <h2>
              <Link className="column-heading-link" href={`/${locale}/faq`}>
                {dict.home.faq.title}
              </Link>
            </h2>
          </div>
          <p>{dict.home.faq.description}</p>
        </div>

        <FaqList items={dict.home.faq.items.slice(0, 3)} />
      </section>
    </SiteShell>
  );
}
