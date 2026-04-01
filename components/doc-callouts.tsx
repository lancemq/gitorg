import type { ReactNode } from "react";

type CalloutProps = {
  title: string;
  children: ReactNode;
};

function CalloutFrame({
  title,
  children,
  variant,
  icon,
}: CalloutProps & {
  variant: "tip" | "warning" | "mental-model" | "practice";
  icon: string;
}) {
  return (
    <section className={`doc-callout doc-callout-${variant}`}>
      <header className="doc-callout-header">
        <span className="doc-callout-icon" aria-hidden="true">
          {icon}
        </span>
        <strong>{title}</strong>
      </header>
      <div className="doc-callout-body">{children}</div>
    </section>
  );
}

export function TipBox({ title, children }: CalloutProps) {
  return (
    <CalloutFrame title={title} variant="tip" icon="↗">
      {children}
    </CalloutFrame>
  );
}

export function WarningBox({ title, children }: CalloutProps) {
  return (
    <CalloutFrame title={title} variant="warning" icon="!">
      {children}
    </CalloutFrame>
  );
}

export function MentalModelBox({ title, children }: CalloutProps) {
  return (
    <CalloutFrame title={title} variant="mental-model" icon="◉">
      {children}
    </CalloutFrame>
  );
}

export function PracticeBox({ title, children }: CalloutProps) {
  return (
    <CalloutFrame title={title} variant="practice" icon="→">
      {children}
    </CalloutFrame>
  );
}
