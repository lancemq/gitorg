import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Breadcrumbs } from "@/components/breadcrumbs";
import { ChannelHighlights } from "@/components/channel-highlights";
import { SiteShell } from "@/components/site-shell";
import { buildCollectionPageData, StructuredData } from "@/components/structured-data";
import { getFeaturedSectionDocs, getMigrationDocs, getRepresentativeSectionDocs } from "@/lib/content";
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
    pathname: "/migration",
    title: dict.migrationIndex.title,
    description: dict.migrationIndex.description,
  });
}

export default async function MigrationChannelPage({ params }: Props) {
  const { lang } = await params;

  if (!isValidLocale(lang)) {
    notFound();
  }

  const locale = lang as Locale;
  const dict = getDictionary(locale);
  const [docs, featuredDocs, representativeDocs] = await Promise.all([
    getMigrationDocs(locale),
    getFeaturedSectionDocs(locale, "migration", 4),
    getRepresentativeSectionDocs(locale, "migration", 3),
  ]);
  const siteUrl = getSiteUrl();
  const pageUrl = `${siteUrl}/${locale}/migration`;

  return (
    <SiteShell locale={locale} sidebar={getSidebarContent(locale, { kind: "docs", activePath: "migration-index" })}>
      <StructuredData
        data={buildCollectionPageData({
          name: dict.migrationIndex.title,
          url: pageUrl,
          description: dict.migrationIndex.description,
          items: docs.map((doc) => ({
            name: doc.metadata.title,
            url: `${siteUrl}/${locale}/migration/${doc.metadata.slug}`,
            description: doc.metadata.summary,
          })),
        })}
      />
      <section className="docs-landing channel-page channel-page-migration">
        <Breadcrumbs
          items={[
            { label: dict.commandPage.breadcrumbs.overview, href: `/${locale}` },
            { label: dict.commandPage.breadcrumbs.migration },
          ]}
        />

        <div className="section-head">
          <div>
            <p className="eyebrow">{dict.migrationIndex.eyebrow}</p>
            <h1>{dict.migrationIndex.title}</h1>
          </div>
          <p>{dict.migrationIndex.description}</p>
        </div>

        <section className="panel docs-group">
          <div className="docs-group-head">
            <p className="eyebrow">{dict.migrationIndex.eyebrow}</p>
            <h2>{locale === "zh" ? "推荐学习顺序" : "Recommended Sequence"}</h2>
            <p>
              {locale === "zh"
                ? "根据你当前的版本控制系统选择合适的迁移指南。"
                : "Choose the migration guide that matches your current version control system."}
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
          eyebrow={dict.migrationIndex.eyebrow}
          title={locale === "zh" ? "代表专题" : "Representative Topics"}
          description={
            locale === "zh"
              ? "帮助你顺利完成版本控制系统的迁移。"
              : "Helping you complete a smooth VCS migration."}
          docs={representativeDocs}
        />

        <section className="panel docs-group">
          <div className="docs-group-head">
            <p className="eyebrow">{dict.migrationIndex.eyebrow}</p>
            <h2>{locale === "zh" ? "专题目录" : "Channel Topics"}</h2>
            <p>
              {locale === "zh"
                ? "系统介绍从其他版本控制系统迁移到 Git 的完整流程和常见陷阱。"
                : "Complete guides for migrating from other VCS to Git, including common pitfalls."}
            </p>
          </div>
          <div className="docs-list">
            {docs.map((doc) => (
              <Link className="docs-card" href={`/${locale}/migration/${doc.metadata.slug}`} key={doc.path}>
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
