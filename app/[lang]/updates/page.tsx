import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Breadcrumbs } from "@/components/breadcrumbs";
import { SiteShell } from "@/components/site-shell";
import { getDictionary, getSidebarContent, isValidLocale, locales, type Locale } from "@/lib/i18n";
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
    pathname: "/updates",
    title: dict.updatesPage.title,
    description: dict.updatesPage.description,
  });
}

export default async function UpdatesPage({ params }: Props) {
  const { lang } = await params;

  if (!isValidLocale(lang)) {
    notFound();
  }

  const locale = lang as Locale;
  const dict = getDictionary(locale);
  const entries = dict.updatesPage.entries;
  const totalNotes = entries.reduce((sum, entry) => sum + entry.items.length, 0);
  const latestPeriod = entries[0]?.period ?? "";
  const focusAreas =
    locale === "zh"
      ? ["命令", "工作流", "原理", "恢复"]
      : ["Commands", "Workflows", "Internals", "Recovery"];

  return (
    <SiteShell locale={locale} sidebar={getSidebarContent(locale, { kind: "docs", activePath: "updates" })}>
      <article className="doc-page">
        <Breadcrumbs
          items={[
            { label: dict.commandPage.breadcrumbs.overview, href: `/${locale}` },
            { label: dict.updatesPage.title },
          ]}
        />

        <header className="panel doc-hero updates-hero">
          <p className="eyebrow">{dict.updatesPage.eyebrow}</p>
          <h1>{dict.updatesPage.title}</h1>
          <p className="lead">{dict.updatesPage.description}</p>
          <div className="updates-hero-meta">
            <div className="updates-hero-stat">
              <span>{locale === "zh" ? "记录阶段" : "Tracked periods"}</span>
              <strong>{entries.length}</strong>
            </div>
            <div className="updates-hero-stat">
              <span>{locale === "zh" ? "教材更新项" : "Curriculum updates"}</span>
              <strong>{totalNotes}</strong>
            </div>
            <div className="updates-hero-stat">
              <span>{locale === "zh" ? "最近阶段" : "Latest period"}</span>
              <strong>{latestPeriod}</strong>
            </div>
          </div>
          <div className="updates-focus">
            {focusAreas.map((item) => (
              <span className="updates-focus-chip" key={item}>
                {item}
              </span>
            ))}
          </div>
        </header>

        <section className="panel updates-section">
          <div className="updates-timeline">
            {entries.map((entry, index) => (
              <article className="update-entry" key={entry.id}>
                <div className="update-period">
                  <span>{entry.period}</span>
                </div>
                <div className="update-body">
                  <p className="update-kicker">
                    {locale === "zh" ? `第 ${entries.length - index} 次整理` : `Update ${String(entries.length - index).padStart(2, "0")}`}
                  </p>
                  <h2>{entry.title}</h2>
                  <p>{entry.summary}</p>
                  <ul>
                    {entry.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </section>
      </article>
    </SiteShell>
  );
}
