import express from "express";
const router = express.Router();

import {registerUser, loginUser, getUserRole} from "../controllers/auth.controllers.js";
import { verifyUser } from "../middlewares/auth.middleware.js";
import { UserValidator } from "../utils/validators/user.validators.js";

router.post("/register-user", UserValidator,registerUser);
router.post("/login-user", loginUser);
router.get("/get-user-role", verifyUser, getUserRole);

export default router;