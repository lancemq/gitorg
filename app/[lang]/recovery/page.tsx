import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { SiteShell } from "@/components/site-shell";
import { buildCollectionPageData, StructuredData } from "@/components/structured-data";
import { getFeaturedSectionDocs, getRecoveryDocs } from "@/lib/content";
import {
  getDictionary,
  getSidebarContent,
  isValidLocale,
  locales,
  recoverySlugs,
  type Locale,
  type RecoverySlug,
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
    pathname: "/recovery",
    title: dict.recoveryIndex.title,
    description: dict.recoveryIndex.description,
  });
}

export default async function RecoveryChannelPage({ params }: Props) {
  const { lang } = await params;

  if (!isValidLocale(lang)) {
    notFound();
  }

  const locale = lang as Locale;
  const dict = getDictionary(locale);
  const [docs, featuredDocs] = await Promise.all([
    getRecoveryDocs(locale),
    getFeaturedSectionDocs(locale, "recovery", 4),
  ]);

  const sortedDocs = docs.sort(
    (a, b) =>
      recoverySlugs.indexOf(a.metadata.slug as RecoverySlug) -
      recoverySlugs.indexOf(b.metadata.slug as RecoverySlug),
  );
  const siteUrl = getSiteUrl();
  const pageUrl = `${siteUrl}/${locale}/recovery`;

  return (
    <SiteShell locale={locale} sidebar={getSidebarContent(locale, { kind: "docs", activePath: "recovery-index" })}>
      <StructuredData
        data={buildCollectionPageData({
          name: dict.recoveryIndex.title,
          url: pageUrl,
          description: dict.recoveryIndex.description,
          items: sortedDocs.map((doc) => ({
            name: doc.metadata.title,
            url: `${siteUrl}/${locale}/recovery/${doc.metadata.slug}`,
            description: doc.metadata.summary,
          })),
        })}
      />
      <section className="docs-landing">
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          <Link href={`/${locale}`}>{dict.commandPage.breadcrumbs.overview}</Link>
          <span>/</span>
          <strong>{dict.commandPage.breadcrumbs.recovery}</strong>
        </nav>

        <div className="section-head">
          <div>
            <p className="eyebrow">{dict.recoveryIndex.eyebrow}</p>
            <h1>{dict.recoveryIndex.title}</h1>
          </div>
          <p>{dict.recoveryIndex.description}</p>
        </div>

        <section className="panel docs-group">
          <div className="docs-group-head">
            <p className="eyebrow">{dict.recoveryIndex.eyebrow}</p>
            <h2>{locale === "zh" ? "先看这几篇" : "Start Here First"}</h2>
            <p>
              {locale === "zh"
                ? "先建立 reflog-first 的恢复思路，再看 reset、rebase、删分支与 detached HEAD 这些高频事故场景。"
                : "Build a reflog-first recovery habit first, then work through reset, rebase, deleted-branch, and detached-HEAD incidents."}
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

        <section className="panel docs-group">
          <div className="docs-group-head">
            <p className="eyebrow">{dict.recoveryIndex.eyebrow}</p>
            <h2>{locale === "zh" ? "排障专题目录" : "Recovery Topics"}</h2>
            <p>
              {locale === "zh"
                ? "把“我现在把仓库搞乱了怎么办”拆成多个可直接处理的专题，而不是只讲抽象原则。"
                : "Split “what do I do now?” recovery situations into direct, actionable rescue guides instead of one abstract article."}
            </p>
          </div>

          <div className="docs-list">
            {sortedDocs.map((doc) => (
              <Link className="docs-card" href={`/${locale}/recovery/${doc.metadata.slug}`} key={doc.path}>
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
