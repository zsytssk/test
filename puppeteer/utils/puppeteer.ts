import * as puppeteer from 'puppeteer';

let browser;
let page;
export async function gotoPage(url) {
  browser = await puppeteer.launch({
    headless: false,
  });
  page = await browser.newPage();
  await page.goto(url);
  await page.setViewport({
    width: 1000,
    height: 1000,
  });
}

export async function screenshot(filename) {
  await page.screenshot({ path: 'screenshot/${filename}' });
}

export function getPage() {
  return page;
}

export async function closePage() {
  browser.close();
  browser = undefined;
  page = undefined;
}
