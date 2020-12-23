import Lyricist from "lyricist";
declare namespace Types {
	interface Song extends Lyricist.SearchResult{
		lyrics: string;
		difficulty: string;
		media: {
			provider: string;
			url: string;
		}[];
		artist: string;
		album_cover:string;
	}
}

export = Types