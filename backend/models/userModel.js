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
      enum: ['user', 'admin'],
      default: 'user',
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

// when a new user registers, hash the password before saving in db
userSchema.pre("save", async function (next) {
  // if the password is modified move on
  if (!this.isModified("password")) {
    next();
  }

  // If the password has been modified, generate a salt for hashing.
  const salt = await bcrypt.genSalt(10);

  // Hash the user's password using the generated salt.
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const User = mongoose.model("User", userSchema);

export default User;
