import express from "express";

import { getComicDetail } from "../controller/comicDetail.mjs";

export const router = express.Router();

router.get("/:id", getComicDetail);
