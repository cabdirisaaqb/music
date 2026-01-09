import { Router } from "express";


import { createGenre, UpdateGenre, DeleteGenre, GetAllGenres } from "../controller/ genre.controller.js";

const genreRouter = Router();

genreRouter.post("/genreCreate", createGenre);
genreRouter.put("/genreUpdate/:id", UpdateGenre);
genreRouter.delete("/genreDelete/:id", DeleteGenre);
genreRouter.get("/allGenres", GetAllGenres);


export default genreRouter;