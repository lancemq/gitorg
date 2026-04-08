import { notFound, permanentRedirect } from "next/navigation";

import { isValidLocale, locales, type Locale } from "@/lib/i18n";

type Props = {
  params: Promise<{
    lang: string;
  }>;
};

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export default async function LegacyGitHistoryRedirectPage({ params }: Props) {
  const { lang } = await params;

  if (!isValidLocale(lang)) {
    notFound();
  }

  permanentRedirect(`/${lang as Locale}/history`);
}
