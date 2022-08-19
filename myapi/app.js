var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const database = require("./config/database");
require("dotenv").config();

var indexRouter = require("./routes/index");
const userRouter = require("./routes/user");
const studioRoutes = require("./routes/studio");
const workRoutes = require("./routes/work");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use("/uploads", express.static("uploads"));
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

database.connection();

// routes request
app.use("/", indexRouter);
app.use("/user", userRouter);
app.use("/studio", studioRoutes);
app.use("/work", workRoutes);

app.use((req, res, next) => {
  res.header("Acess-Control-Allow-Origin", "*");

  res.header("Acess-Control-Allow-Headers", "*");
  if (req.method === "OPTIONS") {
    res.header(
      "Acess-Control-Allow-Methods",
      "PUT",
      "POST",
      "PATCH",
      "DELETE",
      "GET"
    );
    return res.status(200).json({});
  }
  next(error);
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
