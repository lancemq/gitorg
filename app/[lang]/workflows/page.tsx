import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Breadcrumbs } from "@/components/breadcrumbs";
import { ChannelHighlights } from "@/components/channel-highlights";
import { SiteShell } from "@/components/site-shell";
import { buildCollectionPageData, StructuredData } from "@/components/structured-data";
import { getFeaturedSectionDocs, getRepresentativeSectionDocs, getWorkflowDocs } from "@/lib/content";
import {
  getDictionary,
  getSidebarContent,
  isValidLocale,
  locales,
  workflowSlugs,
  type Locale,
  type WorkflowSlug,
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
    pathname: "/workflows",
    title: dict.workflowIndex.title,
    description: dict.workflowIndex.description,
  });
}

export default async function WorkflowsChannelPage({ params }: Props) {
  const { lang } = await params;

  if (!isValidLocale(lang)) {
    notFound();
  }

  const locale = lang as Locale;
  const dict = getDictionary(locale);
  const [docs, featuredDocs, representativeDocs] = await Promise.all([
    getWorkflowDocs(locale),
    getFeaturedSectionDocs(locale, "workflows", 4),
    getRepresentativeSectionDocs(locale, "workflows", 3),
  ]);

  const sortedDocs = docs.sort(
    (a, b) =>
      workflowSlugs.indexOf(a.metadata.slug as WorkflowSlug) -
      workflowSlugs.indexOf(b.metadata.slug as WorkflowSlug),
  );
  const siteUrl = getSiteUrl();
  const pageUrl = `${siteUrl}/${locale}/workflows`;

  return (
    <SiteShell locale={locale} sidebar={getSidebarContent(locale, { kind: "docs", activePath: "workflows-index" })}>
      <StructuredData
        data={buildCollectionPageData({
          name: dict.workflowIndex.title,
          url: pageUrl,
          description: dict.workflowIndex.description,
          items: sortedDocs.map((doc) => ({
            name: doc.metadata.title,
            url: `${siteUrl}/${locale}/workflows/${doc.metadata.slug}`,
            description: doc.metadata.summary,
          })),
        })}
      />
      <section className="docs-landing channel-page channel-page-workflows">
        <Breadcrumbs
          items={[
            { label: dict.commandPage.breadcrumbs.overview, href: `/${locale}` },
            { label: dict.commandPage.breadcrumbs.workflows },
          ]}
        />

        <div className="section-head">
          <div>
            <p className="eyebrow">{dict.workflowIndex.eyebrow}</p>
            <h1>{dict.workflowIndex.title}</h1>
          </div>
          <p>{dict.workflowIndex.description}</p>
        </div>

        <section className="panel docs-group">
          <div className="docs-group-head">
            <p className="eyebrow">{dict.workflowIndex.eyebrow}</p>
            <h2>{locale === "zh" ? "推荐学习顺序" : "Recommended Sequence"}</h2>
            <p>
              {locale === "zh"
                ? "先掌握 fetch 与 pull 的边界，再学习协作、评审前同步和紧急修复的操作顺序。"
                : "Start with the fetch-versus-pull boundary, then move into collaboration, pre-review sync, and urgent-fix flows."}
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
          eyebrow={dict.workflowIndex.eyebrow}
          title={locale === "zh" ? "代表专题" : "Representative Topics"}
          description={
            locale === "zh"
              ? "这三类专题最能体现工作流频道的价值：同步边界、评审前整理，以及紧急修复时的操作顺序。"
              : "These topics show the channel at its best: sync boundaries, pre-review preparation, and urgent-fix sequencing."
          }
          docs={representativeDocs}
        />

        <section className="panel docs-group">
          <div className="docs-group-head">
            <p className="eyebrow">{dict.workflowIndex.eyebrow}</p>
            <h2>{locale === "zh" ? "专题目录" : "Channel Topics"}</h2>
            <p>
              {locale === "zh"
                ? "把常见 Git 工作流拆成多个场景化专题，帮助团队把操作顺序和协作边界固定下来。"
                : "Split recurring Git flows into scenario-based guides so teams can standardize sequencing and collaboration boundaries."}
            </p>
          </div>

          <div className="docs-list">
            {sortedDocs.map((doc) => (
              <Link className="docs-card" href={`/${locale}/workflows/${doc.metadata.slug}`} key={doc.path}>
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
