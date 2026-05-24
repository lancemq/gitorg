import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Breadcrumbs } from "@/components/breadcrumbs";
import { ChannelHighlights } from "@/components/channel-highlights";
import { SiteShell } from "@/components/site-shell";
import { buildCollectionPageData, StructuredData } from "@/components/structured-data";
import { getFeaturedSectionDocs, getCiCdDocs, getRepresentativeSectionDocs } from "@/lib/content";
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
    pathname: "/ci-cd",
    title: dict.ciCdIndex.title,
    description: dict.ciCdIndex.description,
  });
}

export default async function CicdChannelPage({ params }: Props) {
  const { lang } = await params;

  if (!isValidLocale(lang)) {
    notFound();
  }

  const locale = lang as Locale;
  const dict = getDictionary(locale);
  const [docs, featuredDocs, representativeDocs] = await Promise.all([
    getCiCdDocs(locale),
    getFeaturedSectionDocs(locale, "ci-cd", 4),
    getRepresentativeSectionDocs(locale, "ci-cd", 3),
  ]);
  const siteUrl = getSiteUrl();
  const pageUrl = `${siteUrl}/${locale}/ci-cd`;

  return (
    <SiteShell locale={locale} sidebar={getSidebarContent(locale, { kind: "docs", activePath: "ci-cd-index" })}>
      <StructuredData
        data={buildCollectionPageData({
          name: dict.ciCdIndex.title,
          url: pageUrl,
          description: dict.ciCdIndex.description,
          items: docs.map((doc) => ({
            name: doc.metadata.title,
            url: `${siteUrl}/${locale}/ci-cd/${doc.metadata.slug}`,
            description: doc.metadata.summary,
          })),
        })}
      />
      <section className="docs-landing channel-page channel-page-cicd">
        <Breadcrumbs
          items={[
            { label: dict.commandPage.breadcrumbs.overview, href: `/${locale}` },
            { label: dict.commandPage.breadcrumbs["ci-cd"] },
          ]}
        />

        <div className="section-head">
          <div>
            <p className="eyebrow">{dict.ciCdIndex.eyebrow}</p>
            <h1>{dict.ciCdIndex.title}</h1>
          </div>
          <p>{dict.ciCdIndex.description}</p>
        </div>

        <section className="panel docs-group">
          <div className="docs-group-head">
            <p className="eyebrow">{dict.ciCdIndex.eyebrow}</p>
            <h2>{locale === "zh" ? "推荐学习顺序" : "Recommended Sequence"}</h2>
            <p>
              {locale === "zh"
                ? "先理解 GitHub Actions 和 GitLab CI 的触发与认证机制，再整合到你的 CI/CD 工作流中。"
                : "Start with GitHub Actions and GitLab CI trigger and auth mechanisms, then integrate into your CI/CD workflow."}
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
          eyebrow={dict.ciCdIndex.eyebrow}
          title={locale === "zh" ? "代表专题" : "Representative Topics"}
          description={
            locale === "zh"
              ? "这些专题帮助你快速理解 Git 在 CI/CD 中的最佳实践。"
              : "These topics help you quickly understand Git best practices in CI/CD."
          }
          docs={representativeDocs}
        />

        <section className="panel docs-group">
          <div className="docs-group-head">
            <p className="eyebrow">{dict.ciCdIndex.eyebrow}</p>
            <h2>{locale === "zh" ? "专题目录" : "Channel Topics"}</h2>
            <p>
              {locale === "zh"
                ? "系统介绍 Git 与 CI/CD 管线的集成方式，帮助你在自动化流程中安全高效地使用 Git。"
                : "Learn how Git integrates with CI/CD pipelines for safe and efficient automation."}
            </p>
          </div>
          <div className="docs-list">
            {docs.map((doc) => (
              <Link className="docs-card" href={`/${locale}/ci-cd/${doc.metadata.slug}`} key={doc.path}>
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
