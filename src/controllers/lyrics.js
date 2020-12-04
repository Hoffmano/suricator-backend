"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lyrics_1 = require("../models/lyrics");
const render_1 = __importDefault(require("../views/render"));
const lyrics_model_1 = __importDefault(require("../database/schemas/lyrics_model"));
const databaseVersion = 7;
exports.default = {
    async get_lyrics(request, response) {
        const { id } = request.query;
        lyrics_model_1.default.findOne({ id: id }, async (error, document) => {
            if (error)
                return console.error(error);
            if (document) {
                if (document.version == databaseVersion) {
                    if (document.views) {
                        lyrics_model_1.default
                            .updateOne(document, {
                            $inc: { views: 1 },
                        })
                            .then(() => {
                            document.save();
                        });
                    }
                    else {
                        lyrics_model_1.default
                            .updateOne(document, {
                            $set: {
                                views: 1,
                            },
                        })
                            .then(() => {
                            document.save();
                        });
                    }
                    if (document.difficulty == "" || undefined) {
                        const song = await lyrics_1.search_song_lyrics(id).catch((error) => {
                            console.log(error);
                        });
                        song.lyrics = await song.lyrics.replace(/(\[.*\])|(\(.*\))/g, "");
                        await lyrics_model_1.default.updateOne(document, {
                            $set: {
                                version: databaseVersion,
                                difficulty: song.difficulty,
                                lyrics: song.lyrics,
                                title: song.title,
                                artist: song.primary_artist.name,
                                album_cover: song.header_image_thumbnail_url,
                            },
                        });
                        await document.save();
                        return response.json(render_1.default.render_song_database(document));
                    }
                    else {
                        return response.json(render_1.default.render_song_database(document));
                    }
                }
                let song = await lyrics_1.search_song(id, document.lyrics).catch((error) => {
                    console.log(error);
                });
                song = Object.assign(Object.assign({}, song), { lyrics: document.lyrics });
                song.lyrics = song.lyrics.replace(/(\[.*\])|(\(.*\))/g, "");
                await lyrics_model_1.default.updateOne(document, {
                    $set: {
                        version: databaseVersion,
                        difficulty: song.difficulty,
                        lyrics: song.lyrics,
                        title: song.title,
                        artist: song.primary_artist.name,
                        album_cover: song.header_image_thumbnail_url,
                    },
                });
                if (document.views) {
                    lyrics_model_1.default
                        .updateOne(document, {
                        $inc: { views: 1 },
                    })
                        .then(() => {
                        document.save();
                    });
                }
                else {
                    lyrics_model_1.default
                        .updateOne(document, {
                        $set: {
                            views: 1,
                        },
                    })
                        .then(() => {
                        document.save();
                    });
                }
                await document.save();
                return response.json(render_1.default.render_song(song));
            }
            else {
                console.log("não achou no banco de dados");
                const song = await lyrics_1.search_song_lyrics(id).catch((error) => {
                    console.log(error);
                });
                song.lyrics = song.lyrics.replace(/(\[.*\])|(\(.*\))/g, "");
                lyrics_model_1.default
                    .create({
                    id: song.id,
                    version: databaseVersion,
                    difficulty: song.difficulty,
                    artist: song.primary_artist.name,
                    lyrics: song.lyrics,
                    album_cover: song.header_image_thumbnail_url,
                    title: song.title,
                    views: 1,
                })
                    .catch((error) => {
                    console.log(error);
                });
                console.log(song);
                return response.json(render_1.default.render_song(song));
            }
        });
    },
};
