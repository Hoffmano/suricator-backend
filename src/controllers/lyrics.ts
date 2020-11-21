import { Request, Response } from "express";
import { search_song_lyrics, search_song } from "../models/lyrics";
import views from "../views/render";
import lyrics_collection, {
  lyrics_interface,
} from "../database/schemas/lyrics_model";

export default {
  async get_lyrics(request: Request, response: Response) {
    const { id } = request.query;

    lyrics_collection.findOne(
      { id: id },
      async (error: any, document: lyrics_interface) => {
        if (error) return console.error(error);

        if (document) {
          console.log("achou no banco de dados");
          console.log(`letra no banco de dados: ${document.lyrics}`);

          let song = await search_song(
            (id as unknown) as number,
            document.lyrics
          ).catch((error) => {
            console.log(error);
          });

          song = { ...song, lyrics: document.lyrics };

          song.lyrics = song.lyrics.replace(/(\[.*\])|(\(.*\))/g, "");

          console.log(song);

          return response.json(views.render_song(song));
        } else {
          console.log("não achou no banco de dados");

          const song = await search_song_lyrics(
            (id as unknown) as number
          ).catch((error) => {
            console.log(error);
          });

          song.lyrics = song.lyrics.replace(/(\[.*\])|(\(.*\))/g, "");

          lyrics_collection
            .create({
              id: id,
              lyrics: song.lyrics,
            })
            .catch((error: any) => {
              console.log(error);
            });

          console.log(song);

          return response.json(views.render_song(song));
        }
      }
    );
  },
};
