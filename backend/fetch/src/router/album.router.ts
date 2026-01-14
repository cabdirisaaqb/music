import { Router } from "express";
import {getAllAlbum  } from "../controller/album.controller.js";


import {authenticateToken}  from "../config/middleware.js";
const albumRouter = Router();
albumRouter.get("/allAlbum",authenticateToken, getAllAlbum);

export default albumRouter;