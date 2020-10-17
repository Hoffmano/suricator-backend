import Lyricist from "lyricist";

const lyricist = new Lyricist(
	"RDH4LAPsVqv2BIl2SMge1vx3smzx0p6IZSHBeJZWXv7EO5wMOcP0ont0LiaJ3osO"
);

export async function search(s:string) {
    const hits = await lyricist.search(s);
    let song = {lyrics:""}
    while (song.lyrics == "") {
        song = await lyricist.song(hits[0].id, { fetchLyrics: true });
    }
	return song.lyrics;
}






