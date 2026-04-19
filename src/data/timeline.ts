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
		id: "current-status",
		title: "日常迷茫中",
		description:
			"不知道该干什么，每天在找点乐子和发呆之间反复横跳。随波逐流也是一种生活态度，顺其自然吧。",
		type: "work",
		startDate: "2026-03-01",
		location: "卧室 / 电脑前",
		organization: "地球村",
		position: "发呆体验官",
		skills: ["发呆", "熬夜", "网上冲浪", "喝水"],
		achievements: [
			"成功在屏幕前坐了一整天",
			"想清楚了今天晚上吃什么",
		],
		icon: "material-symbols:bed-outline",
		color: "#22C55E",
		featured: true,
	},
	{
		id: "linux-customization",
		title: "沉迷 Linux 桌面美化",
		description:
			"花了好几天时间调整各种状态栏、窗口管理器和终端配色，虽然最后看起来好像和别人的也没太大区别，但是折腾的过程很解压。",
		type: "project",
		startDate: "2026-02-15",
		endDate: "2026-02-28",
		location: "赛博空间",
		position: "首席美化师",
		skills: ["Linux", "Dotfiles", "Terminal", "配置抄袭大师"],
		achievements: [
			"翻阅了无数个 GitHub 上的 dotfiles 仓库",
			"终端终于变得稍微顺眼了一点点"
		],
		icon: "material-symbols:terminal",
		color: "#6366F1",
		featured: true,
	},
	{
		id: "blog-tinkering",
		title: "日常折腾博客",
		description:
			"觉得以前的博客界面看腻了，于是换了新的外观，修修补补。主要就是为了找个借口不干正事。",
		type: "project",
		startDate: "2026-01-05",
		endDate: "2026-01-20",
		location: "线上",
		skills: ["前端", "Markdown", "无脑折腾"],
		icon: "material-symbols:code",
		color: "#F59E0B",
	},
	{
		id: "anime-marathon",
		title: "疯狂补番季",
		description:
			"突然有了看番的兴致，把收藏夹里积攒了很久的列表清空了一小半。最爽的事情莫过于一口气看完一整季。",
		type: "achievement",
		startDate: "2025-10-01",
		endDate: "2025-11-15",
		location: "被窝",
		skills: ["一目十行", "连续熬夜不困"],
		icon: "material-symbols:movie-outline",
		color: "#3B82F6",
	}
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
