function waitTime(time) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, time * 1000);
    });
}

async function main() {
    await waitTime(3);
    // tslint:disable-next-line:no-console
    console.log(1);
}
main();
