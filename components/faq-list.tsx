"use client";

import Link from "next/link";
import { useState } from "react";

type FaqItem = {
  question: string;
  answer: string;
};

type FaqListProps = {
  items: readonly FaqItem[];
  itemLinks?: readonly string[];
  linkLabel?: string;
};

export function FaqList({ items, itemLinks, linkLabel }: FaqListProps) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="faq-list">
      {items.map((item, index) => {
        const isOpen = openIndex === index;

        return (
          <article className={`faq-item${isOpen ? " is-open" : ""}`} key={item.question}>
            <button
              className="faq-trigger"
              type="button"
              aria-expanded={isOpen}
              onClick={() => setOpenIndex(isOpen ? -1 : index)}
            >
              <span>{item.question}</span>
              <span className="faq-icon">+</span>
            </button>
            <div className="faq-body">
              <p>{item.answer}</p>
              {itemLinks?.[index] && linkLabel ? (
                <Link className="faq-link" href={itemLinks[index]}>
                  {linkLabel}
                </Link>
              ) : null}
            </div>
          </article>
        );
      })}
    </div>
  );
}
