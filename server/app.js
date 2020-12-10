const express = require("express");
const app = express();
const path = require("path");
const publicPath = path.join(__dirname, "../public");
const mongoose = require("mongoose");

// connect to database
mongoose
  .connect(process.env.mongo_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("connected to database"))
  .catch((e) => {
    console.lg("error connecting to database!");
  });

// setup middleware
app.use(express.static(publicPath));

module.exports = app;
