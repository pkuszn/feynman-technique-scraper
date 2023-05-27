import scraper from './scraper.js';
import cleaner from './cleaner.js';

export async function runScraper(url) {
    const garbage = new cleaner();
    const scraperInstance = new scraper();
    try{
        await scraperInstance.getBody(url);
        if(scraperInstance.getLink() == null){
            console.log("URL cannot be null");
            return;
        }
        contextFromUrl.setContext(scraperInstance.getContext());
        let listOfItems = scraperInstance.getList();
        let splitedWords = scraperInstance.splitWords(listOfItems);
        let withoutWhitespaces = garbage.removeWhitespaces(splitedWords);
        let toLowerCaseList = garbage.setLowerCase(withoutWhitespaces);
        let withoutPrepositions = garbage.hasPrepositions(toLowerCaseList);
        let withoutPronouns = garbage.hasPronouns(withoutPrepositions);
        let withoutSpecialChars = garbage.removeSpecialCharacters(withoutPronouns);
        let skipWhitespaces = garbage.skipWhitespaces(withoutSpecialChars);
        wordsList.setWords(skipWhitespaces);
    }
    catch(exception){
        console.log(exception)
    }
}
let words = [];
let contexts = [];

//Use property value shorthand: eslint: https://eslint.org/docs/rules/object-shorthand
export const wordsList = {
    words,
    setWords(data) {
        this.words = data
    }
};

export const contextFromUrl = {
    contexts,
    setContext(data) {
        this.context = data.text();
    }
};


