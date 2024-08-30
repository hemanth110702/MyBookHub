require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const checkEmailRoutes = require("./Routes/checkEmailRoutes");
const bookRoutes = require("./Routes/bookRoutes");
const authorRoutes = require("./Routes/authorRoutes");
const userRoutes = require("./Routes/userRoutes");
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use("/api/check-email", checkEmailRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/authors", authorRoutes);
app.use("/api/users", userRoutes);

/* app.use("/notification");
app.use("/comment"); */

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() =>
    app.listen(process.env.PORT, () =>
      console.log(
        "Connected to database and listening on port : " + process.env.PORT
      )
    )
  )
  .catch((err) => console.log("Error connecting to the database : " + err));
