const express = require("express");
const {
  getDocuments,
  searchDocuments,
} = require("../controllers/documentController");

const router = express.Router();

router.get("/", getDocuments);
router.get("/search/:q", searchDocuments);

module.exports = router;
