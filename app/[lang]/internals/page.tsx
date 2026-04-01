import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Breadcrumbs } from "@/components/breadcrumbs";
import { ChannelHighlights } from "@/components/channel-highlights";
import { SiteShell } from "@/components/site-shell";
import { buildCollectionPageData, StructuredData } from "@/components/structured-data";
import { getFeaturedSectionDocs, getInternalsDocs, getRepresentativeSectionDocs } from "@/lib/content";
import {
  getDictionary,
  getSidebarContent,
  internalsSlugs,
  isValidLocale,
  locales,
  type InternalsSlug,
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
    pathname: "/internals",
    title: dict.internalsIndex.title,
    description: dict.internalsIndex.description,
  });
}

export default async function GitInternalsChannelPage({ params }: Props) {
  const { lang } = await params;

  if (!isValidLocale(lang)) {
    notFound();
  }

  const locale = lang as Locale;
  const dict = getDictionary(locale);
  const [docs, featuredDocs, representativeDocs] = await Promise.all([
    getInternalsDocs(locale),
    getFeaturedSectionDocs(locale, "internals", 4),
    getRepresentativeSectionDocs(locale, "internals", 3),
  ]);

  const sortedDocs = docs.sort(
    (a, b) =>
      internalsSlugs.indexOf(a.metadata.slug as InternalsSlug) -
      internalsSlugs.indexOf(b.metadata.slug as InternalsSlug),
  );
  const siteUrl = getSiteUrl();
  const pageUrl = `${siteUrl}/${locale}/internals`;

  return (
    <SiteShell locale={locale} sidebar={getSidebarContent(locale, { kind: "docs", activePath: "internals-index" })}>
      <StructuredData
        data={buildCollectionPageData({
          name: dict.internalsIndex.title,
          url: pageUrl,
          description: dict.internalsIndex.description,
          items: sortedDocs.map((doc) => ({
            name: doc.metadata.title,
            url: `${siteUrl}/${locale}/internals/${doc.metadata.slug}`,
            description: doc.metadata.summary,
          })),
        })}
      />
      <section className="docs-landing channel-page channel-page-internals">
        <Breadcrumbs
          items={[
            { label: dict.commandPage.breadcrumbs.overview, href: `/${locale}` },
            { label: dict.commandPage.breadcrumbs.internals },
          ]}
        />

        <div className="section-head">
          <div>
            <p className="eyebrow">{dict.internalsIndex.eyebrow}</p>
            <h1>{dict.internalsIndex.title}</h1>
          </div>
          <p>{dict.internalsIndex.description}</p>
        </div>

        <section className="panel docs-group">
          <div className="docs-group-head">
            <p className="eyebrow">{dict.internalsIndex.eyebrow}</p>
            <h2>{locale === "zh" ? "推荐学习顺序" : "Recommended Sequence"}</h2>
            <p>
              {locale === "zh"
                ? "建议先掌握对象库和暂存模型，再进入 refs、提交图和存储维护这些更底层的原理。"
                : "Start with the object store and staging model, then move into refs, commit graphs, and storage maintenance."}
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
          eyebrow={dict.internalsIndex.eyebrow}
          title={locale === "zh" ? "代表专题" : "Representative Topics"}
          description={
            locale === "zh"
              ? "对象数据库、引用与 HEAD、可恢复性，是把命令行为真正看懂的三块核心底板。"
              : "The object store, refs and HEAD, and recoverability are the three ideas that make Git behavior finally click."
          }
          docs={representativeDocs}
        />

        <section className="panel docs-group">
          <div className="docs-group-head">
            <p className="eyebrow">{dict.internalsIndex.eyebrow}</p>
            <h2>{locale === "zh" ? "原理点目录" : "Internals Topics"}</h2>
            <p>
              {locale === "zh"
                ? "从对象模型到提交图，再到 packfiles 与 refs，把原来的一篇原理说明拆成更适合逐篇学习和持续扩写的原理专题。"
                : "Break the old single internals guide into focused reads spanning the object model, refs, commit graphs, and storage internals."}
            </p>
          </div>

          <div className="docs-list">
            {sortedDocs.map((doc) => (
              <Link className="docs-card" href={`/${locale}/internals/${doc.metadata.slug}`} key={doc.path}>
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
