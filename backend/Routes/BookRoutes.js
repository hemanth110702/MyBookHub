const express = require("express");
const {
  getBook,
  getAllBooks,
  createBook,
  getRecentBooks,
  getTopBooks,
} = require("../controller/bookController");
const router = express.Router();

router.get("/recent-books", getRecentBooks);
router.get("/top-books", getTopBooks);
router.get("/:username/:title", getBook);
router.get("/", getAllBooks);
router.post("/", createBook);

module.exports = router;
