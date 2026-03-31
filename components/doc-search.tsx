"use client";

import Link from "next/link";
import {
  useDeferredValue,
  useEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";
import { usePathname } from "next/navigation";

import type { SearchDoc } from "@/lib/content";
import type { Locale } from "@/lib/i18n";

type DocSearchProps = {
  items: SearchDoc[];
  label: string;
  locale: Locale;
};

const sectionLabels: Record<
  Locale,
  Record<SearchDoc["section"], string>
> = {
  zh: {
    "learning-path": "学习路径",
    commands: "命令专题",
    workflows: "工作流",
    recovery: "恢复手册",
    concepts: "核心概念",
  },
  en: {
    "learning-path": "Learning Path",
    commands: "Commands",
    workflows: "Workflows",
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

export function DocSearch({ items, label, locale }: DocSearchProps) {
  const pathname = usePathname();
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const deferredQuery = useDeferredValue(query);
  const normalizedQuery = deferredQuery.trim().toLowerCase();

  const results = useMemo(() => {
    if (!normalizedQuery) {
      return items.slice(0, 6);
    }

    return items
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
  }, [items, normalizedQuery]);

  useEffect(() => {
    setIsOpen(false);
    setQuery("");
  }, [pathname]);

  useEffect(() => {
    function handlePointerDown(event: MouseEvent) {
      if (!containerRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    function handleKeyDown(event: globalThis.KeyboardEvent) {
      const triggerShortcut =
        (event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k";

      if (triggerShortcut) {
        event.preventDefault();
        inputRef.current?.focus();
        setIsOpen(true);
      }

      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  function handleKeyUp(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      containerRef.current
        ?.querySelector<HTMLAnchorElement>(".search-result")
        ?.focus();
    }
  }

  return (
    <div className={`doc-search${isOpen ? " is-open" : ""}`} ref={containerRef}>
      <label className="search-box" htmlFor={`doc-search-${locale}`}>
        <span>{label}</span>
        <kbd>⌘K</kbd>
      </label>

      <input
        aria-controls={`doc-search-results-${locale}`}
        aria-expanded={isOpen}
        className="search-input"
        id={`doc-search-${locale}`}
        onChange={(event) => setQuery(event.target.value)}
        onFocus={() => setIsOpen(true)}
        onKeyDown={handleKeyUp}
        placeholder={locale === "zh" ? "输入命令或主题" : "Type a command or topic"}
        ref={inputRef}
        type="search"
        value={query}
      />

      {isOpen ? (
        <div
          className="search-results"
          id={`doc-search-results-${locale}`}
          role="listbox"
          aria-label={shortcutLabels[locale]}
        >
          {results.length > 0 ? (
            results.map((item) => (
              <Link
                className={`search-result${pathname === item.href ? " is-active" : ""}`}
                href={item.href}
                key={item.href}
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
      ) : null}
    </div>
  );
}
