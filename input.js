import { argv } from 'node:process';
import { runScraper, wordsList } from '../scraper/index.js'
import scraperUtils from '../scraper/scraperUtils.js'

await runScraper(argv[2]);
let words = wordsList.words
//argv[3] as filepath
let path = argv[3];
if(path){
    scraperUtils.writeToFile(path, words);
}
console.dir(words, {'maxArrayLength': null});
