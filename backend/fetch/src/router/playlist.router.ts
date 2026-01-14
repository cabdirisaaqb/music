import { Router } from "express";
import { playlistGet } from "../controller/playlist.controller.js";


import {authenticateToken}  from "../config/middleware.js";
const playlistRouter = Router();


playlistRouter.get("/allPlaylist",authenticateToken,playlistGet );


export default playlistRouter;