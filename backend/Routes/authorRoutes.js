const express = require("express");
const {
  createAuthor,
  searchAuthors,
} = require("../controller/authorController");
const router = express.Router();

router.post("/", createAuthor);
router.get("/search", searchAuthors);

module.exports = router;
