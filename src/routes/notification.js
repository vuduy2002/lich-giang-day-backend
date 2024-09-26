const express = require("express");
const router = express.Router();
const dailyNotificationJob = require("../controllers/notificationController");

router.post("/", dailyNotificationJob);

module.exports = router;
