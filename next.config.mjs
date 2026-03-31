import createMDX from "@next/mdx";
import path from "node:path";

const withMDX = createMDX({
  extension: /\.(md|mdx)$/,
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  outputFileTracingRoot: path.join(process.cwd(), ".."),
};

export default withMDX(nextConfig);
