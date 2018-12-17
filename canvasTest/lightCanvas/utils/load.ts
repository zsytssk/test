export type LoadType = 'Image';
export function load(url: string, type: LoadType) {
    if (type === 'Image') {
        return loadImage(url);
    }
}

function loadImage(url) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = 'url';
        img.onload = () => {
            resolve(img);
        };
        img.onerror = err => {
            reject(err);
        };
    });
}
