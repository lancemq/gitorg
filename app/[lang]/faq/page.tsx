import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { FaqList } from "@/components/faq-list";
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
    pathname: "/faq",
    title: dict.faqPage.title,
    description: dict.faqPage.description,
  });
}

export default async function FaqPage({ params }: Props) {
  const { lang } = await params;

  if (!isValidLocale(lang)) {
    notFound();
  }

  const locale = lang as Locale;
  const dict = getDictionary(locale);

  return (
    <SiteShell locale={locale} sidebar={getSidebarContent(locale, { kind: "docs", activePath: "faq" })}>
      <article className="doc-page">
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          <Link href={`/${locale}`}>{dict.commandPage.breadcrumbs.overview}</Link>
          <span>/</span>
          <strong>{dict.commandPage.breadcrumbs.faq}</strong>
        </nav>

        <header className="panel doc-hero faq-hero">
          <p className="eyebrow">{dict.faqPage.eyebrow}</p>
          <h1>{dict.faqPage.title}</h1>
          <p className="lead">{dict.faqPage.description}</p>
        </header>

        <section className="panel faq-page-section">
          <div className="faq-group" id="pull-sync">
            <h2>{locale === "zh" ? "pull 与同步" : "pull and sync"}</h2>
            <FaqList items={dict.home.faq.items.slice(0, 2)} />
          </div>

          <div className="faq-group" id="reset-recovery">
            <h2>{locale === "zh" ? "reset 与恢复" : "reset and recovery"}</h2>
            <FaqList items={dict.home.faq.items.slice(2, 5)} />
          </div>

          <div className="faq-group" id="stash-switch">
            <h2>{locale === "zh" ? "stash 与切换" : "stash and switching"}</h2>
            <FaqList items={dict.home.faq.items.slice(5)} />
          </div>
        </section>
      </article>
    </SiteShell>
  );
}
