import { Router } from "express";

import {
  createGenre,
  DeleteGenre,
  UpdateGenre,
} from "../controller/ genre.controller.js";
import {authenticateToken,authorizeRole}  from "../config/middleware.js";
const genreRouter = Router();

genreRouter.post("/genreCreate",authenticateToken,authorizeRole, createGenre);
genreRouter.put("/genreUpdate/:id", authenticateToken, authorizeRole,UpdateGenre);
genreRouter.delete("/genreDelete/:id",authenticateToken,authorizeRole, DeleteGenre);

export default genreRouter;
