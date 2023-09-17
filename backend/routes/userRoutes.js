import express from "express";

import {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";

import { protect, protectAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

// GET all users, register user
router.route("/").get(protect, protectAdmin, getUsers).post(registerUser);

// login user
router.post("/login", authUser);

// logout user
router.post("/logout", logoutUser);

// get and update user profile (user route)
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

// get, update and delete user  (admin route)
router
  .route("/:id")
  .get(protect, protectAdmin, getUserById)
  .put(protect, protectAdmin, updateUser)
  .delete(protect, protectAdmin, deleteUser);

export default router;
