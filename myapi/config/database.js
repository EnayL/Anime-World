const mongoose = require("mongoose");

const connection = () => {
  mongoose.connect(
    "mongodb+srv://enayl:NEWPASS@cluster0.prxkvig.mongodb.net/?retryWrites=true&w=majority"
  );
  const db = mongoose.connection;
  db.on("error", (err) => console.log(err));
  db.on("open", () => console.log("DATABASE : OK"));
};

module.exports = { connection };
