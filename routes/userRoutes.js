const express = require("express");

const {
  signup,
  login,
  verifyToken,
  getCurrentUser,
} = require("../controllers/authController");

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);

// * Protect after this
router.use(verifyToken);

router.get("/authorization/current-user", getCurrentUser);

module.exports = router;
