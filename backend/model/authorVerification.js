const mongoose = require('mongoose');

const authorVerificationSchema = mongoose.Schema({
  userId : String,
  uniqueString: String,
  createdAt: Date,
  expiresAt: Date,
});

module.exports = mongoose.model("AuthorVerification", authorVerificationSchema )