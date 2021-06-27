const nodemailer = require("nodemailer");
const smtpTransport = require("nodemailer-smtp-transport");
module.exports = async function (options) {
    const transporter = nodemailer.createTransport({
        auth: {
            user: "pankajpal202123@gmail.com",
            pass: "Mamgain@23",
        },
        secure: true,
        host: "smtp.gmail.com",
        port: 465,
        tls: {
            // do not fail on invalid certs
            rejectUnauthorized: false,
        },
    });

    const mailOptions = {
        from: "Vedant Mamgain",
        to: options.body.sendToEmail,
        html: options.body.body,
        text: options.body.message,
        cc: options.body.ccEmail,
        subject: options.body.title,
    };

    await transporter.sendMail(mailOptions);
};
