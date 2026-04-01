# Git Org Academy 信息架构说明

## 1. 架构目标

网站采用“总览页 + 频道页 + 详情页”的三层结构。

目标是：

- 首页负责导览
- 频道页负责聚合
- 详情页负责完整阅读

## 2. 路由结构

### 2.1 语言层

- 中文：`/zh`
- 英文：`/en`

所有频道和详情页都在语言路由下展开。

### 2.2 首页

- `/zh`
- `/en`

首页承担：

- slogan 展示
- 频道入口
- 快速开始引导
- FAQ 摘要

### 2.3 频道页

- `/{lang}/commands`
- `/{lang}/best-practices`
- `/{lang}/workflows`
- `/{lang}/internals`
- `/{lang}/learning-path`
- `/{lang}/faq`
- `/{lang}/history`

### 2.4 详情页

- 命令：`/{lang}/commands/{slug}`
- 最佳实践：`/{lang}/best-practices/{slug}`
- 工作流：`/{lang}/workflows/{slug}`
- 原理：`/{lang}/internals/{slug}`
- 学习路径详情：`/{lang}/docs/learning-path/{slug}`
- 概念页：`/{lang}/history`

## 3. 左侧导航结构

左侧导航使用统一组件渲染，当前原则是：

- 首页和非首页共用同一套菜单体系
- 菜单强调频道入口，不在侧边栏平铺所有二级主题
- 详情页通过当前路径高亮频道入口

### 3.1 当前一级分组

- Overview
- Learning Path
- Concepts
- Resources

### 3.2 Learning Path 分组

当前包含：

- Quick Start
- Best Practices
- Workflows
- Git Commands

### 3.3 Concepts 分组

当前包含：

- Git History
- Git Internals

### 3.4 Resources 分组

当前包含：

- FAQ

## 4. 搜索架构

搜索是全局弹层，不放在左侧栏中。

### 4.1 搜索入口

- 页面右上角快捷按钮
- `Cmd/Ctrl + K`

### 4.2 搜索能力

- 全站内容检索
- 分类筛选
- 键盘上下选择
- 回车跳转
- 最近访问
- 常用入口
- 按频道分组展示结果

### 4.3 搜索范围

搜索基于内容源索引，覆盖：

- Learning Path
- Commands
- Best Practices
- Workflows
- Internals
- Concepts
- Recovery

## 5. 内容分层

### 5.1 频道层

用于建立主题感和导航感。

频道层内容要回答：

- 这个频道解决什么问题
- 用户应该从哪里开始
- 先看哪几篇

### 5.2 详情层

用于完整承载内容。

详情页需要统一具备：

- 面包屑
- 标题与摘要
- MDX 正文
- 相关推荐
- 上一篇 / 下一篇

## 6. 面包屑规则

当前面包屑遵循：

- 频道详情页：`总览 > 频道 > 当前页`
- 特殊概念页：`总览 > 当前页`

例如：

- `总览 > 工作流 > 详情页标题`
- `总览 > Git 命令 > git rebase 教程`
- `总览 > Git 历史`

## 7. 内容索引原则

内容索引基于 `lib/content.ts` 统一维护。

索引必须承担：

- 内容路径注册
- 跳转地址生成
- 搜索结果生成
- 上一篇 / 下一篇
- 相关推荐
- 频道精选内容

## 8. 后续架构方向

后续可以继续演进：

- 增加自动内容索引，而不是手工注册
- 为频道建立更明确的内容 schema
- 为搜索补更细的排序规则
- 为频道和详情页增加学习路径关系图
