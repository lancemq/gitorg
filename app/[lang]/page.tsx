import { notFound } from "next/navigation";

import { FaqList } from "@/components/faq-list";
import { SiteShell } from "@/components/site-shell";
import { getDictionary, isValidLocale, locales, type Locale } from "@/lib/i18n";

type Props = {
  params: Promise<{
    lang: string;
  }>;
};

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export default async function LocalizedHomePage({ params }: Props) {
  const { lang } = await params;

  if (!isValidLocale(lang)) {
    notFound();
  }

  const locale = lang as Locale;
  const dict = getDictionary(locale);

  return (
    <SiteShell locale={locale} sidebar={dict.sidebar.home}>
      <section className="hero panel" id="overview">
        <div className="hero-copy">
          <p className="eyebrow">{dict.home.hero.eyebrow}</p>
          <h1>{dict.home.hero.title}</h1>
          <p className="lead">{dict.home.hero.description}</p>
          <div className="hero-actions">
            <a className="button button-primary" href={`/${locale}/commands/git-rebase`}>
              {dict.home.hero.primaryAction}
            </a>
            <a className="button button-secondary" href={`/${locale}#reference`}>
              {dict.home.hero.secondaryAction}
            </a>
          </div>
        </div>

        <div className="hero-meta">
          <div className="meta-card">
            <p className="meta-label">{dict.home.meta.modulesTitle}</p>
            <strong>{dict.home.meta.modules}</strong>
            <span>{dict.home.meta.modulesLabel}</span>
          </div>
          <div className="meta-grid">
            <article className="stat-card">
              <span>{dict.home.meta.commandCardsTitle}</span>
              <strong>{dict.home.meta.commandCards}</strong>
            </article>
            <article className="stat-card">
              <span>{dict.home.meta.exercisesTitle}</span>
              <strong>{dict.home.meta.exercises}</strong>
            </article>
          </div>
          <article className="note-card">
            <p>{dict.home.meta.recommendedPathTitle}</p>
            <strong>{dict.home.meta.recommendedPath}</strong>
          </article>
        </div>
      </section>

      <section className="section" id="quick-start">
        <div className="section-head">
          <div>
            <p className="eyebrow">{dict.home.quickStart.eyebrow}</p>
            <h2>{dict.home.quickStart.title}</h2>
          </div>
          <p>{dict.home.quickStart.description}</p>
        </div>

        <div className="card-grid card-grid-three">
          {dict.home.quickStart.cards.map((card) => (
            <article className="info-card" key={card.title}>
              <span className="card-kicker">{card.kicker}</span>
              <h3>{card.title}</h3>
              <p>{card.description}</p>
              <code>{card.command}</code>
            </article>
          ))}
        </div>
      </section>

      <section className="section dual-section" id="best-practices">
        {dict.home.knowledgeColumns.map((column) => (
          <article className="column-card" id={column.id} key={column.id}>
            <div className="section-head compact">
              <div>
                <p className="eyebrow">{column.eyebrow}</p>
                <h2>{column.title}</h2>
              </div>
              <p>{column.description}</p>
            </div>

            <div className="stack-list">
              {column.items.map((item) => (
                <article className="stack-item" key={item.title}>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </article>
              ))}
            </div>
          </article>
        ))}
      </section>

      <section className="section" id="reference">
        <div className="section-head">
          <div>
            <p className="eyebrow">{dict.home.reference.eyebrow}</p>
            <h2>{dict.home.reference.title}</h2>
          </div>
          <p>{dict.home.reference.description}</p>
        </div>

        <div className="roadmap">
          {dict.home.reference.steps.map((step) => (
            <article className="roadmap-item" key={step.step}>
              <span className="roadmap-step">{step.step}</span>
              <div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section" id="faq">
        <div className="section-head">
          <div>
            <p className="eyebrow">{dict.home.faq.eyebrow}</p>
            <h2>{dict.home.faq.title}</h2>
          </div>
          <p>{dict.home.faq.description}</p>
        </div>

        <FaqList items={dict.home.faq.items} />
      </section>

      <section className="cta panel">
        <div>
          <p className="eyebrow">{dict.home.cta.eyebrow}</p>
          <h2>{dict.home.cta.title}</h2>
          <p>{dict.home.cta.description}</p>
        </div>
        <a className="button button-primary" href={`/${locale}/commands/git-rebase`}>
          {dict.home.cta.action}
        </a>
      </section>
    </SiteShell>
  );
}
