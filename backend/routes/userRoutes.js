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
  getCurrentUser,
  deleteCurrentUser,
} from "../controllers/userController.js";

import { protect, restrictTo } from "../middleware/authMiddleware.js";

const router = express.Router();

// GET all users, register user
// router.route("/").get(protect, protectAdmin, getUsers).post(signUpUser);
router.route("/").get(protect, restrictTo("admin"), getUsers).post(signUpUser);

// login user
router.post("/login", loginUser);

router
  .route("/profile2")
  .get(protect, getCurrentUser)
  .put(protect, updateUserProfile)
  .delete(protect, restrictTo("admin"), deleteUser);
// router.route("/getCurrentAdminUser").get(
//   protect,
//   restrictTo("admin"),
//   getCurrentAdminUser
// );

// logout user
router.post("/logoutUser", logoutUser);

router.post("/forgot-password", forgotPassword);
router.put("/reset-password/:token", resetPassword);

router.delete("/deleteMe", protect, deleteCurrentUser);

// .delete(protect, protectAdmin, deleteUser);

// get and update user profile (user route)
// router
//   .route("/profile2")
//   .get(protect, getUserProfile)
//   .put(protect, updateUserProfile);

// get, update and delete user  (admin route)
router
  .route("/:id")
  // .get(protect, protectAdmin, getUserById)
  .get(protect, getUserById)

  // .put(protect, protectAdmin, updateUser)
  .put(protect, updateUser)

  // .delete(protect, protectAdmin, deleteUser);
  .delete(protect, restrictTo("admin"), deleteUser);

export default router;
