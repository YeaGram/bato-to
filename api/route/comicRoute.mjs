import express from "express";

import {
  getSearched,
  getComicDetail,
  getBrowse,
  getReadComic,
} from "../controller/comic.mjs";

export function GetSearched() {
  const router = express.Router();
  router.get("/", getSearched);

  return router;
}

export function GetComicDetail() {
  const router = express.Router();
  router.get("/:id", getComicDetail);

  return router;
}

export function GetBrowse() {
  const router = express.Router();
  router.get("/", getBrowse);

  return router;
}
export function GetReadComic() {
  const router = express.Router();
  router.get("/:id", getReadComic);

  return router;
}
