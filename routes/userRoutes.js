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

router.use(verifyToken);

router.get("/current-user", getCurrentUser);

module.exports = router;
