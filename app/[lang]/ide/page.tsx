import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Breadcrumbs } from "@/components/breadcrumbs";
import { ChannelHighlights } from "@/components/channel-highlights";
import { SiteShell } from "@/components/site-shell";
import { buildCollectionPageData, StructuredData } from "@/components/structured-data";
import { getFeaturedSectionDocs, getIdeDocs, getRepresentativeSectionDocs } from "@/lib/content";
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
    pathname: "/ide",
    title: dict.ideIndex.title,
    description: dict.ideIndex.description,
  });
}

export default async function IdeChannelPage({ params }: Props) {
  const { lang } = await params;

  if (!isValidLocale(lang)) {
    notFound();
  }

  const locale = lang as Locale;
  const dict = getDictionary(locale);
  const [docs, featuredDocs, representativeDocs] = await Promise.all([
    getIdeDocs(locale),
    getFeaturedSectionDocs(locale, "ide", 4),
    getRepresentativeSectionDocs(locale, "ide", 3),
  ]);
  const siteUrl = getSiteUrl();
  const pageUrl = `${siteUrl}/${locale}/ide`;

  return (
    <SiteShell locale={locale} sidebar={getSidebarContent(locale, { kind: "docs", activePath: "ide-index" })}>
      <StructuredData
        data={buildCollectionPageData({
          name: dict.ideIndex.title,
          url: pageUrl,
          description: dict.ideIndex.description,
          items: docs.map((doc) => ({
            name: doc.metadata.title,
            url: `${siteUrl}/${locale}/ide/${doc.metadata.slug}`,
            description: doc.metadata.summary,
          })),
        })}
      />
      <section className="docs-landing channel-page channel-page-ide">
        <Breadcrumbs
          items={[
            { label: dict.commandPage.breadcrumbs.overview, href: `/${locale}` },
            { label: dict.commandPage.breadcrumbs.ide },
          ]}
        />

        <div className="section-head">
          <div>
            <p className="eyebrow">{dict.ideIndex.eyebrow}</p>
            <h1>{dict.ideIndex.title}</h1>
          </div>
          <p>{dict.ideIndex.description}</p>
        </div>

        <section className="panel docs-group">
          <div className="docs-group-head">
            <p className="eyebrow">{dict.ideIndex.eyebrow}</p>
            <h2>{locale === "zh" ? "推荐学习顺序" : "Recommended Sequence"}</h2>
            <p>
              {locale === "zh"
                ? "选择你日常使用的 IDE，学习其中的 Git 集成功能。"
                : "Choose your daily IDE and learn its Git integration features."}
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
          eyebrow={dict.ideIndex.eyebrow}
          title={locale === "zh" ? "代表专题" : "Representative Topics"}
          description={
            locale === "zh"
              ? "掌握 IDE 中的 Git 集成，提升日常开发效率。"
              : "Master Git integration in your IDE to boost daily productivity."}
          docs={representativeDocs}
        />

        <section className="panel docs-group">
          <div className="docs-group-head">
            <p className="eyebrow">{dict.ideIndex.eyebrow}</p>
            <h2>{locale === "zh" ? "专题目录" : "Channel Topics"}</h2>
            <p>
              {locale === "zh"
                ? "系统介绍主流 IDE 中 Git 功能的用法，从源代码管理到冲突解决。"
                : "Comprehensive guide to Git features in popular IDEs, from source control to conflict resolution."}
            </p>
          </div>
          <div className="docs-list">
            {docs.map((doc) => (
              <Link className="docs-card" href={`/${locale}/ide/${doc.metadata.slug}`} key={doc.path}>
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
