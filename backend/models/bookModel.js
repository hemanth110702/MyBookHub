import mongoose from "mongoose";

const bookSchema = mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      minlength: 5,
      maxlenght: 255,
      required: true,
    },
    author: {
      type: String,
      trim: true,
      minlength: 5,
      maxlenght: 50,
      required: true,
    },
    publishYear: {
      type: Number,
      required: true,
      min: 1000,
      max: new Date().getFullYear(),
    },
  },
  {
    timestamps: true,
  }
);

export const Book = mongoose.model("book", bookSchema);
