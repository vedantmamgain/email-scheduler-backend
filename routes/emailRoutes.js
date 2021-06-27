const emailController = require("../controller/emailController");
const userController = require("../controller/userController");
const express = require("express");
const router = express.Router();

router.route("/").post(userController.random);

router.route("/user").post(userController.createUser);

router
    .route("/emails")
    .get(emailController.getEmails)
    .post(emailController.postEmails);

router
    .route("/history")
    .get(emailController.getHistory)
    .post(emailController.postHistory);

router.route("/getAllHistory").get(emailController.getAllHistory);

router.route("/scheduler").post(emailController.runScheduler);

module.exports = router;
