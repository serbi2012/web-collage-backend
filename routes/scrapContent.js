const express = require("express");
const router = express.Router();
const {
  getScrapContent,
  createScrapContent,
} = require("./controllers/scrapContent.controller");

router.get("/:scrap_id", getScrapContent);

router.post("/", createScrapContent);

module.exports = router;
