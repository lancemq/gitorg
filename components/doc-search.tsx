"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  useDeferredValue,
  useEffect,
  useMemo,
  useState,
  type KeyboardEvent,
} from "react";

import type { SearchDoc } from "@/lib/content";
import type { Locale } from "@/lib/i18n";

type DocSearchProps = {
  items: SearchDoc[];
  label: string;
  locale: Locale;
};

type SearchGroup = {
  id: string;
  title: string;
  items: SearchDoc[];
};

type SearchResult = SearchDoc & {
  score: number;
};

const sectionLabels: Record<Locale, Record<SearchDoc["section"], string>> = {
  zh: {
    "learning-path": "学习路径",
    commands: "命令专题",
    "best-practices": "最佳实践",
    workflows: "工作流",
    internals: "Git 原理",
    recovery: "恢复手册",
    concepts: "核心概念",
  },
  en: {
    "learning-path": "Learning Path",
    commands: "Commands",
    "best-practices": "Best Practices",
    workflows: "Workflows",
    internals: "Git Internals",
    recovery: "Recovery",
    concepts: "Concepts",
  },
};

const emptyStates = {
  zh: "没有匹配的文档，试试 git、rebase、reset、stash 等关键词。",
  en: "No matching docs yet. Try keywords like git, rebase, reset, or stash.",
};

const shortcutLabels = {
  zh: "搜索结果",
  en: "Search results",
};

const triggerLabels = {
  zh: "打开搜索",
  en: "Open search",
};

const inputPlaceholders = {
  zh: "搜索命令、主题或概念",
  en: "Search commands, topics, or concepts",
};

const helperLabels = {
  zh: "按 Esc 关闭，按 Cmd/Ctrl + K 随时唤起",
  en: "Press Esc to close, or Cmd/Ctrl + K to reopen",
};

const allFilterLabels = {
  zh: "全部",
  en: "All",
};

const quickLinkLabels = {
  zh: "常用入口",
  en: "Quick Links",
};

const recentLabels = {
  zh: "最近访问",
  en: "Recent Visits",
};

const emptySuggestionTitles = {
  zh: "你可能想找",
  en: "You may be looking for",
};

const synonymLabels = {
  zh: "已扩展关键词",
  en: "Expanded keywords",
};

const noResultHintTitles = {
  zh: "没有精确匹配",
  en: "No exact matches",
};

const searchSynonyms: Record<Locale, Record<string, string[]>> = {
  zh: {
    撤销: ["reset", "revert", "restore"],
    回退: ["reset", "revert"],
    恢复: ["reflog", "restore", "recovery"],
    同步: ["fetch", "pull", "rebase"],
    合并: ["merge", "rebase", "cherry-pick"],
    变基: ["rebase"],
    强推: ["push", "shared-history", "safe-push"],
    暂存: ["add", "index", "staging"],
    储藏: ["stash"],
    冲突: ["merge", "rebase", "conflict"],
    分支: ["branch", "switch", "checkout"],
    标签: ["tag"],
    远端: ["remote", "fetch", "push", "pull"],
    对象: ["object", "database", "blob", "tree", "commit"],
    原理: ["internals", "object", "refs", "commit-graph"],
    历史: ["history", "rebase", "reflog", "log"],
  },
  en: {
    undo: ["reset", "revert", "restore"],
    rollback: ["reset", "revert"],
    recover: ["reflog", "restore", "recovery"],
    sync: ["fetch", "pull", "rebase"],
    synchronize: ["fetch", "pull", "rebase"],
    merge: ["merge", "rebase", "cherry-pick"],
    rewrite: ["rebase", "commit", "history"],
    stash: ["git-stash", "working-tree"],
    branch: ["switch", "checkout", "branch"],
    remote: ["fetch", "push", "pull", "origin"],
    conflict: ["merge", "rebase", "conflict"],
    internals: ["object", "refs", "commit-graph", "packfiles"],
    history: ["log", "reflog", "rebase"],
  },
};

const recentStorageKey = "git-org-academy-recent-searches";
const sectionOrder: SearchDoc["section"][] = [
  "learning-path",
  "commands",
  "workflows",
  "best-practices",
  "internals",
  "concepts",
  "recovery",
];

