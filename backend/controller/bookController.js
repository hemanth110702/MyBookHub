const mongoose = require("mongoose");
const Book = require("../model/bookModel");
const Joi = require("joi");
const cloudinary = require("cloudinary").v2;
const multer = require("multer");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret,
});

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

const getBook = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send("Book ID is Invalid");
    const book = await Book.findById(id);
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
  upload.single("coverImage")(req, res, async function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(400).send("File upload error");
    } else if (err) {
      return res.status(500).send("Internal server error");
    }
    // const { error: JoiError } = bookValidation(req.body);
    // if (JoiError) return res.status(400).send(JoiError.details[0].message);
    try {
      let coverImageURL;
      if (req.file) {
        console.log("hello");
        const result = await cloudinary.uploader.upload(
          req.file.buffer.toString("base64"),{ public_id: "req.body.title"}
        );
        console.log("getting result");
        console.log("result" + result);
        coverImageURL = result.secure_url;
      }
      const bookDetails = req.body;
      bookDetails.coverImage =
        coverImageURL ||
        "https://asset.cloudinary.com/doosiuwwd/612eb7565a6f642869a4f9ba29d67672";
      // const book = await Book.create(bookDetails);
      // return res.status(200).send(book);
    } catch (err) {
      console.log(err);
      return res
        .status(500)
        .send(
          "Oops! Something went wrong on our end. We're working to fix it. Please try again later."
        );
    }
  });
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
  upload.single("coverImage")(req, res, async function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(400).send("File upload error");
    } else if (err) {
      return res.status(500).send("Internal server error");
    }
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
  });
};

function bookValidation(body) {
  const joiSchema = Joi.object({
    title: Joi.string().min(3).max(65).required(),
    authors: Joi.array().items(Joi.string()).required(),
    description: Joi.string().required(),
    tags: Joi.array().items(Joi.string()).unique().required(),
    updatedAt: Joi.date().default(Date.now()),
    visibility: Joi.string().valid("public", "private").default("public"),
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

module.exports = { createBook, getBook, getAllBooks, updateBook, deleteBook };
