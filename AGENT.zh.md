# Mizuki 页面级组件依赖与架构图解

本文档深入到具体页面级别，详细展示了**首页/列表页**、**文章详情页**的组件树构成，以及特殊的**动态侧边栏组件注入机制**。通过这些图表，你可以精确知道某个页面的具体功能是由哪个路径下的哪个组件负责的。

---

## 1. 🏠 首页/文章列表页组件树 (`src/pages/[...page].astro`)

首页本质上是一个带分页的文章列表页。它的组件嵌套关系如下：

```mermaid
graph LR
    classDef page fill:#f9f871,stroke:#f5e216,stroke-width:2px,color:#333;
    classDef layout fill:#ffc75f,stroke:#f9a03f,stroke-width:2px,color:#333;
    classDef comp fill:#ff9671,stroke:#f26b5b,stroke-width:2px,color:#fff;

    Page["📄 src/pages/[...page].astro\n(列表入口)"]:::page
    
    Layout["🏗️ src/layouts/MainGridLayout.astro\n(主网格布局)"]:::layout
    BaseLayout["🏗️ src/layouts/Layout.astro\n(HTML/Head骨架)"]:::layout

    subgraph 页面具体内容
        direction TB
        CatBar["🧩 CategoryBar.astro\n分类导航栏"]:::comp
        PostPage["🧩 PostPage.astro\n文章列表容器"]:::comp
        PostCard["🧩 PostCard.astro\n单篇文章卡片"]:::comp
        Pagination["🧩 Pagination.astro\n底部翻页器"]:::comp
    end

    Page -->|包裹在| Layout
    Layout -->|继承自| BaseLayout
    
    Page -->|渲染| CatBar
    Page -->|渲染| PostPage
    PostPage -->|循环渲染| PostCard
    Page -->|渲染| Pagination

    %% 标注具体路径
    CatBar -.-> |src/components/features/posts/|CatBar
    PostPage -.-> |src/components/features/posts/|PostPage
    Pagination -.-> |src/components/control/|Pagination
```

**💡 修改建议：**
* **修改文章列表的卡片样式：** 定位到 `src/components/features/posts/PostCard.astro`
* **修改翻页按钮：** 定位到 `src/components/control/Pagination.astro`

---

## 2. 📝 文章详情页组件树 (`src/pages/posts/[...slug].astro`)

文章详情页是博客最复杂的部分，包含了内容渲染、元信息、评论、分享等众多功能模块。

```mermaid
graph LR
    classDef page fill:#f9f871,stroke:#f5e216,stroke-width:2px,color:#333;
    classDef layout fill:#ffc75f,stroke:#f9a03f,stroke-width:2px,color:#333;
    classDef comp fill:#ff9671,stroke:#f26b5b,stroke-width:2px,color:#fff;
    classDef md fill:#845ec2,stroke:#4b4453,stroke-width:2px,color:#fff;

    Page["📄 src/pages/posts/[...slug].astro\n(文章详情页)"]:::page
    Layout["🏗️ src/layouts/MainGridLayout.astro"]:::layout

    subgraph 核心文章组件 [src/components/features/posts/]
        direction TB
        WordTime["阅读量/字数统计\natoms/ReadingTime.astro\natoms/WordCount.astro"]:::comp
        PostMeta["文章发布信息/标签\nPostMeta.astro"]:::comp
        ShareCard["底部社交分享卡片\nShareCard.astro"]:::comp
        PostNav["上一篇/下一篇\nPostNavigation.astro"]:::comp
        Related["相关文章推荐\nRelatedPosts.astro"]:::comp
    end

    subgraph 独立功能组件
        direction TB
        Markdown["✨ Markdown.astro\n(渲染文章正文)"]:::md
        Encryptor["🔒 Encryptor.astro\n(密码保护输入框)"]:::comp
        License["📜 License.astro\n(版权声明)"]:::comp
        Comment["💬 Comment/index.astro\n(评论系统载入)"]:::comp
    end

    Page -->|继承布局| Layout
    Page -->|顶部统计| WordTime
    Page -->|标题下方| PostMeta
    Page -->|解析正文| Markdown
    Page -->|密码保护| Encryptor
    Page -->|文末组件| ShareCard
    Page -->|文末组件| License
    Page -->|文末组件| PostNav
    Page -->|文末组件| Related
    Page -->|文末组件| Comment

    Encryptor -.包裹.-> Markdown
```

**💡 修改建议：**
* **修改 Markdown 渲染的 HTML 标签样式：** 定位到 `src/components/misc/Markdown.astro` 以及 `src/styles/main.css` 里的 `.markdown-content`
* **更换或修改评论系统：** 定位到 `src/components/comment/` 目录下（如 `Twikoo.astro`, `Giscus.astro`）
* **修改文章底部的分享卡片：** 定位到 `src/components/features/posts/ShareCard.astro`

---

## 3. 🧩 侧边栏与小组件动态注入机制

Mizuki 的侧边栏并不是写死在代码里的，而是通过 `widgetManager` 读取 `src/config.ts` 中的配置动态渲染的。这就是为什么你直接搜 `Profile.astro` 找不到它在哪里被直接 import 的原因。

```mermaid
sequenceDiagram
    participant Config as src/config.ts
    participant Manager as src/utils/widget-manager.ts
    participant Sidebar as src/components/widgets/sidebar/SideBar.astro
    participant Widget as 各种小组件<br>(Profile, Calendar等)

    Config->>Manager: 定义 sidebarLayoutConfig 配置
    Note over Config: 配置项包含了 top, sticky, bottom 等位置的挂件名

    Sidebar->>Manager: 请求当前设备(Mobile/Tablet/Desktop)对应位置的挂件列表
    Manager-->>Sidebar: 返回需渲染的组件数组 (如 ["Profile", "Tags"])

    loop 遍历组件数组
        Sidebar->>Widget: 动态加载对应的 .astro 组件
        Note over Sidebar, Widget: 通过 SidebarColumn.astro 中的 componentMap 映射
    end
```

### 侧边栏组件物理位置地图

所有的挂件都统一放置在 `src/components/widgets/` 目录下，每个挂件独立成一个文件夹：

```mermaid
mindmap
  root((src/components/\nwidgets/))
    profile
      Profile.astro (个人信息卡片)
    calendar
      Calendar.astro (日历热图)
    categories
      Categories.astro (分类列表)
    tags
      Tags.astro (标签云)
    site-stats
      SiteStats.astro (站点统计信息)
    announcement
      Announcement.astro (公告栏)
    card-toc
      CardTOC.astro (侧栏文章目录)
    music-sidebar
      MusicSidebarWidget.astro (侧栏音乐播放器)
```

**💡 修改建议：**
* **想要调整侧边栏挂件的顺序或显示/隐藏：** **不要改代码**，去改项目根目录下的 `src/config.ts` 文件中的 `sidebarLayoutConfig` 对象。
* **想要修改个人卡片 (Profile) 的样式：** 去 `src/components/widgets/profile/Profile.astro`。
* **如果新增了一个自定义侧栏挂件：** 必须在 `src/components/layout/SidebarColumn.astro` 里的 `componentMap` 中注册它，否则配置文件里写了也无法渲染！(详见 `docs/rule/06-sidebar-widget-dev.md`)
