# OpenCode Agent Instructions

This project is a static blog (Mizuki) built with the Astro framework. 
Its core feature is a **dual-repository architecture with complete physical separation of code and content**.

## 1. Core Architecture: Dual-Repository & Symlinks (CRITICAL)

This project uses a dual-repo model: "Main Code Repository" + "Independent Content Repository". Please read `docs/CONTENT_REPOSITORY.md` and `docs/CONTENT_SEPARATION.md` carefully to deeply understand this architecture.

### Symlink Mapping
During startup or build (via `scripts/sync-content.js`), the main project maps the contents of the `content/` directory (external repository) into the main repository's workspace using symlinks:
- `content/posts` -> `src/content/posts` (Articles/Posts)
- `content/spec` -> `src/content/spec` (Basic blog configuration, e.g., About page)
- `content/data` -> `src/data` (TS data files for friends, timeline, projects, etc.)
- `content/images` -> `public/images` (Image resources)

**Avoid backup folders**: When the sync script finds old local files that are not symlinks, it generates backup folders ending in `.backup`. **When searching, reading, or editing, you MUST ignore all `.backup` folders.**

### File Structure Boundaries of the Two Repositories
1. **Main Code Repository (Current Root `/`)**
   Responsible for blog rendering, UI components, and build logic.
   - `src/components/`: Astro and Svelte UI components.
   - `src/pages/`: Astro routing.
   - `src/layouts/`: Astro base layouts.
   - `src/plugins/`: Custom Markdown/Rehype parsing plugins (e.g., admonitions, Github cards).
   - `scripts/`: Engineering scripts (including content sync, etc.).
2. **Content Repository (`content/` folder in the root)**
   **This is a completely independent external GitHub repository.** Responsible for all posts, configurations, data, and static images.
   - `content/posts/`: Stores all `.md` posts.
   - `content/spec/`: Stores specific `.md` page configurations.
   - `content/data/`: Stores data definitions like `anime.ts`, `projects.ts`, etc.
   - `content/images/`: Stores images.

## 2. Change Boundaries & Execution Rules

- **Modifying posts/data/content**: Must be done directly within the `content/` folder and its subdirectories.
- **Modifying components/styles/logic**: Must be done in the main repository (e.g., `src/components`, `src/pages`).
- **Mixed modifications**: If you modify both code and content, keep clearly in mind that you are crossing between two different repositories.

## 3. Common Tasks & Documentation Index (Action -> Doc Mapping)

Due to the dual-repo nature, documentation is also distributed in two places. When a user requests a specific task, **the Agent MUST read the corresponding documentation first** to get the required formats or conventions:

### 3.1 Writing and Modifying Content (Must follow the `content/` repo conventions)
For any modifications involving post content, images, or data, first refer to the documentation included in the `content/` repository:
- **Understand global directory structure and basic rules of the content repo**:
  👉 **Read**: `content/README.md`
- **Adding/editing posts, writing Frontmatter properties, referencing images**:
  👉 **Read**: `content/docs/WRITING_GUIDE.md` and `content/docs/QUICK_REFERENCE.md`
- **Modifying static data (e.g., Anime, Projects, Timeline, etc.)**:
  👉 **Note**: This project primarily uses local static data rendering. Please manually edit the TypeScript files (like `anime.ts`) in the `content/data/` directory directly. **Do NOT use automated scraping scripts (like `update-anime`) by default** unless explicitly requested by the user.
  👉 **Read**: `content/docs/ANIME_GUIDE.md` etc., for data format requirements.

### 3.2 Architecture Config & Main Repo Dev Docs
For code logic, deployment, and blog architecture, check the `docs/` folder in the main project root:
- **Understanding content separation principles, handling content sync, configuring private content repos**:
  👉 **Read**: `docs/CONTENT_SEPARATION.md` and `docs/CONTENT_REPOSITORY.md`
- **Project deployment (Vercel, Netlify, etc.)**:
  👉 **Read**: `docs/DEPLOYMENT.md`
- **Configuring automated build triggers (CI/CD, Webhooks)**:
  👉 **Read**: `docs/AUTO_BUILD_TRIGGER.md`
- **Performance monitoring and benchmarking**:
  👉 **Read**: `docs/PERFORMANCE_MONITORING.md`

## 4. Tech Stack & Framework Gotchas

- **Astro v6**: Handles overall routing and static rendering. Markdown parsing has highly customized plugins (see `src/plugins` and `astro.config.mjs`).
- **Svelte v5 (CRITICAL)**: The project has been upgraded to Svelte 5. **When writing Svelte components, you MUST use Svelte 5 Runes syntax (e.g., `$state`, `$props`, `$derived`).** Strictly prohibit using the legacy `export let` syntax.
- **Tailwind CSS v4**: Using the `@tailwindcss/vite` plugin.
- **Package Manager**: **Strictly use `pnpm`.** Prohibit using `npm` or `yarn`.

## 5. Common Development & Automation Commands

Before performing any operation, make sure to use `pnpm`.
- **Install dependencies**: `pnpm install`
- **Dev server**: `pnpm dev` (`predev` will automatically call `sync-content.js` to sync content)
- **Build project**: `pnpm build` (includes `pagefind` index generation and font compression)
- **Sync remote content**: `pnpm sync-content` (pulls latest content from external repo and creates symlinks)

## 6. Code Style, Testing & Linting

- **Loose Type Checking**: The project has relatively loose TypeScript checks. `eslint.config.js` explicitly disables many `@typescript-eslint/*` rules. **Do NOT blindly refactor working code just to "fix TS warnings".**
- **Code Formatting**: After modifying code, you must run `pnpm format` (Prettier) and `pnpm lint` (ESLint auto-fix). To verify signatures, run `pnpm type-check`.
- **Styling**: Prefer using Tailwind CSS class names.

## 7. Dependency Management Rules

- **Force pnpm**: Only use `pnpm add <pkg>`.
- **No blind upgrades**: Do not blindly upgrade main framework dependencies (like Astro/Svelte/Tailwind). If you must install a new dependency, explain the reason to the user.

## 8. Environment Variables

- Base configuration examples can be found in `.env.example`.
- **Key Dual-Repo Environment Variables**:
  - `ENABLE_CONTENT_SYNC`: If `false`, stops pulling the content repo and only uses local.
  - `CONTENT_REPO_URL`: The remote URL of the content repo.
  - `CONTENT_DIR`: Local content storage path (default is `content`).
- **Security Rule**: NEVER commit a `.env` file containing tokens (such as GitHub / Bilibili Tokens).

## 9. Commit / PR Guidelines

- **Physical Isolation Mindset**: Since `content` is an independent repository, content-related commits and code-related commits should be treated separately.
- **Beware of Automated Commits**: When the content sync script detects content repo updates, it automatically triggers a commit like `chore(content): sync main@xxxxxx` in the main repo root. If you are developing code in the main repo, **you MUST run `git status` before `git commit`.**
- **Prevent Accidental Operations**: Always double-check your staged files (`git add`). **Never mix `.backup` folders or automated sync commits into your PR.**
- **Semantic Commits**: Follow conventional commit message formats (e.g., `feat:`, `fix:`, `chore:`, `docs:`).
