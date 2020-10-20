import Lyricist from "lyricist";
import dotenv from "dotenv";

dotenv.config();

const lyricist = new Lyricist(process.env.GENIUS as string);

export async function search(id: number) {
	let song:Lyricist.Song = await lyricist.song(id, { fetchLyrics: true });
    
    while (song.lyrics == "") {
        song = await lyricist.song(id, { fetchLyrics: true });
    }
    
    return song;
}
