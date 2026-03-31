import type { ReactNode } from "react";

type FigureProps = {
  title: string;
  caption: string;
  children: ReactNode;
};

function FigureFrame({ title, caption, children }: FigureProps) {
  return (
    <figure className="doc-figure">
      <figcaption className="doc-figure-header">
        <strong>{title}</strong>
        <span>{caption}</span>
      </figcaption>
      <div className="doc-figure-body">{children}</div>
    </figure>
  );
}

type HistoryFigureProps = {
  title: string;
  caption: string;
  beforeLabel: string;
  afterLabel: string;
  modeLabel: string;
};

export function RebaseFigure({
  title,
  caption,
  beforeLabel,
  afterLabel,
  modeLabel,
}: HistoryFigureProps) {
  return (
    <FigureFrame title={title} caption={caption}>
      <div className="history-figure">
        <section className="history-lane">
          <div className="history-lane-header">
            <span>{beforeLabel}</span>
          </div>
          <div className="history-branches">
            <div className="history-branch">
              <span className="history-branch-name">main</span>
              <div className="history-nodes">
                <span className="history-node">A</span>
                <span className="history-node">B</span>
                <span className="history-node">C</span>
                <span className="history-node">D</span>
              </div>
            </div>
            <div className="history-branch history-branch-offset">
              <span className="history-branch-name">feature</span>
              <div className="history-nodes">
                <span className="history-node">B</span>
                <span className="history-node">E</span>
                <span className="history-node">F</span>
              </div>
            </div>
          </div>
        </section>

        <div className="history-arrow" aria-hidden="true">
          <span>{modeLabel}</span>
        </div>

        <section className="history-lane">
          <div className="history-lane-header">
            <span>{afterLabel}</span>
          </div>
          <div className="history-branches">
            <div className="history-branch">
              <span className="history-branch-name">main</span>
              <div className="history-nodes">
                <span className="history-node">A</span>
                <span className="history-node">B</span>
                <span className="history-node">C</span>
                <span className="history-node">D</span>
              </div>
            </div>
            <div className="history-branch history-branch-offset">
              <span className="history-branch-name">feature</span>
              <div className="history-nodes">
                <span className="history-node">D</span>
                <span className="history-node history-node-accent">E&#39;</span>
                <span className="history-node history-node-accent">F&#39;</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </FigureFrame>
  );
}

export function MergeFigure({
  title,
  caption,
  beforeLabel,
  afterLabel,
  modeLabel,
}: HistoryFigureProps) {
  return (
    <FigureFrame title={title} caption={caption}>
      <div className="history-figure">
        <section className="history-lane">
          <div className="history-lane-header">
            <span>{beforeLabel}</span>
          </div>
          <div className="history-branches">
            <div className="history-branch">
              <span className="history-branch-name">main</span>
              <div className="history-nodes">
                <span className="history-node">A</span>
                <span className="history-node">B</span>
                <span className="history-node">C</span>
              </div>
            </div>
            <div className="history-branch history-branch-offset">
              <span className="history-branch-name">feature</span>
              <div className="history-nodes">
                <span className="history-node">B</span>
                <span className="history-node">D</span>
                <span className="history-node">E</span>
              </div>
            </div>
          </div>
        </section>

        <div className="history-arrow" aria-hidden="true">
          <span>{modeLabel}</span>
        </div>

        <section className="history-lane">
          <div className="history-lane-header">
            <span>{afterLabel}</span>
          </div>
          <div className="history-branches">
            <div className="history-branch">
              <span className="history-branch-name">main</span>
              <div className="history-nodes">
                <span className="history-node">A</span>
                <span className="history-node">B</span>
                <span className="history-node">C</span>
                <span className="history-node">M</span>
              </div>
            </div>
            <div className="history-branch history-branch-offset">
              <span className="history-branch-name">feature</span>
              <div className="history-nodes">
                <span className="history-node">B</span>
                <span className="history-node">D</span>
                <span className="history-node">E</span>
                <span className="history-node history-node-accent">M</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </FigureFrame>
  );
}

type ResetFigureProps = {
  title: string;
  caption: string;
  layersLabel: string;
  softLabel: string;
  mixedLabel: string;
  hardLabel: string;
};

