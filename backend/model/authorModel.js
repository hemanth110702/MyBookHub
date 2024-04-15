const mongoose = require("mongoose");

const authorScheme = mongoose.Schema({
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  bio: { type: String, required: true },
  tags: [String],
  coverImage: String, // base64 or azure
  likedBooks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Book" }],
  favBooks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Book" }],
  following: [{ type: mongoose.Schema.Types.ObjectId, ref: "Author" }],
  followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "Author" }],
  yourComments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
  notifications: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Notification" },
  ],
});

module.exports = mongoose.model("Author", authorScheme);
