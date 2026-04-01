import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Breadcrumbs } from "@/components/breadcrumbs";
import { ChannelHighlights } from "@/components/channel-highlights";
import { SiteShell } from "@/components/site-shell";
import { buildCollectionPageData, StructuredData } from "@/components/structured-data";
import { getBestPracticeDocs, getFeaturedSectionDocs, getRepresentativeSectionDocs } from "@/lib/content";
import {
  bestPracticeSlugs,
  getDictionary,
  getSidebarContent,
  isValidLocale,
  locales,
  type BestPracticeSlug,
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
    pathname: "/best-practices",
    title: dict.bestPracticeIndex.title,
    description: dict.bestPracticeIndex.description,
  });
}

export default async function BestPracticesChannelPage({ params }: Props) {
  const { lang } = await params;

  if (!isValidLocale(lang)) {
    notFound();
  }

  const locale = lang as Locale;
  const dict = getDictionary(locale);
  const [docs, featuredDocs, representativeDocs] = await Promise.all([
    getBestPracticeDocs(locale),
    getFeaturedSectionDocs(locale, "best-practices", 4),
    getRepresentativeSectionDocs(locale, "best-practices", 3),
  ]);

  const sortedDocs = docs.sort(
    (a, b) =>
      bestPracticeSlugs.indexOf(a.metadata.slug as BestPracticeSlug) -
      bestPracticeSlugs.indexOf(b.metadata.slug as BestPracticeSlug),
  );
  const siteUrl = getSiteUrl();
  const pageUrl = `${siteUrl}/${locale}/best-practices`;

  return (
    <SiteShell locale={locale} sidebar={getSidebarContent(locale, { kind: "docs", activePath: "best-practices-index" })}>
      <StructuredData
        data={buildCollectionPageData({
          name: dict.bestPracticeIndex.title,
          url: pageUrl,
          description: dict.bestPracticeIndex.description,
          items: sortedDocs.map((doc) => ({
            name: doc.metadata.title,
            url: `${siteUrl}/${locale}/best-practices/${doc.metadata.slug}`,
            description: doc.metadata.summary,
          })),
        })}
      />
      <section className="docs-landing">
        <Breadcrumbs
          items={[
            { label: dict.commandPage.breadcrumbs.overview, href: `/${locale}` },
            { label: dict.commandPage.breadcrumbs.bestPractices },
          ]}
        />

        <div className="section-head">
          <div>
            <p className="eyebrow">{dict.bestPracticeIndex.eyebrow}</p>
            <h1>{dict.bestPracticeIndex.title}</h1>
          </div>
          <p>{dict.bestPracticeIndex.description}</p>
        </div>

        <section className="panel docs-group">
          <div className="docs-group-head">
            <p className="eyebrow">{dict.bestPracticeIndex.eyebrow}</p>
            <h2>{locale === "zh" ? "推荐学习顺序" : "Recommended Sequence"}</h2>
            <p>
              {locale === "zh"
                ? "先建立提交和分支习惯，再进入同步策略、共享历史边界与安全推送。"
                : "Start with commit and branch hygiene, then move into sync strategy, shared-history boundaries, and safer push habits."}
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
          eyebrow={dict.bestPracticeIndex.eyebrow}
          title={locale === "zh" ? "代表专题" : "Representative Topics"}
          description={
            locale === "zh"
              ? "先看提交质量、共享历史边界和安全推送，基本就能建立一套更稳的协作底线。"
              : "Commit hygiene, shared-history boundaries, and safe push habits are the fastest way to build a stable collaboration baseline."
          }
          docs={representativeDocs}
        />

        <section className="panel docs-group">
          <div className="docs-group-head">
            <p className="eyebrow">{dict.bestPracticeIndex.eyebrow}</p>
            <h2>{locale === "zh" ? "专题目录" : "Channel Topics"}</h2>
            <p>
              {locale === "zh"
                ? "把原来聚合在一篇文章里的协作建议拆成多个更容易复用和持续扩写的专题。"
                : "The original monolithic best-practices article is now split into focused reads that are easier to maintain and expand."}
            </p>
          </div>

          <div className="docs-list">
            {sortedDocs.map((doc) => (
              <Link
                className="docs-card"
                href={`/${locale}/best-practices/${doc.metadata.slug}`}
                key={doc.path}
              >
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
