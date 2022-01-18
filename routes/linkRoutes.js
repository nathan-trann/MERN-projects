import express from "express";
const router = express.Router();

import {
  createShortUrl,
  getAllShortUrls,
  getSingleShortUrl,
} from "../controllers/linkController.js";

router.route("/shortUrl").post(createShortUrl).get(getAllShortUrls);

router.route("/:shortUrl").get(getSingleShortUrl);

export default router;
