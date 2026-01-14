import express, { type Express } from "express";
import Env from "./config/env.js";
import proxy from "express-http-proxy";
import { rateLimit } from "express-rate-limit";
import morgan from "morgan";
import cors from "cors";

const app: Express = express();
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: (req: any) => (req.user ? 1000 : 100),

  message:
    "Too many accounts created from this IP, please try again after an hour",
  legacyHeaders: true,
  standardHeaders: true,
});


app.use(
  cors({
    origin: Env.FRONTEND,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization", "Accept"],
  })
);
app.use(morgan("dev"));
app.set("trust proxy", 1);
app.use(limiter);
app.use(express.json({ limit: "300mb" }));
app.use(express.urlencoded({ extended: true, limit: "300mb" }));
app.use(
  "/api/v1/user",
  proxy(Env.USER!, {
    parseReqBody: true,
    limit: "300mb",
    proxyReqBodyDecorator: function (bodyContent, srcReq) {
      return bodyContent;
    },
  })
);
app.use(
  "/api/v1/upload",
  proxy(Env.UPLOAD!, {
    parseReqBody: true,
    limit: "300mb",
    proxyReqBodyDecorator: function (bodyContent, srcReq) {
      return bodyContent;
    },
  })
);
//api gateway to admin service
app.use(
  "/api/v1/admin",
  proxy(Env.ADMIN!, {
    parseReqBody: true,
    limit: "300mb",
    proxyReqBodyDecorator: function (bodyContent, srcReq) {
      return bodyContent;
    },
  })
);
app.use(
  "/api/v1/fetch",
  proxy(Env.FETCH!, {
    parseReqBody: true,
    limit: "300mb",
    proxyReqBodyDecorator: function (bodyContent, srcReq) {
      return bodyContent;
    },
  })
);
app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(Env.PORT, () => {
  console.log(`Server is running http://localhost:${Env.PORT} `);
});
