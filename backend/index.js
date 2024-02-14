import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { PORT, mongoDbURL } from "./config.js";
import { Book } from "./models/bookModel.js";
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
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowHeaders: ["Content-type"],
  })
);

app.get("/", async (req, res) => {
  try {
    const books = await Book.find({});
    return res.send(books);
  } catch (err) {
    console.log(err);
    return res.status(500).send("An error while fetching books");
  }
});

app.use("/books", booksRoute);
