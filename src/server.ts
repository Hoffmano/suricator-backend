import express from "express";
import routes from "./routes";
import "express-async-errors";
import cors from "cors";
import "./database/connection.ts";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(process.env.PORT || 3333);
