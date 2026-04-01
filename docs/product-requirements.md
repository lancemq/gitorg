# GitOrg Atlas 产品需求文档

## 1. 产品定位

GitOrg Atlas 是一个面向真实开发协作场景的 Git 学习与参考网站。

产品不是单纯的命令速查表，而是同时覆盖以下三类需求：

- 上手需求：帮助初学者理解 Git 的基本使用路径
- 协作需求：帮助团队成员处理常见工作流、分支协作、回移、发布与冲突
- 原理需求：帮助进阶用户理解 Git 的对象模型、引用系统和历史结构

## 2. 产品目标

网站的核心目标是：

- 让用户能按学习路径理解 Git，而不是零散记忆命令
- 让高频 Git 风险操作具备可解释性和恢复意识
- 让命令、工作流、最佳实践、原理四类内容形成互相支撑的学习闭环
- 通过双语能力服务中文和英文用户
- 把内容沉淀为可持续维护的 MDX 内容库

## 3. 目标用户

### 3.1 初学开发者

需要快速理解：

- 仓库初始化与克隆
- 工作区、暂存区、提交历史
- fetch、pull、push 的区别
- 分支切换与基础协作

### 3.2 协作中的开发者

需要解决：

- rebase / merge / cherry-pick 的选择
- 回滚与恢复
- PR 前整理提交
- 长期分支维护和回移修复

### 3.3 进阶用户与技术负责人

需要关注：

- Git internals 的解释性内容
- 团队级最佳实践
- 更完整的命令专题
- 内容站结构和知识体系化组织

## 4. 核心功能范围

### 4.1 已有核心能力

- 双语路由：`/zh` 与 `/en`
- 统一侧边导航
- 全局搜索弹层
- MDX 内容源
- 频道聚合页
- 详情页模板
- FAQ 独立页面
- Git 命令频道
- Best Practices 频道
- Workflows 频道
- Git Internals 频道

### 4.2 功能要求

- 所有教程必须支持中英文两套内容
- 内容必须可由 MDX 独立维护
- 页面必须支持静态生成
- 搜索必须基于站点内容源
- 频道页需要承担聚合、导览与推荐学习顺序的功能
- 详情页需要支持相关推荐和上一篇/下一篇
- 导航在首页、频道页、详情页之间必须保持一致

## 5. 内容范围

### 5.1 Learning Path

负责初学路径和第一阶段上手内容：

- 快速开始
- setup / clone
- stage / commit
- sync with remote
- first feature branch

### 5.2 Commands

负责命令专题深度讲解。

范围包括：

- 基础命令
- 高级命令
- plumbing / porcelain 之间的桥接命令
- 邮件补丁工作流相关命令
- 仓库维护与对象排查相关命令

### 5.3 Best Practices

负责团队协作中的稳定习惯和原则：

- 原子提交
- 分支命名
- 冲突处理惯例
- 安全 cherry-pick
- 发布前 Git 卫生

### 5.4 Workflows

负责典型协作路径：

- feature branch collaboration
- review 前同步
- hotfix
- release branch
- fork / upstream 同步
- submodule update flow

### 5.5 Internals And History

负责底层原理专题，以及历史模型理解：

- object database
- refs and HEAD
- git history
- commit graph
- merge base
- refspec
- reachability / gc

### 5.6 Recovery

负责误操作恢复与排障：

- reflog-first recovery
- recover after reset / rebase / pull
- deleted branch rescue
- detached HEAD rescue

## 6. 非功能要求

### 6.1 可维护性

- 内容必须通过 `content/` 目录维护
- 页面结构尽量复用统一模板和壳层
- 路由、菜单、内容索引必须统一管理

### 6.2 一致性

- 标题层级、面包屑、推荐模块、搜索行为要统一
- 首页、频道页、详情页的侧边菜单必须统一组件渲染
- 中英文信息架构必须保持一致

### 6.3 可扩展性

- 可以继续扩展新频道、新命令、新工作流
- 可以支持更多图例、提示框和文档组件
- 可以继续增强搜索、SEO 和内容运营能力

## 7. 当前阶段重点

当前网站已经进入“体系化扩容 + 结构稳定化”阶段。

阶段重点不再是简单增加页面，而是：

- 持续提高内容覆盖率
- 保持导航与信息架构清晰
- 让搜索、相关推荐、频道导览更好用
- 把内容资产整理成长期可维护的知识库
