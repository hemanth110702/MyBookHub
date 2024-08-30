const mongoose = require("mongoose");


const authorScheme = mongoose.Schema({
  name: {
    type: String, minlength: 3,
    maxlength: 50,
    match: /^[a-zA-ZÀ-ÿ .'-]+$/
  },
  username: { type: String, unique: true, match: /^[a-zA-Z0-9_]{5,15}$/ },
  email: { type: String, required: true, unique: true },
  bio: { type: String },
  profilePhoto: { type: String },
  // verified: { type: Boolean, default: false },
  password: { type: String, required: true },
  favGenre: [{ type: String, default: [] }],
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
