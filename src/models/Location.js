const mongoose = require("mongoose");
mongoose.set("strictQuery", true);

const locationSchema = new mongoose.Schema({
  locationId: { type: String, required: true, unique: true },
  locationName: { type: String, required: true },
});

module.exports = mongoose.model("Location", locationSchema);
