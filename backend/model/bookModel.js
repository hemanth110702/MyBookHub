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
  coverImage: String, // base64 or azure
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  visibility: {
    type: String,
    enum: ["public", "private"],
    default: "public",
    required: true,
  },
  allowedViewers: [{ type: mongoose.Schema.Types.ObjectId, ref: "Author" }],
  likes: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Author" },
  ],
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
