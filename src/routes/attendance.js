const express = require('express');
const router = express.Router();
const {
  createAttendance,
  getAllAttendances,
  getAttendanceById,
  updateAttendance,
  deleteAttendance,
} = require('../controllers/attendanceController');

router.post('/', createAttendance);
router.get('/', getAllAttendances);
router.get('/:eventId/:lecturerId', getAttendanceById);
router.put('/:eventId/:lecturerId', updateAttendance);
router.delete('/:eventId/:lecturerId', deleteAttendance);

module.exports = router;
