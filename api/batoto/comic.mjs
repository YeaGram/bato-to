import * as cheerio from "cheerio";

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
function getOtherTitle($, selector, dataHK) {
  return $(selector)
    .children(":nth-child(2)")
    .children(`[data-hk="${replaceDataHk(dataHK, 5, "3")}"]`)
    .text();
}
function getStudio($, selector, dataHK) {
  return $(selector)
    .children(":nth-child(2)")
    .children(`[data-hk="${replaceDataHk(dataHK, 5, "4")}"]`)
    .text();
}
function getRating($, selector, dataHK) {
  return $(selector)
    .children(":nth-child(2)")
    .children(`[data-hk="${replaceDataHk(dataHK, 5, "5")}"]`)
    .children(
      `[data-hk="${replaceDataHk(replaceDataHk(dataHK, 5, "5"), 6, "1")}"]`
    )
    .children(":nth-child(2)")
    .text();
}
function getFollow($, selector, dataHk) {
  return $(selector)
    .children(":nth-child(2)")
    .children(`[data-hk="${replaceDataHk(dataHk, 5, "5")}"]`)
    .children(
      `[data-hk="${replaceDataHk(replaceDataHk(dataHk, 5, "5"), 6, "2")}"]`
    )
    .children(":nth-child(2)")
    .text();
}
function getReview($, selector, dataHK) {
  return $(selector)
    .children(":nth-child(2)")
    .children(`[data-hk="${replaceDataHk(dataHK, 5, "5")}"]`)
    .children(
      `[data-hk="${replaceDataHk(replaceDataHk(dataHK, 5, "5"), 6, "3")}"]`
    )
    .children(":nth-child(2)")
    .text();
}
function getComment($, selector, dataHK) {
  return $(selector)
    .children(":nth-child(2)")
    .children(`[data-hk="${replaceDataHk(dataHK, 5, "5")}"]`)
    .children(
      `[data-hk="${replaceDataHk(replaceDataHk(dataHK, 5, "5"), 6, "4")}"]`
    )
    .children(":nth-child(2)")
    .text();
}

export default function getComicData(htmlPage) {
  const comic = cheerio.load(htmlPage);
  const comicContainer = comic("div.border-b-base-200");

  return comicContainer
    .map((i, el) => {
      const dataHK = comic(el).attr("data-hk");

      const args = [comic, el, dataHK];
      const cover = getCover(...args);
      const comicTitle = getComicTitle(...args);
      const otherTitle = getOtherTitle(...args);
      const studio = getStudio(...args);
      const rating = getRating(...args);
      const follow = getFollow(...args);
      const review = getReview(...args);
      const comment = getComment(...args);

      return {
        title: comicTitle,
        otherTitle: otherTitle.split("/"),
        studio: studio.split("/"),
        rating: rating,
        follow: follow,
        review: review,
        comment: comment,
        cover: {
          name: cover.title,
          src: cover.src,
          altName: cover.alt,
        },
      };
    })
    .toArray();
}
