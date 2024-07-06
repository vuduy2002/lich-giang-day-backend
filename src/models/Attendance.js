const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const attendanceSchema = new Schema({
  eventId: { type: String, required: true, ref: 'Event' },
  lecturerId: { type: String, required: true, ref: 'Lecturer' },
  status: { type: String, required: true },
  reason: { type: String },
  lecturerRole: { type: String, required: true }
});

module.exports = mongoose.model('Attendance', attendanceSchema);
