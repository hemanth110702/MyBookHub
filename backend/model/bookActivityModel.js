const mongoose = require('mongoose');

const bookActivitySchema = new mongoose.Schema({
  book: { type: mongoose.Schema.Types.ObjectId, ref: "Book", required: true },
  subject: { type: String, required: true },
  message: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
})

module.exports = mongoose.model("BookActivity", bookActivitySchema);