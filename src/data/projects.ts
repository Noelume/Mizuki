// Project data configuration file
// Used to manage data for the project display page

export interface Project {
	id: string;
	title: string;
	description: string;
	image: string;
	category: "web" | "mobile" | "desktop" | "other";
	techStack: string[];
	status: "completed" | "in-progress" | "planned";
	liveDemo?: string;
	sourceCode?: string;
	startDate: string;
	endDate?: string;
	featured?: boolean;
	tags?: string[];
	visitUrl?: string;
}

export const projectsData: Project[] = [
	{
		id: "mizuki-blog",
		title: "Mizuki",
		description:
			"Astro + Svelte 驱动的个人博客主题项目，持续迭代页面体验、内容系统与可配置能力。",
		image: "",
		category: "web",
		techStack: ["Astro", "TypeScript", "Tailwind CSS", "Svelte"],
		status: "in-progress",
		sourceCode: "https://github.com/Noelume/Mizuki",
		visitUrl: "https://github.com/Noelume/Mizuki",
		startDate: "2024-01-01",
		featured: true,
		tags: ["Mizuki", "Blog Theme", "Astro", "Svelte", "TypeScript"],
	},
	{
		id: "portfolio-website",
		title: "Mizuki-Content",
		description:
			"用于管理 Mizuki 站点内容的独立仓库，集中维护文章、专题页、数据文件与图片资源。",
		image: "",
		category: "web",
		techStack: ["Markdown", "TypeScript", "Git", "Content Management"],
		status: "in-progress",
		sourceCode: "https://github.com/Noelume/Mizuki-Content",
		visitUrl: "https://github.com/Noelume/Mizuki-Content",
		startDate: "2023-09-01",
		featured: true,
		tags: ["Mizuki", "Content", "Markdown", "Assets", "Data"],
	},
];

// Get project statistics
export const getProjectStats = () => {
	const total = projectsData.length;
	const completed = projectsData.filter((p) => p.status === "completed").length;
	const inProgress = projectsData.filter(
		(p) => p.status === "in-progress",
	).length;
	const planned = projectsData.filter((p) => p.status === "planned").length;

	return {
		total,
		byStatus: {
			completed,
			inProgress,
			planned,
		},
	};
};

// Get projects by category
export const getProjectsByCategory = (category?: string) => {
	if (!category || category === "all") {
		return projectsData;
	}
	return projectsData.filter((p) => p.category === category);
};

// Get featured projects
export const getFeaturedProjects = () => {
	return projectsData.filter((p) => p.featured);
};

// Get all tech stacks
export const getAllTechStack = () => {
	const techSet = new Set<string>();
	projectsData.forEach((project) => {
		project.techStack.forEach((tech) => {
			techSet.add(tech);
		});
	});
	return Array.from(techSet).sort();
};
