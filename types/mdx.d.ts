declare module "*.mdx" {
  import type { ComponentType } from "react";

  const MDXComponent: ComponentType;

  export const metadata: {
    title: string;
    slug: string;
    locale: "zh" | "en";
    section:
      | "learning-path"
      | "commands"
      | "workflows"
      | "recovery"
      | "concepts";
    summary: string;
    sourceUrls: string[];
  };

  export default MDXComponent;
}
