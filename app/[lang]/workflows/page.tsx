import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { SiteShell } from "@/components/site-shell";
import { getFeaturedSectionDocs, getWorkflowDocs } from "@/lib/content";
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
  const [docs, featuredDocs] = await Promise.all([
    getWorkflowDocs(locale),
    getFeaturedSectionDocs(locale, "workflows", 4),
  ]);

  const sortedDocs = docs.sort(
    (a, b) =>
      workflowSlugs.indexOf(a.metadata.slug as WorkflowSlug) -
      workflowSlugs.indexOf(b.metadata.slug as WorkflowSlug),
  );

  return (
    <SiteShell locale={locale} sidebar={getSidebarContent(locale, { kind: "docs", activePath: "workflows-index" })}>
      <section className="docs-landing">
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          <Link href={`/${locale}`}>{dict.commandPage.breadcrumbs.overview}</Link>
          <span>/</span>
          <strong>{dict.commandPage.breadcrumbs.workflows}</strong>
        </nav>

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