export function ResetFigure({
  title,
  caption,
  layersLabel,
  softLabel,
  mixedLabel,
  hardLabel,
}: ResetFigureProps) {
  return (
    <FigureFrame title={title} caption={caption}>
      <div className="reset-figure">
        <div className="reset-grid reset-grid-head">
          <span>{layersLabel}</span>
          <strong>{softLabel}</strong>
          <strong>{mixedLabel}</strong>
          <strong>{hardLabel}</strong>
        </div>
        <div className="reset-grid">
          <span>HEAD</span>
          <em className="reset-impact reset-impact-on">Moves</em>
          <em className="reset-impact reset-impact-on">Moves</em>
          <em className="reset-impact reset-impact-on">Moves</em>
        </div>
        <div className="reset-grid">
          <span>Index</span>
          <em className="reset-impact">Keeps</em>
          <em className="reset-impact reset-impact-on">Resets</em>
          <em className="reset-impact reset-impact-on">Resets</em>
        </div>
        <div className="reset-grid">
          <span>Worktree</span>
          <em className="reset-impact">Keeps</em>
          <em className="reset-impact">Keeps</em>
          <em className="reset-impact reset-impact-danger">Overwrites</em>
        </div>
      </div>
    </FigureFrame>
  );
}

type StashFigureProps = {
  title: string;
  caption: string;
  workingLabel: string;
  stashLabel: string;
  restoreLabel: string;
  saveLabel: string;
  applyLabel: string;
};

export function StashFigure({
  title,
  caption,
  workingLabel,
  stashLabel,
  restoreLabel,
  saveLabel,
  applyLabel,
}: StashFigureProps) {
  return (
    <FigureFrame title={title} caption={caption}>
      <div className="stash-figure">
        <div className="stash-box">
          <strong>{workingLabel}</strong>
          <span>edited files</span>
        </div>
        <div className="stash-arrow-group">
          <span className="stash-arrow-label">{saveLabel}</span>
          <div className="stash-arrow" aria-hidden="true" />
        </div>
        <div className="stash-box stash-box-accent">
          <strong>{stashLabel}</strong>
          <span>stash@{"{0}"} / stash@{"{1}"}</span>
        </div>
        <div className="stash-arrow-group">
          <span className="stash-arrow-label">{applyLabel}</span>
          <div className="stash-arrow" aria-hidden="true" />
        </div>
        <div className="stash-box">
          <strong>{restoreLabel}</strong>
          <span>resume work</span>
        </div>
      </div>
    </FigureFrame>
  );
}

type CommandFlowFigureProps = {
  title: string;
  caption: string;
  inputsLabel: string;
  inputs: string;
  commandLabel: string;
  outputsLabel: string;
  outputs: string;
  note: string;
};

function splitItems(value: string) {
  return value
    .split("|")
    .map((item) => item.trim())
    .filter(Boolean);
}

export function CommandFlowFigure({
  title,
  caption,
  inputsLabel,
  inputs,
  commandLabel,
  outputsLabel,
  outputs,
  note,
}: CommandFlowFigureProps) {
  const inputItems = splitItems(inputs);
  const outputItems = splitItems(outputs);

  return (
    <FigureFrame title={title} caption={caption}>
      <div className="command-flow-figure">
        <section className="command-flow-card">
          <span className="command-flow-label">{inputsLabel}</span>
          <div className="command-flow-items">
            {inputItems.map((item) => (
              <span className="command-flow-item" key={item}>
                {item}
              </span>
            ))}
          </div>
        </section>

        <div className="command-flow-center" aria-hidden="true">
          <span className="command-flow-arrow">→</span>
          <strong>{commandLabel}</strong>
        </div>

        <section className="command-flow-card">
          <span className="command-flow-label">{outputsLabel}</span>
          <div className="command-flow-items">
            {outputItems.map((item) => (
              <span className="command-flow-item command-flow-item-accent" key={item}>
                {item}
              </span>
            ))}
          </div>
        </section>
      </div>

      <div className="command-flow-note">
        <span>{note}</span>
      </div>
    </FigureFrame>
  );
}
