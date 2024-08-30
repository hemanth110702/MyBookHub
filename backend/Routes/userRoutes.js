const express = require('express');
const { registerUser, loginUser, getMe } = require('../controller/userController');
const { requireAuth } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me", requireAuth, getMe);

module.exports = router;