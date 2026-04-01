"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { locales, type Locale } from "@/lib/i18n";

type Props = {
  currentLocale: Locale;
  label: string;
};

function LocaleBadge({ locale }: { locale: Locale }) {
  return (
    <span className={`locale-option-icon locale-option-icon-${locale}`} aria-hidden="true">
      {locale === "zh" ? "中" : "EN"}
    </span>
  );
}

export function LanguageSwitcher({ currentLocale, label }: Props) {
  const pathname = usePathname();

  const pathWithoutLocale = pathname.replace(/^\/(zh|en)(?=\/|$)/, "") || "/";

  return (
    <div className="locale-switcher" aria-label={label}>
      <span className="locale-label">
        <span className="locale-label-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" focusable="false">
            <path
              d="M12 3a9 9 0 1 0 0 18a9 9 0 0 0 0-18Zm6.9 8h-3.02a14.4 14.4 0 0 0-1.36-5.02A7.02 7.02 0 0 1 18.9 11Zm-6.9 8c-.65 0-1.9-2.09-2.24-5h4.48c-.34 2.91-1.59 5-2.24 5Zm-2.4-7c.06-1.06.23-2.08.49-3h4.82c.26.92.43 1.94.49 3Zm-5.5 0a7.02 7.02 0 0 1 4.38-5.02A14.4 14.4 0 0 0 7.12 11Zm0 2h3.02a14.4 14.4 0 0 0 1.36 5.02A7.02 7.02 0 0 1 4.1 13Zm10.42 5.02A14.4 14.4 0 0 0 15.88 13h3.02a7.02 7.02 0 0 1-4.38 5.02ZM12 5c.65 0 1.9 2.09 2.24 5H9.76c.34-2.91 1.59-5 2.24-5Z"
              fill="currentColor"
            />
          </svg>
        </span>
        <span>{label}</span>
      </span>
      <div className="locale-options">
        {locales.map((locale) => (
          <Link
            aria-label={locale === "zh" ? "切换到中文" : "Switch to English"}
            className={`locale-option${locale === currentLocale ? " is-active" : ""}`}
            href={`/${locale}${pathWithoutLocale === "/" ? "" : pathWithoutLocale}`}
            key={locale}
          >
            <LocaleBadge locale={locale} />
          </Link>
        ))}
      </div>
    </div>
  );
}
