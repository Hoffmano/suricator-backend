import Lyricist from "lyricist";
import { nlp_api } from "../services/nlp";
import dotenv from "dotenv";
import lyrics from "../controllers/lyrics";

dotenv.config();

const lyricist = new Lyricist(process.env.GENIUS as string);

export async function search_song(id: number, lyrics: any) {
  let song: any = await lyricist.song(id);
  
  console.log(lyrics);

  lyrics = lyrics.replace(/(\[.*\])|(\(.*\))/g, "");

  console.log(lyrics);
  
  await nlp_api
    .post("/", {
      id: id,
      lyrics: lyrics,
    })
    .then((response: any) => {
      song = { ...song, difficulty: response.data.difficulty };
    })
    .catch((error) => {
      console.log(error);
    });

  return song;
}

export async function search_song_lyrics(id: number) {
  let song: any = await lyricist
    .song(id, { fetchLyrics: true })
    .catch((error) => {
      console.log(error);
    });

  while (song.lyrics == "") {
    song = await lyricist.song(id, { fetchLyrics: true }).catch((error) => {
      console.log(error);
    });
  }

  song.lyrics = song.lyrics.replace(/(\[.*\])|(\(.*\))/g, "");

  await nlp_api
    .post("/", {
      id: id,
      lyrics: song.lyrics,
    })
    .then((response: any) => {
      song = { ...song, difficulty: response.data.difficulty };
	  console.log(song.lyrics)
	})
	  .catch((error) => {
      console.log(error);
    });

  return song;
}
