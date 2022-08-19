const mongoose = require("mongoose");
var Schema = mongoose.Schema;

const workSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  studio: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Studio",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  workImage: { type: String, required: true },
});

module.exports = mongoose.model("Work", workSchema);
