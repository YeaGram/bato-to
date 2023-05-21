import * as cheerio from "cheerio";
import { createObjectFromNestedArray } from "../utils/module.mjs";

function getCover($) {
  const temp = $("img.w-full");
  return {
    src: temp.attr("src"),
    originalSrc: temp.attr("data-ori"),
    title: temp.attr("title"),
    alt: temp.attr("alt"),
  };
}
function getTitle($) {
  return $(".pl-3 > h3:nth-child(1)").children("a").text();
}
function getOtherTitle($) {
  return $(".pl-3 > div:nth-child(2)").children().text().split("/");
}
function getStudio($) {
  return $(".pl-3 > div:nth-child(3)").text().split("/");
}
function getReviews($) {
  const temp = [];
  $(".pl-3 > div:nth-child(4)")
    .children()
    .map((i, el) => {
      const name = $(el).children(":first-child").attr("name");
      const value = $(el).children(":last-child").text();
      temp.push({
        name,
        value,
      });
    });

  return temp;
}
function getGenres($) {
  return $(".mt-3 > div:nth-child(2) > div:nth-child(1)")
    .children(":not(:first-child)")
    .text()
    .split(",");
}
function getLanguages($) {
  const orignalLanguge = $("span.mr-1:nth-child(4) > span:nth-child(1)").text();
  const translatedLanguge = $(
    "span.mr-1:nth-child(1) > span:nth-child(1)"
  ).text();
  return {
    orignalLanguge,
    translatedLanguge,
  };
}
function getStatus($) {
  const publication = $(
    ".mt-3 > div:nth-child(2) > div:nth-child(3) > span:nth-child(3)"
  ).text();

  const batoStatus = $(
    ".mt-3 > div:nth-child(2) > div:nth-child(4) > span:nth-child(3)"
  ).text();

  return {
    publication,
    batoStatus,
  };
}
function getReadDirection($) {
  return $(".mt-3 > div:nth-child(2) > div:nth-child(5) > span:nth-child(2)")
    .text()
    .substring(1);
}
function getRating($) {
  const score = $(".font-black").text();
  const votes = $("div.whitespace-nowrap:nth-child(3)").text().split(" ")[0];

  const star = [];
  $(".space-y-0.artboard")
    .children()
    .map((i, e) => {
      const temp = {};

      const percent = $(e).children(":last-child").text();
      const key = $(e).children(":first-child").children(":first-child").text();

      temp[key] = parseFloat(percent.split("%")[0]);
      temp.max = 100;

      star.push(temp);
    });

  return {
    score: parseFloat(score),
    votes: parseInt(votes),
    star,
  };
}
function getDescription($) {
  return $($(".mt-3:last-child").find(".prose.limit-html")[0]).text();
}

function getSummary($) {
  const extraInfo = $(
    "div.space-y-3:nth-child(2) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > p:nth-child(1)"
  )
    .text()
    .split("\n")
    .join(" ");
  const resource = $(
    "div.mt-5:nth-child(3) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > p:nth-child(1)"
  )
    .text()
    .split("\n");

  const views = $("div.mt-5:nth-child(4) > div:nth-child(2)")
    .text()
    .split("/")
    .map((n) => {
      const view = n.split(":");

      return {
        time: view[0],
        count: view[1],
      };
    });

  const readers = createObjectFromNestedArray(
    $("div.mt-5:nth-child(5) > div:nth-child(2)")
      .text()
      .split("/")
      .map((view) => {
        const key = view.split(" ");
        key.shift();

        return [key.join("-"), view.split(" ")[0]];
      })
  );

  const firstUploaderTemp = $(".whitespace-pre-wrap > a:nth-child(1)") || "";
  const firstUploader = {
    name: firstUploaderTemp?.attr("href")?.split("/")[2]?.split("-")[1],
    id: firstUploaderTemp?.attr("href")?.split("/")[2]?.split("-")[0],
    time: $(".whitespace-pre-wrap > time:nth-child(3)").text() + " GMT",
  };

  return {
    extraInfo,
    resource,
    views,
    readers,
    firstUploader,
  };
}

function getChapters($) {
  const temp = $(".flex-col-reverse").children().children();
  const chapters = [];

  temp.map((i, e) => {
    const chapterId = $(e)
      .children(":first-child")
      .children("a")
      .attr("href")
      .split("/")[3]
      .split("-")[0];

    const chapterName = $(e).children(":first-child").children("a").text();

    const chapterSubname = $(e)
      .children(":first-child")
      .children("span")
      .text()
      .replace(":", "")
      .trim();

    const uploader = $(
      $(e).find(`.inline-flex.items-center.space-x-1 .avatar a`)
    );
    const uploaderId = uploader.attr("href")?.split("/")[2].split("-")[0];
    const uploaderName = uploader.attr("href")?.split("/")[2].split("-")[1];
    const uploaderAvatar = uploader.children().attr("src");

    const uploadTime = $($(e).find("time"));

    chapters.push({
      id: chapterId,
      name: chapterName,
      subName: chapterSubname,
      uploader: {
        id: uploaderId,
        name: uploaderName,
        avatarUrl: uploaderAvatar,
        posted: {
          time: uploadTime.attr("time"),
          avaiable: uploadTime.text(),
        },
      },
    });
  });

  return chapters;
}
export default function getDetail(htmlPage) {
  const comic = cheerio.load(htmlPage);

  return {
    title: getTitle(comic),
    otherTitle: getOtherTitle(comic),
    language: getLanguages(comic),
    cover: getCover(comic),
    status: getStatus(comic),

    genres: getGenres(comic),
    description: getDescription(comic),
    rating: getRating(comic),
    studio: getStudio(comic),
    readDirection: getReadDirection(comic),

    reviews: getReviews(comic),
    summary: getSummary(comic),
    chapters: getChapters(comic),
  };
}
