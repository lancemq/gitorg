import createMDX from "@next/mdx";
import path from "node:path";
import remarkGfm from "remark-gfm";

const withMDX = createMDX({
  extension: /\.(md|mdx)$/,
  options: {
    remarkPlugins: [remarkGfm],
  },
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  outputFileTracingRoot: path.resolve(process.cwd()),
  async headers() {
    return [
      {
        source: "/zh/:path*",
        headers: [
          {
            key: "Content-Language",
            value: "zh-CN",
          },
        ],
      },
      {
        source: "/en/:path*",
        headers: [
          {
            key: "Content-Language",
            value: "en",
          },
        ],
      },
    ];
  },
};

export default withMDX(nextConfig);
