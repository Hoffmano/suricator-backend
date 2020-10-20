import { Router } from "express";
import controller from "./controllers/controller";


const routes = Router();

routes.get("/lyrics", controller.lyrics);
routes.get("/songs", controller.songs);


export default routes;
