import { Router } from "express";
import { CreateUser, LoginUser,updateUser } from "./User.controller.js";
import upload from "./config/multer.js";


const UserRouter = Router();
UserRouter.post("/register",CreateUser)
UserRouter.post("/login",LoginUser)
UserRouter.put("/update/:id",upload.single("img"),updateUser)

export default UserRouter;
