const cheerio = require("cheerio");

exports.getHtmlString = (req, res, next) => {
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
};