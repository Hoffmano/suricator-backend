"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lyricist_1 = __importDefault(require("lyricist"));
const nlp_1 = require("../services/nlp");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const lyricist = new lyricist_1.default(process.env.GENIUS);
async function search_song(id, lyrics) {
    let song = await lyricist.song(id);
    console.log(lyrics);
    lyrics = lyrics.replace(/(\[.*\])|(\(.*\))/g, "");
    lyrics = lyrics.replace("'", "'");
    console.log(lyrics);
    await nlp_1.nlp_api
        .post("/", {
        id: id,
        lyrics: lyrics,
    })
        .then((response) => {
        song = Object.assign(Object.assign({}, song), { difficulty: response.data.difficulty });
    })
        .catch((error) => {
        console.log(error);
    });
    return song;
}
exports.search_song = search_song;
async function search_song_lyrics(id) {
    let song = await lyricist
        .song(id, { fetchLyrics: true })
        .catch((error) => {
        console.log(error);
    });
    while (song.lyrics == "") {
        song = await lyricist.song(id, { fetchLyrics: true }).catch((error) => {
            console.log(error);
        });
    }
    song.lyrics = song.lyrics.replace(/(\[.*\])|(\(.*\))/g, "");
    song.lyrics = song.lyrics.replace("'", "'");
    await nlp_1.nlp_api
        .post("/", {
        id: id,
        lyrics: song.lyrics,
    })
        .then((response) => {
        song = Object.assign(Object.assign({}, song), { difficulty: response.data.difficulty });
        console.log(song.lyrics);
    })
        .catch((error) => {
        console.log(error);
    });
    return song;
}
exports.search_song_lyrics = search_song_lyrics;
