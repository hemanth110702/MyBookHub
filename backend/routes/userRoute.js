import express from "express";
import jwt from "jsonwebtoken";
import Joi from "joi";
import passwordComplexity from "joi-password-complexity";
import { User } from "../models/userModel.js";

const router = express.Router();

// login route
router.post("/login", async (req, res) => {
  const { error } = validateUserInput(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  try {
    const { email, password } = req.body;
    const user = await User.login(email, password);
    const token = createToken(user._id);
    return res.status(200).json({ email, token });
  } catch (err) {
    return res.status(400).send(err.message);
  }
});

// signup route
router.post("/signup", async (req, res) => {
  const { error } = validateUserInput(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const { email, password } = req.body;
  try {
    const user = await User.signup(email, password);
    const token = createToken(user._id);
    return res.status(200).json({ email, token });
  } catch (err) {
    return res.status(400).send(err.message);
  }
});

function createToken(_id) {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
}

function validateUserInput(data) {
  const joiSchema = Joi.object({
    email: Joi.string().email().required(),
    password: passwordComplexity().required(),
  });
  return joiSchema.validate(data);
}

export default router;
