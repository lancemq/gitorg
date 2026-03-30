"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { locales, type Locale } from "@/lib/i18n";

type Props = {
  currentLocale: Locale;
  label: string;
  localeNames: Record<Locale, string>;
};

export function LanguageSwitcher({ currentLocale, label, localeNames }: Props) {
  const pathname = usePathname();

  const pathWithoutLocale = pathname.replace(/^\/(zh|en)(?=\/|$)/, "") || "/";

  return (
    <div className="locale-switcher" aria-label={label}>
      <span className="locale-label">{label}</span>
      <div className="locale-options">
        {locales.map((locale) => (
          <Link
            className={`locale-option${locale === currentLocale ? " is-active" : ""}`}
            href={`/${locale}${pathWithoutLocale === "/" ? "" : pathWithoutLocale}`}
            key={locale}
          >
            {localeNames[locale]}
          </Link>
        ))}
      </div>
    </div>
  );
}
