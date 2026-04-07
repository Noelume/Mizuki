export type AnimeItem = {
	title: string;
	status: "watching" | "completed" | "planned";
	rating: number;
	cover: string;
	description: string;
	episodes: string;
	year: string;
	genre: string[];
	studio: string;
	link: string;
	progress: number;
	totalEpisodes: number;
	startDate: string;
	endDate: string;
};

const localAnimeList: AnimeItem[] = [
	{
		title: "BanG Dream! (Season 1)",
		status: "completed",
		rating: 9.1,
		cover: "/images/anime/186515_ZJhwb.jpg",
		description:
			"从组建乐队到站上舞台，少女们在音乐与羁绊中完成了最初的成长。",
		episodes: "13 episodes",
		year: "2017",
		genre: ["Music", "Youth", "Band"],
		studio: "ISSEN x XEBEC",
		link: "https://anime.bang-dream.com/1st/",
		progress: 13,
		totalEpisodes: 13,
		startDate: "2017-01",
		endDate: "2017-04",
	},
	{
		title: "BanG Dream! 2nd Season",
		status: "planned",
		rating: 9.0,
		cover: "/images/anime/bangdream_2.png",
		description:
			"以Poppin'Party为核心，更多乐队登场，舞台与友情线进一步扩展。",
		episodes: "13 episodes",
		year: "2019",
		genre: ["Music", "Band", "Youth"],
		studio: "SANZIGEN",
		link: "https://anime.bang-dream.com/2nd/",
		progress: 0,
		totalEpisodes: 13,
		startDate: "2019-01",
		endDate: "2019-03",
	},
	{
		title: "BanG Dream! It's MyGO!!!!!",
		status: "planned",
		rating: 9.3,
		cover: "/images/anime/mygo.png",
		description:
			"以迷惘与和解为主题，角色关系更尖锐，情绪表达更真实。",
		episodes: "13 episodes",
		year: "2023",
		genre: ["Music", "Drama", "Band"],
		studio: "SANZIGEN",
		link: "https://anime.bang-dream.com/mygo/",
		progress: 0,
		totalEpisodes: 13,
		startDate: "2023-06",
		endDate: "2023-09",
	},
	{
		title: "BanG Dream! Ave Mujica",
		status: "planned",
		rating: 9.4,
		cover: "/images/anime/ave_mujica.png",
		description:
			"延续MyGO之后的世界线，风格更暗色与戏剧化，舞台张力很强。",
		episodes: "13 episodes",
		year: "2025",
		genre: ["Music", "Drama", "Band"],
		studio: "SANZIGEN",
		link: "https://anime.bang-dream.com/avemujica/",
		progress: 0,
		totalEpisodes: 13,
		startDate: "2025-01",
		endDate: "2025-03",
	},
];

export default localAnimeList;
