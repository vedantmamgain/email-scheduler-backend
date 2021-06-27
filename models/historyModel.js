const mongoose = require("mongoose");

const historyEmailSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Enter Title"],
    },
    body: {
        type: String,
        required: [true, "Enter Description"],
    },
    userEmail: {
        type: String,
        required: [true, "Enter your email"],
    },
    sendToEmail: [
        {
            type: String,
            required: [true, "Enter Summary"],
        },
    ],
    ccEmail: [
        {
            type: String,
            required: [true, "Enter Summary"],
        },
    ],

    timePosted: {
        type: String,
        required: [true, "Enter when this was posted"],
    },
});

const historyEmail = mongoose.model("histories", historyEmailSchema);
module.exports = historyEmail;
