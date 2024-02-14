import express from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import Joi from "joi";
import { User } from "../models/userModel.js";
const router = express.Router();

// login route
router.post("/login", () => {});

// signup route
router.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.signup(email, password);

    const token = createToken(user._id);

    return res.status(200).json({ email, token });
    /*.send("Account created!!!/n email: " + email + "/n token: " + token); */
  } catch (err) {
    return res.status(400).send(err.message);
  }
});

function createToken(_id) {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
}

export default router;
