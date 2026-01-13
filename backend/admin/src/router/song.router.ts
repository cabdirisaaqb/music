import { Router } from "express";
import upload from "../config/multer.js";
import { createSong, DeleteSong, UpdateSong } from "../controller/song.controller.js";
import {authenticateToken,authorizeRole}  from "../config/middleware.js";
const songRouter = Router();
songRouter.post("/songCreate", authenticateToken, authorizeRole,upload.fields([
    { name: "audio", maxCount: 1 },
    { name: "img", maxCount: 1 }
]), createSong);

songRouter.put("/songUpdate/:id",  authenticateToken, authorizeRole,upload.fields([
    { name: "audio", maxCount: 1 },
    { name: "img", maxCount: 1 }
]), UpdateSong);

songRouter.delete("/songDelete/:id", authenticateToken, authorizeRole,DeleteSong);
