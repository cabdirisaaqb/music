import { Router } from "express";


import {GetAllGenres } from "../controller/ genre.controller.js";
import { authenticateToken } from "../config/middleware.js";

const genreRouter = Router();


genreRouter.get("/allGenres",authenticateToken, GetAllGenres);


export default genreRouter;