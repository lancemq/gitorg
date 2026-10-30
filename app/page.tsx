import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "GitOrg Atlas",
  alternates: { canonical: "/zh" },
  // 秒级跳转中文站；页面本身保留真实 HTML（百度统计安装检测抓首页源码）
  other: { refresh: "0;url=/zh" },
};

// 根路径保持一个真实 HTML 页面（而非裸 308）：
// 百度统计安装检测抓取首页源码时必须能看到统计代码（layout 中已全站注入）。
// 用户被 meta refresh + JS 瞬间引导至 /zh。
export default function RootPage() {
  return (
    <script dangerouslySetInnerHTML={{ __html: 'location.replace("/zh");' }} />
  );
}
