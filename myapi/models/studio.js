const mongoose = require("mongoose");
var Schema = mongoose.Schema;

const studioSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  studioImage: { type: String, required: true },
});

module.exports = mongoose.model("Studio", studioSchema);
