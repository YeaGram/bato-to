import express from "express";
import cors from "cors";
import * as uAgent from "express-useragent";

import {
  GetSearched,
  GetComicDetail,
  GetBrowse,
  GetReadComic,
} from "./route/comicRoute.mjs";
import { userAgent, props } from "./midlleware/midlleware.mjs";

const app = express();

// middleware
app.use(
  cors({
    methods: ["GET"],
  })
);
app.use(uAgent.express());
app.use(props);
app.use(userAgent);

app.use("/browse", GetBrowse());
app.use("/searched", GetSearched());
app.use("/comic", GetComicDetail());
app.use("/read", GetReadComic());

app.listen(process.env.PORT || 4000, () => {
  console.log("listening on port");
});
