import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { SiteShell } from "@/components/site-shell";
import { getFeaturedSectionDocs, getInternalsDocs } from "@/lib/content";
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
  const [docs, featuredDocs] = await Promise.all([
    getInternalsDocs(locale),
    getFeaturedSectionDocs(locale, "internals", 4),
  ]);

  const sortedDocs = docs.sort(
    (a, b) =>
      internalsSlugs.indexOf(a.metadata.slug as InternalsSlug) -
      internalsSlugs.indexOf(b.metadata.slug as InternalsSlug),
  );

  return (
    <SiteShell locale={locale} sidebar={getSidebarContent(locale, { kind: "docs", activePath: "internals-index" })}>
      <section className="docs-landing">
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          <Link href={`/${locale}`}>{dict.commandPage.breadcrumbs.overview}</Link>
          <span>/</span>
          <strong>{dict.commandPage.breadcrumbs.internals}</strong>
        </nav>

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
