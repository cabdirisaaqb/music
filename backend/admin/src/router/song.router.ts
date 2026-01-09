import { Router } from "express";
import { createSong, GetAlbumIdSongs ,UpdateSong, DeleteSong, getAllSongs} from "../controller/song.controller.js";
import upload from "../config/multer.js";

const songRouter = Router();
songRouter.post("/songCreate", upload.fields([
    { name: "audio", maxCount: 1 },
    { name: "img", maxCount: 1 }
]), createSong);

songRouter.put("/songUpdate/:id", upload.fields([
    { name: "audio", maxCount: 1 },
    { name: "img", maxCount: 1 }
]), UpdateSong);

songRouter.delete("/songDelete/:id", DeleteSong);

songRouter.get("/albumIdSongs/:id", GetAlbumIdSongs)
songRouter.get("/allSongs", getAllSongs)

export default songRouter;