import scraperUtils from './scraperUtils.js';
import { prepositions, pronouns } from '../constants/partOfSpeeches.js'
import { htmlTags, cssBasicTags, cssAdvancedTags } from '../constants/tags.js'

class cleaner {

    static hasPronouns(list) {
        if (list.length <= 0) {
            console.log("List is null or empty")
            return;
        }
        let pronounsList = new Set(pronouns);
        list = list.filter((el) => !pronounsList.has(el));
        return [...new Set(list)];
    }

    static hasPrepositions(list) {
        if (list.length <= 0) {
            console.log("List is null or empty")
            return;
        }
        let prepositionsList = new Set(prepositions);
        list = list.filter((el) => !prepositionsList.has(el));
        return [...new Set(list)];
    }

    static setLowerCase(list) {
        if (list.length <= 0) {
            console.log("List is null or empty")
            return;
        }
        const lowerCasesList = list.map(item => item.toLowerCase());
        return lowerCasesList;
    }

    static removeWhitespaces(list) {
        if (list.length <= 0) {
            console.log("List is null or empty")
            return;
        }
        const withoutEmptySpacesList = list.filter(item => item != ' ');
        return withoutEmptySpacesList;
    }

    static skipWhitespaces(list) {
        let listWithoutWhitespaces = []
        for (let item of list) {
            if (scraperUtils.matchWhiteSpaces(item)) {
                continue;
            }
            listWithoutWhitespaces.push(item);
        }
        return listWithoutWhitespaces;
    }

    static removeSpecialCharacters(list) {
        if (list.length <= 0) {
            console.log("List is null or empty")
            return;
        }

        let splitedSentencesList = []
        for (let item of list) {
            if (item.length <= 0) {
                continue;
            }

            let withoutNums = scraperUtils.removeNumbers(item);
            if (withoutNums.length <= 0) {
                continue;
            }

            let withoutSpecialChars = scraperUtils.removeSpecialChars(withoutNums);
            if (withoutSpecialChars.length <= 0) {
                continue;
            }

            let withoutDoubleLow = scraperUtils.removeDoubleLow_9_QuotationMark(withoutSpecialChars);
            if (withoutDoubleLow.length <= 0) {
                continue;
            }

            let withoutRightDouble = scraperUtils.removeRightDoubleQuotationMark(withoutDoubleLow);
            if (withoutRightDouble.length <= 0) {
                continue;
            }

            let withoutEmDash = scraperUtils.removeEmDash(withoutRightDouble);
            if (withoutEmDash.length <= 0) {
                continue;
            }

            let withoutEnDash = scraperUtils.removeEnDash(withoutEmDash);
            if (withoutEnDash.length <= 0) {
                continue;
            }

            let withoutHorizontalBar = scraperUtils.removeHorizontalBar(withoutEnDash);
            if (withoutHorizontalBar.length <= 0) {
                continue;
            }

            let withoutCopyrightSign = scraperUtils.removeCopyrightSign(withoutHorizontalBar);
            if (withoutCopyrightSign.length <= 0) {
                continue;
            }

            let itemsArray = withoutCopyrightSign.split(' ');
            if (itemsArray.length <= 0) {
                continue;
            }

            let array = [];
            for (let item of itemsArray) {
                if (item.length <= 0 || scraperUtils.hasWhitespace(item)) {
                    continue;
                }

                array.push(item);
            }
            Array.prototype.push.apply(splitedSentencesList, array);
        }
        return [...new Set(splitedSentencesList)];
    }

    static hasTags(list) {
        if (list.length <= 0) {
            console.log("List is null or empty");
            return;
        }
        const tagsList = new Set(htmlTags);
        list = list.filter(el => !tagsList.has(el));
        return [...new Set(list)];
    }

    static hasCSSBasicTags(list) {
        if (list.length <= 0) {
            console.log("List is null or empty");
            return;
        }
        const tagsList = new Set(cssBasicTags);
        list = list.filter(el => !tagsList.has(el));
        return [...new Set(list)];
    }

    static hasCSSAdvancedTags(list) {
        if (list.length <= 0) {
            console.log("List is null or empty");
            return;
        }
        const tagsList = new Set(cssAdvancedTags);
        list = list.filter(el => !tagsList.has(el));
        return [...new Set(list)];
    }
}
export default cleaner;