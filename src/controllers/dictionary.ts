import { Request, Response } from "express";
import puppeteer from "puppeteer";

export default {
  async translate(request: Request, response: Response) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(
      `https://www.google.com/search?q=traducao+${request.params.word}`
    );

    try {
      await page.waitForSelector("#tw-target-text > span");
    } catch (e) {}

    let element = await page.$("#tw-target-text > span");
    let result: string = await page.evaluate((el) => el.textContent, element);

    browser.close();

    result = result.replace(/\n\s*/g, "");
    return response.json(result);
  },
};
