const emailController = require("../controller/emailController");
const userController = require("../controller/userController");
const express = require("express");
const router = express.Router();

router.route("/").post(userController.random);

router.route("/user").post(userController.createUser);

router.route("/emails").post(emailController.postEmails);

router.route("getEmails").post(emailController.getEmails);

router.route("/history").post(emailController.postHistory);

router.route("getHistory").post(emailController.getHistory);

router.route("/getAllHistory").get(emailController.getAllHistory);

router.route("/scheduler").post(emailController.runScheduler);

module.exports = router;
