const mongoose = require("mongoose");

const bookSchema = mongoose.Schema({
  title: { type: String, required: true },
  authors: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Author",
      required: true,
    },
  ],
  description: { type: String, required: true },
  tags: [{ type: String, required: true }],
  coverImage: {
    type: String,
    default:
      "https://asset.cloudinary.com/doosiuwwd/612eb7565a6f642869a4f9ba29d67672",
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  visibility: {
    type: String,
    enum: ["public", "private"],
    default: "public",
  },
  allowedViewers: [{ type: mongoose.Schema.Types.ObjectId, ref: "Author" }],
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Author" }],
  comments: [
    {
      author: { type: mongoose.Schema.Types.ObjectId, ref: "Author" },
      content: String,
      createdAt: { type: Date, default: Date.now },
    },
  ],
  bookFollowers: [{ type: mongoose.Schema.Types.ObjectId, ref: "Author" }],
  license: String,
  fullBookLink: String,
  bookUpdates: [
    { message: { type: String }, timestamp: { type: Date, default: Date.now } },
  ],
});

module.exports = mongoose.model("Book", bookSchema);
