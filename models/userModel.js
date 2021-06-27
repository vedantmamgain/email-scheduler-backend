const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please tell us your name!"],
    },
    email: {
        type: String,
        required: [true, "Please provide your email"],
        unique: true,
        lowercase: true,
    },
    emailList: [
        {
            type: mongoose.Schema.ObjectId,
            ref: "emails",
        },
    ],
    histories: [
        {
            type: mongoose.Schema.ObjectId,
            ref: "histories",
        },
    ],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
