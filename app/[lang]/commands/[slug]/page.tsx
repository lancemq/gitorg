import { notFound } from "next/navigation";

import { SiteShell } from "@/components/site-shell";
import { getCommandDoc } from "@/lib/content";
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
    slug: string;
  }>;
};

export async function generateStaticParams() {
  return locales.flatMap((lang) =>
    commandSlugs.map((slug) => ({ lang, slug })),
  ) as Array<{ lang: Locale; slug: CommandSlug }>;
}

export default async function CommandPage({ params }: Props) {
  const { lang, slug } = await params;

  if (!isValidLocale(lang)) {
    notFound();
  }

  const locale = lang as Locale;
  const dict = getDictionary(locale);
  if (!dict.commandSlugs.includes(slug as CommandSlug)) {
    notFound();
  }

  const commandSlug = slug as CommandSlug;
  const doc = await getCommandDoc(locale, commandSlug);
  const DocBody = doc.Component;

  return (
    <SiteShell locale={locale} sidebar={dict.sidebar.command(commandSlug)}>
      <nav className="breadcrumbs" aria-label="Breadcrumb">
        <a href={`/${locale}`}>{dict.commandPage.breadcrumbs.docs}</a>
        <span>/</span>
        <a href={`/${locale}#reference`}>{dict.commandPage.breadcrumbs.commands}</a>
        <span>/</span>
        <strong>{doc.metadata.title}</strong>
      </nav>

      <section className="command-hero">
        <div className="command-copy">
          <p className="eyebrow">{dict.commandPage.eyebrow}</p>
          <h1>{doc.metadata.title}</h1>
          <p className="lead">{doc.metadata.summary}</p>
        </div>

        <aside className="command-meta panel">
          {dict.commandMeta[commandSlug].map((item) => (
            <div className="meta-row" key={item.label}>
              <span>{item.label}</span>
              <strong>{item.value}</strong>
            </div>
          ))}
        </aside>
      </section>

      <section className="panel doc-content command-doc-content">
        <div className="mdx-content">
          <DocBody />
        </div>
      </section>
    </SiteShell>
  );
}
