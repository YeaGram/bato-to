import express from "express";
import cors from "cors";
import * as cheerio from "cheerio";

const app = express();
app.use(cors());

function replaceDataHk(string, idx, val) {
  const splited = string.split("-");
  splited.splice(idx - 1, 1, val);
  splited.push("0");
  return splited.join("-");
}

app.get("/", (req, res) => {
  console.log("incoming request :))");
  // (async () => {
  //   const domain = "https://battwo.com";
  //   const response = await fetch(domain + "/v3x-search?page=1");
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

  res.send("YOWWWW");
});

app.listen(process.env.PORT || 3000);
