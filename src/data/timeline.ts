// Timeline data configuration file
// Used to manage data for the timeline page

export interface TimelineItem {
	id: string;
	title: string;
	description: string;
	type: "education" | "work" | "project" | "achievement";
	startDate: string;
	endDate?: string; // If empty, it means current
	location?: string;
	organization?: string;
	position?: string;
	skills?: string[];
	achievements?: string[];
	links?: {
		name: string;
		url: string;
		type: "website" | "certificate" | "project" | "other";
	}[];
	icon?: string; // Iconify icon name
	color?: string;
	featured?: boolean;
}

export const timelineData: TimelineItem[] = [
	{
		id: "internship-search-2026",
		title: "正在找前端实习",
		description:
			"当前主线目标是拿到前端/前端工程化方向实习。重点准备简历、项目讲解、八股与算法，持续投递并复盘面试反馈。",
		type: "work",
		startDate: "2026-03-01",
		location: "上海 / 远程",
		organization: "个人求职阶段",
		position: "前端实习求职中",
		skills: ["Astro", "TypeScript", "Tailwind CSS", "Node.js", "Git"],
		achievements: [
			"完成求职版本项目重构（Mizuki + Mizuki-Content）",
			"建立投递表与面试复盘模板",
			"保持每周固定投递与模拟面试节奏",
		],
		links: [
			{
				name: "Mizuki 仓库",
				url: "https://github.com/Noelume/Mizuki",
				type: "project",
			},
			{
				name: "Mizuki-Content 仓库",
				url: "https://github.com/Noelume/Mizuki-Content",
				type: "project",
			},
			{
				name: "求职记录（示例）",
				url: "https://www.notion.so/",
				type: "other",
			},
		],
		icon: "material-symbols:work-outline",
		color: "#22C55E",
		featured: true,
	},
	{
		id: "resume-portfolio-upgrade",
		title: "简历与作品集升级",
		description:
			"围绕实习投递场景，重写简历项目描述、补齐项目截图与可复现步骤，提升面试可讲述性。",
		type: "project",
		startDate: "2026-02-10",
		endDate: "2026-03-20",
		location: "线上",
		organization: "个人项目",
		position: "维护者",
		skills: ["Markdown", "TypeScript", "UI 文案", "项目文档"],
		achievements: [
			"统一项目与内容仓库的数据结构",
			"补充文章/相册/友链等维护说明",
			"形成需求-改动-验证闭环流程",
		],
		links: [
			{
				name: "项目主页",
				url: "https://github.com/Noelume/Mizuki",
				type: "project",
			},
			{
				name: "Astro 官方文档",
				url: "https://docs.astro.build/",
				type: "website",
			},
		],
		icon: "material-symbols:code",
		color: "#6366F1",
		featured: true,
	},
	{
		id: "interview-prep-sprint",
		title: "面试准备冲刺（算法 + 八股）",
		description:
			"针对前端实习高频问题集中训练，覆盖 JavaScript、浏览器机制、工程化与基础算法。",
		type: "achievement",
		startDate: "2026-01-05",
		endDate: "2026-02-28",
		location: "线上",
		organization: "自学训练营",
		position: "学习者",
		skills: ["JavaScript", "TypeScript", "算法", "计算机网络", "浏览器原理"],
		achievements: [
			"整理高频面试题清单并完成首轮复习",
			"建立错题与薄弱点复盘机制",
			"每周进行 1-2 次模拟面试",
		],
		links: [
			{
				name: "LeetCode",
				url: "https://leetcode.cn/",
				type: "website",
			},
			{
				name: "阶段证明（示例证书）",
				url: "https://www.coursera.org/",
				type: "certificate",
			},
		],
		icon: "material-symbols:check-circle-outline",
		color: "#F59E0B",
	},
	{
		id: "campus-study-phase",
		title: "在校学习阶段（计算机相关）",
		description:
			"系统学习计算机基础课程，并将课程作业逐步迁移为可展示的项目资产，为实习求职做准备。",
		type: "education",
		startDate: "2025-09-01",
		endDate: "2026-01-15",
		location: "学校",
		organization: "计算机相关课程",
		position: "学生",
		skills: ["数据结构", "操作系统", "数据库基础", "软件工程"],
		achievements: [
			"完成课程项目并沉淀技术文档",
			"形成可复用的学习与开发笔记模板",
			"将学习内容映射到实习岗位要求",
		],
		icon: "material-symbols:school-outline",
		color: "#3B82F6",
	},
	{
		id: "application-tracker-project",
		title: "实习投递看板与节奏管理",
		description:
			"搭建并维护投递追踪表，记录公司、岗位、进度、反馈与下一步动作，确保求职节奏可视化。",
		type: "project",
		startDate: "2026-03-18",
		endDate: "2026-04-30",
		location: "线上",
		organization: "个人求职系统",
		position: "维护者",
		skills: ["Notion/表格管理", "信息整理", "复盘方法"],
		achievements: [
			"统一投递状态定义（待投递/已投递/面试中/已结束）",
			"建立每周复盘与策略调整机制",
			"显著减少重复投递与遗漏跟进",
		],
		links: [
			{
				name: "牛客",
				url: "https://www.nowcoder.com/",
				type: "website",
			},
			{
				name: "BOSS 直聘",
				url: "https://www.zhipin.com/",
				type: "other",
			},
		],
		icon: "material-symbols:dashboard-outline",
		color: "#14B8A6",
		featured: true,
	},
];

// Get timeline statistics
export const getTimelineStats = () => {
	const total = timelineData.length;
	const byType = {
		education: timelineData.filter((item) => item.type === "education").length,
		work: timelineData.filter((item) => item.type === "work").length,
		project: timelineData.filter((item) => item.type === "project").length,
		achievement: timelineData.filter((item) => item.type === "achievement")
			.length,
	};

	return { total, byType };
};

// Get timeline items by type
export const getTimelineByType = (type?: string) => {
	if (!type || type === "all") {
		return timelineData.sort(
			(a, b) =>
				new Date(b.startDate).getTime() - new Date(a.startDate).getTime(),
		);
	}
	return timelineData
		.filter((item) => item.type === type)
		.sort(
			(a, b) =>
				new Date(b.startDate).getTime() - new Date(a.startDate).getTime(),
		);
};

// Get featured timeline items
export const getFeaturedTimeline = () => {
	return timelineData
		.filter((item) => item.featured)
		.sort(
			(a, b) =>
				new Date(b.startDate).getTime() - new Date(a.startDate).getTime(),
		);
};

// Get current ongoing items
export const getCurrentItems = () => {
	return timelineData.filter((item) => !item.endDate);
};

// Calculate total work experience
export const getTotalWorkExperience = () => {
	const workItems = timelineData.filter((item) => item.type === "work");
	let totalMonths = 0;

	workItems.forEach((item) => {
		const startDate = new Date(item.startDate);
		const endDate = item.endDate ? new Date(item.endDate) : new Date();
		const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
		const diffMonths = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 30));
		totalMonths += diffMonths;
	});

	return {
		years: Math.floor(totalMonths / 12),
		months: totalMonths % 12,
	};
};
