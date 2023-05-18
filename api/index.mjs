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

function getCover($, selector, dataHK) {
  return $(selector)
    .children(`[data-hk="${replaceDataHk(dataHK, 5, "1")}"]`)
    .children()
    .children(
      `[data-hk="${replaceDataHk(replaceDataHk(dataHK, 5, "1"), 6, "1")}"]`
    )
    .attr();
}
function getComicTitle($, selector, dataHK) {
  return $(selector)
    .children(":nth-child(2)")
    .children(`[data-hk="${replaceDataHk(dataHK, 5, "2")}"]`)
    .text();
}

function getComicData(htmlPage) {
  const comic = cheerio.load(htmlPage);
  const comicContainer = comic("div.border-b-base-200");

  return comicContainer
    .map((i, el) => {
      const dataHK = comic(el).attr("data-hk");

      const args = [comic, el, dataHK];
      const cover = getCover(...args);
      const comicTitle = getComicTitle(...args);

      return {
        title: comicTitle,
        cover: {
          name: cover.title,
        },
      };
    })
    .toArray();
}

app.get("/", (req, res) => {
  try {
    fetch("https://battwo.com/v3x-search?page=1")
      .then((res) => res.text())
      .then((data) => {
        res.send(getComicData(data));
        console.log(getComicData(data));
      });
  } catch (error) {
    console.error(error);
  }
});

app.listen(process.env.PORT || 3000);

// class comicScrapper {
//   constructor(htmlPage) {}

//   map(htmlPage) {
//     const comic = cheerio.load(htmlPage);
//     const comicContainer = comic("div.border-b-base-200");

//     return comicContainer
//       .map((i, el) => {
//         const dataHK = comic(el).attr("data-hk");

//         const args = [comic, el, dataHK];
//         const comicTitle = this.getComicTitle(...args);
//         const otherTitle = this.getOtherTitle(...args);
//         const studio = this.getStudio(...args);
//         const rating = this.getRating(...args);
//         const follow = this.getFollow(...args);
//         const review = this.getReview(...args);
//         const comment = this.getComment(...args);
//         const cover = this.getCover(...args);

//         return {
//           title: comicTitle,
//           otherTitle: otherTitle.split("/"),
//           studio: studio.split("/"),
//           rating: rating,
//           follow: follow,
//           review: review,
//           comment: comment,
//           cover: {
//             name: cover.title,
//             alt: cover.alt,
//             src: cover.src,
//           },
//         };
//       })
//       .toArray();
//   }
//   getComicTitle($, selector, dataHK) {
//     return $(selector)
//       .children(":nth-child(2)")
//       .children(`[data-hk="${replaceDataHk(dataHK, 5, "2")}"]`)
//       .text();
//   }
//   getOtherTitle($, selector, dataHK) {
//     return $(selector)
//       .children(":nth-child(2)")
//       .children(`[data-hk="${replaceDataHk(dataHK, 5, "3")}"]`)
//       .text();
//   }
//   getStudio($, selector, dataHK) {
//     return $(selector)
//       .children(":nth-child(2)")
//       .children(`[data-hk="${replaceDataHk(dataHK, 5, "4")}"]`)
//       .text();
//   }
//   getRating($, selector, dataHK) {
//     return $(selector)
//       .children(":nth-child(2)")
//       .children(`[data-hk="${replaceDataHk(dataHK, 5, "5")}"]`)
//       .children(
//         `[data-hk="${replaceDataHk(replaceDataHk(dataHK, 5, "5"), 6, "1")}"]`
//       )
//       .children(":nth-child(2)")
//       .text();
//   }
//   getFollow($, selector, dataHk) {
//     return $(selector)
//       .children(":nth-child(2)")
//       .children(`[data-hk="${replaceDataHk(dataHk, 5, "5")}"]`)
//       .children(
//         `[data-hk="${replaceDataHk(replaceDataHk(dataHk, 5, "5"), 6, "2")}"]`
//       )
//       .children(":nth-child(2)")
//       .text();
//   }
//   getReview($, selector, dataHK) {
//     return $(selector)
//       .children(":nth-child(2)")
//       .children(`[data-hk="${replaceDataHk(dataHK, 5, "5")}"]`)
//       .children(
//         `[data-hk="${replaceDataHk(replaceDataHk(dataHK, 5, "5"), 6, "3")}"]`
//       )
//       .children(":nth-child(2)")
//       .text();
//   }
//   getComment($, selector, dataHK) {
//     return $(selector)
//       .children(":nth-child(2)")
//       .children(`[data-hk="${replaceDataHk(dataHK, 5, "5")}"]`)
//       .children(
//         `[data-hk="${replaceDataHk(replaceDataHk(dataHK, 5, "5"), 6, "4")}"]`
//       )
//       .children(":nth-child(2)")
//       .text();
//   }
//   getCover($, selector, dataHK) {
//     return $(selector)
//       .children(`[data-hk="${replaceDataHk(dataHK, 5, "1")}"]`)
//       .children()
//       .children(
//         `[data-hk="${replaceDataHk(replaceDataHk(dataHK, 5, "1"), 6, "1")}"]`
//       )
//       .attr();
//   }
// }
// try {
//   fetch("https://battwo.com/v3x-search?page=1")
//     .then((res) => res.text())
//     .then((data) => {
//       console.log(new comicScrapper().map(data));
//     });
// } catch (error) {
//   console.error(error);
// }

// axios.get("").then((response) => {
//   const comicPage = response.data;
//   res.send(getComicData(comicPage));
// });

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
