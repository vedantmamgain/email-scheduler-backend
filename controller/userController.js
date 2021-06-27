const USER = require("../models/userModel");

exports.random = async (req, res) => {
    console.log(req);
    res.status(200).json({
        status: "Done",
        message: "Simple Random",
        data: person,
    });
};

exports.createUser = async (req, res) => {
    //check if user has been created

    const { name, userEmail, emailList, histories } = req.body;

    let user = {};
    user.name = name;
    user.email = userEmail;
    user.emailList = emailList;
    user.histories = histories;

    const doesUserExit = await USER.exists({ email: userEmail });

    if (!doesUserExit) {
        const person = await USER.create(user);
        res.status(200).json({
            status: "Done",
            message: "Added Recurring Email",
            data: person,
        });
    } else {
        res.status(400).json({
            status: "User Already Present",
            message: "User Already Present",
        });
    }
};
