import { Router } from "express";


import {GetAllGenres } from "../controller/ genre.controller.js";

const genreRouter = Router();


genreRouter.get("/allGenres", GetAllGenres);


export default genreRouter;