const express = require('express');
const router = express.Router();
const Event = require('../models/Event');
const EventType = require('../models/EventType');
const Lecturer = require('../models/Lecturer');

// Create a new event
router.post('/', async (req, res) => {
  const event = new Event(req.body);
  try {
    const savedEvent = await event.save();
    res.status(201).json(savedEvent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all events
router.get('/', async (req, res) => {
  try {
    const events = await Event.find()
      .populate({ path: 'eventType', model: EventType, localField: 'eventType', foreignField: 'typeId', select: 'typeName -_id' })
      .populate({ path: 'host', model: Lecturer, localField: 'host', foreignField: 'lecturerId', select: 'lecturerName -_id' })
      .populate({ path: 'participants', model: Lecturer, localField: 'participants', foreignField: 'lecturerId', select: 'lecturerName -_id' });
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get event by eventId
router.get('/:eventId', async (req, res) => {
  try {
    const event = await Event.findOne({ eventId: req.params.eventId })
      .populate({ path: 'eventType', model: EventType, localField: 'eventType', foreignField: 'typeId', select: 'typeName -_id' })
      .populate({ path: 'host', model: Lecturer, localField: 'host', foreignField: 'lecturerId', select: 'lecturerName -_id' })
      .populate({ path: 'participants', model: Lecturer, localField: 'participants', foreignField: 'lecturerId', select: 'lecturerName -_id' });
    res.json(event);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Cập nhật event
router.put('/:eventId', async (req, res) => {
  try {
    const updatedEvent = await Event.findOneAndUpdate(
      { eventId: req.params.eventId },
      req.body,
      { new: true }
    )
    if (!updatedEvent) return res.status(404).json({ message: 'Event not found' });
    res.json(updatedEvent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete an event
router.delete('/:id', async (req, res) => {
  try {
    const deletedEvent = await Event.findOneAndDelete({ eventId: req.params.id });
    if (!deletedEvent) return res.status(404).json({ message: 'Event not found' });
    res.json({ message: 'Event deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
