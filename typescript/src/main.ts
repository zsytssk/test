
var a: Promise<any>;
const promise1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(1);
    }, 3000);
}).then((val) => {
  a = sleep(3);
  return a
});
const promise2 = promise1.then((data: any) => {
    console.log(1);
});

console.log(promise1 === a)

function sleep(time: number) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(time);
      resolve();
    }, time * 1000)
  })
}