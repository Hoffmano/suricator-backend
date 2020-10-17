import Lyricist from "lyricist";

require("dotenv").config();

const lyricist = new Lyricist(process.env.GENIUS as string);

export async function search(s:string) {
    const hits = await lyricist.search(s);
    let song = {lyrics:""}
    while (song.lyrics == "") {
        song = await lyricist.song(hits[0].id, { fetchLyrics: true });
    }
	return song.lyrics;
}






