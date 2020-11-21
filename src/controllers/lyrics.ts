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
      async (error, document: lyrics_interface) => {
        if (error) return console.error(error);
        if (document) {
          let song = await search_song(
            (id as unknown) as number,
            document.lyrics
          ).catch((error) => {
            console.log(error);
          });
          song = { ...song, lyrics: document.lyrics };
          return response.json(views.render_song(song));
        } else {
          const song = await search_song_lyrics(
            (id as unknown) as number
          ).catch((error) => {
            console.log(error);
          });
          lyrics_collection
            .create({
              id: id,
              lyrics: song.lyrics,
            })
            .catch((error) => {
              console.log(error);
            });
          return response.json(views.render_song(song));
        }
      }
    );
  },
};
