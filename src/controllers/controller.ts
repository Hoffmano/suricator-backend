import { Request, Response } from "express";
import { setOriginalNode } from "typescript";
import { search } from "../models/lyrics";
import { search_songs } from "../models/songs";
import { pln } from "./pln";
import views, { song_nlp } from "../views/view";
import Lyricist from "lyricist";

export default {
	async lyrics(request: Request, response: Response) {
		const { id } = request.query;

		const song: Lyricist.Song = await search((id as unknown) as number);

		song.lyrics = song.lyrics.replace(/[(?<=\[)](.*?)[(?=\])]/g, "");

		const count = await pln(song.lyrics);

		var song_nlp = <song_nlp>{};

		Object.assign(song_nlp, song);
		Object.assign(song_nlp, {
			sentence_count: count,
		});

		return response.json(views.render_song(song_nlp));
	},

	async songs(request: Request, response: Response) {
		const { search_string } = request.query;
		const songs = await search_songs(search_string as string);
		return response.json(views.render_many_songs(songs));
	},
};
