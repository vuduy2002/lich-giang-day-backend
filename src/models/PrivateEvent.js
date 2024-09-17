const { type } = require("express/lib/response");
const mongoose = require("mongoose");
mongoose.set("strictQuery", true);

const privateEventSchema = new mongoose.Schema({
  eventId: { type: String, required: true, unique: true },
  eventName: { type: String, required: true },
  eventDescription: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  idLecturer: { type: String, required: true },
});

module.exports = mongoose.model("PrivateEvent", privateEventSchema);
