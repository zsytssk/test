import * as cheerio from 'cheerio';
import { saveUrl } from './ts_node_script/saveUrl';
import { executeHtml, getUrl } from './utils';

const domain = 'https://www.psttt.com/';
const main_url = 'html/1836.html';

const mp3_reg = /mp3:([^\s]+)/;

async function main() {
    const now = Date.now();
    const data = await getUrl(`${domain}${main_url}`, 'gb2312');
    const $ = cheerio.load(data);
    const items = $('.bfdz li a');

    let start = 177;
    let end = 1700;
    if (end > items.length) {
        end = items.length;
    }
    if (start < 0) {
        start = 0;
    }

    for (let i = start; i < end; i++) {
        try {
            const item_url = $(items[i]).attr('href');
            const item_name = $(items[i]).attr('title');
            const item_dom = await getUrl(`${domain}${item_url}`, 'gb2312');
            const $item = cheerio.load(item_dom);
            const frame_src = $item('iframe').attr('src');
            const frame_str = await getUrl(`${domain}${frame_src}`, 'gb2312');
            const window = await executeHtml(frame_str, { url: `${domain}${frame_src}` });
            let match: any = frame_str.match(mp3_reg);
            if (match) {
                match = match[1];
            }
            const match_arr = match.split(`'`);
            let result = '';
            for (let item of match_arr) {
                if (item.indexOf('+') !== -1) {
                    item = window[item.split(`+`)[1]];
                }
                result += item;
            }
            await saveUrl(encodeURI(result), `./dist/${item_name}`);
            console.log(`complete:> ${i}`, item_name);
        } catch {
            console.log(`fail:> ${i}`);
        }
    }

    console.log(`complete(${start}-${end})time:>${Date.now() - now}`);
}

main();
