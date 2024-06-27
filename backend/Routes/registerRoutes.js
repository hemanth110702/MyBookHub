const express = require('express');
const { emailVerification } = require('../api/verifyAuthor');

const router = express.Router();

router.get("/email-verification", emailVerification);

module.exports = router;