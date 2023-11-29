const express = require("express");
const { getCertifications } = require("../controllers/certificationController");

const router = express.Router();

router.get("/", getCertifications);

module.exports = router;
