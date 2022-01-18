import express from "express";
const router = express.Router();

import { handleRedirect } from "../controllers/linkController.js";

router.get("/:shortUrl", handleRedirect);

export default router;
