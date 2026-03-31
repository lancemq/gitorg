import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { HtmlLangSync } from "@/components/html-lang-sync";
import { isValidLocale, type Locale } from "@/lib/i18n";
import { buildLocaleHomeMetadata, getLocaleLang } from "@/lib/seo";

type Props = {
  children: React.ReactNode;
  params: Promise<{
    lang: string;
  }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;

  if (!isValidLocale(lang)) {
    return {};
  }

  return buildLocaleHomeMetadata(lang as Locale);
}

export default async function LocaleLayout({ children, params }: Props) {
  const { lang } = await params;

  if (!isValidLocale(lang)) {
    notFound();
  }

  const locale = lang as Locale;

  return (
    <div data-locale={locale} lang={getLocaleLang(locale)}>
      <HtmlLangSync locale={locale} />
      {children}
    </div>
  );
}
