import { Request, Response } from "express";
import { search_song_lyrics, search_song } from "../models/lyrics";
import views from "../views/render";
import lyrics_collection, {
  lyrics_interface,
} from "../database/schemas/lyrics_model";
import lyrics_model from "../database/schemas/lyrics_model";
import { database } from "../database/connection";

const databaseVersion = 2;

export default {
  async get_lyrics(request: Request, response: Response) {
    const { id } = request.query;

    lyrics_collection.findOne({ id: id }, async (error: any, document: any) => {
      if (error) return console.error(error);

      if (document) {
        if (document.version == databaseVersion) {
          if (document.views) {
            lyrics_collection
              .updateOne(document, {
                $inc: { views: 1 },
              })
              .then(() => {
                document.save();
              });
          } else {
            lyrics_collection
              .updateOne(document, {
                $set: {
                  views: 1,
                },
              })
              .then(() => {
                document.save();
              });
          }

          return response.json(views.render_song_database(document));
        }

        let song = await search_song(
          (id as unknown) as number,
          document.lyrics
        ).catch((error) => {
          console.log(error);
        });

        song = { ...song, lyrics: document.lyrics };

        song.lyrics = song.lyrics.replace(/(\[.*\])|(\(.*\))/g, "");

        await lyrics_collection.updateOne(document, {
          $set: {
            version: databaseVersion,
            difficulty: song.difficulty,
            lyrics: song.lyrics,
            title: song.title,
            artist: song.primary_artist.name,
            album_cover: song.header_image_thumbnail_url,
          },
        });

        await document.save();

        return response.json(views.render_song(song));
      } else {
        console.log("não achou no banco de dados");

        const song = await search_song_lyrics((id as unknown) as number).catch(
          (error) => {
            console.log(error);
          }
        );

        song.lyrics = song.lyrics.replace(/(\[.*\])|(\(.*\))/g, "");

        lyrics_collection
          .create({
            id: song.id,
            version: databaseVersion,
            difficulty: song.difficulty,
            artist: song.primary_artist.name,
            lyrics: song.lyrics,
            album_cover: song.header_image_thumbnail_url,
          })
          .catch((error: any) => {
            console.log(error);
          });

        console.log(song);

        return response.json(views.render_song(song));
      }
    });
  },
};
