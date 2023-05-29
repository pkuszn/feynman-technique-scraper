import scraper from "../scraper.js";
import expressAsyncHandler from 'express-async-handler';

const scrapOne = expressAsyncHandler(async (req, res) => {
    if (req.body.link == undefined || req.body.link == "") {
        res.status(400).send({ error: "Link cannot be empty" });
    }
    const sc = new scraper();
    await sc.runScraper(req.body.link);
    const tokens = sc.getTokens();
    if (tokens.length <= 0) {
        res.status.send(201);
    }
    console.log(`Scrapped text from ${sc.getLink()}:"${sc.getContext().trim()}"`);
    console.log(tokens);

    res.status(200).send(tokens);
});

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
            result.push(tokens);
        }
    }
    if (result.length == 0) {
        res.status.send(201);
    }
    console.log(result);
    res.status(200).send(result);
});

export default {
    scrapOne,
    scrapMany
}