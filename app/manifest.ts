import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "GitOrg Atlas",
    short_name: "GitOrg Atlas",
    description: "学会 Git，写出更好的历史。Master Git. Build Better History.",
    start_url: "/zh",
    display: "standalone",
    background_color: "#f5f1e8",
    theme_color: "#111111",
    lang: "zh-CN",
  };
}
