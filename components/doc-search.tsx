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

export function DocSearch({ items, label, locale }: DocSearchProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<SearchDoc["section"] | "all">("all");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const deferredQuery = useDeferredValue(query);
  const normalizedQuery = deferredQuery.trim().toLowerCase();
  const availableSections = useMemo(
    () =>
      Array.from(new Set(items.map((item) => item.section))).sort((a, b) =>
        sectionLabels[locale][a].localeCompare(sectionLabels[locale][b]),
      ),
    [items, locale],
  );

  const results = useMemo(() => {
    const scopedItems =
      activeSection === "all"
        ? items
        : items.filter((item) => item.section === activeSection);

    if (!normalizedQuery) {
      return scopedItems.slice(0, 8);
    }

    return scopedItems
      .map((item) => {
        const haystack = [item.title, item.summary, item.slug, item.path]
          .join(" ")
          .toLowerCase();
        const titleHit = item.title.toLowerCase().includes(normalizedQuery);
        const slugHit = item.slug.toLowerCase().includes(normalizedQuery);
        const pathHit = item.path.toLowerCase().includes(normalizedQuery);
        const summaryHit = item.summary.toLowerCase().includes(normalizedQuery);
        const score =
          (titleHit ? 4 : 0) +
          (slugHit ? 3 : 0) +
          (pathHit ? 2 : 0) +
          (summaryHit ? 1 : 0) +
          (haystack.startsWith(normalizedQuery) ? 1 : 0);

        return { ...item, score };
      })
      .filter((item) => item.score > 0)
      .sort((a, b) => b.score - a.score || a.title.localeCompare(b.title))
      .slice(0, 8);
  }, [activeSection, items, normalizedQuery]);
  const highlightedResult = results[Math.min(selectedIndex, Math.max(results.length - 1, 0))];

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
    if (!results.length) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
      return;
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();
      setSelectedIndex((current) => (current + 1) % results.length);
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      setSelectedIndex((current) => (current - 1 + results.length) % results.length);
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
            </div>

            <div
              className="search-results"
              id={`doc-search-results-${locale}`}
              role="listbox"
              aria-label={shortcutLabels[locale]}
            >
              {results.length > 0 ? (
                results.map((item) => (
                  <Link
                    className={`search-result${pathname === item.href ? " is-active" : ""}${
                      highlightedResult?.href === item.href ? " is-selected" : ""
                    }`}
                    href={item.href}
                    key={item.href}
                    onMouseEnter={() =>
                      setSelectedIndex(results.findIndex((result) => result.href === item.href))
                    }
                    onClick={() => setIsOpen(false)}
                  >
                    <div className="search-result-copy">
                      <strong>{item.title}</strong>
                      <p>{item.summary}</p>
                    </div>
                    <span className="search-result-tag">
                      {sectionLabels[locale][item.section]}
                    </span>
                  </Link>
                ))
              ) : (
                <p className="search-empty">{emptyStates[locale]}</p>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
