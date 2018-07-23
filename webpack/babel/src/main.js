const pro = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(4);
  }, 3000);
}).then(data => {
  console.log(data);
});
