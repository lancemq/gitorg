import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { SiteShell } from "@/components/site-shell";
import { buildCollectionPageData, StructuredData } from "@/components/structured-data";
import { getFeaturedSectionDocs, getLearningPathDocs } from "@/lib/content";
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
  const [docs, featuredDocs] = await Promise.all([getLearningPathDocs(locale), getFeaturedSectionDocs(locale, "learning-path", 5)]);

  const featuredSequence = featuredDocs.filter((doc) => doc.slug !== "quick-start");
  const learningSignals =
    locale === "zh"
      ? [
          { label: "起点", value: "零基础到可提交" },
          { label: "节奏", value: "4 个步骤" },
          { label: "目标", value: "完成第一次协作闭环" },
        ]
      : [
          { label: "Starting Point", value: "Zero to first safe commit" },
          { label: "Rhythm", value: "4 steps" },
          { label: "Outcome", value: "Finish your first collaboration loop" },
        ];
  const learningChecklist =
    locale === "zh"
      ? [
          "环境与仓库来源",
          "暂存与提交模型",
          "远端同步节奏",
          "第一次分支协作",
        ]
      : [
          "Setup and repository source",
          "Staging and commit model",
          "Remote sync rhythm",
          "First feature branch loop",
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
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          <Link href={`/${locale}`}>{dict.commandPage.breadcrumbs.overview}</Link>
          <span>/</span>
          <strong>{dict.commandPage.breadcrumbs.learningPath}</strong>
        </nav>

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
