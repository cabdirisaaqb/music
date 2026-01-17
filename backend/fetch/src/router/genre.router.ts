import { Router } from "express";


import { GenreId, GetAllGenres } from "../controller/ genre.controller.js";
import { authenticateToken } from "../config/middleware.js";

const genreRouter = Router();


genreRouter.get("/allGenres",authenticateToken, GetAllGenres);
genreRouter.get("/GenreId",authenticateToken, GenreId);

export default genreRouter;