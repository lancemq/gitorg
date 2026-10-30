import { permanentRedirect } from "next/navigation";

// 站点入口默认进入中文站（语言可通过侧边栏切换器手动切换）。
export default function RootPage() {
  permanentRedirect("/zh");
}
