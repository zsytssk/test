export type LoadType = 'Image';
export type ReturnType = HTMLImageElement | string;

const res_map = {};
export type LoadItem = {
    url: string;
    type: LoadType;
};
export async function load(res_list: LoadItem[]): Promise<ReturnType> {
    for (const item of res_list) {
        const { url, type } = item;
        let result: ReturnType = res_map[url];
        if (result) {
            return result;
        }
        if (type === 'Image') {
            result = await loadImage(url);
        }
        res_map[url] = result;
    }
}

function loadImage(url: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = url;
        img.onload = () => {
            resolve(img);
        };
        img.onerror = err => {
            reject(err);
        };
    });
}

export function getRes(url: string) {
    return res_map[url];
}
