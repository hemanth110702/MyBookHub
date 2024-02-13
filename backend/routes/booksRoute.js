import express from "express";
import mongoose from "mongoose";
import Joi from "joi";
import { Book } from "../models/bookModel.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { error } = validateBook(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const { title, author, publishYear } = req.body;

    const newBook = new Book({
      title,
      author,
      publishYear,
    });

    await newBook.save();

    return res.status(200).send("Book Saved: " + newBook);
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .send("Something went wrong while saving in database");
  }
});

router.put("/:id", async (req, res) => {
  const id = req.params.id;
  const validity = mongoose.Types.ObjectId.isValid(id);
  if (!validity) {
    return res.status(400).send("Not a valid Book Id");
  }

  const { error } = validateBook(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const updateBook = await Book.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  if (!updateBook) {
    return res.status(404).send("Book not found");
  }

  return res.status(200).send("Updated :" + updateBook);
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const validity = mongoose.Types.ObjectId.isValid(id);
  if (!validity) {
    return res.status(400).send("Not a valid Book Id");
  }

  try {
    const deleteBook = await Book.findByIdAndDelete(id);

    if (!deleteBook) {
      return res.status(404).send("Book not found");
    }

    return res.status(200).send("Book has been deleted");
  } catch (error) {
    console.log(error.message);
    res.status(500).send("There was an error in deleting the Book");
  }
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const validity = mongoose.Types.ObjectId.isValid(id);
  if (!validity) {
    return res.status(400).send("Not a valid Book Id");
  }

  try {
    const book = await Book.findById(id);

    if (!book) {
      return res.status(404).send("Book not found");
    }

    return res.status(200).send(book);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("There was an error in deleting the Book");
  }
});

router.get("/", async (req, res) => {
  try {
    const books = await Book.find({});
    return res.send(books);
  } catch (err) {
    console.log(err);
    return res.status(500).send("An error while fetching books");
  }
});

function validateBook(data) {
  const currentYear = new Date().getFullYear();
  const joiSchema = Joi.object({
    title: Joi.string().min(5).max(255).trim().required(),
    author: Joi.string().min(5).max(50).trim().required(),
    publishYear: Joi.number().min(1000).max(currentYear).required(),
  });

  return joiSchema.validate(data);
}

export default router;
