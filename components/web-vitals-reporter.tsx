"use client";

import { track } from "@vercel/analytics/react";
import { useReportWebVitals } from "next/web-vitals";

/**
 * Reports field Core Web Vitals to Vercel Analytics as custom events.
 *
 * Why this is needed in addition to <Analytics />:
 *   @vercel/analytics ships Speed Insights aggregates, but custom events
 *   give us per-metric breakdown (INP-by-route, LCP-by-route) once we add
 *   route labels. This component plumbs the raw metrics through; route
 *   labelling is a follow-up — see docs/perf-roadmap.md.
 *
 * Behavior:
 *   - Mounted from the root layout (app/layout.tsx) so every route reports.
 *   - Uses Vercel Analytics' typed `track()` API, which no-ops in dev and
 *     when Analytics is blocked. Browser console will not throw.
 *   - Metric values are rounded to 1 decimal to keep payload small —
 *     the difference between 195.8ms and 195.79ms is not actionable.
 */
export function WebVitalsReporter() {
  useReportWebVitals((metric) => {
    track(`web-vital-${metric.name.toLowerCase()}`, {
      value: Math.round(metric.value * 10) / 10,
      rating: metric.rating,
      id: metric.id,
      navigationType: metric.navigationType,
    });
  });
  return null;
}
