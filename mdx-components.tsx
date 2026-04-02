import type { MDXComponents } from "mdx/types";

import {
  CherryPickFigure,
  CommitGraphFigure,
  CommandFlowFigure,
  GitflowOverviewFigure,
  GitflowReleaseFigure,
  MergeFigure,
  PlumbingPorcelainFigure,
  PlatformHierarchyFigure,
  PracticeLab,
  RebaseFigure,
  ReflogFigure,
  RepositoryLayoutFigure,
  RefsHeadFigure,
  ResetFigure,
  RevisionRangeFigure,
  StashFigure,
  TransferNegotiationFigure,
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
  PlumbingPorcelainFigure,
  PlatformHierarchyFigure,
  PracticeLab,
  PracticeBox,
  RebaseFigure,
  ReflogFigure,
  RepositoryLayoutFigure,
  RefsHeadFigure,
  ResetFigure,
  RevisionRangeFigure,
  StashFigure,
  TipBox,
  TransferNegotiationFigure,
  ThreeLayersFigure,
  WarningBox,
};

export function useMDXComponents(): MDXComponents {
  return components;
}
