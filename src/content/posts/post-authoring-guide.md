---
title: Mizuki 文章创建与发布规范
published: 2026-04-07
description: 在 Mizuki 项目中创建文章的完整规范，包含目录结构、Frontmatter、图片、加密、链接与发布检查。
tags: [Mizuki, 写作规范, Content]
category: 写作指南
draft: false
pinned: true
---

这篇文档用于统一本项目的文章创建方式，避免后续维护时出现格式不一致、图片路径失效或发布后不显示的问题。

## 1. 文章放在哪里

- 内容分离模式（推荐）下：在 `content/posts/` 新建文章。
- 该目录会同步映射到 `src/content/posts/`，由 Astro 内容集合读取。
- `posts` 下不要放无 Frontmatter 的说明型 `.md`（如 `README.md`），否则会被当文章解析并报错。

## 2. 文件组织规范

- 简单文章：`content/posts/my-post.md`
- 含本地图片文章：`content/posts/my-post/index.md` + 同目录图片文件
- 当前集合仅扫描 `*.md`，不建议使用 `.mdx`。

## 3. Frontmatter 标准

最小必填：

```yaml
---
title: 文章标题
published: 2026-04-07
---
```

推荐模板：

```yaml
---
title: 文章标题
published: 2026-04-07
updated: 2026-04-07
description: 文章摘要
image: ./cover.png
tags: [Astro, 教程]
category: 前端
draft: false
pinned: false
comment: true
lang: zh_CN
author: YourName
sourceLink: ""
licenseName: ""
licenseUrl: ""
encrypted: false
password: ""
passwordHint: ""
alias: ""
permalink: ""
---
```

### 3.1 非布尔字段填写示例（重点）

下面这组字段最容易出现“知道名字但不知道填什么”的问题，可直接按示例写：

| 字段 | 推荐填写方式 | 示例 |
|---|---|---|
| `published` | `YYYY-MM-DD` 或 ISO 时间 | `2026-04-07` |
| `updated` | 与 `published` 同格式 | `2026-04-10` |
| `description` | 1-2 句摘要，尽量可读可检索 | `这篇文章记录了内容分离模式的迁移过程。` |
| `image` | 优先相对路径或 `/images/...` | `./cover.png` / `/images/posts/cover.webp` |
| `tags` | 2-5 个高辨识标签 | `[Astro, 内容管理, 部署]` |
| `category` | 单个分类词，保持站内一致 | `开发指南` |
| `lang` | 仅与站点默认语言不同时填写 | `zh_CN` / `en` |
| `author` | 展示署名 | `Noelume` |
| `sourceLink` | 原文或引用来源 URL | `https://docs.astro.build/...` |
| `licenseName` | 许可证名 | `CC BY-NC-SA 4.0` |
| `licenseUrl` | 对应许可证链接 | `https://creativecommons.org/licenses/by-nc-sa/4.0/` |
| `password` | 加密文章解锁密码（明文配置） | `my-strong-pass-2026` |
| `passwordHint` | 给读者的提示语 | `和仓库名相关，6 位数字` |
| `alias` | `/posts/` 下别名路径（不带前后斜杠） | `setup-notes` |
| `permalink` | 站点根路径自定义链接（不带前后斜杠） | `notes/setup-2026` |

## 4. 图片与封面规则

- `image` 支持三种写法：
- `https://...`：外链图
- `/images/...`：公共静态图（来自 `public/images`）
- `./cover.png`：相对当前 Markdown 文件目录

建议：有封面或配图的文章使用“目录 + `index.md`”结构，图片与正文同目录，迁移最稳。

## 5. 标签与分类命名建议

- 站点语言为中文时，`category` 建议中文（如“写作指南”“前端”）。
- `tags` 可中英混用，但建议“一个体系内保持一致”：
- 通用主题用中文（如“教程”“性能优化”）
- 技术专有词保留英文（如 `Astro`、`TypeScript`）

## 6. 密码保护（开关方式）

开启加密：

```yaml
encrypted: true
password: "你的密码"
passwordHint: "可选提示"
```

关闭加密：

```yaml
encrypted: false
password: ""
passwordHint: ""
```

注意：仅 `encrypted: true` 且 `password` 非空时才会实际启用密码保护。

## 7. 草稿与上线逻辑

