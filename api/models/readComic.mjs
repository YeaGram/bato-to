import * as cheerio from "cheerio";

function getTitle($) {
  return $("h3.text-xl a").text();
}
function getId($) {
  return $("h3.text-xl a").attr("href").split("/")[2].split("-")[0];
}
function getChapterInfo($) {
  const title = $(".text-lg > a:nth-child(1)").text();
  const id = $(".text-lg > a:nth-child(1)")
    .attr("href")
    .split("/")[3]
    .split("-")[0];

  const avaiableChapter = () => {
    const chapters = $(
      $(
        '.grid.gap-3.grid-cols-2:nth-child(1) > select > optgroup[label="Chapters"]'
      )[0]
    ).children();
    const temp = [];

    chapters.map((i, e) => {
      const title = $(e).text();
      const id = $(e).attr("key");

      temp.push({ title, id });
    });

    return temp;
  };

  return {
    id: id,
    title: title,
    avaiableChapter: avaiableChapter(),
  };
}
function getPagination($) {
  const nextSelector = "a.btn[data-hk='0-6-0'] > span";
  const hasNext = !$(nextSelector).text().includes("Detail");

  let next;
  if (hasNext) {
    next = $("a.btn[data-hk='0-6-0']").attr("href").split("/")[3].split("-")[0];
  } else {
    next = $("a.btn[data-hk='0-6-0']").attr("href").split("/")[2].split("-")[0];
  }

  const prevSelector = "a.btn[data-hk='0-5-0'] > span";
  const hasPrev = !$(prevSelector).text().includes("Detail");

  let prev;
  if (hasPrev) {
    prev = $("a.btn[data-hk='0-5-0']").attr("href").split("/")[3].split("-")[0];
  } else {
    prev = $("a.btn-sm[data-hk='0-5-0']")
      .attr("href")
      .split("/")[2]
      .split("-")[0];
  }

  return {
    next,
    hasNext,
    prev,
    hasPrev,
  };
}
function getImagesUrl($) {
  let temp = [];
  $("astro-island").map((i, e) => {
    const rawObj = JSON.parse($(e).attr("props"));
    temp.push(rawObj);
  });

  temp = temp.filter((x) => x.imageFiles)[0].imageFiles[1];
  temp = JSON.parse(temp);

  return temp.map((url) => url[1]);
}
function getUploader($) {
  const id = $(
    "div.opacity-70:nth-child(1) > div:nth-child(1) > div:nth-child(1) a"
  )
    .attr("href")
    ?.split("/")[2]
    .split("-")[0];
  const name = $(
    "div.opacity-70:nth-child(1) > div:nth-child(1) > a:nth-child(2)"
  ).text();

  const time = $("div.opacity-70:nth-child(1) > time")?.attr("time");
  const text = $("div.opacity-70:nth-child(1) > time")?.text();

  const support = $(
    $("div.space-y-3:nth-child(3) > div:nth-child(2) a")
  )?.toArray();

  return {
    name,
    id: id !== undefined ? id : "",
    support: support.map((el) => $(el).text()),
    time: {
      date: time + " unix",
      text,
    },
  };
}
export default function getReadComicData(htmlPage) {
  const comic = cheerio.load(htmlPage);

  const data = {
    title: getTitle(comic),
    id: getId(comic),
    info: getChapterInfo(comic),
    uploader: getUploader(comic),
    pagination: getPagination(comic),
    imageUrl: getImagesUrl(comic),
  };

  return data;
}
