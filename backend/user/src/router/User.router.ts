import { Router } from "express";
import upload from "../config/multer.js";
import { CreateUser, LoginUser, LogoutUser, updateUser } from "../controller/User.controller.js";
import { authenticateToken } from "../middleware.js";

const UserRouter = Router();
UserRouter.post("/register",CreateUser)
UserRouter.post("/login",LoginUser)
UserRouter.post("/logout",authenticateToken,LogoutUser)
UserRouter.put("/updateProfile/:id",authenticateToken,upload.single("img"),updateUser)


export default UserRouter;