- `draft: true`：开发环境可见，生产构建会隐藏。
- `draft: false`：正常参与首页、归档、RSS（加密文另有过滤逻辑）。

## 8. 链接规则（Slug / Alias / Permalink）

- 默认链接：`/posts/<文件名或目录名>/`
- `alias`：生成 `/posts/<alias>/`
- `permalink`：使用站点根路径自定义链接（优先级更高）

除非你明确要做旧链接兼容或 SEO 固定路径，否则建议先用默认链接。

## 9. 新建与发布流程

1. 新建文章：`pnpm new-post <slug>`
2. 编辑 `content/posts/...` 文档与图片
3. 本地检查：`pnpm dev`
4. 发布前检查：`pnpm lint && pnpm check && pnpm build`

## 10. 常见错误清单

- 缺少 `title` 或 `published`
- 在 `posts` 放了非文章型 `.md`
- `image` 相对路径写错（目录层级不匹配）
- 只写 `encrypted: true` 但忘了 `password`
- 发布后文章不见：通常是 `draft: true`

## 11. 布尔字段分层（避免混淆）

这几个字段都写 `true/false`，但控制层级不同，容易混：

| 字段 | 控制层级 | 影响范围 |
|---|---|---|
| `draft` | 发布层 | 是否进入生产内容流（首页/归档/RSS/搜索） |
| `pinned` | 排序层 | 在列表中是否进入置顶优先层 |
| `comment` | 组件渲染层 | 当前文章页是否渲染评论组件 |
| `encrypted` | 内容访问层 | 正文是否进入密码解锁流程 |

## 附录：Frontmatter 字段作用总表（除 	title）

下表按项目实际 schema（`src/content.config.ts`）整理，聚焦“这个字段控制什么”。

| 字段 | 控制对象 / 行为 | 备注 |
|---|---|---|
| `published` | 文章发布时间、列表时间排序基准之一 | 必填，建议用 `YYYY-MM-DD` |
| `updated` | 页面“最后更新”时间显示 | 可选，不填通常回退到 `published` |
| `draft` | 是否进入生产环境内容流（首页/归档/RSS） | 开发环境可能仍可见 |
| `description` | 列表摘要、SEO 描述等摘要文本 | 建议保持 1-2 句话 |
| `image` | 文章封面与分享图来源 | 支持外链、`/images/...`、相对路径 |
| `tags` | 标签聚合、标签筛选与展示 | 建议同一体系命名统一 |
| `category` | 分类聚合、分类筛选与展示 | 为空会走未分类逻辑 |
| `lang` | 单篇文章语言标记 | 与站点默认语言不同再填 |
| `pinned` | 列表置顶优先级层级 | 置顶文通常排在普通文前 |
| `comment` | 当前文章评论区渲染 | 还受全局评论开关影响 |
| `priority` | 置顶文章之间的细粒度排序 | 数值越小通常越靠前 |
| `author` | 文章作者展示信息 | 可用于署名覆盖 |
| `sourceLink` | 文章来源/引用链接 | 用于版权或来源说明 |
| `licenseName` | 当前文章许可名称展示 | 与 `licenseUrl` 搭配使用 |
| `licenseUrl` | 当前文章许可链接展示 | 与 `licenseName` 搭配使用 |
| `encrypted` | 是否启用正文密码解锁流程 | 需配合 `password` 才生效 |
| `password` | 加密正文的解锁凭据 | 为空时不会进入加密展示流程 |
| `passwordHint` | 密码输入框提示文案 | 可选，提升可用性 |
| `alias` | `/posts/...` 下的别名路径 | 用于兼容旧链接或自定义短链 |
| `permalink` | 根路径自定义链接 | 优先级高于默认 slug/alias |
| `prevTitle` | 上一篇文章标题（内部导航） | 内部字段，不建议手填 |
| `prevSlug` | 上一篇文章 slug（内部导航） | 内部字段，不建议手填 |
| `nextTitle` | 下一篇文章标题（内部导航） | 内部字段，不建议手填 |
| `nextSlug` | 下一篇文章 slug（内部导航） | 内部字段，不建议手填 |

> 实务建议：日常写作优先维护 `published`、`description`、`image`、`tags`、`category`、`draft`、`pinned`、`encrypted/password`、`alias/permalink` 这组核心字段。

