import { load } from 'cheerio'
import fetch from 'node-fetch'
import garbageCleaner from './utils/cleaner.js'

class scraper {

	#list = [];
	#tokens = [];
	#context;
	#link;

	getContext() {
		return this.$context;
	}

	setContext(value) {
		this.$context = value;
	}

	getLink() {
		return this.#link;
	}

	setLink(value) {
		this.#link = value;
	}

	getList() {
		return this.#list;
	}

	setTokens(value) {
		this.#tokens = value;
	}

	getTokens() {
		return this.#tokens;
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
			this.setContext($('title').text());
			let content = $('p');
			this.append(content.text())
		}
		catch (error) {
			console.error(error);
		}
	}

	async runScraper(url) {
		try {
			await this.getBody(url);
			if (this.getLink() == null) {
				console.log("URL cannot be null");
				return;
			}
			let listOfItems = this.getList();
			let splitedWords = this.splitWords(listOfItems);
			let withoutWhitespaces = garbageCleaner.removeWhitespaces(splitedWords);
			let toLowerCaseList = garbageCleaner.setLowerCase(withoutWhitespaces);
			let withoutPrepositions = garbageCleaner.hasPrepositions(toLowerCaseList);
			let withoutPronouns = garbageCleaner.hasPronouns(withoutPrepositions);
			let withoutSpecialChars = garbageCleaner.removeSpecialCharacters(withoutPronouns);
			let skipWhitespaces = garbageCleaner.skipWhitespaces(withoutSpecialChars);
			if (skipWhitespaces.length == 0) {
				return [];
			}
			this.setTokens(skipWhitespaces);
		}
		catch (exception) {
			console.log(exception)
		}
	}

	splitWords(bodyParts) {
		var filteredBody = []
		for (let item of bodyParts) {
			const words = item.split(/[\n\r\t .,;:!?"']+/);
			let filteredWords = words.filter(word => word.trim() !== '');
			filteredBody.push(...filteredWords);
		}
		filteredBody.map(value => value.toLowerCase());
		return [...new Set(filteredBody)];
	}
}
export default scraper
