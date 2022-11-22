const Scrap = require("../../models/Scrap");

exports.getScrapContent = async (req, res, next) => {
  const key = req.params.scrap_id;

  try {
    const scrapContent = await Scrap.findById(key);

    res.send({ scrapContent });
  } catch (error) {
    next(error);
  }
};

exports.createScrapContent = async (req, res, next) => {
  const { content, urlAddress } = req.body;

  try {
    const newScrapContent = await Scrap.create({ content, urlAddress });

    res.json({ result: "success", id: newScrapContent._id });
  } catch (error) {
    next(error);
  }
};
