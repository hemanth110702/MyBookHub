import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import { Book } from "./models/bookModel.js";
import booksRoute from "./routes/booksRoute.js";
import userRoute from "./routes/userRoute.js";

const app = express();
dotenv.config();

mongoose
  .connect(process.env.mongoDbURL)
  .then(() => {
    console.log("Connected to MonogoDB");
    const port = process.env.port || 3000;
    app.listen(port, () => console.log("Listening on port " + port));
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
app.use("/user", userRoute);
