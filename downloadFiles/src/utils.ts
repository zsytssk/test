import * as https from 'https';
import * as iconv from 'iconv-lite';
import { JSDOM } from 'jsdom';

export function getUrl(url: string, type = 'Utf-8'): Promise<string> {
    return new Promise((resolve, reject) => {
        const arrBuf = [];
        let bufLength = 0;
        https
            .get(url, response => {
                response.on('data', data => {
                    arrBuf.push(data);
                    bufLength += data.length;
                });
                response.on('end', () => {
                    const chunkAll = Buffer.concat(arrBuf, bufLength);
                    const result_str = iconv.decode(chunkAll, type);
                    resolve(result_str);
                });
            })
            .on('error', err => {
                reject(err);
            });
    });
}

export function executeHtml(html: string, opts: any): Promise<any> {
    return new Promise((resolve, reject) => {
        const { window } = new JSDOM(html, { ...opts, resources: 'usable', runScripts: 'dangerously' });
        window.document.addEventListener('DOMContentLoaded', () => {
            setTimeout(() => {
                resolve(window);
            }, 500);
        });
    });
}
