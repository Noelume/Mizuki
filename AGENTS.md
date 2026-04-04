# Repository Guidelines

## Project Structure & Module Organization
Mizuki is an Astro + Svelte project.
- `src/pages/`: Astro file-based routes and API endpoints (`*.json.ts`, `rss.xml.ts`).
- `src/components/`: layered UI (`atoms`, `features`, `organisms`, `widgets`, `layout`, `misc`).
- `src/content/`: Markdown collections (`posts`, `spec`) loaded by `src/content.config.ts`.
- `src/data/`, `src/utils/`, `src/constants/`, `src/i18n/`: data, domain logic, shared constants, localization.
- `public/`: static assets (images/music/fonts/scripts/model files), served as-is.
- `scripts/`: sync/build/content automation scripts.
- `docs/rule/`: architecture, component split, file organization, and CSS rules.

Follow Astro conventions: route files map directly to URLs, and dynamic routes use bracket syntax (e.g., `src/pages/posts/[...slug].astro`).

## Build, Test, and Development Commands
Use `pnpm` only (`preinstall` enforces this).
- `pnpm install`: install dependencies.
- `pnpm dev` / `pnpm start`: start local server (`localhost:4321`).
- `pnpm build`: production build (`astro build` + pagefind + font compression).
- `pnpm preview`: preview `dist/`.
- `pnpm check`: `astro check`.
- `pnpm type-check`: TypeScript type checking (`tsc --noEmit`).
- `pnpm lint`: ESLint on `src/` with autofix.
- `pnpm format`: Prettier on `src/`.
- `pnpm new-post <slug>`: scaffold a post.

## Coding Style & Naming Conventions
Use repo configs first: `eslint.config.js`, `.prettierrc`, `tsconfig.json`.
- Formatting: tabs, width 80, semicolons, double quotes; CSS uses 2 spaces.
- Naming: component files use PascalCase (`PostCard.astro`), utility modules use kebab-case (`date-utils.ts`), colocated `types.ts` for complex modules.
- Imports: prefer aliases (`@components/*`, `@utils/*`, `@/*`) and keep imports sorted.
- Architecture: prefer existing atomic/layered patterns from `docs/rule/*`; reuse atoms before adding new UI primitives.

## Testing Guidelines
No dedicated unit-test suite is enforced yet. Treat these as required PR gates:
- `pnpm lint`
- `pnpm check`
- `pnpm build`
Use `pnpm performance:check` for performance-sensitive UI or rendering changes.

## Commit & Pull Request Guidelines
Recent history uses mostly Conventional Commit style (`feat:`, `fix:`, `refactor:`), sometimes with scopes (e.g., `feat(config): ...`) and issue links (`(#420)`).

PRs should include:
- Clear summary of behavioral changes.
- Linked issue(s) when applicable.
- Screenshots/GIFs for UI changes.
- Confirmation that lint/check/build passed locally.

## Content Sync Safety (`.env`)
`predev` and `prebuild` run `scripts/sync-content.js`.
- If `ENABLE_CONTENT_SYNC=false`, sync exits early (local `src/content`, `src/data`, `public/images` are used).
- If `ENABLE_CONTENT_SYNC=true`, content is synced from `CONTENT_DIR` / `CONTENT_REPO_URL` and mapped to:
  - `content/posts -> src/content/posts`
  - `content/spec -> src/content/spec`
  - `content/data -> src/data`
  - `content/images -> public/images`
- Existing non-symlink target folders may be renamed to `*.backup` before link/copy. Verify `.env` before deleting local seed content.
