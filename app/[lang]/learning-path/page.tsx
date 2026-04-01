import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Breadcrumbs } from "@/components/breadcrumbs";
import { ChannelHighlights } from "@/components/channel-highlights";
import { SiteShell } from "@/components/site-shell";
import { buildCollectionPageData, StructuredData } from "@/components/structured-data";
import { getFeaturedSectionDocs, getLearningPathDocs, getRepresentativeSectionDocs } from "@/lib/content";
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
    pathname: "/learning-path",
    title: dict.learningPathIndex.title,
    description: dict.learningPathIndex.description,
  });
}

export default async function LearningPathChannelPage({ params }: Props) {
  const { lang } = await params;

  if (!isValidLocale(lang)) {
    notFound();
  }

  const locale = lang as Locale;
  const dict = getDictionary(locale);
  const [docs, featuredDocs, representativeDocs] = await Promise.all([
    getLearningPathDocs(locale),
    getFeaturedSectionDocs(locale, "learning-path", 5),
    getRepresentativeSectionDocs(locale, "learning-path", 3),
  ]);

  const featuredSequence = featuredDocs.filter((doc) => doc.slug !== "quick-start");
  const tracks =
    locale === "zh"
      ? [
          {
            id: "starter",
            eyebrow: "Path 01",
            title: "Git 新手路径",
            description: "从环境准备、第一次提交到第一次远端同步，适合零基础建立最小可用闭环。",
            href: `/${locale}/learning-path`,
            items: [
              { title: "准备环境与 clone", href: `/${locale}/docs/learning-path/setup-and-clone` },
              { title: "理解暂存与提交", href: `/${locale}/docs/learning-path/stage-and-commit` },
              { title: "完成第一次同步", href: `/${locale}/docs/learning-path/sync-with-remote` },
            ],
          },
          {
            id: "team",
            eyebrow: "Path 02",
            title: "团队协作路径",
            description: "围绕 fetch、pull、功能分支、评审前同步与最佳实践，建立更稳的团队协作节奏。",
            href: `/${locale}/workflows`,
            items: [
              { title: "先搞清 fetch 和 pull", href: `/${locale}/workflows/fetch-vs-pull` },
              { title: "第一次功能分支协作", href: `/${locale}/docs/learning-path/first-feature-branch` },
              { title: "评审前同步与整理", href: `/${locale}/workflows/sync-before-review` },
            ],
          },
          {
            id: "recovery",
            eyebrow: "Path 03",
            title: "排障恢复路径",
            description: "当 reset、rebase、pull 或分支误操作把历史弄乱时，先走一条保守恢复路线。",
            href: `/${locale}/recovery`,
            items: [
              { title: "先掌握 reflog", href: `/${locale}/recovery/reflog-recovery` },
              { title: "reset 过头怎么找回", href: `/${locale}/recovery/recover-after-reset` },
              { title: "rebase 出错如何回到可控状态", href: `/${locale}/recovery/recover-after-rebase` },
            ],
          },
        ]
      : [
          {
            id: "starter",
            eyebrow: "Path 01",
            title: "Git Starter Path",
            description: "Build the smallest safe Git loop from setup and first commits to your first remote sync.",
            href: `/${locale}/learning-path`,
            items: [
              { title: "Set up and clone", href: `/${locale}/docs/learning-path/setup-and-clone` },
              { title: "Understand staging and commit", href: `/${locale}/docs/learning-path/stage-and-commit` },
              { title: "Finish the first sync loop", href: `/${locale}/docs/learning-path/sync-with-remote` },
            ],
          },
          {
            id: "team",
            eyebrow: "Path 02",
            title: "Team Collaboration Path",
            description: "Learn the collaboration rhythm around fetch, pull, feature branches, pre-review sync, and team-safe habits.",
            href: `/${locale}/workflows`,
            items: [
              { title: "Start with fetch versus pull", href: `/${locale}/workflows/fetch-vs-pull` },
              { title: "First feature-branch collaboration", href: `/${locale}/docs/learning-path/first-feature-branch` },
              { title: "Sync before review", href: `/${locale}/workflows/sync-before-review` },
            ],
          },
          {
            id: "recovery",
            eyebrow: "Path 03",
            title: "Recovery and Undo Path",
            description: "Use a conservative rescue path when reset, rebase, pull, or branch mistakes leave history in a confusing state.",
            href: `/${locale}/recovery`,
            items: [
              { title: "Start with reflog", href: `/${locale}/recovery/reflog-recovery` },
              { title: "Recover after reset", href: `/${locale}/recovery/recover-after-reset` },
              { title: "Recover after a bad rebase", href: `/${locale}/recovery/recover-after-rebase` },
            ],
          },
        ];
  const learningSignals =
    locale === "zh"
      ? [
          { label: "起点", value: "零基础到团队协作" },
          { label: "路线", value: "3 条学习路径" },
          { label: "目标", value: "按问题选择正确路线" },
        ]
      : [
          { label: "Starting Point", value: "Zero to team-ready Git" },
          { label: "Routes", value: "3 learning tracks" },
          { label: "Outcome", value: "Choose the right path for the job" },
        ];
  const learningChecklist =
    locale === "zh"
      ? [
          "Git 新手路径",
          "团队协作路径",
          "排障恢复路径",
          "再进入专题深挖",
        ]
      : [
          "Git starter path",
          "Team collaboration path",
          "Recovery and undo path",
          "Then go deeper by topic",
        ];
  const siteUrl = getSiteUrl();
  const pageUrl = `${siteUrl}/${locale}/learning-path`;

  return (
    <SiteShell locale={locale} sidebar={getSidebarContent(locale, { kind: "docs", activePath: "learning-path-index" })}>
      <StructuredData
        data={buildCollectionPageData({
          name: dict.learningPathIndex.title,
          url: pageUrl,
          description: dict.learningPathIndex.description,
          items: docs
            .filter((doc) => doc.metadata.slug !== "quick-start")
            .map((doc) => ({
              name: doc.metadata.title,
              url: `${siteUrl}/${locale}/docs/learning-path/${doc.metadata.slug}`,
              description: doc.metadata.summary,
            })),
        })}
      />
      <section className="docs-landing learning-path-landing">
        <Breadcrumbs
          items={[
            { label: dict.commandPage.breadcrumbs.overview, href: `/${locale}` },
            { label: dict.commandPage.breadcrumbs.learningPath },
          ]}
        />

        <div className="section-head learning-path-head">
          <div className="learning-path-head-copy">
            <p className="eyebrow">{dict.learningPathIndex.eyebrow}</p>
            <h1>{dict.learningPathIndex.title}</h1>
            <p>{dict.learningPathIndex.description}</p>
            <div className="learning-path-signals" aria-label={locale === "zh" ? "专题摘要" : "Series summary"}>
              {learningSignals.map((item) => (
                <article className="learning-path-signal" key={item.label}>
                  <span>{item.label}</span>
                  <strong>{item.value}</strong>
                </article>
              ))}
            </div>
          </div>

          <aside className="panel learning-path-aside">
            <span className="learning-path-aside-kicker">Step by step</span>
            <ul className="learning-path-checklist">
              {learningChecklist.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </aside>
        </div>

        <section className="panel docs-group learning-path-sequence">
          <div className="docs-group-head">
            <p className="eyebrow">{dict.learningPathIndex.eyebrow}</p>
            <h2>{locale === "zh" ? "先选一条学习路线" : "Pick a Learning Route First"}</h2>
            <p>
              {locale === "zh"
                ? "把内容从“很多文章”改成“明确路线”。先决定你现在是新手上路、团队协作，还是在处理事故恢复。"
                : "Turn the site from “many articles” into “clear routes.” Decide whether you are learning the basics, team flow, or recovery."}
            </p>
          </div>

          <div className="learning-track-grid">
            {tracks.map((track) => (
              <article className="learning-track-card" key={track.id}>
                <div className="learning-track-head">
                  <span className="card-kicker">{track.eyebrow}</span>
                  <h3>
                    <Link className="column-heading-link" href={track.href}>
                      {track.title}
                    </Link>
                  </h3>
                </div>
                <p>{track.description}</p>
                <div className="learning-track-links">
                  {track.items.map((item, index) => (
                    <Link className="learning-track-link" href={item.href} key={item.href}>
                      <span>{String(index + 1).padStart(2, "0")}</span>
                      <strong>{item.title}</strong>
                    </Link>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <ChannelHighlights
          locale={locale}
          eyebrow={dict.learningPathIndex.eyebrow}
          title={locale === "zh" ? "代表专题" : "Representative Topics"}
          description={
            locale === "zh"
              ? "如果你只先看少量入口，优先抓住环境准备、第一次分支协作和 reflog 这三个关键节点。"
              : "If you only start with a few anchors, prioritize setup, the first feature-branch loop, and reflog-based recovery."
          }
          docs={representativeDocs}
        />

        <section className="panel docs-group learning-path-sequence">
          <div className="docs-group-head">
            <p className="eyebrow">{dict.learningPathIndex.eyebrow}</p>
            <h2>{locale === "zh" ? "按顺序完成这 4 步" : "Complete These 4 Steps in Order"}</h2>
            <p>
              {locale === "zh"
                ? "先把环境和 clone 跑通，再稳定掌握暂存、提交、远端同步，最后进入第一次分支协作。"
                : "Start with setup and clone, then stabilize staging, commits, and remote sync before moving into your first branch-based workflow."}
            </p>
          </div>

          <div className="learning-path-flow">
            {featuredSequence.map((doc, index) => (
              <Link className="learning-path-step-card" href={doc.href} key={doc.href}>
                <span className="learning-path-step-number">{String(index + 1).padStart(2, "0")}</span>
                <div className="learning-path-step-copy">
                  <div className="learning-path-step-head">
                    <h3>{doc.title}</h3>
                    <span className="learning-path-step-label">{`Step ${index + 1}`}</span>
                  </div>
                  <p>{doc.summary}</p>
                </div>
                <span className="learning-path-step-arrow" aria-hidden="true">
                  {index === featuredSequence.length - 1 ? "◎" : "→"}
                </span>
              </Link>
            ))}
          </div>
        </section>
      </section>
    </SiteShell>
  );
}
