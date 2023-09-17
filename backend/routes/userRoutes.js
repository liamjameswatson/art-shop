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

const router = express.Router();

// GET all users, register user
router.route("/").get(getUsers).post(registerUser);

// login user
router.post("/login", authUser);

// logout user
router.post("/logout", logoutUser);

// get and update user profile (user route)
router.route("/profile").get(getUserProfile).put(updateUserProfile);

// get, update and delete user  (admin route)
router.route("/:id").get(getUserById).put(updateUser).delete(deleteUser);

export default router;
