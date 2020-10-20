import Lyricist from "lyricist";

export interface song_nlp extends Lyricist.Song {
	sentence_count: number;
}

export default {
	render_songs(song: Lyricist.SearchResult) {
		return {
			id: song.id,
			title: song.title,
			artist: song.primary_artist.name,
		};
	},

	render_many_songs(songs: Lyricist.SearchResult[]) {
		return songs.map((song) => this.render_songs(song));
	},

	render_song(song: song_nlp) {
		return {
			title: song.title,
			artist: song.primary_artist.name,
			spotify: song.media.find((media) => media.provider == "spotify")?.url,
			lyrics: song.lyrics,
		};
	},
};
