# 仓库指南（中文）

## 项目结构与模块组织
Mizuki 是一个 Astro + Svelte 项目。
- `src/pages/`：Astro 文件路由与接口端点（如 `*.json.ts`、`rss.xml.ts`）。
- `src/components/`：分层 UI（`atoms`、`features`、`organisms`、`widgets`、`layout`、`misc`）。
- `src/content/`：Markdown 内容集合（`posts`、`spec`），由 `src/content.config.ts` 管理。
- `src/data/`、`src/utils/`、`src/constants/`、`src/i18n/`：业务数据、工具逻辑、常量、多语言。
- `public/`：静态资源（图片、音乐、字体、脚本、模型文件），构建时原样输出。
- `scripts/`：内容同步、构建和维护脚本。
- `docs/rule/`：组件架构、拆分、文件组织、CSS 规范。

遵循 Astro 约定：`src/pages` 下文件即路由；动态路由使用方括号命名（例如 `src/pages/posts/[...slug].astro`）。

## 构建、测试与开发命令
仅使用 `pnpm`（`preinstall` 强制）。
- `pnpm install`：安装依赖。
- `pnpm dev` / `pnpm start`：启动本地开发服务（`localhost:4321`）。
- `pnpm build`：生产构建（`astro build` + pagefind + 字体压缩）。
- `pnpm preview`：本地预览 `dist/`。
- `pnpm check`：运行 `astro check`。
- `pnpm type-check`：TypeScript 类型检查（`tsc --noEmit`）。
- `pnpm lint`：对 `src/` 运行 ESLint（带自动修复）。
- `pnpm format`：对 `src/` 运行 Prettier。
- `pnpm new-post <slug>`：创建新文章模板。

## 代码风格与命名规范
以仓库配置为准：`eslint.config.js`、`.prettierrc`、`tsconfig.json`。
- 格式：Tab 缩进、行宽 80、分号、双引号；CSS 使用 2 空格缩进。
- 命名：组件文件 PascalCase（如 `PostCard.astro`）；工具模块 kebab-case（如 `date-utils.ts`）；复杂模块建议同目录 `types.ts`。
- 导入：优先使用路径别名（`@components/*`、`@utils/*`、`@/*`），并保持 import 排序。
- 架构：优先复用原子组件，遵循 `docs/rule/*` 的分层与拆分原则。

## 测试与提交流程
当前未强制单元测试框架，PR 最低检查项：
- `pnpm lint`
- `pnpm check`
- `pnpm build`

涉及性能的改动建议额外运行 `pnpm performance:check`。

提交信息建议使用 Conventional Commit（`feat:`、`fix:`、`refactor:`，可加 scope）。PR 需包含变更说明、关联 issue（如有）、UI 截图/GIF（如有）以及本地检查通过说明。

## 内容同步安全说明（`.env`）
`predev` 和 `prebuild` 都会执行 `scripts/sync-content.js`。
- `ENABLE_CONTENT_SYNC=false`：同步脚本会提前退出，直接使用本地 `src/content`、`src/data`、`public/images`。
- `ENABLE_CONTENT_SYNC=true`：会从 `CONTENT_DIR` / `CONTENT_REPO_URL` 同步并映射：
  - `content/posts -> src/content/posts`
  - `content/spec -> src/content/spec`
  - `content/data -> src/data`
  - `content/images -> public/images`
- 若目标目录已存在且不是符号链接，脚本可能先重命名为 `*.backup` 再链接/复制。删除本地内置内容前务必确认 `.env` 配置。
