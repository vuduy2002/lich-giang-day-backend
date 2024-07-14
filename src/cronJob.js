const cron = require('node-cron');
const notificationController = require('./controllers/notificationController');

// Lên lịch tác vụ để chạy vào lúc 6h sáng mỗi ngày
cron.schedule('0 6 * * *', () => {
  notificationController.sendDailyEventNotifications();
});
