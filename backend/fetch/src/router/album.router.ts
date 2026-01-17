import { Router } from "express";
import {getAlbumById, getAllAlbum  } from "../controller/album.controller.js";


import {authenticateToken}  from "../config/middleware.js";
const albumRouter = Router();
albumRouter.get("/allAlbum",authenticateToken, getAllAlbum);
albumRouter.get("/albumById",authenticateToken, getAlbumById);

export default albumRouter;