import express from "express";
const router = express.Router();

import {registerUser, loginUser} from "../controllers/auth.controllers.js";

import { UserValidator } from "../utils/validators/user.validators.js";

router.post("/register-user", UserValidator,registerUser);
router.post("/login-user", loginUser);

export default router;