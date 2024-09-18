const { type } = require("express/lib/response");
const mongoose = require("mongoose");
mongoose.set("strictQuery", true);

const eventSchema = new mongoose.Schema({
  eventId: { type: String, required: true, unique: true },
  eventName: { type: String, required: true },
  eventDescription: { type: String, required: true },
  date: { type: String, required: true },
  timeStart: { type: String, required: true },
  timeEnd: { type: String, required: true },
  eventLocation: { type: String, required: true, ref: "Location" },
  eventType: { type: String, required: true, ref: "EventType" },
  host: [
    {
      lecturerId: { type: String, ref: "Lecturer", required: true }, // Sử dụng ref cho lecturerId
      lecturerName: { type: String },

      reason: { type: String },
      confirm: { type: String },
      checked: { type: Boolean },
      isHost: { type: Boolean },
    },
  ],
  participants: [
    {
      lecturerId: { type: String, ref: "Lecturer", required: true }, // Sử dụng ref cho lecturerId

      lecturerName: { type: String },
      reason: { type: String },
      confirm: { type: String },
      checked: { type: Boolean },
      isHost: { type: Boolean },
    },
  ],
});

module.exports = mongoose.model("Event", eventSchema);

// host: [
//   {
//     lecturerId: { type: String, ref: "Lecturer" }, // Tham chiếu tới `User` qua
//     reason: { type: String },
//     confirm: { type: String },
//     check: { type: String },
//     isHost: { type: String },
//   },
// ],
// participants: [
//   {
//     lecturerId: { type: String, ref: "Lecturer" }, // Tham chiếu tới `User` qua
//     reason: { type: String },
//     confirm: { type: String },
//     check: { type: String },
//     isHost: { type: String },
//   },
// ],
