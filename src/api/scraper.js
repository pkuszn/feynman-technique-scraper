import express from "express";
import scraperController from "../controllers/scraperController.js"

const router = express.Router();

router.route('/many')
    .post(scraperController.scrapMany);

export default router;