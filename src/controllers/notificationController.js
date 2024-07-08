const Notification = require('../models/Notification');

const createNotification = async (req, res) => {
  const notification = new Notification(req.body);
  try {
    const savedNotification = await notification.save();
    res.status(201).json(savedNotification);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getAllNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find();
    res.json(notifications);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getNotificationById = async (req, res) => {
  try {
    const notification = await Notification.findOne({ notificationId: req.params.id });
    if (!notification) return res.status(404).json({ message: 'Notification not found' });
    res.json(notification);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateNotification = async (req, res) => {
  try {
    const updatedNotification = await Notification.findOneAndUpdate({ notificationId: req.params.id }, req.body, { new: true });
    if (!updatedNotification) return res.status(404).json({ message: 'Notification not found' });
    res.json(updatedNotification);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const deleteNotification = async (req, res) => {
  try {
    const deletedNotification = await Notification.findOneAndDelete({ notificationId: req.params.id });
    if (!deletedNotification) return res.status(404).json({ message: 'Notification not found' });
    res.json({ message: 'Notification deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createNotification,
  getAllNotifications,
  getNotificationById,
  updateNotification,
  deleteNotification,
};
