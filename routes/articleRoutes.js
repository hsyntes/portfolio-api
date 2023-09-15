const express = require("express");

const {
  getArticles,
  getArticle,
  createArticle,
  updateArticle,
} = require("../controllers/articleController");

const {
  verifyToken,
  roleBasedAccessControl,
} = require("../controllers/authController");

const router = express.Router();

router.get("/", getArticles);
router.get("/:id", getArticle);

// * Protect after this
router.use(verifyToken);

// * Role-Based Access Control
router.post("/", roleBasedAccessControl, createArticle);
router.patch("/:id", roleBasedAccessControl, updateArticle);

module.exports = router;