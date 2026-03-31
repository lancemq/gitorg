import { notFound } from "next/navigation";

import { SiteShell } from "@/components/site-shell";
import { getAllDocs, getDocHref } from "@/lib/content";
import { getDictionary, isValidLocale, type Locale } from "@/lib/i18n";

type Props = {
  params: Promise<{
    lang: string;
  }>;
};

export function generateStaticParams() {
  return [{ lang: "zh" }, { lang: "en" }];
}

export default async function DocsIndexPage({ params }: Props) {
  const { lang } = await params;

  if (!isValidLocale(lang)) {
    notFound();
  }

  const locale = lang as Locale;
  const dict = getDictionary(locale);
  const docs = await getAllDocs(locale);

  const groupedDocs = docs.reduce<Record<string, typeof docs>>((acc, doc) => {
    const key = doc.metadata.section;
    acc[key] ??= [];
    acc[key].push(doc);
    return acc;
  }, {});

  return (
    <SiteShell locale={locale} sidebar={dict.sidebar.docs("index")}>
      <section className="docs-landing">
        <div className="section-head">
          <div>
            <p className="eyebrow">{dict.docsIndex.eyebrow}</p>
            <h1>{dict.docsIndex.title}</h1>
          </div>
          <p>{dict.docsIndex.description}</p>
        </div>

        <div className="docs-groups">
          {dict.docsIndex.sections.map((section) => {
            const items = groupedDocs[section.id] ?? [];

            return (
              <section className="panel docs-group" key={section.id}>
                <div className="docs-group-head">
                  <p className="eyebrow">{section.eyebrow}</p>
                  <h2>{section.title}</h2>
                  <p>{section.description}</p>
                </div>

                <div className="docs-list">
                  {items.map((doc) => (
                    <a
                      className="docs-card"
                      href={getDocHref(locale, doc.path)}
                      key={doc.path}
                    >
                      <h3>{doc.metadata.title}</h3>
                      <p>{doc.metadata.summary}</p>
                    </a>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </section>
    </SiteShell>
  );
}
