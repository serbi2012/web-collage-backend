const express = require("express");
const { getHtmlString } = require("./controllers/htmlString.controller");
const router = express.Router();

router.post("/", getHtmlString);

module.exports = router;
