const express = require("express");
const {
  getBook,
  getAllBooks,
  createBook,
} = require("../controller/bookController");
const router = express.Router();

router.get("/:id", getBook);
router.get("/", getAllBooks);
router.post("/", createBook);

module.exports = router;
