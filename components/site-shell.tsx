import Link from "next/link";

import { DocSearch } from "@/components/doc-search";
import { getSearchDocs } from "@/lib/content";
import { LanguageSwitcher } from "@/components/language-switcher";
import type { Locale } from "@/lib/i18n";

type SiteShellProps = {
  locale: Locale;
  sidebar: {
    brandLabel: string;
    searchLabel: string;
    footerTitle: string;
    footerText: string;
    localeLabel: string;
    localeNames: Record<Locale, string>;
    groups: Array<{
      title: string;
      items: Array<{
        label: string;
        href: string;
        active?: boolean;
      }>;
    }>;
  };
  children: React.ReactNode;
};

export async function SiteShell({ locale, sidebar, children }: SiteShellProps) {
  const searchItems = await getSearchDocs(locale);

  return (
    <div className="shell">
      <aside className="sidebar">
        <Link className="brand" href={`/${locale}`}>
          <span className="brand-mark">G</span>
          <span className="brand-text">{sidebar.brandLabel}</span>
        </Link>

        <DocSearch items={searchItems} label={sidebar.searchLabel} locale={locale} />

        <LanguageSwitcher
          currentLocale={locale}
          label={sidebar.localeLabel}
          localeNames={sidebar.localeNames}
        />

        <nav className="side-nav">
          {sidebar.groups.map((group) => (
            <div className="nav-group" key={group.title}>
              <p className="nav-title">{group.title}</p>
              {group.items.map((item) => (
                <Link
                  className={`nav-item${item.active ? " is-active" : ""}`}
                  href={item.href}
                  key={item.href}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          ))}
        </nav>

        <div className="sidebar-footer">
          <p>{sidebar.footerTitle}</p>
          <span>{sidebar.footerText}</span>
        </div>
      </aside>

      <main className="content">{children}</main>
    </div>
  );
}
