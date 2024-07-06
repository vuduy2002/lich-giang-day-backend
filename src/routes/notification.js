const express = require('express');
const router = express.Router();
const Notification = require('../models/Notification');

// Create a new notification
router.post('/', async (req, res) => {
  const notification = new Notification(req.body);
  try {
    const savedNotification = await notification.save();
    res.status(201).json(savedNotification);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all notifications
router.get('/', async (req, res) => {
  try {
    const notifications = await Notification.find();
    res.json(notifications);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get notification by ID
router.get('/:id', async (req, res) => {
  try {
    const notification = await Notification.findOne({ notificationId: req.params.id });
    if (!notification) return res.status(404).json({ message: 'Notification not found' });
    res.json(notification);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update a notification
router.put('/:id', async (req, res) => {
  try {
    const updatedNotification = await Notification.findOneAndUpdate({ notificationId: req.params.id }, req.body, { new: true });
    if (!updatedNotification) return res.status(404).json({ message: 'Notification not found' });
    res.json(updatedNotification);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a notification
router.delete('/:id', async (req, res) => {
  try {
    const deletedNotification = await Notification.findOneAndDelete({ notificationId: req.params.id });
    if (!deletedNotification) return res.status(404).json({ message: 'Notification not found' });
    res.json({ message: 'Notification deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
