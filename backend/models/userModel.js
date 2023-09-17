import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: "string",
      required: true,
      trim: true,
    },
    email: {
      type: "string",
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: "string",
      required: true,
      trim: true,
    },
    role: {
      type: "string",
      required: true,
      default: "user",
    },
  },
  {
    timestamps: true,
  }
);

// Check entered password is the same as the hashed one in db
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password); //this.password is the hashed password in db
};

const User = mongoose.model("User", userSchema);

export default User;
