"use client";

import Link from "next/link";
import { useState } from "react";

type EntryItem = {
  title: string;
  description?: string;
  href: string;
};

type HomeEntryTabsProps = {
  locale: "zh" | "en";
  title: string;
  description: string;
  tabs: ReadonlyArray<{
    id: "journeys" | "scenarios";
    label: string;
    intro: string;
    items: ReadonlyArray<EntryItem>;
  }>;
};

export function HomeEntryTabs({
  locale,
  title,
  description,
  tabs,
}: HomeEntryTabsProps) {
  const [activeTab, setActiveTab] = useState(tabs[0]?.id ?? "journeys");
  const currentTab = tabs.find((tab) => tab.id === activeTab) ?? tabs[0];

  return (
    <section className="section section-entry-hub" id="entry-hub">
      <div className="section-head">
        <div>
          <p className="eyebrow">{locale === "zh" ? "Start Here" : "Start Here"}</p>
          <h2>{title}</h2>
        </div>
        <p>{description}</p>
      </div>

      <div className={`entry-hub-panel panel ${currentTab.id === "journeys" ? "is-journeys" : "is-scenarios"}`}>
        <div className="entry-tab-bar" role="tablist" aria-label={title}>
          {tabs.map((tab) => (
            <button
              aria-selected={tab.id === currentTab.id}
              className={`entry-tab-button${tab.id === currentTab.id ? " is-active" : ""}`}
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              role="tab"
              type="button"
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="entry-tab-panel" role="tabpanel">
          <div className="entry-tab-copy">
            <p className="entry-tab-kicker">{currentTab.label}</p>
            <div className="entry-tab-meta">
              <span className="entry-tab-count">
                {String(currentTab.items.length).padStart(2, "0")}
              </span>
              <span className="entry-tab-divider" aria-hidden="true" />
              <span className="entry-tab-caption">
                {locale === "zh" ? "个入口" : "entry points"}
              </span>
            </div>
            <p className="entry-tab-intro">{currentTab.intro}</p>
          </div>

          <div className="entry-tab-grid">
            {currentTab.items.map((item, index) => (
              <Link className="entry-card" href={`/${locale}${item.href}`} key={item.href}>
                <span className="entry-card-index">{String(index + 1).padStart(2, "0")}</span>
                <h3>{item.title}</h3>
                {item.description ? <p>{item.description}</p> : null}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
