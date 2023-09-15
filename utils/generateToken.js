const jsonwebtoken = require("jsonwebtoken");

module.exports = (res, status, message, user) => {
  // * Generate token
  const token = jsonwebtoken.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  // * Save the token securely
  res.cookie("jsonwebtoken", token, {
    expires: new Date(
      Date.now() + parseInt(process.env.JWT_EXPIRES_IN) * 24 * 60 * 60 * 1000
    ),
    secure: true,
    sameSite: "none",
  });

  // * Hide the sensetive data
  user.password = undefined;
  user.active = undefined;

  res.status(status).json({
    status: "success",
    token,
    message,
    data: {
      user,
    },
  });
};
