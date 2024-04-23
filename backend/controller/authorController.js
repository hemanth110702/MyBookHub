const Author = require("../model/authorModel");
const Joi = require("joi");

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

module.exports = { createAuthor };
