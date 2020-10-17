import { Request, Response } from "express";
import { search } from "../lyrics";
import { pln } from "../pln";

export default {
	async lyrics(request: Request, response: Response) {
		let lyrics = "";
		let { search_string } = request.query;

		lyrics = await search(search_string as string);

		lyrics = lyrics.replace(/[(?<=\[)](.*?)[(?=\])]/g, "");

        let count
        count = await pln(lyrics);
        
		return response.json({
			lyrics: lyrics,
			sentence_count: +count,
		});
	},
};
