const express = require('express');
const router = express.Router();
const Lecturer = require('../models/Lecturer');

// Create a new lecturer
router.post('/', async (req, res) => {
  const lecturer = new Lecturer(req.body);
  try {
    const savedLecturer = await lecturer.save();
    res.status(201).json(savedLecturer);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all lecturers
router.get('/', async (req, res) => {
  try {
    const lecturers = await Lecturer.find();
    res.json(lecturers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get lecturer by ID
router.get('/:id', async (req, res) => {
  try {
    const lecturer = await Lecturer.findOne({ lecturerId: req.params.id });
    if (!lecturer) return res.status(404).json({ message: 'Lecturer not found' });
    res.json(lecturer);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update a lecturer
router.put('/:id', async (req, res) => {
  try {
    const updatedLecturer = await Lecturer.findOneAndUpdate({ lecturerId: req.params.id }, req.body, { new: true });
    if (!updatedLecturer) return res.status(404).json({ message: 'Lecturer not found' });
    res.json(updatedLecturer);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a lecturer
router.delete('/:id', async (req, res) => {
  try {
    const deletedLecturer = await Lecturer.findOneAndDelete({ lecturerId: req.params.id });
    if (!deletedLecturer) return res.status(404).json({ message: 'Lecturer not found' });
    res.json({ message: 'Lecturer deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
