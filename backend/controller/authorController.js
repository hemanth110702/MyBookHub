const Author = require("../model/authorModel");
const Joi = require("joi");

const getTopAuthors = async (req, res) => {

}

const createAuthor = async (req, res) => {
  const { error: JoiError } = validateAuthor(req.body);
  if (JoiError) return res.status(400).send(JoiError.details[0].message);
  try {
    const author = await Author.create(req.body);
    return res.status(200).send(author);
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .send(
        "Oops! Something went wrong on our end. We're working to fix it. Please try again later."
      );
  }
};

const searchAuthors = async (req, res) => {
  const { query } = req.query;
  try {
    const results = await Author.find({
      username: { $regex: query, $options: "i" },
    })
      .limit(5)
      .select("username");
    return res.status(200).send(results);
  } catch (err) {
    console.error("Error Searching: ", err);
    return res.status(500).send("Internal server error");
  }
};

const checkUsername = async (req, res) => {
  const { username } = req.query;

  if (!/^[a-zA-Z0-9_]{5,15}$/.test(username)) {
    return res.json({ available: false, message: "Invalid Username" });
  }

  const validateUsername = await Author.findOne({ username });
  if (validateUsername) {
    return res.json({ available: false, message: "Username already taken" });
  } else {
    return res.json({ available: true, message: "Username available" });
  }

}

function validateAuthor(body) {
  const joiSchema = Joi.object({
    name: Joi.string().min(3).max(65).required(),
    username: Joi.string().min(3).max(65).required(),
    email: Joi.string().email().required(),
    bio: Joi.string(),
    coverImage: Joi.string(),
  });
  return joiSchema.validate(body);
}

module.exports = { createAuthor, searchAuthors, checkUsername };
