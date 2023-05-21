import getDetail from "../models/detailComic.mjs";

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
