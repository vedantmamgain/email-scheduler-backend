const emailController = require("../controller/emailController");
const express = require("express");
const router = express.Router();

router
    .route("/emails")
    .get(emailController.getEmails)
    .post(emailController.postEmails);

router.route("/history").get(emailController.getEmails);

module.exports = router;
