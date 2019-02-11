import { state } from '../main';

export type LoadType = 'Image' | 'Script' | 'Stylesheet' | 'String';
export type ReturnType = HTMLElement | string;
export type LoadOrderType = 'queue' | 'parallel';
let res_map = {};
export type LoadItem = {
    url: string;
    type: LoadType;
};
export async function load(
    res: LoadItem | LoadItem[],
    type: LoadOrderType = 'parallel',
): Promise<ReturnType | ReturnType[]> {
    if ((res as LoadItem).url) {
        return loadItem(res as LoadItem);
    }
    if (type === 'queue') {
        for (const item of res as LoadItem[]) {
            await loadItem(item);
        }
        return;
    }
    const result = [];
    for (const item of res as LoadItem[]) {
        const item_result = await loadItem(item);
        result.push(item_result);
    }
    return Promise.all(result);
}
export function clearRes() {
    res_map = {};
}

async function loadItem(item: LoadItem): Promise<ReturnType> {
    const { url, type } = item;
    let abs_url = state.base_path + url;
    if (abs_url.indexOf('image/png') !== -1) {
        abs_url = url;
    }
    let result: ReturnType = res_map[url];
    if (result) {
        return result;
    }
    if (type === 'Image') {
        result = await loadImage(abs_url);
    }
    if (type === 'Script') {
        result = await loadScript(abs_url);
    }
    if (type === 'Stylesheet') {
        result = await loadCss(abs_url);
    }
    if (type === 'String') {
        result = await loadCss(abs_url);
    }
    res_map[url] = result;
    return result;
}

function loadImage(url: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
        const temp = res_map[url];
        if (temp) {
            return resolve(temp);
        }

        const img = new Image();
        img.onload = () => {
            res_map[url] = img;
            resolve(img);
        };
        img.onerror = err => {
            reject(err);
        };
        img.src = url;
    });
}
function loadScript(url: string): Promise<HTMLScriptElement> {
    return new Promise((resolve, reject) => {
        const temp = res_map[url];
        if (temp) {
            return resolve(temp);
        }

        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.onload = () => {
            res_map[url] = script;
            resolve(script);
        };
        script.onerror = err => {
            reject(err);
        };
        script.src = url;
        document.body.appendChild(script);
    });
}
function loadCss(url: string): Promise<HTMLStyleElement> {
    return new Promise((resolve, reject) => {
        const temp = res_map[url];
        if (temp) {
            return resolve(temp);
        }

        const link = document.createElement('link');
        link.onload = () => {
            res_map[url] = link;
            resolve(link);
        };
        link.onerror = err => {
            reject(err);
        };
        link.setAttribute('rel', 'stylesheet');
        link.setAttribute('type', 'text/css');
        link.setAttribute('href', url);
        document.body.appendChild(link);
    });
}

function loadString(url: string): Promise<String> {
    return new Promise((resolve, reject) => {
        const client = new XMLHttpRequest();
        client.timeout = 5000;
        client.open('GET', url);
        client.onload = () => {
            res_map[url] = client.responseText;
            resolve(client.responseText);
        };
        client.onerror = ev => {
            reject(ev);
        };
        client.ontimeout = ev => {
            reject(ev);
        };
        client.onabort = ev => {
            reject(ev);
        };
        client.send();
    });
}

export function getRes(url: string) {
    return res_map[url];
}
