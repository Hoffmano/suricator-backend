export default {
	render_songs(song: any) {
		return {
			id: song.id,
			title: song.title,
			artist: song.primary_artist.name,
			album_cover: song.header_image_thumbnail_url,
		};
	},

	render_many_songs(songs: any[]) {
		return songs.map((song) => this.render_songs(song));
	},

	render_song(song: any) {
		return {
			title: song.title,
			artist: song.primary_artist.name,
			spotify: song.media.find(
				(media: any) => media.provider == "spotify"
			)?.url,
			lyrics: song.lyrics,
			album_cover: song.header_image_thumbnail_url,
			difficulty: song.difficulty,
		};
	},
};