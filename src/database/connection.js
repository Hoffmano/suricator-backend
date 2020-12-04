"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
exports.default = mongoose_1.default.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useFindAndModify: true,
    useUnifiedTopology: true,
});
exports.database = mongoose_1.default.connection;
exports.database.once("open", () => {
    console.log("Connected with MongoDB");
});
exports.database.on("error", (error) => {
    console.error(error);
});
