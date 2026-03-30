import { notFound } from "next/navigation";

import { isValidLocale, type Locale } from "@/lib/i18n";

type Props = {
  children: React.ReactNode;
  params: Promise<{
    lang: string;
  }>;
};

export default async function LocaleLayout({ children, params }: Props) {
  const { lang } = await params;

  if (!isValidLocale(lang)) {
    notFound();
  }

  return <div data-locale={lang as Locale}>{children}</div>;
}
