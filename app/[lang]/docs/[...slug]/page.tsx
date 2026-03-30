import { notFound } from "next/navigation";

import { SiteShell } from "@/components/site-shell";
import { getDocByPath, getDocPathFromSlugParts, getDocPaths } from "@/lib/content";
import { getDictionary, isValidLocale, locales, type Locale } from "@/lib/i18n";

type Props = {
  params: Promise<{
    lang: string;
    slug: string[];
  }>;
};

export async function generateStaticParams() {
  return locales.flatMap((lang) =>
    getDocPaths(lang).map((docPath) => ({
      lang,
      slug: docPath.split("/"),
    })),
  );
}

export default async function DocDetailPage({ params }: Props) {
  const { lang, slug } = await params;

  if (!isValidLocale(lang)) {
    notFound();
  }

  const locale = lang as Locale;
  const dict = getDictionary(locale);
  const docPath = getDocPathFromSlugParts(slug);

  if (!getDocPaths(locale).includes(docPath)) {
    notFound();
  }

  const doc = await getDocByPath(locale, docPath);
  const DocBody = doc.Component;

  return (
    <SiteShell locale={locale} sidebar={dict.sidebar.docs}>
      <article className="doc-page">
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          <a href={`/${locale}`}>{dict.commandPage.breadcrumbs.docs}</a>
          <span>/</span>
          <a href={`/${locale}/docs`}>{dict.docsIndex.title}</a>
          <span>/</span>
          <strong>{doc.metadata.title}</strong>
        </nav>

        <header className="panel doc-hero">
          <p className="eyebrow">{dict.docsIndex.eyebrow}</p>
          <h1>{doc.metadata.title}</h1>
          <p className="lead">{doc.metadata.summary}</p>
        </header>

        <section className="panel doc-content">
          <div className="mdx-content">
            <DocBody />
          </div>
        </section>

        <section className="panel doc-sources">
          <h2>{dict.docsIndex.sourcesTitle}</h2>
          <ul>
            {doc.metadata.sourceUrls.map((url: string) => (
              <li key={url}>
                <a href={url} target="_blank" rel="noreferrer">
                  {url}
                </a>
              </li>
            ))}
          </ul>
        </section>
      </article>
    </SiteShell>
  );
}
