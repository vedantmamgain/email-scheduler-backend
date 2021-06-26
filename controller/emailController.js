const USER = require("../models/userModel");
const EMAIL = require("../models/emailModel");

exports.getEmails = async (req, res) => {
    try {
        // const updatedUser = await User.findById(req.user._id)
        // .populate({
        //   path: "verifiedOrders",
        //   model: "verifiedOrders",
        //   populate: {
        //     path: "products",
        //     model: "product",
        //     select: { photo: 1, title: 1, photo: 1, price: 1 },
        //   },
        // })
        // .populate("cart");
        res.status(200).json({
            status: "This is it",
            message: "Hurray",
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

        const email = await EMAIL.create(send);
        let emailId = email._id;
        let userID = req.body.userID;

        let user = await User.findByIdAndUpdate(
            userID,
            { $push: { emailList: emailId } },
            { safe: true, upsert: true, new: true }
        );

        console.log(userID);
        res.status(200).json({
            status: "Done",
            message: "Added Recurring Email",
            data: [email, user],
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
        // const updatedUser = await User.findById(req.user._id)
        // .populate({
        //   path: "verifiedOrders",
        //   model: "verifiedOrders",
        //   populate: {
        //     path: "products",
        //     model: "product",
        //     select: { photo: 1, title: 1, photo: 1, price: 1 },
        //   },
        // })
        // .populate("cart");
        res.status(200).json({
            status: "This is it",
            message: "Hurray",
        });
    } catch (err) {
        res.status(404).json({
            status: "fail",
            message: err,
        });
    }
};
exports.postHistoryEmails = async (req, res) => {
    try {
        const emailId = req.body.emailId;
        let userID = req.body.userID;
        let user = await User.findByIdAndUpdate(
            userID,
            { $push: { emailList: emailId } },
            { safe: true, upsert: true, new: true }
        );
        res.status(200).json({
            status: "This is it",
            message: "Hurray",
            data: [user],
        });
    } catch (err) {
        res.status(404).json({
            status: "fail",
            message: err,
        });
    }
};
