"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./routes"));
require("express-async-errors");
const cors_1 = __importDefault(require("cors"));
require("./database/connection.ts");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = express_1.default();
app.use(cors_1.default());
app.use(express_1.default.json());
app.use(routes_1.default);
app.listen(process.env.PORT || 3333);
