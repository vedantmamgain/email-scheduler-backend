const USER = require("../models/userModel");
const EMAIL = require("../models/emailModel");

exports.createUser = async (req, res, next) => {
    //check if user has been created
    try {
        let send = {};
        send.title = req.body.title;
        send.userEmail = req.body.userEmail;
        send.sendToEmail = req.body.sendToEmail;
        send.ccEmail = req.body.ccEmail;
        send.repeat = req.body.repeat;

        const user = await EMAIL.create(user);

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
