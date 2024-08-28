const express = require('express');
const router = express.Router();
const sendDailyNotifications = require('../controllers/notificationController')

router.get('/', sendDailyNotifications);

module.exports = router;
