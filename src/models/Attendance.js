const mongoose = require("mongoose");
mongoose.set("strictQuery", true);

const Schema = mongoose.Schema;

const attendanceSchema = new Schema({
  eventId: { type: String, required: true, unique: true },
  hostId: { type: Array, required: true },
  memberId: { type: Array, required: true },
});

module.exports = mongoose.model("Attendance", attendanceSchema);
