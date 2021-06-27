const express = require("express");
const app = express();
const morgan = require("morgan");
const router = require("./routes/emailRoutes");
const path = require("path");
const cors = require("cors");
require("dotenv").config();
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "/client/build")));

// app.use(express.urlencoded({ extended: true }));
app.get("/", function (req, res) {
    res.render("index", { title: "Express" });
});

app.use("/api/", router);

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname + "/client/build/index.html"));
});
module.exports = app;
