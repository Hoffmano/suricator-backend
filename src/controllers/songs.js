"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const songs_1 = require("../models/songs");
const render_1 = __importDefault(require("../views/render"));
exports.default = {
    async search_songs(request, response) {
        const { search_string } = request.query;
        const songs = await songs_1.search_songs(search_string).catch((error) => {
            console.log(`error: ${error}`);
        });
        return response.json(render_1.default.render_many_songs(songs));
    },
    async songsByDifficulty(request, response) {
        const { difficulty } = request.query;
        const songs = await songs_1.songsByDifficulty(difficulty);
        return response.json(render_1.default.renderSongsByDifficulty(songs));
    },
};
