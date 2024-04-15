require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");

app.use(express.json())
app.use("/book", )
app.use("/author",)

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() =>
    app.listen(process.env.PORT || 3000, () =>
      console.log(
        "Connected to database and1 listening on port : " + process.env.PORT
      )
    )
  )
  .catch((err) => console.log("Error connecting to the database : " + err));
