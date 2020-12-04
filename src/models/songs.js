"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lyricist_1 = __importDefault(require("lyricist"));
const dotenv_1 = __importDefault(require("dotenv"));
const lyrics_model_1 = __importDefault(require("../database/schemas/lyrics_model"));
dotenv_1.default.config();
const lyricist = new lyricist_1.default(process.env.GENIUS);
async function search_songs(search_string) {
    const songs = await lyricist.search(search_string).catch((error) => {
        console.log(error);
    });
    return songs;
}
exports.search_songs = search_songs;
async function songsByDifficulty(difficulty) {
    const songs = await lyrics_model_1.default.find({ difficulty: difficulty }, (error, documents) => {
        if (error) {
            console.error(error);
        }
    }).sort({ views: -1 }).limit(10);
    return songs;
}
exports.songsByDifficulty = songsByDifficulty;
