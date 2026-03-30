import { notFound } from "next/navigation";

import { CommandTabs } from "@/components/command-tabs";
import { SiteShell } from "@/components/site-shell";
import { getDictionary, isValidLocale, type CommandSlug, type Locale } from "@/lib/i18n";

type Props = {
  params: Promise<{
    lang: string;
    slug: string;
  }>;
};

export async function generateStaticParams() {
  const params: Array<{ lang: Locale; slug: CommandSlug }> = [];

  for (const lang of ["zh", "en"] as const) {
    params.push({ lang, slug: "git-rebase" });
  }

  return params;
}

export default async function CommandPage({ params }: Props) {
  const { lang, slug } = await params;

  if (!isValidLocale(lang)) {
    notFound();
  }

  const locale = lang as Locale;
  const dict = getDictionary(locale);

  if (!(slug in dict.commandDocs)) {
    notFound();
  }

  const commandSlug = slug as CommandSlug;
  const doc = dict.commandDocs[commandSlug];

  return (
    <SiteShell locale={locale} sidebar={dict.sidebar.command(commandSlug)}>
      <nav className="breadcrumbs" aria-label="Breadcrumb">
        <a href={`/${locale}`}>{dict.commandPage.breadcrumbs.docs}</a>
        <span>/</span>
        <a href={`/${locale}#reference`}>{dict.commandPage.breadcrumbs.commands}</a>
        <span>/</span>
        <strong>{doc.title}</strong>
      </nav>

      <section className="command-hero">
        <div className="command-copy">
          <p className="eyebrow">{dict.commandPage.eyebrow}</p>
          <h1>{doc.title}</h1>
          <p className="lead">{doc.lead}</p>
        </div>

        <aside className="command-meta panel">
          {doc.meta.map((item) => (
            <div className="meta-row" key={item.label}>
              <span>{item.label}</span>
              <strong>{item.value}</strong>
            </div>
          ))}
        </aside>
      </section>

      <CommandTabs tabs={doc.tabs} />
    </SiteShell>
  );
}
