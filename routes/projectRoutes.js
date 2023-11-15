const express = require("express");

const {
  getProjects,
  getProjectById,
  getProjectByName,
  createProject,
  updateProject,
} = require("../controllers/projectController");

const {
  verifyToken,
  roleBasedAccessControl,
} = require("../controllers/authController");

const router = express.Router();

router.get("/", getProjects);
router.get("/id/:id", getProjectById);
router.get("/name/:name", getProjectByName);

// * Protect after this
router.use(verifyToken);

// * Role-Based Access Control
// router.post("/", roleBasedAccessControl, createProject);
// router.patch("/:id", roleBasedAccessControl, updateProject);

module.exports = router;
