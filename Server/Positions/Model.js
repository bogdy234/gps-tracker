const mongoose = require("mongoose");
const { Schema } = mongoose;

const positionSchema = new Schema({
  latitude: String,
  longitude: String,
  terminalId: String,
  date: { type: Date, default: Date.now },
});

const Position = mongoose.model("Position", positionSchema);

module.exports = Position;
