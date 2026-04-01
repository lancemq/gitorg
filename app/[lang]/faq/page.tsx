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
          {dict.faqPage.groups.map((group) => (
            <div className="faq-group" id={group.id} key={group.id}>
              <div className="section-head compact">
                <div>
                  <p className="eyebrow">{dict.faqPage.eyebrow}</p>
                  <h2>{group.title}</h2>
                </div>
                <p>{group.description}</p>
              </div>
              <FaqList items={group.items} />
            </div>
          ))}
        </section>
      </article>
    </SiteShell>
  );
}
