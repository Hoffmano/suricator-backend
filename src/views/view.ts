import Lyricist from "lyricist";

export default {
	render_songs(song: Lyricist.SearchResult) {
		return {
			id: song.id,
			title: song.title,
			artist: song.primary_artist.name,
            album_cover: song.header_image_thumbnail_url,
		};
	},

	render_many_songs(songs: Lyricist.SearchResult[]) {
		return songs.map((song) => this.render_songs(song));
	},

	render_song(song: Lyricist.Song) {
		return {
			title: song.title,
			artist: song.primary_artist.name,
			spotify: song.media.find((media) => media.provider == "spotify")
				?.url,
            lyrics: song.lyrics,
            album_cover: song.header_image_thumbnail_url,
		};
	},
};
