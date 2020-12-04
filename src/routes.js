"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const lyrics_1 = __importDefault(require("./controllers/lyrics"));
const songs_1 = __importDefault(require("./controllers/songs"));
const dictionary_1 = __importDefault(require("./controllers/dictionary"));
const routes = express_1.Router();
routes.get("/songs", songs_1.default.search_songs);
routes.get("/lyrics", lyrics_1.default.get_lyrics);
routes.get("/songs-by-difficulty", songs_1.default.songsByDifficulty);
routes.get("/translate/:word", dictionary_1.default.translate);
exports.default = routes;
