import express from "express";
import mongoose from "mongoose";
import { PORT, mongoDbURL } from "./config.js";
import booksRoute from "./routes/booksRoute.js";

const app = express();

mongoose
  .connect(mongoDbURL)
  .then(() => {
    console.log("Connected to MonogoDB");
    app.listen(PORT, () => console.log("Listening on port " + PORT));
  })
  .catch((error) => {
    console.log(error);
  });

app.use(express.json());

app.get("/", (req, res) => {
  return res.status(200).send("Welcome to MyBookHub");
});

app.use("/books", booksRoute);
