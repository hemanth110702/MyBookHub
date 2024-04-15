const mongoose = require("mongoose");

const notificationScheme = mongoose.Schema({
  receiverId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Author",
    required: true,
  },
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Author",
    required: true,
  },
  type: { type: String, required: true },
  message: { type: String, required: true },
  viewed: { type: Boolean, default: false },
  timestamp: { type: String, default: Date.now },
});

module.exports = mongoose.model("Notification", notificationScheme);
