const express = require("express");
const {
  searchDocuments,
  getSuggestionDocuments,
} = require("../controllers/documentController");

const router = express.Router();

router.get("/", getSuggestionDocuments);
router.get("/search/:q", searchDocuments);

module.exports = router;
