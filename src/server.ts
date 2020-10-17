import express from "express";
import routes from "./routes";
import "express-async-errors";

import { search } from "./lyrics";
import querystring from "querystring";
import { pln } from "./pln";
import cors from "cors"

const app = express();

app.use(cors())
app.use(express.json());
app.use(routes);

app.listen(3333);
