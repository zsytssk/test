import * as puppeteer from 'puppeteer';

async function main() {
  const browser = await puppeteer.launch({
    headless: false,
  });
  const page = await browser.newPage();
  await page.goto('https://baidu.com');
  await page.type('#kw', 'Headless Chrome');
  const su = '#su';
  await page.waitForSelector(su);
  await page.click(su);
  const resultsSelector = '#content_left .result a';
  await page.waitForSelector(resultsSelector);

  // Extract the results from the page.
  const links = await page.evaluate(test => {
    const anchors = Array.from(document.querySelectorAll(test));
    return anchors.map(anchor => {
      const title = anchor.textContent.split('|')[0].trim();
      return 1;
    });
  }, resultsSelector);
  await page.screenshot({ path: 'demo.png' });
  await browser.close();
}

main();
