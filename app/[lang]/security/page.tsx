import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Breadcrumbs } from "@/components/breadcrumbs";
import { ChannelHighlights } from "@/components/channel-highlights";
import { SiteShell } from "@/components/site-shell";
import { buildCollectionPageData, StructuredData } from "@/components/structured-data";
import { getFeaturedSectionDocs, getSecurityDocs, getRepresentativeSectionDocs } from "@/lib/content";
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
    pathname: "/security",
    title: dict.securityIndex.title,
    description: dict.securityIndex.description,
  });
}

export default async function SecurityChannelPage({ params }: Props) {
  const { lang } = await params;

  if (!isValidLocale(lang)) {
    notFound();
  }

  const locale = lang as Locale;
  const dict = getDictionary(locale);
  const [docs, featuredDocs, representativeDocs] = await Promise.all([
    getSecurityDocs(locale),
    getFeaturedSectionDocs(locale, "security", 4),
    getRepresentativeSectionDocs(locale, "security", 3),
  ]);
  const siteUrl = getSiteUrl();
  const pageUrl = `${siteUrl}/${locale}/security`;

  return (
    <SiteShell locale={locale} sidebar={getSidebarContent(locale, { kind: "docs", activePath: "security-index" })}>
      <StructuredData
        data={buildCollectionPageData({
          name: dict.securityIndex.title,
          url: pageUrl,
          description: dict.securityIndex.description,
          items: docs.map((doc) => ({
            name: doc.metadata.title,
            url: `${siteUrl}/${locale}/security/${doc.metadata.slug}`,
            description: doc.metadata.summary,
          })),
        })}
      />
      <section className="docs-landing channel-page channel-page-security">
        <Breadcrumbs
          items={[
            { label: dict.commandPage.breadcrumbs.overview, href: `/${locale}` },
            { label: dict.commandPage.breadcrumbs.security },
          ]}
        />

        <div className="section-head">
          <div>
            <p className="eyebrow">{dict.securityIndex.eyebrow}</p>
            <h1>{dict.securityIndex.title}</h1>
          </div>
          <p>{dict.securityIndex.description}</p>
        </div>

        <section className="panel docs-group">
          <div className="docs-group-head">
            <p className="eyebrow">{dict.securityIndex.eyebrow}</p>
            <h2>{locale === "zh" ? "推荐学习顺序" : "Recommended Sequence"}</h2>
            <p>
              {locale === "zh"
                ? "先掌握 SSH 密钥配置，再了解 GPG 签名以确保提交的认证和完整性。"
                : "Start with SSH key configuration, then learn GPG signing for commit authentication and integrity."}
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
          eyebrow={dict.securityIndex.eyebrow}
          title={locale === "zh" ? "代表专题" : "Representative Topics"}
          description={
            locale === "zh"
              ? "确保你的 Git 操作是安全可验证的。"
              : "Ensure your Git operations are secure and verifiable."}
          docs={representativeDocs}
        />

        <section className="panel docs-group">
          <div className="docs-group-head">
            <p className="eyebrow">{dict.securityIndex.eyebrow}</p>
            <h2>{locale === "zh" ? "专题目录" : "Channel Topics"}</h2>
            <p>
              {locale === "zh"
                ? "系统学习 Git 安全相关的关键操作和最佳实践。"
                : "Learn key Git security practices and operations."}
            </p>
          </div>
          <div className="docs-list">
            {docs.map((doc) => (
              <Link className="docs-card" href={`/${locale}/security/${doc.metadata.slug}`} key={doc.path}>
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
