import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Breadcrumbs } from "@/components/breadcrumbs";
import { ChannelHighlights } from "@/components/channel-highlights";
import { SiteShell } from "@/components/site-shell";
import { buildCollectionPageData, StructuredData } from "@/components/structured-data";
import { getCommandDocs, getFeaturedSectionDocs, getRepresentativeSectionDocs } from "@/lib/content";
import {
  advancedCommandSlugs,
  basicCommandSlugs,
  commandSlugs,
  getDictionary,
  getSidebarContent,
  isValidLocale,
  locales,
  type CommandSlug,
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
    pathname: "/commands",
    title: dict.commandIndex.title,
    description: dict.commandIndex.description,
  });
}

export default async function CommandsIndexPage({ params }: Props) {
  const { lang } = await params;

  if (!isValidLocale(lang)) {
    notFound();
  }

  const locale = lang as Locale;
  const dict = getDictionary(locale);
  const [docs, featuredDocs, representativeDocs] = await Promise.all([
    getCommandDocs(locale),
    getFeaturedSectionDocs(locale, "commands", 4),
    getRepresentativeSectionDocs(locale, "commands", 3),
  ]);

  const sortedDocs = docs.sort(
    (a, b) =>
      commandSlugs.indexOf(a.metadata.slug as CommandSlug) -
      commandSlugs.indexOf(b.metadata.slug as CommandSlug),
  );

  const basicDocs = sortedDocs.filter((doc) =>
    (basicCommandSlugs as readonly CommandSlug[]).includes(doc.metadata.slug as CommandSlug),
  );
  const advancedDocs = sortedDocs.filter((doc) =>
    (advancedCommandSlugs as readonly CommandSlug[]).includes(doc.metadata.slug as CommandSlug),
  );
  const siteUrl = getSiteUrl();
  const pageUrl = `${siteUrl}/${locale}/commands`;

  return (
    <SiteShell locale={locale} sidebar={getSidebarContent(locale, { kind: "docs", activePath: "commands-index" })}>
      <StructuredData
        data={buildCollectionPageData({
          name: dict.commandIndex.title,
          url: pageUrl,
          description: dict.commandIndex.description,
          items: sortedDocs.map((doc) => ({
            name: doc.metadata.title,
            url: `${siteUrl}/${locale}/commands/${doc.metadata.slug}`,
            description: doc.metadata.summary,
          })),
        })}
      />
      <section className="docs-landing channel-page channel-page-commands">
        <Breadcrumbs
          items={[
            { label: dict.commandPage.breadcrumbs.overview, href: `/${locale}` },
            { label: dict.commandPage.breadcrumbs.commands },
          ]}
        />

        <div className="section-head">
          <div>
            <p className="eyebrow">{dict.commandIndex.eyebrow}</p>
            <h1>{dict.commandIndex.title}</h1>
          </div>
          <p>{dict.commandIndex.description}</p>
        </div>

        <section className="panel docs-group">
          <div className="docs-group-head">
            <p className="eyebrow">{dict.commandIndex.eyebrow}</p>
            <h2>{locale === "zh" ? "推荐学习顺序" : "Recommended Sequence"}</h2>
            <p>
              {locale === "zh"
                ? "先从查看状态、提交和同步开始，再进入会改写历史、恢复状态和排查问题的命令。"
                : "Start with inspection, commit, and sync, then move into commands that rewrite history, recover state, or debug regressions."}
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
          eyebrow={dict.commandIndex.eyebrow}
          title={locale === "zh" ? "代表专题" : "Representative Topics"}
          description={
            locale === "zh"
              ? "如果你想先把命令站的核心价值看明白，优先看状态判断、历史整理和恢复入口这三类专题。"
              : "If you want the essence of the command channel first, start with status awareness, history shaping, and recovery entry points."
          }
          docs={representativeDocs}
        />

        <section className="panel docs-group">
          <div className="docs-group-head">
            <p className="eyebrow">{dict.commandPage.eyebrow}</p>
            <h2>{locale === "zh" ? "基础命令" : "Core Commands"}</h2>
            <p>
              {locale === "zh"
                ? "先补齐仓库初始化、查看状态、提交、同步与分支切换这些日常高频命令。"
                : "Start with the everyday commands for repository setup, inspection, committing, syncing, and branch movement."}
            </p>
          </div>

          <div className="docs-list">
            {basicDocs.map((doc) => (
              <Link className="docs-card" href={`/${locale}/commands/${doc.metadata.slug}`} key={doc.path}>
                <h3>{doc.metadata.title}</h3>
                <p>{doc.metadata.summary}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="panel docs-group">
          <div className="docs-group-head">
            <p className="eyebrow">{dict.commandPage.eyebrow}</p>
            <h2>{locale === "zh" ? "高级命令" : "Advanced Commands"}</h2>
            <p>
              {locale === "zh"
                ? "再进入会影响历史表达、撤销策略和风险边界的命令专题。"
                : "Then move into commands that affect history shape, undo strategy, and operational risk."}
            </p>
          </div>

          <div className="docs-list">
            {advancedDocs.map((doc) => (
              <Link className="docs-card" href={`/${locale}/commands/${doc.metadata.slug}`} key={doc.path}>
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
