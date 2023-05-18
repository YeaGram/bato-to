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
function getId($, selector, dataHK) {
  const temp = $(selector)
    .children(`[data-hk="${replaceDataHk(dataHK, 5, "1")}"]`)
    .children()
    .attr().href;

  return temp.split("/")[2].split("-")[0];
}
function getComicTitle($, selector, dataHK) {
  return $(selector)
    .children(":nth-child(2)")
    .children(`[data-hk="${replaceDataHk(dataHK, 5, "2")}"]`)
    .children(":last-child")
    .text();
}
function getTranslatedLanguage($, selector, dataHK) {
  return $(selector)
    .children(":nth-child(2)")
    .children(`[data-hk="${replaceDataHk(dataHK, 5, "2")}"]`)
    .children(
      `[data-hk="${replaceDataHk(
        replaceDataHk(replaceDataHk(dataHK, 5, "2"), 6, "1"),
        7,
        "0"
      )}"]`
    )
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
function getGenres($, selector, dataHK) {
  return $(selector)
    .children(":nth-child(2)")
    .children(`[data-hk="${replaceDataHk(dataHK, 5, "6")}"]`)
    .children(":not(:nth-child(1))")
    .text();
}
function getOriginLanguage($, selector, dataHK) {
  return $(selector)
    .children(":nth-child(2)")
    .children(`[data-hk="${replaceDataHk(dataHK, 5, "6")}"]`)
    .children(":nth-child(1)")
    .text();
}
function getLatestChapter($, selector, dataHK) {
  const title = $(selector)
    .children(":nth-child(2)")
    .children(
      `[data-hk="${replaceDataHk(
        replaceDataHk(replaceDataHk(dataHK, 5, "7"), 6, "1"),
        7,
        "0"
      )}"]`
    )
    .children(":first-child")
    .text();

  const chapterId = $(selector)
    .children(":nth-child(2)")
    .children(
      `[data-hk="${replaceDataHk(
        replaceDataHk(replaceDataHk(dataHK, 5, "7"), 6, "1"),
        7,
        "0"
      )}"]`
    )
    .children(":first-child")
    .children()
    .attr()
    ?.href?.split("/")[2]
    .split("-")[0];

  const time = $(selector)
    .children(":nth-child(2)")
    .children(
      `[data-hk="${replaceDataHk(
        replaceDataHk(replaceDataHk(dataHK, 5, "7"), 6, "1"),
        7,
        "0"
      )}"]`
    )
    .children(":last-child")
    .children(`:last-child`)
    .children(":last-child");

  const uploader = $(selector)
    .children(":nth-child(2)")
    .children(
      `[data-hk="${replaceDataHk(
        replaceDataHk(replaceDataHk(dataHK, 5, "7"), 6, "1"),
        7,
        "0"
      )}"]`
    )
    .children(`:last-child`)
    .children(
      `[data-hk="${replaceDataHk(
        replaceDataHk(
          replaceDataHk(
            replaceDataHk(replaceDataHk(dataHK, 5, "7"), 6, "1"),
            7,
            "0"
          ),
          8,
          "2"
        ),
        9,
        "0"
      )}"]`
    )
    .children()
    .children();

  if (title !== "") {
    return {
      title,
      chapterId,
      time: time.attr("time"),
      text: time.text(),
      uploader: {
        name: uploader.attr()?.href.split("/")[2].split("-").pop(0),
        uploaderId: uploader.attr()?.href.split("/")[2].split("-")[0],
        avatarUrl: uploader.children().attr()?.src,
      },
    };
  } else {
    return {};
  }
}

export default function getComicData(htmlPage) {
  const comic = cheerio.load(htmlPage);
  const comicContainer = comic("div.border-b-base-200");

  return comicContainer
    .map((i, el) => {
      const dataHK = comic(el).attr("data-hk");

      const args = [comic, el, dataHK];

      return {
        id: getId(...args),
        originalLanguage: getOriginLanguage(...args),
        translatedLanguage: getTranslatedLanguage(...args),
        title: getComicTitle(...args),
        otherTitle: getOtherTitle(...args).split("/"),
        studio: getStudio(...args).split("/"),
        rating: getRating(...args),
        follow: getFollow(...args),
        review: getReview(...args),
        comment: getComment(...args),
        genres: getGenres(...args).split(","),
        latestChapter: getLatestChapter(...args),
        cover: {
          name: getCover(...args).title,
          src: getCover(...args).src,
          altName: getCover(...args).alt,
        },
      };
    })
    .toArray();
}
