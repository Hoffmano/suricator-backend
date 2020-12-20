import { Request, Response } from "express";
import { search_songs, songsByDifficulty } from "../models/songs";
import views from "../views/render";

export default {
  async search_songs(request: Request, response: Response) {
    const { search_string } = request.params;

    const songs = await search_songs(search_string as string).catch((error) => {
      console.log(`error: ${error}`);
    });

    return response.json(views.render_many_songs(songs as any[]));
  },
  async songsByDifficulty(request: Request, response: Response) {
    const { difficulty } = request.params;

    const songs = await songsByDifficulty(difficulty)

    return response.json(views.renderSongsByDifficulty(songs))
  },
};

