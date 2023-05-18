import express from "express";
import cors from "cors";
import * as cheerio from "cheerio";
import axios from "axios";

const app = express();
app.use(cors());

function replaceDataHk(string, idx, val) {
  const splited = string.split("-");
  splited.splice(idx - 1, 1, val);
  splited.push("0");
  return splited.join("-");
}

function getCover($, selector, dataHK) {
  return $(selector)
    .children(`[data-hk="${replaceDataHk(dataHK, 5, "1")}"]`)
    .children()
    .children(
      `[data-hk="${replaceDataHk(replaceDataHk(dataHK, 5, "1"), 6, "1")}"]`
    )
    .attr();
}

function getComicData(htmlPage) {
  const comic = cheerio.load(htmlPage);
  const comicContainer = comic("div.border-b-base-200");

  return comicContainer
    .map((i, el) => {
      const dataHK = comic(el).attr("data-hk");
      const cover = getCover(comic, el, dataHK);
      return cover.title;
    })
    .toArray();
}

app.get("/", (req, res) => {
  axios.get("https://battwo.com/v3x-search?page=1").then((response) => {
    const comicPage = response.data;
    res.send(getComicData(comicPage));
  });
});

app.listen(process.env.PORT || 3000);

// const comicPage = data;
// console.log(getComicData(comicPage));
// res.send(getComicData(data));

// axios.get("https://battwo.com/v3x-search?page=1").then((response) => {
//   const comicPage = response.data;
//   res.send(getComicData(comicPage));
// });

// (async function () {
//   const domain = "https://battwo.com";
//   const response = await axios.get(domain + "/v3x-search?page=1");
//   const data = await response.text();
//   const $data = cheerio.load(data);
//   const $container = $data("div.border-b-base-200");
//   const $comic = $container
//     .map(function (i, el) {
//       const $current = $data(el).attr("data-hk");
//       const $cover = $data(el)
//         .children(`[data-hk="${replaceDataHk($current, 5, "1")}"]`)
//         .children()
//         .children(
//           `[data-hk="${replaceDataHk(
//             replaceDataHk($current, 5, "1"),
//             6,
//             "1"
//           )}"]`
//         )
//         .attr();
//       const $title = $data(el)
//         .children(":nth-child(2)")
//         .children(`[data-hk="${replaceDataHk($current, 5, "2")}"]`)
//         .text();
//       const $otherTitle = $data(el)
//         .children(":nth-child(2)")
//         .children(`[data-hk="${replaceDataHk($current, 5, "3")}"]`)
//         .text();
//       const $studio = $data(el)
//         .children(":nth-child(2)")
//         .children(`[data-hk="${replaceDataHk($current, 5, "4")}"]`)
//         .text();
//       const $rating = $data(el)
//         .children(":nth-child(2)")
//         .children(`[data-hk="${replaceDataHk($current, 5, "5")}"]`)
//         .children(
//           `[data-hk="${replaceDataHk(
//             replaceDataHk($current, 5, "5"),
//             6,
//             "1"
//           )}"]`
//         )
//         .children(":nth-child(2)")
//         .text();
//       const $follow = $data(el)
//         .children(":nth-child(2)")
//         .children(`[data-hk="${replaceDataHk($current, 5, "5")}"]`)
//         .children(
//           `[data-hk="${replaceDataHk(
//             replaceDataHk($current, 5, "5"),
//             6,
//             "2"
//           )}"]`
//         )
//         .children(":nth-child(2)")
//         .text();
//       const $review = $data(el)
//         .children(":nth-child(2)")
//         .children(`[data-hk="${replaceDataHk($current, 5, "5")}"]`)
//         .children(
//           `[data-hk="${replaceDataHk(
//             replaceDataHk($current, 5, "5"),
//             6,
//             "3"
//           )}"]`
//         )
//         .children(":nth-child(2)")
//         .text();
//       const $comments = $data(el)
//         .children(":nth-child(2)")
//         .children(`[data-hk="${replaceDataHk($current, 5, "5")}"]`)
//         .children(
//           `[data-hk="${replaceDataHk(
//             replaceDataHk($current, 5, "5"),
//             6,
//             "4"
//           )}"]`
//         )
//         .children(":nth-child(2)")
//         .text();
//       return {
//         title: $title,
//         otherTitle: $otherTitle,
//         studio: $studio,
//         rating: $rating,
//         follow: $follow,
//         review: $review,
//         comment: $comments,
//         cover: {
//           src: $cover.src,
//           title: $cover.title,
//           alt: $cover.alt,
//         },
//       };
//     })
//     .toArray();
//   res.send($comic);
// })();
// res.send("YOWWWW");
