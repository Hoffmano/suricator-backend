import { Request, Response } from "express";
import { search_songs } from "../models/songs";
import views from "../views/render";

export default {
  async search_songs(request: Request, response: Response) {
    const { search_string } = request.query;
    const songs = await search_songs(search_string as string).catch((error) => {
      console.log(error);
    });
    return response.json(views.render_many_songs(songs as any[]));
  },
};
