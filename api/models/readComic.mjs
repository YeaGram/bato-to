import * as cheerio from "cheerio";

export default function getReadComicData(htmlPage) {
  const comic = cheerio.load(htmlPage);

  const data = comic("body").find("img");

  console.log(data);
}
