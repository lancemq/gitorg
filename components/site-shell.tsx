import Link from "next/link";

import { DocSearch } from "@/components/doc-search";
import { getSearchDocs } from "@/lib/content";
import { LanguageSwitcher } from "@/components/language-switcher";
import type { Locale, SidebarContent } from "@/lib/i18n";

type SiteShellProps = {
  locale: Locale;
  sidebar: SidebarContent;
  children: React.ReactNode;
};

export async function SiteShell({ locale, sidebar, children }: SiteShellProps) {
  const searchItems = await getSearchDocs(locale);

  return (
    <div className="shell">
      <aside className="sidebar">
        <div className="sidebar-top">
          <div className="sidebar-glow" aria-hidden="true" />
          <Link className="brand" href={`/${locale}`}>
            <span className="brand-mark">G</span>
            <span className="brand-copy">
              <span className="brand-kicker">GitOrg Atlas</span>
              <span className="brand-text">{sidebar.brandLabel}</span>
            </span>
          </Link>

          <LanguageSwitcher
            currentLocale={locale}
            label={sidebar.localeLabel}
          />
        </div>

        <nav className="side-nav">
          {sidebar.groups.map((group) => (
            <div className="nav-group" key={group.title}>
              <p className="nav-title">{group.title}</p>
              {group.items.map((item) => (
                <div className="nav-node" key={item.href}>
                  <Link
                    className={`nav-item${item.active ? " is-active" : ""}${
                      item.children?.some((child) => child.active) ? " is-parent-active" : ""
                    }`}
                    href={item.href}
                  >
                    {item.label}
                  </Link>
                  {item.childGroups?.length ? (
                    <div className="nav-subgroups">
                      {item.childGroups.map((group) => (
                        <div className="nav-subgroup" key={group.title}>
                          <p className="nav-subtitle">{group.title}</p>
                          <div className="nav-subitems">
                            {group.items.map((child) => (
                              <Link
                                className={`nav-subitem${child.active ? " is-active" : ""}`}
                                href={child.href}
                                key={child.href}
                              >
                                {child.label}
                              </Link>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : item.children?.length ? (
                    <div className="nav-subitems">
                      {item.children.map((child) => (
                        <Link
                          className={`nav-subitem${child.active ? " is-active" : ""}`}
                          href={child.href}
                          key={child.href}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
          ))}
        </nav>

        <div className="sidebar-footer">
          <p>{sidebar.footerTitle}</p>
          <span>{sidebar.footerText}</span>
        </div>
      </aside>

      <DocSearch items={searchItems} label={sidebar.searchLabel} locale={locale} />

      <main className="content">{children}</main>
    </div>
  );
}
