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

type GitflowOverviewFigureProps = {
  title: string;
  caption: string;
  releaseLabel: string;
  integrationLabel: string;
  featureLabel: string;
  releaseBranchLabel: string;
  hotfixLabel: string;
};

export function GitflowOverviewFigure({
  title,
  caption,
  releaseLabel,
  integrationLabel,
  featureLabel,
  releaseBranchLabel,
  hotfixLabel,
}: GitflowOverviewFigureProps) {
  return (
    <FigureFrame title={title} caption={caption}>
      <div className="gitflow-figure">
        <section className="gitflow-lane gitflow-lane-main">
          <div className="gitflow-lane-header">
            <span>{releaseLabel}</span>
            <strong>main</strong>
          </div>
          <div className="history-nodes">
            <span className="history-node">1.9</span>
            <span className="history-node">2.0</span>
            <span className="history-node">2.1</span>
          </div>
        </section>

        <section className="gitflow-lane gitflow-lane-develop">
          <div className="gitflow-lane-header">
            <span>{integrationLabel}</span>
            <strong>develop</strong>
          </div>
          <div className="history-nodes">
            <span className="history-node">D1</span>
            <span className="history-node">D2</span>
            <span className="history-node">D3</span>
            <span className="history-node history-node-accent">D4</span>
          </div>
        </section>

        <div className="gitflow-support-grid">
          <section className="gitflow-support-card">
            <span className="gitflow-support-label">{featureLabel}</span>
            <div className="history-nodes">
              <span className="history-node">F1</span>
              <span className="history-node">F2</span>
            </div>
          </section>
          <section className="gitflow-support-card">
            <span className="gitflow-support-label">{releaseBranchLabel}</span>
            <div className="history-nodes">
              <span className="history-node">R1</span>
              <span className="history-node history-node-accent">R2</span>
            </div>
          </section>
          <section className="gitflow-support-card gitflow-support-card-hotfix">
            <span className="gitflow-support-label">{hotfixLabel}</span>
            <div className="history-nodes">
              <span className="history-node history-node-accent">H1</span>
            </div>
          </section>
        </div>
      </div>
    </FigureFrame>
  );
}

type GitflowReleaseFigureProps = {
  title: string;
  caption: string;
  startLabel: string;
  releasePrepLabel: string;
  releaseBackmergeLabel: string;
  hotfixBackmergeLabel: string;
};

