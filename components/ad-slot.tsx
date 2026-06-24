"use client";

import { useEffect, useRef } from "react";

declare global {
  interface Window {
    adsbygoogle?: Record<string, unknown>[];
  }
}

type AdSlotProps = {
  /** AdSense data-ad-slot id from the AdSense dashboard. */
  slot: string;
  /** AdSense data-ad-format. Defaults to "auto". */
  format?: string;
  /** When true, sets data-full-width-responsive="true". */
  responsive?: boolean;
  /** Minimum reserved height (px) to avoid CLS while ad is loading. */
  minHeight?: number;
  /** Extra class names for layout. */
  className?: string;
};

/**
 * Lazy AdSense slot.
 *
 * Why this component exists:
 *   The AdSense loader (adsbygoogle.js) is now loaded with `lazyOnload` in
 *   app/layout.tsx to avoid blocking LCP/INP. That means we cannot rely on
 *   the loader being ready at mount — we have to defer the `adsbygoogle.push`
 *   call until the slot is actually about to be seen.
 *
 * Strategy:
 *   1. Render the <ins class="adsbygoogle"> shell SSR/CSR equivalent so the
 *      layout is stable (with minHeight reserving space → no CLS).
 *   2. On mount, register an IntersectionObserver with a 200px rootMargin.
 *   3. When the slot enters the lookahead window, push to adsbygoogle. If
 *      the loader hasn't arrived yet (network slow), the push is queued on
 *      the array and AdSense will fulfill it once the script loads — this is
 *      the official supported pattern.
 *   4. Disconnect the observer after first hit; each slot pushes once.
 *
 * AdSense placement is intentionally NOT auto-injected by this PR — call
 * sites decide where to put <AdSlot /> in the article body. The component
 * is the lazy-loading primitive; placement is product/UX.
 */
export function AdSlot({
  slot,
  format = "auto",
  responsive = true,
  minHeight = 280,
  className,
}: AdSlotProps) {
  const ref = useRef<HTMLModElement | null>(null);
  const pushed = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || pushed.current) return;

    const tryPush = () => {
      if (pushed.current) return;
      pushed.current = true;
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch {
        // Swallow: AdSense throws synchronously when a slot is already filled
        // or when an ad-blocker neutralized the script. Either way the slot
        // simply renders empty; nothing to recover.
      }
    };

    if (typeof IntersectionObserver === "undefined") {
      // Old browser fallback: just push immediately.
      tryPush();
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            tryPush();
            io.disconnect();
            break;
          }
        }
      },
      { rootMargin: "200px" },
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <ins
      ref={ref as React.Ref<HTMLModElement>}
      className={`adsbygoogle ${className ?? ""}`.trim()}
      style={{ display: "block", minHeight }}
      data-ad-client="ca-pub-7712476875404468"
      data-ad-slot={slot}
      data-ad-format={format}
      {...(responsive ? { "data-full-width-responsive": "true" } : {})}
    />
  );
}
