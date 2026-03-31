# Git Org Academy

基于 `gitorg.pen` 设计稿重构的 Next.js 文档站，使用 App Router、TypeScript，并内建中英文双语架构。

## 目录结构

- `app/` 页面、语言路由与全局样式
- `components/` 可复用 UI 组件
- `lib/i18n.ts` 双语内容、菜单与命令文档字典
- `gitorg.pen` 原始 Pencil 设计稿

## 启动

先安装依赖：

```bash
npm install
```

然后启动开发环境：

```bash
npm run dev
```

默认访问 `http://localhost:3000`。

## 当前语言路由

- 中文首页：`/zh`
- 英文首页：`/en`
- 中文命令页：`/zh/commands/git-rebase`
- 英文命令页：`/en/commands/git-rebase`

根路径 `/` 会自动跳转到默认语言 `zh`。
