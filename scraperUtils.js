import fs from 'fs'

const spChar = /[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi;
const numChar = /[0-9]/gi;
const doubleLow_9_QuotationMark = /[\u201E]+/gi;
const rightDoubleQuotationMark = /[\u201D]+/gi;
const emDash = /[\u2014]+/gi;
const enDash = /[\u2013]+/gi;
const horizontalBar = /[\u2015]+/gi;
const copyrightSign = /[\u00A9]+/gi;

class scraperUtils{

    static writeToFile(filepath, data){
        let text = data.join(', ')
        fs.writeFileSync(filepath.toString(), text, {encoding: 'utf8'}, function(err){
            if(err) return console.log(err)
            console.log("Content saved successfully");
        });
    }

    static hasWhitespace(str){
        return str.indexOf(' ') >= 0;
    }

    static removeNumbers(str){
        return str.replace(numChar, ' ');
    }

    static removeSpecialChars(str) {
        return str.replace(spChar, ' ');
    }

    static removeHorizontalBar(str){
        return str.replace(horizontalBar, ' ');
    }

    static removeEnDash(str){
        return str.replace(enDash, ' ');
    }

    static removeEmDash(str){
        return str.replace(emDash, ' ');
    }

    static matchWhiteSpaces(str){
        return str.match(/\s/g);
    }

    static removeDoubleLow_9_QuotationMark(str){
        return str.replace(doubleLow_9_QuotationMark, ' ');
    }

    static removeRightDoubleQuotationMark(str){
        return str.replace(rightDoubleQuotationMark, ' ');
    }

    static removeCopyrightSign(str){
        return str.replace(copyrightSign, ' ');
    }
}
export default scraperUtils