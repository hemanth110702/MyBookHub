const mongoose = require("mongoose");
const Book = require("../model/bookModel");
const Joi = require("joi");

const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 });
    return res.status(200).send(books);
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .send(
        "Oops! Something went wrong on our end. We're working to fix it. Please try again later."
      );
  }
};

const getRecentBooks = async (req, res) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 }).limit(10);
    return res.status(200).send(books);
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .send(
        "Oops! Something went wrong on our end. We're working to fix it. Please try again later."
      );
  }
};

const getTopBooks = async (req, res) => {
  try {
    const books = await Book.aggregate([
      {
        $addFields: {
          starredCount: { $size: "$starred" }
        }
      },
      {
        $sort: { starredCount: -1 }
      },
      {
        $limit: 10
      }
    ]);
    return res.status(200).send(books);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Oops! Something went wrong on our end. We're working to fix it. Please try again later.")
  }
}

const getBook = async (req, res) => {
  const { title: bookTitle } = req.params;
  let title = bookTitle.split('_').join(' ');
  try {
    const book = await Book.findOne({ title });
    if (!book) return res.status(404).send("Book not found");
    return res.status(200).send(book);
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .send(
        "Oops! Something went wrong on our end. We're working to fix it. Please try again later."
      );
  }
};

const createBook = async (req, res) => {
  const { error: JoiError } = bookValidation(req.body);
  if (JoiError) return res.status(400).send(JoiError.details[0].message);
  try {
    const book = await Book.create(req.body);
    return res.status(200).send(book);
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .send(
        "Oops! Something went wrong on our end. We're working to fix it. Please try again later."
      );
  }
};

const deleteBook = async (req, res) => {
  const { id } = req.params;
  const authorId = req.user.id;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(400).send("Book ID is invalid");
  try {
    const book = await Book.findById(id);
    if (!book) return res.status(404).send("The book with given ID not found");
    if (book.authors.includes(authorId)) {
      await book.remove();
      return res.status(200).send("Book deleted successfully");
    } else {
      return res.status(403).send("Unauthorized to delete this book");
    }
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .send(
        "Oops! Something went wrong on our end. We're working to fix it. Please try again later."
      );
  }
};

const updateBook = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(400).send("Book ID is invalid");
  const { error: JoiError } = bookValidation(req.body);
  if (JoiError) return res.status(400).send(JoiError.details[0].message);
  try {
    let updatedFields = req.body;
    if (req.file) {
      const result = await cloudinary.uploader.upload(
        req.file.buffer.toString("base64")
      );
      updatedFields.coverImage = result.secure_url;
    }
    const updatedBook = await Book.findByIdAndUpdate(id, updatedFields, {
      new: true,
    });
    if (!updatedBook) return res.status(404).send("Book not found");
    return res.status(200).send(updatedBook);
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .send(
        "Oops! Something went wrong on our end. We're working to fix it. Please try again later."
      );
  }
};

function bookValidation(body) {
  const joiSchema = Joi.object({
    title: Joi.string().min(3).max(65).required(),
    authors: Joi.array().items(Joi.string()).required(),
    description: Joi.string().required(),
    genres: Joi.array().items(Joi.string()).unique().required(),
    coverImage: Joi.string().required(),
    updatedAt: Joi.date().default(Date.now()),
    visibility: Joi.string()
      .valid("public", "private", "restricted")
      .default("public"),
    allowedViewers: Joi.array().items(Joi.string()).unique(),
    bookLink: Joi.string(),
  });

  return joiSchema.validate(body);
}

module.exports = { createBook, getBook, getAllBooks, getTopBooks, getRecentBooks, updateBook, deleteBook };
