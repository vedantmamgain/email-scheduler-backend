const USER = require("../models/userModel");
const EMAIL = require("../models/emailModel");
const HISTORY = require("../models/historyModel");
const sendEmail = require("../util/sendEmail");
const schedule = require("../util/scheduler");
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

        const email = await EMAIL.create(send);
        await schedule(req);
        let user = await USER.findOneAndUpdate(
            { email: req.body.userEmail },
            { $push: { emailList: email._id } },
            { safe: true, upsert: true, new: true }
        );

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

exports.getAllHistory = async (req, res) => {
    try {
        const emails = await HISTORY.find();

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

exports.runScheduler = async (req, res) => {
    const scheduler = new ToadScheduler();

    const task = new Task("simple task", () => {
        console.log("Started new scheduler of" + req.body.seconds);
    });
    const job = new SimpleIntervalJob({ seconds: req.body.seconds }, task);

    scheduler.addSimpleIntervalJob(job);
    res.status(200).json({
        status: "Running in the background",
    });
};

exports.getHistory = async (req, res) => {
    try {
        const emails = await USER.find({ email: req.body.userEmail }).populate(
            "histories"
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
exports.postHistory = async (data) => {
    let send = {};
    send.title = data.body.title;
    send.userEmail = data.body.userEmail;
    send.sendToEmail = data.body.sendToEmail;
    send.ccEmail = data.body.ccEmail;
    send.body = data.body.body;
    send.timePosted = new Date(Date.now()).toString();
    await sendEmail(data);
    const email = await HISTORY.create(send);

    await USER.findOneAndUpdate(
        { email: data.body.userEmail },
        { $push: { histories: email._id } },
        { safe: true, upsert: true, new: true }
    );
};
