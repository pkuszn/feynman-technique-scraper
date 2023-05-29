import { argv } from 'node:process';
import scraper from '../scraper.js'
import scraperUtils from '../utils/scraperUtils.js'

const sc = new scraper();
await sc.runScraper(argv[2]);
let words = sc.getTokens();
let path = argv[3];
if (path) {
    console.log("Saving tokens to file...")
    scraperUtils.writeToFile(path, words);
    console.log(`Tokens saved to file ${path}`);
}
console.dir(words, { 'maxArrayLength': null });
