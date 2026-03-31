import { notFound } from "next/navigation";

import { SiteShell } from "@/components/site-shell";
import { getCommandDocs } from "@/lib/content";
import {
  commandSlugs,
  getDictionary,
  isValidLocale,
  locales,
  type CommandSlug,
  type Locale,
} from "@/lib/i18n";

type Props = {
  params: Promise<{
    lang: string;
  }>;
};

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
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

  return (
    <SiteShell locale={locale} sidebar={dict.sidebar.docs("commands-index")}>
      <section className="docs-landing">
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
            <h2>{dict.commandPage.breadcrumbs.commands}</h2>
            <p>{dict.commandIndex.description}</p>
          </div>

          <div className="docs-list">
            {sortedDocs.map((doc) => (
              <a className="docs-card" href={`/${locale}/commands/${doc.metadata.slug}`} key={doc.path}>
                <h3>{doc.metadata.title}</h3>
                <p>{doc.metadata.summary}</p>
              </a>
            ))}
          </div>
        </section>
      </section>
    </SiteShell>
  );
}
