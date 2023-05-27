import { runScraper, wordsList } from "../index.js";
import expressAsyncHandler from 'express-async-handler';

const scrapOne = expressAsyncHandler(async (req, res) => {
    if (req.body.link == undefined || req.body.link == "") {
        res.status(400).send({ error: "Link cannot be empty" });
    }

    await runScraper(req.body.link);
    if (wordsList.words.length == 0) {
        res.status.send(201);
    }
    console.log(wordsList.words);

    res.status(200).send(wordsList.words);
});

const scrapMany = expressAsyncHandler(async (req, res) => {
    if (req.body.links == undefined || req.body.links == "") {
        res.status(400).send({ error: "Links cannot be empty" });
    }

    var result = [];
    for(let link of req.body.links) {
        await runScraper(link)
        result.push(wordsList.words);
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