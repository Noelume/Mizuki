import type { Song } from "./types";

export const STORAGE_KEY_VOLUME = "music-player-volume";

export const DEFAULT_VOLUME = 0.7;

export const LOCAL_PLAYLIST: Song[] = [
	{
		id: 1,
		title: "25時の情熱",
		artist: "25時、ナイトコードで。",
		cover: "assets/music/cover/25時の情熱.jpg",
		url: "assets/music/url/25時の情熱.mp3",
		duration: 0,
	},
	{
		id: 2,
		title: "余花にみとれて",
		artist: "25時、ナイトコードで。",
		cover: "assets/music/cover/余花にみとれて.jpg",
		url: "assets/music/url/余花にみとれて.mp3",
		duration: 0,
	},
	{
		id: 3,
		title: "飾って（装饰）",
		artist: "25時、ナイトコードで。",
		cover: "assets/music/cover/飾って（装饰）.jpg",
		url: "assets/music/url/飾って（装饰）.mp3",
		duration: 0,
	},
	{
		id: 4,
		title: "告白",
		artist: "25時、ナイトコードで。",
		cover: "assets/music/cover/告白.jpg",
		url: "assets/music/url/告白.mp3",
		duration: 0,
	},
];

export const DEFAULT_SONG: Song = {
	title: "Sample Song",
	artist: "Sample Artist",
	cover: "/favicon/favicon.ico",
	url: "",
	duration: 0,
	id: 0,
};

export const DEFAULT_METING_API =
	"https://www.bilibili.uno/api?server=:server&type=:type&id=:id&auth=:auth&r=:r";
export const DEFAULT_METING_ID = "14164869977";
export const DEFAULT_METING_SERVER = "netease";
export const DEFAULT_METING_TYPE = "playlist";

export const ERROR_DISPLAY_DURATION = 3000;
export const SKIP_ERROR_DELAY = 1000;
