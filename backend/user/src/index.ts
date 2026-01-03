import express, { type Express } from "express";
import Env from "./config/env.js";
import db from "./config/db.js";
import users_table from "./model/User.model.js";
import songs from "./model/songs.js";
import album from "./model/album.js";
import playlist from "./model/playlist.js";
import genre from "./model/genre.js";
import cors from "cors";
import cooke_parser from "cookie-parser";


const app: Express = express();
app.use(express.json({limit: '100mb'}));
app.use(express.urlencoded({ extended: true, limit: '100mb'}));
app.use(cors({
  origin: "*",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(cooke_parser());


db.connect().then(async() => {
 try {
  console.log("Database connected");
  await users_table()
  await songs()
  await album()
  await genre()
  await playlist()
  
 } catch (error) {
  console.log("x",error);
  
 }
}).catch((err) => {
  console.log("....",err);
});


app.get("/", (_, res) => {
  res.send("Hello World");
});


app.listen(Env.PORT, () => {
  console.log(`Server is running http://localhost:${Env.PORT} `);
});
