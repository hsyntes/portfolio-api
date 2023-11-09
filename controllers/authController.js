const ErrorProvider = require("../classes/ErrorProvider");
const User = require("../models/User");
const generateToken = require("../utils/generateToken");
const jsonwebtoken = require("jsonwebtoken");

exports.signup = async (req, res, next) => {
  try {
    const user = await User.create({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
    });

    generateToken(res, 201, "You've signed up successfully.", user);
  } catch (e) {
    next(e);
  }
};

exports.login = async (req, res, next) => {
  try {
    if (!req.body.username || !req.body.password)
      return next(
        new ErrorProvider(403, "fail", "@username and password are required.")
      );

    const { username, password } = req.body;

    const user = await User.findOne({ username }).select("+password");

    if (!user)
      return next(
        new ErrorProvider(
          404,
          "fail",
          "User not found. You can sign up with that username."
        )
      );

    if (!(await user.isPasswordMatched(password, user.password)))
      return next(new ErrorProvider(403, "fail", "Password doesn't match."));

    generateToken(res, 200, `Wellcome back ${user.username}!`, user);
  } catch (e) {
    next(e);
  }
};

// * Verifying the token
exports.verifyToken = async (req, res, next) => {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    )
      token = req.headers.authorization.split("Bearer")[1].trim();
    else
      return next(
        new ErrorProvider(401, "fail", "You're not logged in. Please log in.")
      );

    const decoded = jsonwebtoken.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id).select(
      "+password +active +role"
    );

    if (!user)
      return next(new ErrorProvider(404, "fail", "Authentication failed."));

    // * Grant access
    req.user = user;

    next();
  } catch (e) {
    next(e);
  }
};

exports.getCurrentUser = async (req, res, next) => {
  try {
    if (!req.user)
      return next(
        new ErrorProvider(
          404,
          "fail",
          "Authentication failed. Please log in again."
        )
      );

    res.status(200).json({
      status: "success",
      data: {
        currentUser: req.user,
      },
    });
  } catch (e) {
    next(e);
  }
};

// * Role based access control
// exports.roleBasedAccessControl = (req, res, next) => {
//   try {
//     if (req.user.role !== "admin")
//       return next(new ErrorProvider(403, "fail", "Permission denied!"));

//     next();
//   } catch (e) {
//     next(e);
//   }
// };
