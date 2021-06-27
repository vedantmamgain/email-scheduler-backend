const USER = require("../models/userModel");
const EMAIL = require("../models/emailModel");
const HISTORY = require("../models/historyModel");
const sendEmail = require("../util/sendEmail");
const {
    ToadScheduler,
    SimpleIntervalJob,
    Task,
    AsyncTask,
} = require("toad-scheduler");
const scheduler = new ToadScheduler();

let counter = 0;

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
exports.postHistory = async (req, res) => {
    const scheduler = new ToadScheduler();

    const task = new AsyncTask("Sending Email", async () => {
        let send = {};
        send.title = req.body.title;
        send.userEmail = req.body.userEmail;
        send.sendToEmail = req.body.sendToEmail;
        send.ccEmail = req.body.ccEmail;
        send.body = req.body.body;
        send.timePosted = new Date(Date.now()).toString();
        await sendEmail(req);
        const email = await HISTORY.create(send);

        await USER.findOneAndUpdate(
            { email: req.body.userEmail },
            { $push: { histories: email._id } },
            { safe: true, upsert: true, new: true }
        );
        console.log("Sending an email");
    });
    const job = new SimpleIntervalJob({ seconds: req.body.seconds }, task);

    scheduler.addSimpleIntervalJob(job);

    // console.log(userID);
    res.status(200).json({
        status: "Done",
        message: "Added Recurring Email",
    });
};
