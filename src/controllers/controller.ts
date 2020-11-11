import { Request, Response } from "express";
import { search_lyrics, search_song } from "../models/lyrics";
import { search_songs } from "../models/songs";
import views from "../views/view";
import Lyricist from "lyricist";
import lyrics_database, { lyrics_interface } from "../database/schemas/lyrics";

export default {
	async songs(request: Request, response: Response) {
		const { search_string } = request.query;
		const songs = await search_songs(search_string as string);
		return response.json(views.render_many_songs(songs));
	},

	async lyrics(request: Request, response: Response) {
		const { id } = request.query;

		lyrics_database.findOne(
			{ id: id },
			async (error, document: lyrics_interface) => {
				if (error) return console.error(error);
				if (document) {
					let song = await search_song((id as unknown) as number);
					song = { ...song, lyrics: document.lyrics };
					return response.json(views.render_song(song));
				} else {
					const song = await search_lyrics((id as unknown) as number);
					return response.json(views.render_song(song));
				}
			}
		);
	},
};
