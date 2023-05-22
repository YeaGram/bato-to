import { comicProps } from "../utils/property.mjs";
import { isHadProp, GenreValidator } from "../utils/module.mjs";
import getDetail from "../models/detailComic.mjs";
import getComicData from "../models/browseComic.mjs";
import getReadComicData from "../models/readComic.mjs";

export function getSearched(req, res) {
  const lengthHot = req.query.hot || 10;
  const lengtNew = req.query.new || 10;

  try {
    const query = {
      query:
        "\n    query get_content_searchWords($select: SearchWords_Select) {\n      get_content_searchWords(\n        select: $select\n      ) {\n        newWords\n        hotWords\n      }\n    }\n    ",
      variables: {
        select: { getHots: parseInt(lengthHot), getNews: parseInt(lengtNew) },
      },
      operationName: "get_content_searchWords",
    };
    const config = {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(query),
    };

    fetch(`${comicProps.domain}/apo/`, config)
      .then((response) => response.json())
      .then((data) => {
        res.send(data);
      });
  } catch (error) {
    console.error(error);
  }
}

export function getComicDetail(req, res) {
  const { id } = req.params;

  const url = `https://battwo.com/title/${id}`;
  try {
    fetch(url)
      .then((res) => res.text())
      .then((htmlPage) => {
        res.send(getDetail(htmlPage));
      });
  } catch (error) {
    console.error(error);
  }
}

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

export function getReadComic(req, res) {
  const { id } = req.params;

  const url = `https://battwo.com/title/${id}`;
  try {
    fetch(url)
      .then((res) => res.text())
      .then((htmlPage) => {
        getReadComicData(htmlPage);
      });
  } catch (error) {
    console.error(error);
  }
}
