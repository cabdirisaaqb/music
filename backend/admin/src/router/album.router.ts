import { Router } from "express";
import { createAlbum, DeleteAlbum, UpdateAlbum } from "../controller/album.controller.js";
import upload from "../config/multer.js";

import {authenticateToken,authorizeRole}  from "../config/middleware.js";
const albumRouter = Router();
albumRouter.post("/albumCreate", authenticateToken, authorizeRole,upload.single("img"), createAlbum);
albumRouter.put("/albumUpdate/:id",  authenticateToken, authorizeRole,upload.single("img"), UpdateAlbum);
albumRouter.delete("/albumDelete/:id", authenticateToken, authorizeRole,DeleteAlbum);


export default albumRouter;