"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    render_songs(song) {
        return {
            id: song.id,
            title: song.title,
            artist: song.primary_artist.name,
            album_cover: song.header_image_thumbnail_url,
        };
    },
    render_many_songs(songs) {
        return songs.map((song) => this.render_songs(song));
    },
    render_song(song) {
        var _a;
        return {
            title: song.title,
            artist: song.primary_artist.name,
            spotify: (_a = song.media.find((media) => media.provider == "spotify")) === null || _a === void 0 ? void 0 : _a.url,
            lyrics: song.lyrics,
            album_cover: song.header_image_thumbnail_url,
            difficulty: song.difficulty,
        };
    },
    render_song_database(song) {
        return {
            title: song.title,
            artist: song.artist,
            lyrics: song.lyrics,
            album_cover: song.album_cover,
            difficulty: song.difficulty,
        };
    },
    renderSongsByDifficulty(songs) {
        return songs.map((song) => this.renderSongByDifficulty(song));
    },
    renderSongByDifficulty(song) {
        return {
            id: song.id,
            title: song.title,
            artist: song.artist,
            album_cover: song.album_cover,
        };
    }
};