export function DocSearch({ items, label, locale }: DocSearchProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<SearchDoc["section"] | "all">("all");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [recentHrefs, setRecentHrefs] = useState<string[]>(() => {
    if (typeof window === "undefined") {
      return [];
    }

    try {
      const storedValue = window.localStorage.getItem(recentStorageKey);
      return storedValue ? (JSON.parse(storedValue) as string[]) : [];
    } catch {
      return [];
    }
  });
  const deferredQuery = useDeferredValue(query);
  const normalizedQuery = deferredQuery.trim().toLowerCase();
  const queryTokens = useMemo(
    () => normalizedQuery.split(/\s+/).filter(Boolean),
    [normalizedQuery],
  );
  const expandedTerms = useMemo(() => {
    if (!queryTokens.length) {
      return [];
    }

    const synonyms = searchSynonyms[locale];
    return Array.from(
      new Set(
        queryTokens.flatMap((token) => [token, ...(synonyms[token] ?? [])]),
      ),
    );
  }, [locale, queryTokens]);
  const availableSections = useMemo(
    () =>
      Array.from(new Set(items.map((item) => item.section))).sort((a, b) =>
        sectionLabels[locale][a].localeCompare(sectionLabels[locale][b]),
      ),
    [items, locale],
  );

  const results = useMemo<SearchResult[]>(() => {
    const scopedItems =
      activeSection === "all"
        ? items
        : items.filter((item) => item.section === activeSection);

    if (!normalizedQuery) {
      return scopedItems.slice(0, 8).map((item) => ({ ...item, score: 0 }));
    }

    return scopedItems
      .map((item) => {
        const haystack = [item.title, item.summary, item.slug, item.path]
          .join(" ")
          .toLowerCase();
        const directTitleHit = item.title.toLowerCase().includes(normalizedQuery);
        const directSlugHit = item.slug.toLowerCase().includes(normalizedQuery);
        const directPathHit = item.path.toLowerCase().includes(normalizedQuery);
        const directSummaryHit = item.summary.toLowerCase().includes(normalizedQuery);

        const score = expandedTerms.reduce((total, term) => {
          const titleHit = item.title.toLowerCase().includes(term);
          const slugHit = item.slug.toLowerCase().includes(term);
          const pathHit = item.path.toLowerCase().includes(term);
          const summaryHit = item.summary.toLowerCase().includes(term);
          const directTermBonus = term === normalizedQuery ? 3 : 0;

          return (
            total +
            (titleHit ? 5 : 0) +
            (slugHit ? 4 : 0) +
            (pathHit ? 3 : 0) +
            (summaryHit ? 2 : 0) +
            (haystack.startsWith(term) ? 1 : 0) +
            ((titleHit || slugHit || pathHit || summaryHit) ? directTermBonus : 0)
          );
        }, 0) +
          (directTitleHit ? 6 : 0) +
          (directSlugHit ? 4 : 0) +
          (directPathHit ? 3 : 0) +
          (directSummaryHit ? 2 : 0);

        return { ...item, score };
      })
      .filter((item) => item.score > 0)
      .sort((a, b) => b.score - a.score || a.title.localeCompare(b.title))
      .slice(0, 8);
  }, [activeSection, expandedTerms, items, normalizedQuery]);
  const recentItems = useMemo(
    () =>
      recentHrefs
        .map((href) => items.find((item) => item.href === href))
        .filter((item): item is SearchDoc => Boolean(item))
        .slice(0, 5),
    [items, recentHrefs],
  );
  const quickLinkItems = useMemo(() => {
    return sectionOrder
      .map((section) => items.find((item) => item.section === section))
      .filter((item): item is SearchDoc => Boolean(item))
      .filter((item) => !recentItems.some((recentItem) => recentItem.href === item.href))
      .slice(0, 6);
  }, [items, recentItems]);
  const fallbackItems = useMemo(() => {
    if (!normalizedQuery || results.length > 0) {
      return [];
    }

    const suggestions = expandedTerms
      .filter((term) => term !== normalizedQuery)
      .flatMap((term) =>
        items.filter((item) =>
          [item.title, item.summary, item.slug, item.path]
            .join(" ")
            .toLowerCase()
            .includes(term),
        ),
      );

    return Array.from(new Map(
      [...suggestions, ...quickLinkItems].map((item) => [item.href, item]),
    ).values()).slice(0, 4);
  }, [expandedTerms, items, normalizedQuery, quickLinkItems, results.length]);
  const displayGroups = useMemo<SearchGroup[]>(() => {
    const isBrowsingState = !normalizedQuery && activeSection === "all";

    if (isBrowsingState) {
      return [
        {
          id: "recent",
          title: recentLabels[locale],
          items: recentItems,
        },
        {
          id: "quick-links",
          title: quickLinkLabels[locale],
          items: quickLinkItems,
        },
      ].filter((group) => group.items.length > 0);
    }

    if (activeSection !== "all") {
      return results.length
        ? [
            {
              id: activeSection,
              title: sectionLabels[locale][activeSection],
              items: results,
            },
          ]
        : [];
    }

    return availableSections
      .map((section) => ({
        id: section,
        title: sectionLabels[locale][section],
        items: results.filter((item) => item.section === section),
      }))
      .filter((group) => group.items.length > 0);
  }, [activeSection, availableSections, locale, normalizedQuery, quickLinkItems, recentItems, results]);
  const flatDisplayItems = useMemo(
    () => displayGroups.flatMap((group) => group.items),
    [displayGroups],
  );
  const highlightedResult =
    flatDisplayItems[Math.min(selectedIndex, Math.max(flatDisplayItems.length - 1, 0))];

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    function handleKeyDown(event: globalThis.KeyboardEvent) {
      const triggerShortcut =
        (event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k";

      if (triggerShortcut) {
        event.preventDefault();
        setSelectedIndex(0);
        setIsOpen(true);
      }

      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  function handleInputKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (!flatDisplayItems.length) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
      return;
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();
      setSelectedIndex((current) => (current + 1) % flatDisplayItems.length);
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      setSelectedIndex((current) => (current - 1 + flatDisplayItems.length) % flatDisplayItems.length);
    }

    if (event.key === "Enter") {
      event.preventDefault();
      const result = highlightedResult;
      if (result) {
        setIsOpen(false);
        router.push(result.href);
      }
    }

    if (event.key === "Escape") {
      setIsOpen(false);
    }
  }

  function rememberResult(href: string) {
    const nextRecentHrefs = [href, ...recentHrefs.filter((entry) => entry !== href)].slice(0, 5);
    setRecentHrefs(nextRecentHrefs);

    if (typeof window !== "undefined") {
      window.localStorage.setItem(recentStorageKey, JSON.stringify(nextRecentHrefs));
    }
  }

  function renderHighlightedText(text: string) {
    if (!normalizedQuery) {
      return text;
    }

    const matchTerm = expandedTerms.find((term) => term.length > 1 && text.toLowerCase().includes(term));

    if (!matchTerm) {
      return text;
    }

    const lowerText = text.toLowerCase();
    const startIndex = lowerText.indexOf(matchTerm);

    if (startIndex === -1) {
      return text;
    }

    const endIndex = startIndex + matchTerm.length;

    return (
      <>
        {text.slice(0, startIndex)}
        <mark>{text.slice(startIndex, endIndex)}</mark>
        {text.slice(endIndex)}
      </>
    );
  }

  return (
    <div className={`doc-search${isOpen ? " is-open" : ""}`}>
      <button
        aria-expanded={isOpen}
        aria-haspopup="dialog"
        aria-label={triggerLabels[locale]}
        className="search-trigger"
        onClick={() => {
          setSelectedIndex(0);
          setIsOpen(true);
        }}
        type="button"
      >
        <span className="search-trigger-icon" aria-hidden="true">
          /
        </span>
        <span className="search-trigger-text">{label}</span>
        <kbd>⌘K</kbd>
      </button>

      {isOpen ? (
        <div
          className="search-overlay"
          onClick={() => setIsOpen(false)}
          role="presentation"
        >
          <div
            aria-label={label}
            aria-modal="true"
            className="search-dialog"
            onClick={(event) => event.stopPropagation()}
            role="dialog"
          >
            <label className="search-box" htmlFor={`doc-search-${locale}`}>
              <span className="search-box-icon" aria-hidden="true">
                /
              </span>
              <span>{label}</span>
              <kbd>⌘K</kbd>
            </label>

            <input
              aria-controls={`doc-search-results-${locale}`}
              className="search-input"
              id={`doc-search-${locale}`}
              onChange={(event) => {
                setQuery(event.target.value);
                setSelectedIndex(0);
              }}
              onKeyDown={handleInputKeyDown}
              placeholder={inputPlaceholders[locale]}
              autoFocus
              type="search"
              value={query}
            />

            <div className="search-filters" role="tablist" aria-label={label}>
              <button
                className={`search-filter${activeSection === "all" ? " is-active" : ""}`}
                onClick={() => {
                  setActiveSection("all");
                  setSelectedIndex(0);
                }}
                type="button"
              >
                {allFilterLabels[locale]}
              </button>
              {availableSections.map((section) => (
                <button
                  className={`search-filter${activeSection === section ? " is-active" : ""}`}
                  key={section}
                  onClick={() => {
                    setActiveSection(section);
                    setSelectedIndex(0);
                  }}
                  type="button"
                >
                  {sectionLabels[locale][section]}
                </button>
              ))}
            </div>

            <div className="search-helper">
              <span>{helperLabels[locale]}</span>
              {normalizedQuery && expandedTerms.length > 1 ? (
                <span className="search-synonyms">
                  {synonymLabels[locale]}: {expandedTerms.filter((term) => term !== normalizedQuery).join(", ")}
                </span>
              ) : null}
            </div>

            <div
              className="search-results"
              id={`doc-search-results-${locale}`}
              role="listbox"
              aria-label={shortcutLabels[locale]}
            >
              {displayGroups.length > 0 ? (
                displayGroups.map((group) => (
                  <section className="search-group" key={group.id}>
                    <header className="search-group-header">
                      <h3>{group.title}</h3>
                    </header>
                    <div className="search-group-list">
                      {group.items.map((item) => (
                        <Link
                          className={`search-result${pathname === item.href ? " is-active" : ""}${
                            highlightedResult?.href === item.href ? " is-selected" : ""
                          }`}
                          href={item.href}
                          key={item.href}
                          onMouseEnter={() =>
                            setSelectedIndex(
                              flatDisplayItems.findIndex((result) => result.href === item.href),
                            )
                          }
                          onClick={() => {
                            rememberResult(item.href);
                            setIsOpen(false);
                          }}
                        >
                          <div className="search-result-copy">
                            <strong>{renderHighlightedText(item.title)}</strong>
                            <p>{renderHighlightedText(item.summary)}</p>
                          </div>
                          <span className="search-result-tag">
                            {sectionLabels[locale][item.section]}
                          </span>
                        </Link>
                      ))}
                    </div>
                  </section>
                ))
              ) : (
                <div className="search-empty-state">
                  <p className="search-empty">{emptyStates[locale]}</p>
                  {fallbackItems.length > 0 ? (
                    <section className="search-fallback">
                      <header className="search-group-header">
                        <h3>{emptySuggestionTitles[locale]}</h3>
                      </header>
                      <p className="search-empty-hint">{noResultHintTitles[locale]}</p>
                      <div className="search-group-list">
                        {fallbackItems.map((item) => (
                          <Link
                            className="search-result"
                            href={item.href}
                            key={item.href}
                            onClick={() => {
                              rememberResult(item.href);
                              setIsOpen(false);
                            }}
                          >
                            <div className="search-result-copy">
                              <strong>{item.title}</strong>
                              <p>{item.summary}</p>
                            </div>
                            <span className="search-result-tag">
                              {sectionLabels[locale][item.section]}
                            </span>
                          </Link>
                        ))}
                      </div>
                    </section>
                  ) : null}
                </div>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
