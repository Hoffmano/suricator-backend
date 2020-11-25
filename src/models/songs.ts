import Lyricist from "lyricist";
import dotenv from "dotenv";
import lyrics_collection from "../database/schemas/lyrics_model";

dotenv.config();

const lyricist = new Lyricist(process.env.GENIUS as string);

export async function search_songs(search_string: string) {
  const songs = await lyricist.search(search_string).catch((error) => {
    console.log(error);
  });

  return songs as any[];
}

export async function songsByDifficulty(difficulty: any) {
  const songs = await lyrics_collection.find(
    { difficulty: difficulty },
    (error, documents) => {
      if (error) {
        console.error(error);
      }
    }
  ).sort({views:-1});

  return songs
}
