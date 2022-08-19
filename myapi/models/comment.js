const mongoose = require("mongoose");
var Schema = mongoose.Schema;

const commentSchema = new Schema(
  {
    content: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = model("Comment", commentSchema);
