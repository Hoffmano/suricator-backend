import { Request, Response } from "express";
import { search_song_lyrics, search_song } from "../models/lyrics";
import views from "../views/render";
import lyrics_collection, { lyrics_interface } from "../database/schemas/lyrics_model";

export default {
	async get_lyrics(request: Request, response: Response) {
		const { id } = request.query;

		lyrics_collection.findOne(
			{ id: id },
			async (error:any, document: lyrics_interface) => {
				if (error) return console.error(error);
				if (document) {
					let song = await search_song((id as unknown) as number, document.lyrics);
					song = { ...song, lyrics: document.lyrics };
					return response.json(views.render_song(song));
				} else {
					const song = await search_song_lyrics((id as unknown) as number);
					lyrics_collection.create({
						id: id,
						lyrics: song.lyrics,
					});
					return response.json(views.render_song(song));
				}
			}
		);
	},
};