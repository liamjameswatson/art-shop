import { response } from "express";
import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";
import { AppError } from "../utils/appError.js";
// import sendEmail from "../email.js";
import { Email } from "../email.js";
import crypto from "crypto";

// @desc Login, Authenticate user & get token
// @route POST /api/users/login
// @access Public

const loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError("Please fill in the form", 400));
  }

  // Check for user
  const user = await User.findOne({ email }).select("+password");

  // Check if user exists and password is correct          matchPassword is a method on the User model
  if (!user || !(await user.matchPassword(password, user.password))) {
    return next(new AppError("Please provide a valid email and password", 401));
  } else {
    const token = generateToken(res, user._id);
    // console.log(token);

    res.status(201).json({
      status: "success",
      token,
      name: user.name,
      email: user.email,
      role: user.role,
    });
  }
});

// @desc Create new user
// @route POST /api/users
// @access Public

const signUpUser = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;

  // Check for existing user
  const userExists = await User.findOne({ email });

  if (userExists) {
    return next(new AppError("User already exists", 400));
  }

  // else create new user
  const newUser = await User.create({
    name,
    email,
    password,
  });

  if (newUser) {
    // send an email
    // const url = "http://localhost:5173/login";
    const url = `${req.protocol}://${req.get("host")}/login}`;
    console.log("url =", url);
    await new Email(newUser, url).sendWelcome();
    // if user generate a token and send info back to client
    const token = generateToken(res, newUser._id);

    res.status(201).json({
      status: "success",
      token,
      data: {
        user: newUser,
      },
    });
  } else {
    return next(new AppError("Invalid user data", 400));
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
  const users = await User.find({});
  res.status(200).json({
    status: "suceess",
    result: users.length,
    data: {
      users,
    },
  });
});

// @desc Get user by ID
// @route Get /api/user/:id
// @access Private / Admin

const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");

  if (user) {
    return res.json(user);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc Update users
// @route Put /api/users/:id
// @access Private /Admin

const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    // use the new name or the existing name
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    const updatedUser = await user.save();

    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc Delete users
// @route Delete /api/users/:id
// @access Private /Admin

const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    if (user.role === "admin") {
      res.status(400);
      throw new Error("Cannot delete an admin user");
    }
    await User.deleteOne({ _id: user._id });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

const forgotPassword = asyncHandler(async (req, res, next) => {
  if (!req.body.email) {
    return next(new AppError("Please provide a valid email address", 404));
  }
  // Get user based on email
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new AppError("No email address found, please contact us", 404));
  }

  // Gerenerate a random token
  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  // Send token in an email

  // const message = `Forgot your password? Submit a PUT request with your new password and password confirm to ${resetURL}.\n If you didn't forget your password please ignore this email`;

  try {
    //   await sendEmail({
    //     email: req.body.email,
    //     subject: "Password reset (valid for 10 mins)",
    //     message,
    //   });
    const resetURL = `${req.protocol}://${req.get(
      "host"
    )}/api/users/reset-password/${resetToken}`;
    await new Email(user, resetURL).sendPasswordReset();

    res.status(200).json({
      status: "success",
      message: "Email has been sent successfully",
    });
  } catch (error) {
    user.passwordResetToken = undefined;
    user.passwordResetExpiresAtAt = undefined;
    await user.save({ validateBeforeSave: false });
    console.log(error);
    return next(
      new AppError("There was an error sending the email. Please try again"),
      500
    );
  }
});
const resetPassword = asyncHandler(async (req, res, next) => {
  //1) Get user based on token
  const hashedToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpiresAt: { $gt: Date.now() },
  });

  console.log(user);
  //2) If token has not expired, and there is user, set the new password
  if (!user) {
    console.log("none");
    return next(new AppError("Token is invalid or expired", 400));
  }

  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetExpiresAt = undefined;
  await user.save();

  //3) Update changedPassword propert for the user

  //4) Log the user in, send JWT
  generateToken(res, user._id);
});

export {
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
};
