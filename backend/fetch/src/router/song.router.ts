import { Router } from "express";
import {  GetAlbumIdSongs , getAllSongs} from "../controller/song.controller.js";

const songRouter = Router();
import {authenticateToken}  from "../config/middleware.js";

songRouter.get("/albumIdSongs/:id",authenticateToken, GetAlbumIdSongs)
songRouter.get("/allSongs",authenticateToken, getAllSongs)
export default songRouter;