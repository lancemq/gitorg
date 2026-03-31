import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { SiteShell } from "@/components/site-shell";
import { getCommandDocs } from "@/lib/content";
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
  const docs = await getCommandDocs(locale);

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

  return (
    <SiteShell locale={locale} sidebar={getSidebarContent(locale, { kind: "docs", activePath: "commands-index" })}>
      <section className="docs-landing">
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          <Link href={`/${locale}`}>{dict.commandPage.breadcrumbs.overview}</Link>
          <span>/</span>
          <strong>{dict.commandPage.breadcrumbs.commands}</strong>
        </nav>

        <div className="section-head">
          <div>
            <p className="eyebrow">{dict.commandIndex.eyebrow}</p>
            <h1>{dict.commandIndex.title}</h1>
          </div>
          <p>{dict.commandIndex.description}</p>
        </div>

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
