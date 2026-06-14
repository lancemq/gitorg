import createMDX from "@next/mdx";
import path from "node:path";

const withMDX = createMDX({
  extension: /\.(md|mdx)$/,
  options: {
    remarkPlugins: ["remark-gfm"],
  },
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  outputFileTracingRoot: path.resolve(process.cwd()),
  async redirects() {
    const sections = [
      { from: "github", to: "platforms" },
      { from: "gitlab", to: "platforms" },
      { from: "ci-cd", to: "devops" },
      { from: "ide", to: "devops" },
    ];
    const locales = ["zh", "en"];
    return sections.flatMap(({ from, to }) =>
      locales.flatMap((lang) => [
        {
          source: `/${lang}/${from}`,
          destination: `/${lang}/${to}`,
          permanent: true,
        },
        {
          source: `/${lang}/${from}/:slug`,
          destination: `/${lang}/${to}/:slug`,
          permanent: true,
        },
      ]),
    );
  },
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
