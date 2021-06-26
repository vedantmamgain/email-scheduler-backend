const mongoose = require("mongoose");

const emailSchema = new mongoose.Schema({
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
    repeat: {
        type: String,
        required: [true, "Enter when to repeat"],
    },
});

const email = mongoose.model("emails", emailSchema);
module.exports = email;
