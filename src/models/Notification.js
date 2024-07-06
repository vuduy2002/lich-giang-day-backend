const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  notificationId: { type: String, required: true, unique: true },
  eventId: { type: String, required: true, ref: 'Event' },
  notiMessage: { type: String, required: true },
  timeSent: { type: Date, required: true }
});

module.exports = mongoose.model('Notification', notificationSchema);
