import express from "express";

import {
  loginUser,
  signUpUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  forgotPassword,
  resetPassword,
} from "../controllers/userController.js";

import { protect, restrictTo } from "../middleware/authMiddleware.js";

const router = express.Router();

// GET all users, register user
// router.route("/").get(protect, protectAdmin, getUsers).post(signUpUser);
router.route("/").get(protect, restrictTo("admin"), getUsers).post(signUpUser);

// login user
router.post("/login", loginUser);

// logout user
router.post("/logout", logoutUser);

router.post("/forgot-password", forgotPassword);
router.put("/reset-password/:token", resetPassword);

// get and update user profile (user route)
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

// get, update and delete user  (admin route)
router
  .route("/:id")
  // .get(protect, protectAdmin, getUserById)
  .get(protect, getUserById)

  // .put(protect, protectAdmin, updateUser)
  .put(protect, updateUser)

  // .delete(protect, protectAdmin, deleteUser);
  .delete(protect, deleteUser);

export default router;
