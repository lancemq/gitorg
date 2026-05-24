import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Breadcrumbs } from "@/components/breadcrumbs";
import { ChannelHighlights } from "@/components/channel-highlights";
import { SiteShell } from "@/components/site-shell";
import { buildCollectionPageData, StructuredData } from "@/components/structured-data";
import { getFeaturedSectionDocs, getPerformanceDocs, getRepresentativeSectionDocs } from "@/lib/content";
import { getDictionary, getSidebarContent, isValidLocale, locales, type Locale } from "@/lib/i18n";
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
    pathname: "/performance",
    title: dict.performanceIndex.title,
    description: dict.performanceIndex.description,
  });
}

export default async function PerformanceChannelPage({ params }: Props) {
  const { lang } = await params;

  if (!isValidLocale(lang)) {
    notFound();
  }

  const locale = lang as Locale;
  const dict = getDictionary(locale);
  const [docs, featuredDocs, representativeDocs] = await Promise.all([
    getPerformanceDocs(locale),
    getFeaturedSectionDocs(locale, "performance", 4),
    getRepresentativeSectionDocs(locale, "performance", 3),
  ]);
  const siteUrl = getSiteUrl();
  const pageUrl = `${siteUrl}/${locale}/performance`;

  return (
    <SiteShell locale={locale} sidebar={getSidebarContent(locale, { kind: "docs", activePath: "performance-index" })}>
      <StructuredData
        data={buildCollectionPageData({
          name: dict.performanceIndex.title,
          url: pageUrl,
          description: dict.performanceIndex.description,
          items: docs.map((doc) => ({
            name: doc.metadata.title,
            url: `${siteUrl}/${locale}/performance/${doc.metadata.slug}`,
            description: doc.metadata.summary,
          })),
        })}
      />
      <section className="docs-landing channel-page channel-page-performance">
        <Breadcrumbs
          items={[
            { label: dict.commandPage.breadcrumbs.overview, href: `/${locale}` },
            { label: dict.commandPage.breadcrumbs.performance },
          ]}
        />

        <div className="section-head">
          <div>
            <p className="eyebrow">{dict.performanceIndex.eyebrow}</p>
            <h1>{dict.performanceIndex.title}</h1>
          </div>
          <p>{dict.performanceIndex.description}</p>
        </div>

        <section className="panel docs-group">
          <div className="docs-group-head">
            <p className="eyebrow">{dict.performanceIndex.eyebrow}</p>
            <h2>{locale === "zh" ? "推荐学习顺序" : "Recommended Sequence"}</h2>
            <p>
              {locale === "zh"
                ? "先了解大仓库性能问题诊断方法，再学习各种优化策略的具体用法。"
                : "Start with diagnosing large repo performance issues, then learn specific optimization strategies."}
            </p>
          </div>
          <div className="docs-list">
            {featuredDocs.map((doc, index) => (
              <Link className="docs-card" href={doc.href} key={doc.href}>
                <span className="card-kicker">{String(index + 1).padStart(2, "0")}</span>
                <h3>{doc.title}</h3>
                <p>{doc.summary}</p>
              </Link>
            ))}
          </div>
        </section>

        <ChannelHighlights
          locale={locale}
          eyebrow={dict.performanceIndex.eyebrow}
          title={locale === "zh" ? "代表专题" : "Representative Topics"}
          description={
            locale === "zh"
              ? "优化 Git 仓库性能的关键策略。"
              : "Key strategies for optimizing Git repository performance."}
          docs={representativeDocs}
        />

        <section className="panel docs-group">
          <div className="docs-group-head">
            <p className="eyebrow">{dict.performanceIndex.eyebrow}</p>
            <h2>{locale === "zh" ? "专题目录" : "Channel Topics"}</h2>
            <p>
              {locale === "zh"
                ? "深入了解 Git 大仓库的性能优化策略，掌握 partial clone、sparse checkout 等高效技巧。"
                : "Deep dive into performance optimization for large Git repos using partial clone, sparse checkout, and more."}
            </p>
          </div>
          <div className="docs-list">
            {docs.map((doc) => (
              <Link className="docs-card" href={`/${locale}/performance/${doc.metadata.slug}`} key={doc.path}>
                <h3>{doc.metadata.title}</h3>
                <p>{doc.metadata.summary}</p>
              </Link>
            ))}
          </div>
        </section>
      </section>
    </SiteShell>
  );
}
