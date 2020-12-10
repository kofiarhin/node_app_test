const express = require("express");
const app = express();
const path = require("path");
const publicPath = path.join(__dirname, "../public");

// setup middleware
app.use(express.static(publicPath));

module.exports = app;
