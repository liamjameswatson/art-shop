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
      lowercase: true,
    },
    password: {
      type: "string",
      required: true,
      trim: true,
      select: false, // do not send in response
    },

    role: {
      type: "string",
      required: true,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  {
    timestamps: true,
  },
  {
    passwordChangedAt: Date,
  }
);

userSchema.pre("save", async function (next) {
  // if not password has been modified, return and run next()         this points at the user document
  if (!this.isModified("password")) return next();
  // encrypt password
  this.password = await bcrypt.hash(this.password, 12);
  // delete passwordConfirm  -- undefined does not get saved - only used for validation not saving -- only input is required
  this.passwordConfirm = undefined;
  next();
});

// if password changed
userSchema.pre("save", async function (next) {
  // if password hasn't been changed or user just been created (document is new), just go to next()
  if (!this.isModified("password") || this.isNew) return next();

  this.passwordChangedAt = Date.now() - 1000; //set to one second in past  to ensure token is always created after password has been changed. Token is created now().
  next();
});

// Check entered password is the same as the hashed one in db
userSchema.methods.matchPassword = async function (
  enteredPassword,
  userPassword
) {
  return await bcrypt.compare(enteredPassword, userPassword); //this.password is the hashed password in db
};

userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimeStamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    // console.log(changedTimeStamp, JWTTimestamp);
    return JWTTimestamp < changedTimeStamp; // if changedTime is more than issued time - set to true. means password was changed after issued
  }
  // False means password has not been changed
  return false;
};

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");

  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  // console.log({ resetToken }, this.passwordResetToken);

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000; //now + 10 mins
  return resetToken;
};

const User = mongoose.model("User", userSchema);

export default User;
