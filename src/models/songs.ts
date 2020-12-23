import Lyricist from "lyricist";
import dotenv from "dotenv";
import lyrics_collection from "../database/schemas/lyrics_model";
import { Song } from "../@types/song";

dotenv.config();

const lyricist = new Lyricist(process.env.GENIUS as string);

export async function searchSongs(search_string: string) {
  const songs = await lyricist.search(search_string).catch((error) => {
    console.log(error);
  });

  return songs as Song[];
}

export async function songsByDifficulty(difficulty: string) {
  const songs = await lyrics_collection.find(
    { difficulty: difficulty },
    (error:any) => {
      if (error) {
        console.error(error);
      }
    }
  ).sort({views:-1}).limit(10);

  return songs
}
