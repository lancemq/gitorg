import type { MDXComponents } from "mdx/types";

import {
  CherryPickFigure,
  CommitGraphFigure,
  CommandFlowFigure,
  GitflowOverviewFigure,
  GitflowReleaseFigure,
  MergeFigure,
  PracticeLab,
  RebaseFigure,
  ReflogFigure,
  RefsHeadFigure,
  ResetFigure,
  StashFigure,
  ThreeLayersFigure,
} from "@/components/doc-figures";
import {
  MentalModelBox,
  PracticeBox,
  TipBox,
  WarningBox,
} from "@/components/doc-callouts";

const components: MDXComponents = {
  h1: () => null,
  CherryPickFigure,
  CommitGraphFigure,
  CommandFlowFigure,
  GitflowOverviewFigure,
  GitflowReleaseFigure,
  MentalModelBox,
  MergeFigure,
  PracticeLab,
  PracticeBox,
  RebaseFigure,
  ReflogFigure,
  RefsHeadFigure,
  ResetFigure,
  StashFigure,
  TipBox,
  ThreeLayersFigure,
  WarningBox,
};

export function useMDXComponents(): MDXComponents {
  return components;
}
