export type LoadType = 'Image';
export type ReturnType = HTMLImageElement | string;

const res_map = {};
export async function load(url: string, type: LoadType): Promise<ReturnType> {
    let result: ReturnType = res_map[url];
    if (result) {
        return result;
    }
    if (type === 'Image') {
        result = await loadImage(url);
    }
    return result;
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
