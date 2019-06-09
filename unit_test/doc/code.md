```js
console.log(
    new Error().stack.replace('Error\n', '').replace(/[^\n]+at[^\n]/g, '')
);
```
