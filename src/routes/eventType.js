const express = require('express');
const router = express.Router();
const EventType = require('../models/EventType');

// Create a new event type
router.post('/', async (req, res) => {
  const eventType = new EventType(req.body);
  try {
    const savedEventType = await eventType.save();
    res.status(201).json(savedEventType);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all event types
router.get('/', async (req, res) => {
  try {
    const eventTypes = await EventType.find();
    res.json(eventTypes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get event type by ID
router.get('/:id', async (req, res) => {
  try {
    const eventType = await EventType.findOne({ typeId: req.params.id });
    if (!eventType) return res.status(404).json({ message: 'EventType not found' });
    res.json(eventType);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update an event type
router.put('/:id', async (req, res) => {
  try {
    const updatedEventType = await EventType.findOneAndUpdate({ typeId: req.params.id }, req.body, { new: true });
    if (!updatedEventType) return res.status(404).json({ message: 'EventType not found' });
    res.json(updatedEventType);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete an event type
router.delete('/:id', async (req, res) => {
  try {
    const deletedEventType = await EventType.findOneAndDelete({ typeId: req.params.id });
    if (!deletedEventType) return res.status(404).json({ message: 'EventType not found' });
    res.json({ message: 'EventType deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
