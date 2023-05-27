import express from "express";
import scraperController from "../controllers/scraperController.js"

const router = express.Router();

router.route('/scrap-one')
    .post(scraperController.scrapOne);

router.route('/scrap-many')
    .post(scraperController.scrapMany);

export default router;