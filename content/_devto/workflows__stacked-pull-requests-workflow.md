---
title: Stacked Pull Requests Workflow
published: false
description: Split a large change into dependency-ordered PR layers to improve review throughput and reduce oversized review fatigue.
canonical_url: https://gitorg.xyz/en/workflows/stacked-pull-requests-workflow
tags: git, tutorial, beginners
---
# Stacked Pull Requests Workflow

## What you will learn

- Understand the core purpose of Stacked Pull Requests Workflow
- Master the basic usage and common options of Stacked Pull Requests Workflow
- Split a large change into dependency-ordered PR layers to improve review throughput and reduce oversized review fatigue.
- Understand key concepts: Where this fits best
- Know when to use this feature and when to avoid it


A stacked PR workflow breaks one large initiative into smaller, dependency-ordered pull requests instead of one giant review unit.

<CommandFlowFigure
  title="How stacked PRs are structured"
  caption="Each layer has one clear purpose. As lower layers merge, upper layers shrink naturally, making later reviews faster and cleaner."
  inputsLabel="Inputs"
  inputs="one large initiative|dependency-aware decomposition|consistent branch naming"
  commandLabel="base branch → stack branches → merge in order"
  outputsLabel="Outputs"
  outputs="smaller review units|higher review throughput|lower rework cost"
  note="The point is review throughput and clarity, not branch-count vanity."
/>


## Start with a problem

Your team is collaborating on a project, branches are growing, merges are becoming more frequent — but there's no stable collaboration rhythm. Everyone syncs code their own way, and conflicts are piling up.

## Where this fits best

- a large feature can be sliced into ordered sub-problems
- review bandwidth is limited and giant PRs stall frequently
- you want foundational changes merged early to reduce conflict in top layers

## How to split effectively

Prefer dependency-oriented layers, not arbitrary folder-based slicing:

1. foundation layer (types, interfaces, utilities)
2. behavior layer (core business logic)
3. presentation layer (UI states, copy, final polish)

## Minimal operating flow

```bash
git switch main
git switch -c stack/auth-base
# commit foundational changes

git switch -c stack/auth-service
# continue on top of auth-base

git switch -c stack/auth-ui
# continue on top of auth-service
```

Now open PRs for each layer and explicitly declare dependencies.

## Keeping the stack healthy

When lower branches move, rebase upper layers promptly:

```bash
git switch stack/auth-service
git rebase stack/auth-base

git switch stack/auth-ui
git rebase stack/auth-service
```

Use `git range-diff` before merge to verify what changed between revisions:

```bash
git range-diff origin/main...stack/auth-service@{1} origin/main...stack/auth-service
```

## Review collaboration guidelines

- Every PR description should state dependency order.
- Reviewers should start from the bottom layer.
- Upper-layer PRs should describe only incremental delta, not repeat base context.

<WarningBox title="Do not turn stacked PRs into duplicated diff chains">
  If layer boundaries are blurry, stack complexity just spreads across multiple pages. Define each layer’s single responsibility before creating branches.
</WarningBox>

## Common mistakes

### Mistake 1: more layers always means better structure

Too many layers create maintenance overhead. Two to five layers are usually a practical range.

### Mistake 2: upper layers can drift indefinitely

The longer upper layers wait to sync, the larger final conflict risk becomes.

### Mistake 3: merge order is optional

Dependency order is mandatory; out-of-order merges create missing-base or duplicated-change states.

<PracticeBox title="Convert one large PR into a 3-layer stack">
  1. Take a recent large PR and identify foundation, behavior, and UI layers.
  2. Write one sentence for each layer’s standalone value.
  3. Confirm each layer can pass CI independently.
  4. Use `range-diff` to validate boundaries between revisions.
</PracticeBox>

## Good follow-up reads

1. `Prepare commits before pull request`
2. `Small batch review`
3. `git-range-diff`

## Try it yourself

1. Practice the stacked-pull-requests-workflow command in a test repository and observe state changes before and after
2. Experiment with different options and compare the output differences
3. Simulate a real scenario where you would need to use this, and walk through the full process
