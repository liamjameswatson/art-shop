import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";

// @desc Login, Authenticate user & get token
// @route POST /api/users/login
// @access Public

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Check for user
  const user = await User.findOne({ email });


  // Check if user exists and password is correct          matchPassword is a method on the User model
  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
  } // else no matching email or password
  else {
    // 401 unauthorized
    res.status(401);
    throw new Error("Invalid email or password");
  }
  res.send("auth user");
});

// @desc Create new user
// @route POST /api/users
// @access Public

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body;

  // Check for existing user
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400); // 400 client error
    throw new Error("User already exists");
  }

  // else create new user
  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    // if user generate a token and send info back to client
    generateToken(res, user._id);

    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc Logout user && clear cookie
// @route POST /api/users/logout
// @access Private

const logoutUser = asyncHandler(async (req, res) => {
  // set cookie to empty string
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "Logged out successfully" });
});

// @desc Get user profile
// @route GET /api/users/profile
// @access Private

const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id); //req.user._id comes from being logged in

  if (user) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
  } else {
    res.staus(404);
    throw new Error("User not found");
  }
});

// @desc Update user profile
// @route Put /api/users/profile
// @access Private

const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id); //req.user._id comes from being logged in

  if (user) {
    // update a field or keep whatever is in the database
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
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
