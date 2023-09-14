const ErrorProvider = require("../classes/ErrorProvider");
const { JsonWebTokenError, TokenExpiredError } = require("jsonwebtoken");

// ! 409: Duplicate Error 11000
const duplicateError = (err) => {
  if (
    err.keyPattern.hasOwnProperty("username") ||
    err.keyPattern.hasOwnProperty("email")
  )
    return new ErrorProvider(409, "fail", "That user already exists.");

  if (
    err.keyPattern.hasOwnProperty("project_name") ||
    err.keyPattern.hasOwnProperty("project_logo") ||
    err.keyPattern.hasOwnProperty("project_link") ||
    err.keyPattern.hasOwnProperty("project_repo")
  )
    return new ErrorProvider(409, "fail", "That project already exists.");

  if (err.keyPattern.hasOwnProperty("article_title"))
    return new ErrorProvider(409, "fail", "That article already exists.");

  if (
    err.keyPattern.hasOwnProperty("icon_link") ||
    err.keyPattern.hasOwnProperty("icon_name")
  )
    return new ErrorProvider(409, "fail", "That icon already exists.");

  return new ErrorProvider(409, "fail", err.message);
};

// ! 403: Forbidden
const validationError = (err) => {
  const messages = err.message.split(",");

  const message = messages
    .map((message, index) => message.split(":").at(index === 0 ? 2 : 1))
    .join("")
    .trim();

  return new ErrorProvider(403, "fail", message);
};

const jsonWebTokenError = () =>
  new ErrorProvider(401, "fail", "Authorization failed. Please log in again.");

const tokenExpiredError = () =>
  new ErrorProvider(
    401,
    "fail",
    "Authentication expired. Please log in again."
  );

// * Global error handling
module.exports = (err, req, res, next) => {
  // * Custom error messages for production
  if (process.env.NODE_ENV === "production") {
    if (err.code === 11000) err = duplicateError(err);
    if (err.name === "ValidationError") err = validationError(err);
    if (err instanceof JsonWebTokenError) err = jsonWebTokenError();
    if (err instanceof TokenExpiredError) err = tokenExpiredError();
  }

  // * Standard error messages for development
  if (process.env.NODE_ENV === "development") {
    console.log(err);
    res.status(500).json({
      status: "error",
      err,
    });
  }

  // * Get statusCode from err object
  err.statusCode = err.statusCode || 500;

  // * Get status form err object
  err.status = err.status || "error";

  res.status(err.statusCode).json({
    status: err.status,
    // * Get error messages inherited
    message: err.message,
  });

  next();
};
