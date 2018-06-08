import { add } from '../index';
import { closePage, getPage, gotoPage } from '../utils/puppeteer';

describe('This is a simple test', () => {
  beforeAll(async () => {
    await gotoPage('http://baidu.com');
  });
  afterAll(async () => {
    closePage();
  });
  test('add: 1+2=4', async () => {
    const page = getPage();
    const name = 'jack';
    const age = 33;
    const location = 'Berlin/Germany';
    const url = await page.evaluate(
      // tslint:disable-next-line:no-shadowed-variable
      () => {
        return document.querySelector('img').src;
      },
    );
    expect(url).toEqual('http://www.baidu.com/img/bd_logo1.png');
  });
});
