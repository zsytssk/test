export function sleep(time) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, time);
    });
}

/** 创建随机id */
export function createRandomString() {
    return Math.random()
        .toString()
        .replace('0.', '');
}
