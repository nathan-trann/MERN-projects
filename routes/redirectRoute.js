import express from "express";
const router = express.Router();

import { handleRedirect } from "../controllers/linkController.js";

router.route("/:shortUrl").get(handleRedirect);

export default router;
