import express from "express";
import {
  getAdmins,
  getMyProfile,
  login,
  logout,
  register,
} from "../controller/user.controller.js";
import { isAuthenticated } from "../middleware/authUser.js";
import { updateProfilePhoto } from "../controller/user.controller.js";
import { forgotPassword } from "../controller/user.controller.js";
import { resetPassword } from "../controller/user.controller.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", isAuthenticated, logout);
router.get("/my-profile", isAuthenticated, getMyProfile);
router.get("/admins", getAdmins);
router.put("/update-photo/:id", updateProfilePhoto);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:id/:token", resetPassword);

export default router;
