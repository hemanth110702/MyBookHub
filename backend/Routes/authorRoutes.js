const express = require("express");
const { createAuthor } = require("../controller/authorController");
const router = express.Router();

router.post("/", createAuthor);

module.exports = router;
