import express from "express";
import cors from "cors";
import * as uAgent from "express-useragent";

import { router as browse } from "./route/browse.mjs";
import { router as search } from "./route/searched.mjs";
import { router as comicDetail } from "./route/comicDetail.mjs";

import { props } from "./midlleware/props.mjs";
import { userAgent } from "./midlleware/userAgent.mjs";

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

app.use("/browse", browse);
app.use("/searched", search);
app.use("/comic", comicDetail);

app.listen(process.env.PORT || 3000, () => {
  console.log("listening on port");
});
