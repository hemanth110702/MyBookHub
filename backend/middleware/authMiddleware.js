const jwt = require('jsonwebtoken');
const Author = require('../model/authorModel');

const requireAuth = async (req, res, next) => {
  
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith("Bearer ")) return res.status(401).send("Authorization token required");

  const token = authorization.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.author = await Author.findById(decoded.id).select("_id");

    if (!req.author) return res.status(400).send("Author not found");

    next();
  } catch (error) {
    console.log(error);

    if (error.name === 'TokenExpiredError') {
      return res.status(401).send("Token Expired");
    } else if (error.name === 'JsonWebTokenError') {
      return res.status(401).send("Invalid Token");
    }

    return res.status(401).send("Request is not authorized");
  }
};

module.exports = { requireAuth };

