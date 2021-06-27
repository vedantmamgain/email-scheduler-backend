const express = require("express");
const app = express();
const morgan = require("morgan");
const router = require("./routes/emailRoutes");
const path = require("path");

require("dotenv").config();
app.use(express.static(path.resolve(__dirname, "./client/build")));
app.use(morgan("dev"));
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.use("/api/", router);

app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});
module.exports = app;
