import { Router } from "express";
import lyrics from "./controllers/lyrics";
import songs from "./controllers/songs";
import dictionary from "./controllers/dictionary"


const routes = Router();

routes.get("/songs", songs.search_songs);
routes.get("/lyrics", lyrics.get_lyrics);
routes.get("/songs-by-difficulty", songs.songsByDifficulty)
routes.get("/translate/:word", dictionary.translate)


export default routes;
