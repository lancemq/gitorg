import type { MDXComponents } from "mdx/types";

import {
  CommandFlowFigure,
  MergeFigure,
  RebaseFigure,
  ResetFigure,
  StashFigure,
} from "@/components/doc-figures";

const components: MDXComponents = {
  h1: () => null,
  CommandFlowFigure,
  MergeFigure,
  RebaseFigure,
  ResetFigure,
  StashFigure,
};

export function useMDXComponents(): MDXComponents {
  return components;
}
