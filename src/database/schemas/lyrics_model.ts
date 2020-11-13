import { Schema, Document } from "mongoose";

// import mongoose, { Schema, Document } from "mongoose";
const mongoose = require("mongoose") 

export interface lyrics_interface extends Document {
	id: number;
	lyrics: string;
}

const lyrics_schema: Schema = new Schema({
	id: {
		type: Number,
		required: true,
	},
	lyrics: {
		type: String,
		required: true,
	},
});

export default mongoose.model("lyrics", lyrics_schema,"lyrics");