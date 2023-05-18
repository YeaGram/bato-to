import express from "express";
import cors from "cors";
import getComicData from "./batoto/comic.mjs";
import { isProp, GenreValidator } from "./functions/props.mjs";

const app = express();
const domain = "https://battwo.com";

app.use(cors());

app.get("/browse", (req, res) => {
  const page = req.query.page || "1";

  let order = req.query.order;
  order = isProp("order", "field_score", order);

  let lang = req.query.lang || "";
  lang = isProp("translatedLanguage", "", lang);

  let orig = req.query.orig || "";
  lang = isProp("originaLanguage", "", lang);

  let genres = req.query.genres || "";
  genres = GenreValidator(genres);

  let chapters = req.query.chapters || "";

  let search = req.query.search || "";

  const url = `${domain}/v3x-search?word=${search}&sort=${order}&page=${page}&lang=${lang}&orig=${orig}&genres=${genres}&chapters=${chapters}`;

  try {
    fetch(url)
      .then((res) => res.text())
      .then((data) => {
        res.send(getComicData(data));
      });
  } catch (error) {
    console.error(error);
  }
});

app.get("/searched", (req, res) => {
  const lengthHot = req.query.hot || 10;
  const lengtNew = req.query.new || 10;
  try {
    fetch(`${domain}/apo/`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        query:
          "\n    query get_content_searchWords($select: SearchWords_Select) {\n      get_content_searchWords(\n        select: $select\n      ) {\n        newWords\n        hotWords\n      }\n    }\n    ",
        variables: {
          select: { getHots: parseInt(lengthHot), getNews: parseInt(lengtNew) },
        },
        operationName: "get_content_searchWords",
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        res.send(data);
      });
  } catch (error) {
    console.error(error);
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log("listening on port");
});
