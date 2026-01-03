import express, { type Express } from "express";
import Env from "./config/env.js";
import proxy from "express-http-proxy";
import { rateLimit} from "express-rate-limit";

const app: Express = express();
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: (req: any) => (req.user ? 1000 : 100),
  message:
    "Too many accounts created from this IP, please try again after an hour",
  legacyHeaders: true,
  standardHeaders: true,
  
});
app.set("trust proxy", 1);
app.use(limiter);
app.use(express.json({limit: '100mb'}));
app.use(express.urlencoded({ extended: true, limit: '100mb'}));
app.use("/api/v1/user", proxy("http://localhost:7002"));
app.use("/api/v1/upload", proxy("http://localhost:7005"));
app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(Env.PORT, () => {
  console.log(`Server is running http://localhost:${Env.PORT} `);
});
