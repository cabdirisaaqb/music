import { Router } from "express";
import { AllUsers, Me } from "../controller/User.controller.js";

import { authenticateToken, authorizeRole } from "../config/middleware.js";

const UserRouter = Router();
UserRouter.get("/me", authenticateToken, Me);
UserRouter.get("/allUsers", authenticateToken, authorizeRole, AllUsers);

export default UserRouter;
