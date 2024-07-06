const express = require('express');
const router = express.Router();
const Attendance = require('../models/Attendance');

// Create a new attendance
router.post('/', async (req, res) => {
  const attendance = new Attendance(req.body);
  try {
    const savedAttendance = await attendance.save();
    res.status(201).json(savedAttendance);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all attendances
router.get('/', async (req, res) => {
  try {
    const attendances = await Attendance.find();
    res.json(attendances);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get attendance by ID
router.get('/:eventId/:lecturerId', async (req, res) => {
  try {
    const attendance = await Attendance.findOne({ eventId: req.params.eventId, lecturerId: req.params.lecturerId });
    if (!attendance) return res.status(404).json({ message: 'Attendance not found' });
    res.json(attendance);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update an attendance
router.put('/:eventId/:lecturerId', async (req, res) => {
  try {
    const updatedAttendance = await Attendance.findOneAndUpdate(
      { eventId: req.params.eventId, lecturerId: req.params.lecturerId },
      req.body,
      { new: true }
    );
    if (!updatedAttendance) return res.status(404).json({ message: 'Attendance not found' });
    res.json(updatedAttendance);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete an attendance
router.delete('/:eventId/:lecturerId', async (req, res) => {
  try {
    const deletedAttendance = await Attendance.findOneAndDelete({ eventId: req.params.eventId, lecturerId: req.params.lecturerId });
    if (!deletedAttendance) return res.status(404).json({ message: 'Attendance not found' });
    res.json({ message: 'Attendance deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
