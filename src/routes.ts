import { Router } from "express";
import lyrics from "./controllers/lyrics";
import songs from "./controllers/songs";


const routes = Router();

routes.get("/songs", songs.search_songs);
routes.get("/lyrics", lyrics.get_lyrics);


export default routes;
