import Lyricist from "lyricist";
import { nlp_api } from "../services/nlp";
import dotenv from "dotenv";

dotenv.config();

const lyricist = new Lyricist(process.env.GENIUS as string);

export async function search_song(id: number, lyrics:any) {
	let song: any = await lyricist.song(id);

	await nlp_api
		.post("/", {
			id: id,
			lyrics: lyrics,
		})
		.then((response: any) => {
			song = { ...song, difficulty: response.data.difficulty };
		});
	
	return song;
}

export async function search_song_lyrics(id: number) {
	let song: any = await lyricist.song(id, { fetchLyrics: true });

	while (song.lyrics == "") {
		song = await lyricist.song(id, { fetchLyrics: true });
	}

	await nlp_api
		.post("/", {
			id: id,
			lyrics: song.lyrics,
		})
		.then((response: any) => {
			song = { ...song, difficulty: response.data.difficulty };
		});
	
	return song;
}
