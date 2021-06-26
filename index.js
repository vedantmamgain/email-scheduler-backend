const express = require("express");
const app = express();
const morgan = require("morgan");
const router = require("./routes/emailRoutes");

require("dotenv").config();

app.use(morgan("dev"));
app.use(express.json());

app.use("/api/", router);

module.exports = app;
