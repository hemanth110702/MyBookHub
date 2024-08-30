const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Joi = require("joi");
const joiPasswordComplexity = require("joi-password-complexity");
const Author = require("../model/authorModel");


const registerUser = async (req, res) => {

  const { error } = validateUserData(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const userExists = await Author.findOne({ email: req.body.email })
  if (userExists) return res.status(400).send("Already user exist!!!");

  try {
    const { username, email, password } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const author = await Author.create({ username, email, password: hashedPassword });

    return res.status(201).json({
      message: "Account created successfully",
      _id: author.id,
      email: author.email,
      token: generateToken(author._id)
    });

  } catch (err) {
    return res.status(500).send("Something went wrong in the server!! Try again later");
  }
}


const loginUser = async (req, res) => {

  const { error } = validateUserData(req.body, 1);
  if (error) return res.status(400).send(error.details[0].message);

  const { email, password } = req.body;

  const author = await Author.findOne({ email });
  if (!author) return res.status(404).send("No user found");

  try {
    const validPwd = await bcrypt.compare(password, author.password);
    if (!validPwd) return res.status(400).send("Incorrect Password");

    return res.status(200).json({
      message: "Login successful",
      _id: author.id,
      email: author.email,
      token: generateToken(author._id)
    });

  } catch (error) {
    console.log(error);
    res.status(500).send("Server busy!!! Try Again Later");
  }
}


const getMe = async (req, res) => {
  const { _id, email } = await Author.findById(req.author.id);
  return res.status(200).json({ message: "User Data Display", id: _id, email });
}

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' })
}


function validateUserData(data, isLogin = 0) {

  const joiSchemaR = Joi.object({
    // name: Joi.string().min(3).max(50).regex(/^[a-zA-ZÀ-ÿ .'-]+$/).required(),
    username: Joi.string().regex(/^[a-zA-Z0-9_]{5,15}$/).required(),
    email: Joi.string().email().required(),
    password: joiPasswordComplexity().required(),
  });

  const joiSchemaL = Joi.object({
    email: Joi.string().email().required(),
    password: joiPasswordComplexity().required(),
  });

  if (isLogin) return joiSchemaL.validate(data);

  return joiSchemaR.validate(data);
}

module.exports = { registerUser, loginUser, getMe };