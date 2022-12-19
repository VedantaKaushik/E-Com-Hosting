import express from "express";
import { VerifyToken } from "../middleware/VerifyToken.js";

const router = express.Router();

import {
  getUserInfo,
  CreateAUser,
  LoginAUser,
  LogoutAUser,
} from "../controllers/AuthController.js";

// Making Routes
// Create User
router.route("/user/create").post(CreateAUser);

// Login User
router.route("/user/login").post(LoginAUser);

// Logout User
router.route("/user/logout").post(VerifyToken, LogoutAUser);

// Get User Detail
router.route("/user/getinfo").get(VerifyToken, getUserInfo);

export default router;
