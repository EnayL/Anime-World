const mongoose = require("mongoose");
var Schema = mongoose.Schema;

const userSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  email: {
    type: String,
    required: true,
  },

  password: {
    type: String,
    required: true,
    minlength: 5,
  },
});

module.exports = mongoose.model("User", userSchema);
