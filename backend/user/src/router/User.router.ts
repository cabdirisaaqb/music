import { Router } from "express";
import { AllUsers, CreateUser, LoginUser,LogoutUser,Me,updateUser } from "../controller/User.controller.js";
import upload from "../config/multer.js";
import {admin, authenticateToken} from "../middleware.js";

const UserRouter = Router();
UserRouter.post("/register",CreateUser)
UserRouter.post("/login",LoginUser)
UserRouter.post("/logout",authenticateToken,LogoutUser)
UserRouter.put("/updateProfile/:id",authenticateToken,upload.single("img"),updateUser)
UserRouter.get("/me",authenticateToken,Me)
UserRouter.get("/allUsers",authenticateToken,admin,AllUsers)

export default UserRouter;

