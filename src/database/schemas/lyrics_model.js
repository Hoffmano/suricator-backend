"use strict";
// import { Schema, Document } from "mongoose";
// const mongoose = require("mongoose")
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const lyrics_schema = new mongoose_1.default.Schema({
    id: {
        type: Number,
        required: true,
    },
    lyrics: {
        type: String,
        required: true,
    },
    difficulty: {
        type: String,
        required: false,
    },
    artist: {
        type: String,
    },
    title: {
        type: String,
    },
    album_cover: {
        type: String,
    },
    version: {
        type: Number,
    },
    views: {
        type: Number,
    },
});
exports.default = mongoose_1.default.model("lyrics", lyrics_schema, "lyrics");
