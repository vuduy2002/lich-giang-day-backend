const mongoose = require("mongoose");
mongoose.set("strictQuery", true);

const eventTypeSchema = new mongoose.Schema({
  typeId: { type: String, required: true, unique: true },
  typeName: { type: String, required: true },
});

module.exports = mongoose.model("EventType", eventTypeSchema);
