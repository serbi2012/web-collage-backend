const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const logger = require("morgan");
const db = require("./config/db");

const scrapContentRouter = require("./routes/scrapContent");
const app = express();
const ERROR = require("./constants/error");

db();

app.use(cors());
app.use(logger("dev"));
app.use(express.json({ limit: "500mb" }));
app.use(express.urlencoded({ limit: "500mb", extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/scrapContent", scrapContentRouter);

app.use(function (req, res, next) {
  next(createError(404, ERROR.NOT_FOUND));
});

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.status(err.status || 500);
  res.json({
    message: ERROR.INTERNAL_SERVER_ERROR,
  });
});

module.exports = app;
