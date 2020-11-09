import Lyricist from "lyricist";
import dotenv from "dotenv";

dotenv.config();

const lyricist = new Lyricist(process.env.GENIUS as string);

export async function search_songs(search_string: string) {
	const songs = await lyricist.search(search_string);
	return songs;
}