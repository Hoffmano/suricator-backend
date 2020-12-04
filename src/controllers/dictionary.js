"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const puppeteer_1 = __importDefault(require("puppeteer"));
exports.default = {
    async translate(request, response) {
        const browser = await puppeteer_1.default.launch();
        const page = await browser.newPage();
        await page.goto(`https://www.google.com/search?q=traducao+${request.params.word}`);
        try {
            await page.waitForSelector("#tw-target-text > span");
        }
        catch (e) { }
        let element = await page.$("#tw-target-text > span");
        let result = await page.evaluate((el) => el.textContent, element);
        browser.close();
        result = result.replace(/\n\s*/g, "");
        return response.json(result);
    },
};
