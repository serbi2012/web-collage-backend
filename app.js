const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const logger = require("morgan");
const cheerio = require("cheerio");

const app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.json({ limit: "500mb" }));
app.use(express.urlencoded({ limit: "500mb", extended: true }));
app.use(cookieParser());
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.post("/", async (req, res, next) => {
  const { originalHtml, sourceDomain } = req.body;
  const $ = cheerio.load(originalHtml);

  if (
    sourceDomain !== "expressjs.com" &&
    sourceDomain !== "www.latimes.com" &&
    sourceDomain !== "recoiljs.org"
  ) {
    $(`header`).first().css("position", "sticky !important");
  }

  $(`div[class="inner_header"]`).css("position", "sticky !important");

  $("header").first().css("top", "0px !important");
  $("header").first().css("z-index", "999");

  $(`div[class="inner_header"]`).first().css("top", "0px !important");

  $(`link`).each(function (index, element) {
    if (this.attribs["href"]?.startsWith("https://")) return;

    $(this).attr("href", `https://${sourceDomain}${this.attribs["href"]}`);
  });

  $(`script`).each(function (index, element) {
    if (this.attribs["src"]?.startsWith("https://")) return;

    $(this).attr("src", `https://${sourceDomain}${this.attribs["src"]}`);
  });

  $(`img`).each(function (index, element) {
    if (this.attribs["src"]?.startsWith("https://")) return;

    if (this.attribs["src"]?.startsWith("//")) {
      $(this).attr("src", `https:${this.attribs["src"]}`);

      return;
    }

    $(this).attr("src", `https://${sourceDomain}${this.attribs["src"]}`);
    $(this).removeAttr("srcset");
  });

  res.send({ htmlString: $.html() });
});

app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
