const USER = require("../models/userModel");
const EMAIL = require("../models/emailModel");
const HISTORY = require("../models/historyModel");
const sendEmail = require("../util/sendEmail");
exports.getEmails = async (req, res) => {
    try {
        const emails = await USER.find({ email: req.body.userEmail }).populate(
            "emailList"
        );

        res.status(200).json({
            status: "This is it",
            data: emails,
        });
    } catch (err) {
        res.status(404).json({
            status: "fail",
            message: err,
        });
    }
};

exports.postEmails = async (req, res) => {
    try {
        let send = {};
        send.title = req.body.title;
        send.userEmail = req.body.userEmail;
        send.sendToEmail = req.body.sendToEmail;
        send.ccEmail = req.body.ccEmail;
        send.repeat = req.body.repeat;
        send.body = req.body.body;

        console.log(emailSend);

        const email = await EMAIL.create(send);

        let user = await USER.findOneAndUpdate(
            { email: req.body.userEmail },
            { $push: { emailList: email._id } },
            { safe: true, upsert: true, new: true }
        );

        // console.log(userID);
        res.status(200).json({
            status: "Done",
            message: "Added Recurring Email",
            data: user,
        });
    } catch (err) {
        res.status(404).json({
            status: "fail",
            message: err,
        });
    }
};

exports.getHistory = async (req, res) => {
    try {
        const emails = await USER.find({ email: req.body.userEmail }).populate(
            "history"
        );

        res.status(200).json({
            status: "This is it",
            data: emails,
        });
    } catch (err) {
        res.status(404).json({
            status: "fail",
            message: err,
        });
    }
};
exports.postHistory = async (req, res) => {
    try {
        let send = {};
        send.title = req.body.title;
        send.userEmail = req.body.userEmail;
        send.sendToEmail = req.body.sendToEmail;
        send.ccEmail = req.body.ccEmail;
        send.body = req.body.body;
        send.timePosted = new Date(Date.now()).toString();

        await sendEmail(req);
        const email = await HISTORY.create(send);

        let user = await USER.findOneAndUpdate(
            { email: req.body.userEmail },
            { $push: { history: email._id } },
            { safe: true, upsert: true, new: true }
        );

        // console.log(userID);
        res.status(200).json({
            status: "Done",
            message: "Added Recurring Email",
            data: user,
        });
    } catch (err) {
        res.status(404).json({
            status: "fail",
            message: err,
        });
    }
};
