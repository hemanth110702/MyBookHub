const express = require("express");
const {
  createAuthor,
  searchAuthors,
  checkUsername,
} = require("../controller/authorController");
const router = express.Router();

router.post("/", createAuthor);
router.get("/search", searchAuthors);
router.get("/check-username", checkUsername);

module.exports = router;
