import { Request, Response } from "express";
import { search } from "../lyrics";
import { pln } from "../pln";

export default {
	async lyrics(request: Request, response: Response) {
		let lyrics = "";
		let { search_string } = request.query;

		// const search_string = request.query
		// console.log(search_string);
		lyrics = await search(search_string as string);

		lyrics = lyrics.replace(/[(?<=\[)](.*?)[(?=\])]/g, "");

		let count: any = await pln(lyrics);
		console.log(lyrics);
		return response.json({
			lyrics: lyrics,
			sentence_count: count.sentences,
		});
	},
};
