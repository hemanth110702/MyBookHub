const Book = require("../model/bookModel");
const Joi = require("joi");

const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 });
    return res.status(200).send(books);
  } catch (err) {
    console.log(err);
    return res.status(500).send("There was an server error fetching books");
  }
};

const getBook = async (req, res) => {
  try {
    const { id } = req.body;
    const book = await Book.findById(id);
    if (!book) return res.status(404).send("Book not found");
    return res.status(200).send(book);
  } catch (err) {
    console.log(err);
    return res.status(500);
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

function bookValidation(body) {
  const joiSchema = Joi.object({
    title: Joi.string().min(3).max(65).required(),
    authors: Joi.array().items(Joi.string()).required(),
    description: Joi.string().required(),
    tags: Joi.array().items(Joi.string()).unique().required(),
    visibility: Joi.string().valid("public", "private").default("public"),
    coverImage: Joi.string(),
    allowedViewers: Joi.array().items(Joi.string()),
    bookUpdates: Joi.array().items(
      Joi.object({
        message: Joi.string(),
        timestamp: Joi.date().default(Date.now()),
      })
    ),
  });

  return joiSchema.validate(body);
}

module.exports = { createBook, getBook, getAllBooks };
