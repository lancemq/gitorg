"use client";

import { useState } from "react";

type SideCard = {
  title: string;
  description: string;
};

type TabSection = {
  title: string;
  body?: string;
  list?: readonly string[];
  code?: string;
  warning?: boolean;
};

type CommandTab = {
  id: string;
  label: string;
  sections: readonly TabSection[];
  sideCards: readonly SideCard[];
};

type CommandTabsProps = {
  tabs: readonly CommandTab[];
};

export function CommandTabs({ tabs }: CommandTabsProps) {
  const [activeTab, setActiveTab] = useState(tabs[0]?.id);

  const currentTab = tabs.find((tab) => tab.id === activeTab) ?? tabs[0];

  return (
    <>
      <div className="chip-switch" role="tablist" aria-label="Command sections">
        {tabs.map((tab) => (
          <button
            className={`chip${tab.id === currentTab.id ? " is-active" : ""}`}
            key={tab.id}
            role="tab"
            type="button"
            aria-selected={tab.id === currentTab.id}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <section className="tab-panel">
        <div className="two-column">
          <div className="primary-stack">
            {currentTab.sections.map((section) => (
              <article
                className={`panel detail-card${section.warning ? " warning-card" : ""}`}
                key={section.title}
              >
                <h2>{section.title}</h2>
                {section.body ? <p>{section.body}</p> : null}
                {section.list ? (
                  <ol>
                    {section.list.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ol>
                ) : null}
                {section.code ? (
                  <pre>
                    <code>{section.code}</code>
                  </pre>
                ) : null}
              </article>
            ))}
          </div>

          <aside className="secondary-stack">
            {currentTab.sideCards.map((card) => (
              <article className="panel side-card" key={card.title}>
                <h3>{card.title}</h3>
                <p>{card.description}</p>
              </article>
            ))}
          </aside>
        </div>
      </section>
    </>
  );
}
