import type { MDXComponents } from "mdx/types";

import {
  CherryPickFigure,
  CommitGraphFigure,
  CommandFlowFigure,
  MergeFigure,
  PracticeLab,
  RebaseFigure,
  ReflogFigure,
  RefsHeadFigure,
  ResetFigure,
  StashFigure,
  ThreeLayersFigure,
} from "@/components/doc-figures";

const components: MDXComponents = {
  h1: () => null,
  CherryPickFigure,
  CommitGraphFigure,
  CommandFlowFigure,
  MergeFigure,
  PracticeLab,
  RebaseFigure,
  ReflogFigure,
  RefsHeadFigure,
  ResetFigure,
  StashFigure,
  ThreeLayersFigure,
};

export function useMDXComponents(): MDXComponents {
  return components;
}
