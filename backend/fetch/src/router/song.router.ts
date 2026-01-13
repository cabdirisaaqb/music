import { Router } from "express";
import {  GetAlbumIdSongs , getAllSongs} from "../controller/song.controller.js";

const songRouter = Router();


songRouter.get("/albumIdSongs/:id", GetAlbumIdSongs)
songRouter.get("/allSongs", getAllSongs)
export default songRouter;