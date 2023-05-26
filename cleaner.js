import scraperUtils from './scraperUtils.js';
import { prepositions, pronouns } from './constants.js'

class cleaner {

    hasPronouns(list) {
        if (list.length <= 0) {
            console.log("List is null or empty")
            return;
        }

        let pronounsList = pronouns;
        list = list.filter((el) => {
            return !pronounsList.includes(el);
        });

        return [...new Set(list)];
    }

    hasPrepositions(list) {
        if (list.length <= 0) {
            console.log("List is null or empty")
            return;
        }

        let prepositionsList = prepositions;
        list = list.filter((el) => {
            return !prepositionsList.includes(el);
        });

        return [...new Set(list)];
    }

    setLowerCase(list){
        if(list.length <= 0){
            console.log("List is null or empty")
            return;
        }
        const lowerCasesList = list.map(item => item.toLowerCase());
        return lowerCasesList;
    }

    removeWhitespaces(list){
        if(list.length <= 0){
            console.log("List is null or empty")
            return;
        }
        const withoutEmptySpacesList = list.filter(item => item != ' ');
        return withoutEmptySpacesList;
    }

    skipWhitespaces(list){
        let listWithoutWhitespaces = []
        for(let item of list){
            if(scraperUtils.matchWhiteSpaces(item)){
                continue;
            }
            listWithoutWhitespaces.push(item);
        }
        return listWithoutWhitespaces;
    }

    removeSpecialCharacters(list){
        if(list.length <=0){
            console.log("List is null or empty")
            return;
        }
        
        let splitedSentencesList = []
        for(let item of list){
            if(item.length <= 0){
                continue;
            }

            let withoutNums = scraperUtils.removeNumbers(item);
            if(withoutNums.length <= 0){
                continue;
            }

            let withoutSpecialChars = scraperUtils.removeSpecialChars(withoutNums);
            if(withoutSpecialChars.length <= 0){
                continue;
            }

            let withoutDoubleLow = scraperUtils.removeDoubleLow_9_QuotationMark(withoutSpecialChars);
            if(withoutDoubleLow.length <= 0){
                continue;
            }

            let withoutRightDouble = scraperUtils.removeRightDoubleQuotationMark(withoutDoubleLow);
            if(withoutRightDouble.length <= 0){
                continue;
            }

            let withoutEmDash = scraperUtils.removeEmDash(withoutRightDouble);
            if(withoutEmDash.length <= 0){
                continue;
            }

            let withoutEnDash = scraperUtils.removeEnDash(withoutEmDash);
            if(withoutEnDash.length <= 0){
                continue;
            }

            let withoutHorizontalBar = scraperUtils.removeHorizontalBar(withoutEnDash);
            if(withoutHorizontalBar.length <= 0){
                continue;
            }

            let withoutCopyrightSign = scraperUtils.removeCopyrightSign(withoutHorizontalBar);
            if(withoutCopyrightSign.length <= 0){
                continue;
            }

            let itemsArray = withoutCopyrightSign.split(' ');
            if(itemsArray.length <= 0){
                continue;
            }

            let array = [];
            for(let item of itemsArray){
                if(item.length <= 0 || scraperUtils.hasWhitespace(item)){
                    continue;
                }

                array.push(item);
            }
            Array.prototype.push.apply(splitedSentencesList, array);
        }
        return [...new Set(splitedSentencesList)];
    }
}
export default cleaner;