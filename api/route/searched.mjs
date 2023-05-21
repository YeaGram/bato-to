import express from "express";

import { getSearched } from "../controller/searched.mjs";

export const router = express.Router();

router.get("/", getSearched);
