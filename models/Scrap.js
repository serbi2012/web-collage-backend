const mongoose = require("mongoose");

const scrapSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  urlAddress: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Scrap", scrapSchema);
