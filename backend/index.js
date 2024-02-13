import express from "express";
import mongoose from "mongoose";
import { PORT, mongoDbURL } from "./config.js";

const app = express();

app.get("/", (req, res) => {
  return res.status(200).send("Welcome to MyBookHub");
});

mongoose
  .connect(mongoDbURL)
  .then(() => {
    console.log("Connected to MonogoDB");
    app.listen(PORT, () => console.log("Listening on port " + PORT));
  })
  .catch((error) => {
    console.log(error);
  });
