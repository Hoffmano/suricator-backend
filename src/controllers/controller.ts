import { Request, Response } from "express";
import { search } from "../lyrics";
import { pln } from "../pln";

export default {
	async lyrics(request: Request, response: Response) {
		let { search_string } = request.query;

		let song = await search(search_string as string);

		song.lyrics = song.lyrics.replace(/[(?<=\[)](.*?)[(?=\])]/g, "");

        const count = await pln(song.lyrics);
        console.log(song)

		return response.json({
			song,
			pln: {
				sentence_count: +count,
			},
		});
	},
};
