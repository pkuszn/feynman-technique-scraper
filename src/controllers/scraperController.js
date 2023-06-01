import scraper from "../scraper.js";
import expressAsyncHandler from 'express-async-handler';
import { words } from "../models/words.js";

const scrapMany = expressAsyncHandler(async (req, res) => {
    if (req.body.links == undefined || req.body.links == "") {
        res.status(400).send({ error: "Links cannot be empty" });
    }
    var result = [];
    const sc = new scraper();
    for(let link of req.body.links) {
        await sc.runScraper(link);
        const tokens = sc.getTokens();
        if (tokens.length > 0) {
            console.log(`Scrapped text from ${sc.getLink()}:"${sc.getContext().trim()}"`);
            result.push(new words(link, tokens));
        }
    }
    if (result.length == 0) {
        res.status.send(201);
    }
    console.log(result);
    res.status(200).send(result);
});

export default {
    scrapMany
}