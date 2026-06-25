import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Breadcrumbs } from "@/components/breadcrumbs";
import { SiteShell } from "@/components/site-shell";
import { StructuredData } from "@/components/structured-data";
import { getAllAuthors, getAuthor, getAuthorDisplayName } from "@/lib/authors";
import { getSidebarContent, isValidLocale, locales, type Locale } from "@/lib/i18n";
import { buildPageMetadata } from "@/lib/seo";
import { getSiteUrl } from "@/lib/site";

type Props = {
  params: Promise<{
    lang: string;
    slug: string;
  }>;
};

export async function generateStaticParams() {
  const authors = await getAllAuthors();
  return locales.flatMap((lang) => authors.map((a) => ({ lang, slug: a.slug })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!isValidLocale(lang)) return {};
  const author = await getAuthor(slug);
  if (!author) return {};
  const locale = lang as Locale;
  const displayName = getAuthorDisplayName(author, locale);
  const description = author.role[locale];
  return buildPageMetadata({
    locale,
    pathname: `/authors/${slug}`,
    title: displayName,
    description,
  });
}

export default async function AuthorPage({ params }: Props) {
  const { lang, slug } = await params;
  if (!isValidLocale(lang)) notFound();
  const author = await getAuthor(slug);
  if (!author) notFound();

  const locale = lang as Locale;
  const siteUrl = getSiteUrl();
  const sidebar = getSidebarContent(locale, { kind: "docs" });
  const displayName = getAuthorDisplayName(author, locale);
  const profileUrl = `${siteUrl}/${locale}/authors/${author.slug}`;

  // ProfilePage structured data is the canonical schema for author pages
  // since 2023 (replacing the older Person-as-page pattern). It links the
  // person record to the page URL and exposes sameAs[] for identity
  // corroboration — the core E-E-A-T trust signal.
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    mainEntity: {
      "@type": "Person",
      name: displayName,
      url: profileUrl,
      description: author.bio[locale],
      jobTitle: author.role[locale],
      ...(author.sameAs && author.sameAs.length > 0 ? { sameAs: author.sameAs } : {}),
      ...(author.avatarUrl ? { image: author.avatarUrl } : {}),
    },
    url: profileUrl,
  };

  return (
    <SiteShell locale={locale} sidebar={sidebar}>
      <article className="author-page">
        <StructuredData data={[structuredData]} />
        <Breadcrumbs
          items={[
            { label: locale === "zh" ? "首页" : "Home", href: `/${locale}` },
            { label: locale === "zh" ? "作者" : "Authors", href: `/${locale}/authors` },
            { label: displayName },
          ]}
        />

        <header className="panel doc-hero">
          <p className="eyebrow">{locale === "zh" ? "作者" : "Author"}</p>
          <h1>{displayName}</h1>
          <p className="lead">{author.role[locale]}</p>
        </header>

        <section className="panel">
          <h2>{locale === "zh" ? "简介" : "About"}</h2>
          <p style={{ lineHeight: 1.8 }}>{author.bio[locale]}</p>
          {typeof author.yearsOfGit === "number" ? (
            <p style={{ marginTop: 16, color: "var(--text-muted)" }}>
              {locale === "zh"
                ? `Git 使用经验：约 ${author.yearsOfGit} 年`
                : `Hands-on Git experience: ~${author.yearsOfGit} years`}
            </p>
          ) : null}
          {author.sameAs && author.sameAs.length > 0 ? (
            <div style={{ marginTop: 16 }}>
              <h3>{locale === "zh" ? "主页 / 社交" : "Links"}</h3>
              <ul>
                {author.sameAs.map((url) => (
                  <li key={url}>
                    <a href={url} rel="me noopener" target="_blank">
                      {url}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </section>
      </article>
    </SiteShell>
  );
}
