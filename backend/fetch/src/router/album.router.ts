import { Router } from "express";
import {getAllAlbum  } from "../controller/album.controller.js";


import {authenticateToken,authorizeRole}  from "../config/middleware.js";
const albumRouter = Router();
albumRouter.get("/allAlbum", getAllAlbum);






export default albumRouter;