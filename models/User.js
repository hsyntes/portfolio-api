const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

// * Schema design
const userSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      minlength: [2, "Firstname must be 2 characters at least."],
      maxlength: [24, "Firstname must be 24 characters the most."],
      required: [true, "Firstname is required."],
      trim: true,
    },

    lastname: {
      type: String,
      minlength: [2, "Lastname must be 2 characters at least."],
      maxlength: [24, "Lastname must be 24 characters the most."],
      required: [true, "Lastname is required."],
      trim: true,
    },

    username: {
      type: String,
      minlength: [3, "@username must be 3 characters at least."],
      maxlength: [12, "@username must be 12 charactres the most."],
      required: [true, "@username is required."],
      lowercase: true,
      unique: true,
      trim: true,
    },

    email: {
      type: String,
      required: [true, "Email address is required."],
      validate: [validator.isEmail, "Email address is invalid."],
      unique: true,
      trim: true,
      select: false,
    },

    password: {
      type: String,
      minlength: [8, "Password cannot be shorter than 8 characters."],
      maxlength: [32, "Pasword cannot be longer than 32 characters."],
      required: [true, "Password is required."],
      select: false,
    },

    passwordConfirm: {
      type: String,

      validate: {
        validator: function (value) {
          return value === this.password;
        },

        message: "Password doesn't match.",
      },

      required: [true, "Please confirm your password"],

      select: false,
    },

    photo: {
      type: String,
    },

    active: {
      type: Boolean,
      default: true,
      select: false,
    },

    role: {
      type: String,
      enum: {
        type: String,
        values: ["user", "admin"],
      },
      default: "user",
      select: false,
    },
  },
  {
    // * Enable virtual populating
    versionKey: false,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// * Document Middleware
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) next();

  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;

  next();
});

// * Instance Methods
userSchema.methods.isPasswordMatched = async (candidate, password) =>
  await bcrypt.compare(candidate, password);

// * Model
const User = mongoose.model("User", userSchema);

module.exports = User;
