const mongoose = require("mongoose");

const bookSchema = mongoose.Schema({
  title: { type: String, unique: true, required: true },
  authors: [
    {
      type: String,
      required: true,
      default: []
    },
  ],
  description: { type: String, required: true },
  genres: [{ type: String, required: true, default: [] }],
  coverImage: {
    type: String,
    required: true,
  },
  bookLink: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  visibility: {
    type: String,
    enum: ["public", "private", "restricted"],
    default: "public",
  },
  allowedViewers: [{ type: String, ref: "Author", default: [] }],
  views: [{ type: String, unique: true, default: [] }],
  starred: [{ type: mongoose.Schema.Types.ObjectId, ref: "Author", default: [] }],
  bookComments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment", default: [] }],
  license: String,
  bookActivity: [{ type: mongoose.Schema.Types.ObjectId, ref: "BookActivity", default: [] }],
});

module.exports = mongoose.model("Book", bookSchema);
