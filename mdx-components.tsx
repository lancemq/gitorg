import type { MDXComponents } from "mdx/types";

import {
  CherryPickFigure,
  CommandFlowFigure,
  MergeFigure,
  RebaseFigure,
  ReflogFigure,
  ResetFigure,
  StashFigure,
} from "@/components/doc-figures";

const components: MDXComponents = {
  h1: () => null,
  CherryPickFigure,
  CommandFlowFigure,
  MergeFigure,
  RebaseFigure,
  ReflogFigure,
  ResetFigure,
  StashFigure,
};

export function useMDXComponents(): MDXComponents {
  return components;
}
