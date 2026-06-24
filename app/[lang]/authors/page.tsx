import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Breadcrumbs } from "@/components/breadcrumbs";
import { SiteShell } from "@/components/site-shell";
import { getAllAuthors, getAuthorDisplayName } from "@/lib/authors";
import { getSidebarContent, isValidLocale, locales, type Locale } from "@/lib/i18n";
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
  if (!isValidLocale(lang)) return {};
  const locale = lang as Locale;
  return buildPageMetadata({
    locale,
    pathname: "/authors",
    title: locale === "zh" ? "作者" : "Authors",
    description:
      locale === "zh"
        ? "GitOrg Atlas 的作者与维护者，包含实战经验与可验证的身份信息。"
        : "Authors and maintainers behind GitOrg Atlas, with hands-on experience and verifiable identities.",
  });
}

export default async function AuthorsIndexPage({ params }: Props) {
  const { lang } = await params;
  if (!isValidLocale(lang)) notFound();
  const locale = lang as Locale;
  const sidebar = getSidebarContent(locale, { kind: "docs" });
  const authors = await getAllAuthors();

  return (
    <SiteShell locale={locale} sidebar={sidebar}>
      <article className="author-page">
        <Breadcrumbs
          items={[
            { label: locale === "zh" ? "首页" : "Home", href: `/${locale}` },
            { label: locale === "zh" ? "作者" : "Authors" },
          ]}
        />
        <header className="panel doc-hero">
          <p className="eyebrow">{locale === "zh" ? "作者" : "Authors"}</p>
          <h1>{locale === "zh" ? "谁在写这些内容" : "Who writes this"}</h1>
          <p className="lead">
            {locale === "zh"
              ? "GitOrg Atlas 的所有内容都来自真实工作场景。这里是作者列表，附实战年限与可验证的外部身份链接。"
              : "Every article on GitOrg Atlas comes from real engineering work. Here are the authors, with practitioner-years and verifiable external identities."}
          </p>
        </header>

        <section className="panel">
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 16 }}>
            {authors.map((author) => (
              <li key={author.slug}>
                <Link
                  href={`/${locale}/authors/${author.slug}`}
                  style={{ display: "block", padding: 16, border: "1px solid #e6e8ef", borderRadius: 12 }}
                >
                  <strong>{getAuthorDisplayName(author, locale)}</strong>
                  <p style={{ margin: "4px 0 0", color: "var(--text-muted)" }}>{author.role[locale]}</p>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </article>
    </SiteShell>
  );
}
