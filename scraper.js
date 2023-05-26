import { load } from 'cheerio'
import fetch from 'node-fetch'

class scraper {

    #list = [];
    #context;
    #link;

    getContext() {
        return this.$context;
    }

    setContext(value){
        this.$context = value;
    }

    getLink(){
        return this.#link;
    }

    setLink(value){
        this.#link = value;
    }

    getList() {
        return this.#list;
    }

    append(item) {
        this.#list.push(item);
    }

    async getBody(text) {
        try {
            let url = new URL(text)
            this.setLink(url);
            let response = await fetch(this.getLink());
            let body = await response.text();

            let $ = load(body);
            this.setContext($('title'));
            let content = $('p');
            this.append(content.text())
        }
        catch (error) {
            console.error(error);
        }
    }

    splitWords(bodyParts) {
        var filteredBody = []
        for(let item of bodyParts){
            const words = item.split(/[\n\r\t .,;:!?"']+/);
            let filteredWords = words.filter(word => word.trim() !== '');
            filteredBody.push(...filteredWords);
        }
        filteredBody.map(value => value.toLowerCase());
        return [...new Set(filteredBody)];
    }
}
export default scraper
