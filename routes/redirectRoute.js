import express from "express";
const router = express.Router();

import {
  handleRedirect,
  getSingleShortUrl,
} from "../controllers/linkController.js";

router.route("/:shortUrl").get(getSingleShortUrl).get(handleRedirect);

export default router;
