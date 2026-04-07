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
			"A youth band story about finding companions, building confidence, and stepping onto the stage together.",
		episodes: "13 episodes",
		year: "2017",
		genre: ["Music", "Youth", "Band"],
		studio: "ISSEN x XEBEC",
		link: "https://anime.bang-dream.com/1st/",
		progress: 13,
		totalEpisodes: 13,
		startDate: "2026-04",
		endDate: "2026-06",
	},
];

export default localAnimeList;
