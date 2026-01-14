import express from "express";
import Env from "./config/env.js";
import cors from "cors";
import cookieParser from 'cookie-parser';
import albumRouter from "./router/album.router.js";
import songRouter from "./router/song.router.js";
import db from "./config/db.js";
import genreRouter from "./router/genre.router.js";
const app = express();
app.use(express.json({ limit: "300mb" }));
app.use(express.urlencoded({ extended: true, limit: "300mb" }));
app.use(cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(cookieParser());
app.use( genreRouter);
app.use(albumRouter);
app.use(songRouter);
//api genre admin routes
db.connect().then(() => {
    console.log("Database connected successfully");
}).catch((error) => {
    console.error("Database connection failed:", error.message);
});
app.listen(Env.PORT, () => {
    console.log(`Server is running  http://localhost:${Env.PORT} `);
});
