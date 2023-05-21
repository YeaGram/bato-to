import express from "express";

import { getBrowse } from "../controller/browse.mjs";

export const router = express.Router();

router.get("/", getBrowse);
