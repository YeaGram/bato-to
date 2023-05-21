import { comicProps } from "../utils/property.mjs";
import { isHadProp, GenreValidator } from "../utils/module.mjs";
import getComicData from "../models/browseComic.mjs";

export function getBrowse(req, res) {
  const page = req.query.page || "1";

  const order = isHadProp("order", "field_score", req.query.order);
  const lang = isHadProp("translatedLanguage", "", req.query.lang);
  const orig = isHadProp("originaLanguage", "", req.query.orig);
  const genres = GenreValidator(req.query.genres || "");
  const chapters = req.query.chapters || "";
  const search = req.query.search || "";

  const url = `${comicProps.domain}/v3x-search?word=${search}&sort=${order}&page=${page}&lang=${lang}&orig=${orig}&genres=${genres}&chapters=${chapters}`;
  console.log(url);

  try {
    fetch(url)
      .then((res) => res.text())
      .then((data) => {
        res.send(getComicData(data));
      });
  } catch (error) {
    console.error(error);
  }
}
