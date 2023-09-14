const express = require("express");

const {
  getIcons,
  getIconById,
  getIconByName,
  createIcon,
} = require("../controllers/iconsController");
const {
  verifyToken,
  roleBasedAccessControl,
} = require("../controllers/authController");

const router = express.Router();

router.get("/", getIcons);
router.get("/id/:id", getIconById);
router.get("/name/:name", getIconByName);

// * Protect after this
router.use(verifyToken);

// * Role-Based Access Control
router.post("/", roleBasedAccessControl, createIcon);

module.exports = router;
