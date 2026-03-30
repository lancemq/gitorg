import type { MDXComponents } from "mdx/types";

const components: MDXComponents = {
  h1: () => null,
};

export function useMDXComponents(): MDXComponents {
  return components;
}
