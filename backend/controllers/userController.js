import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/userModel.js";

// @desc login, Authenticate user & get token
// @route POST /api/users/login
// @access Public

const authUser = asyncHandler(async (req, res) => {
  res.send("auth user");
});

// @desc Create new user
// @route POST /api/users
// @access Public

const registerUser = asyncHandler(async (req, res) => {
  res.send("reigister user");
});

// @desc Logout user && clear cookie
// @route POST /api/users/logout
// @access Private

const logoutUser = asyncHandler(async (req, res) => {
  res.send("logout user");
});

// @desc Get user profile
// @route GET /api/users/profile
// @access Private

const getUserProfile = asyncHandler(async (req, res) => {
  res.send("get user profile");
});

// @desc Update user profile
// @route Put /api/users/profile
// @access Private

const updateUserProfile = asyncHandler(async (req, res) => {
  res.send("update user profile");
});

// @desc Get all users
// @route Get /api/users
// @access Private / Admin

const getUsers = asyncHandler(async (req, res) => {
  res.send("get users");
});

// @desc Get user by ID
// @route Get /api/user/:id
// @access Private / Admin

const getUserById = asyncHandler(async (req, res) => {
  res.send("get user by id");
});

// @desc Update users
// @route Put /api/users/:id
// @access Private /Admin

const updateUser = asyncHandler(async (req, res) => {
  res.send("update user");
});

// @desc Delete users
// @route Delete /api/users/:id
// @access Private /Admin

const deleteUser = asyncHandler(async (req, res) => {
  res.send("delete user");
});

export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
};
