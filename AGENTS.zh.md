# 仓库指南（中文）

## 项目结构与模块组织
Mizuki 是 Astro + Svelte 项目，主要目录如下：
- `src/pages/`：页面路由与 API 路由（Astro 文件路由）。
- `src/components/`：组件分层（`atoms`、`features`、`organisms`、`widgets` 等）。
- `src/content/`：内容集合（`posts`、`spec`），由 `src/content.config.ts` 定义 schema。
- `src/data/`：结构化数据（如 `projects.ts`、`timeline.ts`）。
- `public/`：静态资源（图片、音乐、字体、脚本等）。
- `scripts/`：内容同步、构建、维护脚本。
- `docs/rule/`：组件架构、文件组织、CSS 规范。

## 开发与检查命令
- `pnpm dev`：本地开发（`localhost:4321`）。
- `pnpm build`：生产构建（含 pagefind 与字体压缩）。
- `pnpm check`：Astro 检查。
- `pnpm lint`：ESLint（自动修复）。
- `pnpm format`：Prettier 格式化。
- `pnpm type-check`：TypeScript 类型检查。

提交 PR 前至少运行：`pnpm lint`、`pnpm check`、`pnpm build`。

## 代码规范（结合项目文档）
- 命名：组件文件 `PascalCase`，工具文件 `kebab-case`。
- 格式：以 `.prettierrc` 为准（Tab、行宽 80；CSS 2 空格）。
- 导入：优先使用 `tsconfig.json` 中的路径别名（如 `@components/*`）。
- 架构：优先复用 atom 组件，遵循 `docs/rule/*` 的分层拆分原则。

## 内容同步逻辑（重点）
`predev` / `prebuild` 会执行 `scripts/sync-content.js`：
- `ENABLE_CONTENT_SYNC=false`：不做同步，使用本地 `src/content`、`src/data`、`public/images`。
- `ENABLE_CONTENT_SYNC=true`：从 `CONTENT_DIR`（默认 `./content`）同步并映射。

目录说明（声明式）：
- `content/posts`：博客文章目录。只放文章 `.md`，必须有 frontmatter（至少 `title`、`published`）。同步到 `src/content/posts`。
- `content/spec`：说明页目录。放 `about.md`、`friends.md` 等说明页。同步到 `src/content/spec`。
- `content/data`：结构化数据目录。放 `*.ts` 数据文件（如 `projects.ts`、`timeline.ts`）。同步到 `src/data`。
- `content/images`：内容图片目录。放文章/相册/日记等图片资源。同步到 `public/images`，页面通过 `/images/...` 访问。
- `posts` 目录下只能放符合文章 schema 的 Markdown（必须有 `title`、`published`）。
- 不要在 `posts` 下放 `README.md` 这类说明文件，否则会导致 Astro 启动失败。
- 若目标目录已存在且不是符号链接，脚本可能先改名为 `*.backup` 再链接/复制。
