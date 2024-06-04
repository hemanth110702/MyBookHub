const mongoose = require("mongoose");

const authorScheme = mongoose.Schema({
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  bio: { type: String, required: true },
  profilePhoto: { type: String, required: true },
  favGenre: [{ type: String, required: true, default: [] }],
  authorBooks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Book", default: [] }],
  starredBooks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Book", default: [] }],
  following: [{ type: mongoose.Schema.Types.ObjectId, ref: "Author", default: [] }],
  followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "Author", default: [] }],
  yourComments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment", default: [] }],
  notifications: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Notification", default: [] },
  ],
  authorActivity: [{ type: mongoose.Schema.Types.ObjectId, ref: "AuthorActivity", default: [] }]
});

module.exports = mongoose.model("Author", authorScheme);
