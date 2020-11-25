// import { Schema, Document } from "mongoose";
// const mongoose = require("mongoose")

import mongoose, { Schema, Document } from "mongoose";

export interface lyrics_interface extends Document {
  id: number;
  lyrics: string;
  difficulty: string;
}

const lyrics_schema: any = new mongoose.Schema({
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

export default mongoose.model("lyrics", lyrics_schema, "lyrics");
