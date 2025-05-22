import express from "express";
const router = express.Router();

import {registerUser, loginUser} from "../controllers/auth.controllers.js";

router.post("/register-user", registerUser);
router.post("/login-user", loginUser);
// router.post("/logout-user", logoutUser);
// router.post("/forgot-password", forgotPassword);

export default router;