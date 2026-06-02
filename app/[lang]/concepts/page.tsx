import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Breadcrumbs } from "@/components/breadcrumbs";
import { ChannelHighlights } from "@/components/channel-highlights";
import { SiteShell } from "@/components/site-shell";
import { buildCollectionPageData, StructuredData } from "@/components/structured-data";
import { getConceptsDocs, getFeaturedSectionDocs, getRepresentativeSectionDocs } from "@/lib/content";
import {
  getDictionary,
  getSidebarContent,
  isValidLocale,
  locales,
  conceptSlugs,
  type Locale,
  type ConceptsSlug,
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
    pathname: "/concepts",
    title: dict.conceptsIndex.title,
    description: dict.conceptsIndex.description,
  });
}

export default async function ConceptsChannelPage({ params }: Props) {
  const { lang } = await params;

  if (!isValidLocale(lang)) {
    notFound();
  }

  const locale = lang as Locale;
  const dict = getDictionary(locale);
  const [docs, featuredDocs, representativeDocs] = await Promise.all([
    getConceptsDocs(locale),
    getFeaturedSectionDocs(locale, "concepts", 4),
    getRepresentativeSectionDocs(locale, "concepts", 3),
  ]);

  const sortedDocs = docs.sort(
    (a, b) =>
      conceptSlugs.indexOf(a.metadata.slug as ConceptsSlug) -
      conceptSlugs.indexOf(b.metadata.slug as ConceptsSlug),
  );
  const siteUrl = getSiteUrl();
  const pageUrl = `${siteUrl}/${locale}/concepts`;

  return (
    <SiteShell locale={locale} sidebar={getSidebarContent(locale, { kind: "docs", activePath: "concepts-index" })}>
      <StructuredData
        data={buildCollectionPageData({
          name: dict.conceptsIndex.title,
          url: pageUrl,
          description: dict.conceptsIndex.description,
          items: sortedDocs.map((doc) => ({
            name: doc.metadata.title,
            url: `${siteUrl}/${locale}/concepts/${doc.metadata.slug}`,
            description: doc.metadata.summary,
          })),
        })}
      />
      <section className="docs-landing channel-page channel-page-concepts">
        <Breadcrumbs
          items={[
            { label: dict.commandPage.breadcrumbs.overview, href: `/${locale}` },
            { label: dict.commandPage.breadcrumbs.concepts },
          ]}
        />

        <div className="section-head">
          <div>
            <p className="eyebrow">{dict.conceptsIndex.eyebrow}</p>
            <h1>{dict.conceptsIndex.title}</h1>
          </div>
          <p>{dict.conceptsIndex.description}</p>
        </div>

        <section className="panel docs-group">
          <div className="docs-group-head">
            <p className="eyebrow">{dict.conceptsIndex.eyebrow}</p>
            <h2>{locale === "zh" ? "先看这几篇" : "Start Here First"}</h2>
            <p>
              {locale === "zh"
                ? "先理解三层结构、历史模型和 detached HEAD，再深入其他概念。"
                : "Start with the three-layer model, history, and detached HEAD before diving deeper."}
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
          eyebrow={dict.conceptsIndex.eyebrow}
          title={locale === "zh" ? "代表概念" : "Key Concepts"}
          description={
            locale === "zh"
              ? "如果你想快速建立 Git 的心智模型，优先理解三层结构、Git 历史模型和 detached HEAD 这三个核心概念。"
              : "To build a solid Git mental model, start with the three-layer model, Git history, and detached HEAD."
          }
          docs={representativeDocs}
        />

        <section className="panel docs-group">
          <div className="docs-group-head">
            <p className="eyebrow">{dict.conceptsIndex.eyebrow}</p>
            <h2>{locale === "zh" ? "概念目录" : "All Concepts"}</h2>
            <p>
              {locale === "zh"
                ? "把 Git 的核心概念拆成多个独立的专题，帮助你建立扎实的底层理解。"
                : "Break down Git's core concepts into focused standalone topics for a solid foundation."}
            </p>
          </div>

          <div className="docs-list">
            {sortedDocs.map((doc) => (
              <Link className="docs-card" href={`/${locale}/concepts/${doc.metadata.slug}`} key={doc.path}>
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
