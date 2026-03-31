import type { MDXComponents } from "mdx/types";

import {
  MergeFigure,
  RebaseFigure,
  ResetFigure,
  StashFigure,
} from "@/components/doc-figures";

const components: MDXComponents = {
  h1: () => null,
  MergeFigure,
  RebaseFigure,
  ResetFigure,
  StashFigure,
};

export function useMDXComponents(): MDXComponents {
  return components;
}
