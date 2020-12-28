import { Song } from '../@types/song'

export default {
	renderSong(song: Song) {
		return {
			id: song.id,
			title: song.title,
			artist: song.primary_artist.name,
			album_cover: song.header_image_thumbnail_url,
		}
	},

	renderManySongs(songs: Song[]) {
		if (typeof songs === 'object') {
			return songs.map((song: Song) => this.renderSong(song))
		}
	},

	renderLyrics(song: Song) {
		return {
			title: song.title,
			artist: song.primary_artist.name,
			spotify: song.media.find((media: any) => media.provider == 'spotify')
				?.url,
			lyrics: song.lyrics,
			album_cover: song.header_image_thumbnail_url,
			difficulty: song.difficulty,
		}
	},

	renderSongDatabase(song: Song) {
		return {
			title: song.title,
			artist: song.artist,
			lyrics: song.lyrics,
			album_cover: song.album_cover,
			difficulty: song.difficulty,
		}
	},

	renderSongsByDifficulty(songs: Song[]) {
		return songs.map((song) => this.renderSongByDifficulty(song))
	},

	renderSongByDifficulty(song: Song) {
		return {
			id: song.id,
			title: song.title,
			artist: song.artist,
			album_cover: song.album_cover,
		}
	},
}
