import { Router } from "express";
import controller from "./controllers/controller";


const routes = Router();

routes.get("/songs", controller.songs);
routes.get("/lyrics", controller.lyrics);


export default routes;
