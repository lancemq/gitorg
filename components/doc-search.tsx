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
import {
  buildDisplayGroups,
  expandQueryTerms,
  getFallbackItems,
  getQuickLinkItems,
  scoreAndFilterDocs,
  sectionLabels,
  type SearchResult,
} from "@/lib/search";

type DocSearchProps = {
  label: string;
  locale: Locale;
};

type SearchGroup = {
  id: string;
  title: string;
  items: SearchDoc[];
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

const loadingStates = {
  zh: "正在加载搜索索引...",
  en: "Loading search index...",
};

const loadErrorStates = {
  zh: "搜索暂时不可用，请稍后重试。",
  en: "Search is temporarily unavailable. Please try again.",
};

const SEARCH_LOAD_TIMEOUT_MS = 5000;

const searchSuggestionLabels = {
  zh: {
    prerequisite: "先读",
    risk: "注意",
  },
  en: {
    prerequisite: "Start with",
    risk: "Watch",
  },
};

const tierLabels = {
  zh: {
    core: "核心",
    recommended: "推荐",
    extended: "延伸",
  },
  en: {
    core: "Core",
    recommended: "Recommended",
    extended: "Extended",
  },
} as const;

const recentStorageKey = "git-org-academy-recent-searches";

export function DocSearch({ label, locale }: DocSearchProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [items, setItems] = useState<SearchDoc[]>([]);
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadError, setLoadError] = useState(false);
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
  const expandedTerms = useMemo(
    () => expandQueryTerms(queryTokens, locale),
    [locale, queryTokens],
  );
  const availableSections = useMemo(
    () =>
      Array.from(new Set(items.map((item) => item.section))).sort((a, b) =>
        sectionLabels[locale][a].localeCompare(sectionLabels[locale][b]),
      ),
    [items, locale],
  );

  const results = useMemo(
    () => scoreAndFilterDocs(items, normalizedQuery, expandedTerms, activeSection),
    [activeSection, expandedTerms, items, normalizedQuery],
  );
  const recentItems = useMemo(
    () =>
      recentHrefs
        .map((href) => items.find((item) => item.href === href))
        .filter((item): item is SearchDoc => Boolean(item))
        .slice(0, 5),
    [items, recentHrefs],
  );
  const quickLinkItems = useMemo(
    () => getQuickLinkItems(items, recentItems),
    [items, recentItems],
  );
  const fallbackItems = useMemo(
    () => getFallbackItems(items, normalizedQuery, expandedTerms, quickLinkItems),
    [expandedTerms, items, normalizedQuery, quickLinkItems],
  );
  const displayGroups = useMemo<SearchGroup[]>(
    () => buildDisplayGroups(results, normalizedQuery, activeSection, locale, recentItems, quickLinkItems),
    [activeSection, locale, normalizedQuery, quickLinkItems, recentItems, results],
  );
  const flatDisplayItems = useMemo(
    () => displayGroups.flatMap((group) => group.items),
    [displayGroups],
  );
  const highlightedResult =
    flatDisplayItems[Math.min(selectedIndex, Math.max(flatDisplayItems.length - 1, 0))];

  useEffect(() => {
    if (!isOpen || hasLoaded) {
      return;
    }

    const controller = new AbortController();
    let shouldIgnore = false;

    async function loadSearchItems() {
      setIsLoading(true);
      setLoadError(false);
      let timeoutId: number | undefined;

      try {
        timeoutId = window.setTimeout(() => {
          controller.abort("timeout");
        }, SEARCH_LOAD_TIMEOUT_MS);

        const response = await fetch(`/search-index-${locale}.json`, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`Failed to load search docs: ${response.status}`);
        }

        const nextItems = (await response.json()) as SearchDoc[];
        if (shouldIgnore) {
          return;
        }
        setItems(nextItems);
        setHasLoaded(true);
      } catch (error) {
        if (shouldIgnore) {
          return;
        }
        console.error(error);
        setLoadError(true);
      } finally {
        if (timeoutId) {
          window.clearTimeout(timeoutId);
        }
        if (!shouldIgnore) {
          setIsLoading(false);
        }
      }
    }

    void loadSearchItems();

    return () => {
      shouldIgnore = true;
      controller.abort("closed");
    };
  }, [hasLoaded, isOpen, locale]);

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
              {isLoading ? (
                <div className="search-empty-state">
                  <p className="search-empty">{loadingStates[locale]}</p>
                </div>
              ) : loadError ? (
                <div className="search-empty-state">
                  <p className="search-empty">{loadErrorStates[locale]}</p>
                </div>
              ) : displayGroups.length > 0 ? (
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
                            {item.suggestions.length > 0 ? (
                              <div className="search-result-suggestions">
                                {item.suggestions.map((suggestion) => (
                                  <span className={`search-suggestion search-suggestion-${suggestion.type}`} key={`${item.href}-${suggestion.type}-${suggestion.title}`}>
                                    <em>{searchSuggestionLabels[locale][suggestion.type]}</em>
                                    <span>{suggestion.title}</span>
                                  </span>
                                ))}
                              </div>
                            ) : null}
                          </div>
                          <span className="search-result-tag">
                            {sectionLabels[locale][item.section]}
                          </span>
                          <span className={`search-result-tag search-result-tier search-result-tier-${item.tier}`}>
                            {tierLabels[locale][item.tier]}
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
                              {item.suggestions.length > 0 ? (
                                <div className="search-result-suggestions">
                                  {item.suggestions.map((suggestion) => (
                                    <span className={`search-suggestion search-suggestion-${suggestion.type}`} key={`${item.href}-${suggestion.type}-${suggestion.title}`}>
                                      <em>{searchSuggestionLabels[locale][suggestion.type]}</em>
                                      <span>{suggestion.title}</span>
                                    </span>
                                  ))}
                                </div>
                              ) : null}
                            </div>
                            <span className="search-result-tag">
                              {sectionLabels[locale][item.section]}
                            </span>
                            <span className={`search-result-tag search-result-tier search-result-tier-${item.tier}`}>
                              {tierLabels[locale][item.tier]}
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