export function GitflowReleaseFigure({
  title,
  caption,
  startLabel,
  releasePrepLabel,
  releaseBackmergeLabel,
  hotfixBackmergeLabel,
}: GitflowReleaseFigureProps) {
  return (
    <FigureFrame title={title} caption={caption}>
      <div className="gitflow-release-figure">
        <section className="gitflow-release-column">
          <span className="gitflow-support-label">{startLabel}</span>
          <div className="gitflow-release-card">
            <strong>main</strong>
            <div className="history-nodes">
              <span className="history-node">2.0</span>
              <span className="history-node">2.1</span>
            </div>
          </div>
          <div className="gitflow-release-card gitflow-release-card-soft">
            <strong>develop</strong>
            <div className="history-nodes">
              <span className="history-node">D1</span>
              <span className="history-node">D2</span>
              <span className="history-node">D3</span>
            </div>
          </div>
        </section>

        <div className="gitflow-release-arrow-stack" aria-hidden="true">
          <span className="history-arrow">{releasePrepLabel}</span>
          <span className="history-arrow">{releaseBackmergeLabel}</span>
          <span className="history-arrow">{hotfixBackmergeLabel}</span>
        </div>

        <section className="gitflow-release-column">
          <span className="gitflow-support-label">release / hotfix</span>
          <div className="gitflow-release-card">
            <strong>release/2.2.0</strong>
            <div className="history-nodes">
              <span className="history-node">R1</span>
              <span className="history-node history-node-accent">R2</span>
            </div>
          </div>
          <div className="gitflow-release-card gitflow-release-card-hotfix">
            <strong>hotfix/login-timeout</strong>
            <div className="history-nodes">
              <span className="history-node history-node-accent">H1</span>
            </div>
          </div>
        </section>
      </div>
    </FigureFrame>
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

type ReflogFigureProps = {
  title: string;
  caption: string;
  historyLabel: string;
  rescueLabel: string;
  nowLabel: string;
};

export function ReflogFigure({
  title,
  caption,
  historyLabel,
  rescueLabel,
  nowLabel,
}: ReflogFigureProps) {
  return (
    <FigureFrame title={title} caption={caption}>
      <div className="reflog-figure">
        <div className="reflog-track">
          <span className="reflog-label">{historyLabel}</span>
          <div className="reflog-nodes">
            <span className="reflog-node">HEAD@{"{3}"}</span>
            <span className="reflog-node">HEAD@{"{2}"}</span>
            <span className="reflog-node">HEAD@{"{1}"}</span>
            <span className="reflog-node reflog-node-current">{nowLabel}</span>
          </div>
        </div>
        <div className="reflog-branch-row">
          <span className="reflog-branch-label">{rescueLabel}</span>
          <div className="reflog-branch-pill">rescue/recover</div>
        </div>
      </div>
    </FigureFrame>
  );
}

type CherryPickFigureProps = {
  title: string;
  caption: string;
  sourceLabel: string;
  targetLabel: string;
  transferLabel: string;
};

export function CherryPickFigure({
  title,
  caption,
  sourceLabel,
  targetLabel,
  transferLabel,
}: CherryPickFigureProps) {
  return (
    <FigureFrame title={title} caption={caption}>
      <div className="history-figure">
        <section className="history-lane">
          <div className="history-lane-header">
            <span>{sourceLabel}</span>
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
                <span className="history-node history-node-accent">E</span>
              </div>
            </div>
          </div>
        </section>

        <div className="history-arrow" aria-hidden="true">
          <span>{transferLabel}</span>
        </div>

        <section className="history-lane">
          <div className="history-lane-header">
            <span>{targetLabel}</span>
          </div>
          <div className="history-branches">
            <div className="history-branch">
              <span className="history-branch-name">release</span>
              <div className="history-nodes">
                <span className="history-node">A</span>
                <span className="history-node">R1</span>
                <span className="history-node history-node-accent">E&#39;</span>
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

type CommitGraphFigureProps = {
  title: string;
  caption: string;
  linearLabel: string;
  mergeLabel: string;
  rewriteLabel: string;
  pointerLabel: string;
};

export function CommitGraphFigure({
  title,
  caption,
  linearLabel,
  mergeLabel,
  rewriteLabel,
  pointerLabel,
}: CommitGraphFigureProps) {
  return (
    <FigureFrame title={title} caption={caption}>
      <div className="commit-graph-figure">
        <section className="commit-graph-card">
          <span className="commit-graph-label">{linearLabel}</span>
          <div className="commit-graph-track">
            <span className="history-node">A</span>
            <span className="history-node">B</span>
            <span className="history-node">C</span>
            <span className="history-node">D</span>
          </div>
          <div className="commit-graph-pointer-row">
            <span className="commit-graph-pointer">{pointerLabel}: main</span>
          </div>
        </section>

        <section className="commit-graph-card">
          <span className="commit-graph-label">{mergeLabel}</span>
          <div className="commit-graph-merge">
            <div className="commit-graph-track">
              <span className="history-node">A</span>
              <span className="history-node">B</span>
              <span className="history-node">C</span>
              <span className="history-node history-node-accent">M</span>
            </div>
            <div className="commit-graph-branch">
              <span className="history-node">B</span>
              <span className="history-node">E</span>
              <span className="history-node">F</span>
            </div>
          </div>
        </section>

        <section className="commit-graph-card">
          <span className="commit-graph-label">{rewriteLabel}</span>
          <div className="commit-graph-track">
            <span className="history-node">A</span>
            <span className="history-node">B</span>
            <span className="history-node">C</span>
            <span className="history-node history-node-accent">E&#39;</span>
            <span className="history-node history-node-accent">F&#39;</span>
          </div>
          <div className="commit-graph-pointer-row">
            <span className="commit-graph-pointer">{pointerLabel}: feature</span>
          </div>
        </section>
      </div>
    </FigureFrame>
  );
}

type RefsHeadFigureProps = {
  title: string;
  caption: string;
  headLabel: string;
  branchLabel: string;
  tagLabel: string;
  remoteLabel: string;
  detachedLabel: string;
};

export function RefsHeadFigure({
  title,
  caption,
  headLabel,
  branchLabel,
  tagLabel,
  remoteLabel,
  detachedLabel,
}: RefsHeadFigureProps) {
  return (
    <FigureFrame title={title} caption={caption}>
      <div className="refs-figure">
        <div className="refs-column">
          <span className="refs-column-label">{headLabel}</span>
          <div className="refs-pill refs-pill-accent">HEAD -&gt; refs/heads/feature/login</div>
          <div className="refs-pill">{branchLabel}: feature/login -&gt; F</div>
          <div className="refs-pill">{remoteLabel}: origin/main -&gt; D</div>
          <div className="refs-pill">{tagLabel}: v2.0.0 -&gt; D</div>
        </div>
        <div className="refs-divider" aria-hidden="true">
          →
        </div>
        <div className="refs-column">
          <span className="refs-column-label">{detachedLabel}</span>
          <div className="refs-pill refs-pill-warning">HEAD -&gt; F</div>
          <div className="refs-track">
            <span className="history-node">D</span>
            <span className="history-node history-node-accent">F</span>
            <span className="history-node">G</span>
          </div>
        </div>
      </div>
    </FigureFrame>
  );
}

type ThreeLayersFigureProps = {
  title: string;
  caption: string;
  worktreeLabel: string;
  indexLabel: string;
  objectsLabel: string;
  addLabel: string;
  commitLabel: string;
  restoreLabel: string;
};

export function ThreeLayersFigure({
  title,
  caption,
  worktreeLabel,
  indexLabel,
  objectsLabel,
  addLabel,
  commitLabel,
  restoreLabel,
}: ThreeLayersFigureProps) {
  return (
    <FigureFrame title={title} caption={caption}>
      <div className="layers-figure">
        <section className="layers-card">
          <span className="layers-card-label">{worktreeLabel}</span>
          <strong>checkout.ts</strong>
          <span>edited and visible on disk</span>
        </section>
        <div className="layers-arrow-stack" aria-hidden="true">
          <span>{addLabel}</span>
          <div className="layers-arrow" />
          <span>{restoreLabel}</span>
        </div>
        <section className="layers-card">
          <span className="layers-card-label">{indexLabel}</span>
          <strong>next snapshot</strong>
          <span>staged content for the next commit</span>
        </section>
        <div className="layers-arrow-stack" aria-hidden="true">
          <span>{commitLabel}</span>
          <div className="layers-arrow" />
        </div>
        <section className="layers-card layers-card-accent">
          <span className="layers-card-label">{objectsLabel}</span>
          <strong>blob / tree / commit</strong>
          <span>durable history recorded by Git</span>
        </section>
      </div>
    </FigureFrame>
  );
}

type PracticeLabProps = {
  title: string;
  intro: string;
  setupLabel: string;
  setup: string;
  stepsLabel: string;
  steps: string;
  outcomesLabel: string;
  outcomes: string;
  mistakesLabel: string;
  mistakes: string;
};

export function PracticeLab({
  title,
  intro,
  setupLabel,
  setup,
  stepsLabel,
  steps,
  outcomesLabel,
  outcomes,
  mistakesLabel,
  mistakes,
}: PracticeLabProps) {
  const stepItems = splitItems(steps);
  const outcomeItems = splitItems(outcomes);
  const mistakeItems = splitItems(mistakes);

  return (
    <section className="practice-lab">
      <header className="practice-lab-header">
        <strong>{title}</strong>
        <p>{intro}</p>
      </header>

      <div className="practice-lab-grid">
        <section className="practice-lab-card">
          <span className="practice-lab-label">{setupLabel}</span>
          <pre>{setup}</pre>
          <span className="practice-lab-label">{stepsLabel}</span>
          <ol>
            {stepItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ol>
        </section>

        <section className="practice-lab-card">
          <span className="practice-lab-label">{outcomesLabel}</span>
          <ul>
            {outcomeItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="practice-lab-card practice-lab-card-warning">
          <span className="practice-lab-label">{mistakesLabel}</span>
          <ul>
            {mistakeItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      </div>
    </section>
  );
}
