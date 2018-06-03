import { get } from 'axios';

export function add(...args: number[]): number {
  return args.reduce((pre, cur) => pre + cur);
}

export function returnNull() {
  return null;
}
export function checkValue(x) {
  return x;
}
export function createUser() {
  return {
    firstName: 'z',
    lastName: 'sy',
  };
}
export function fetchUser() {
  return get('https://jsonplaceholder.typicode.com/posts/1').then(response => {
    return response.data;
  });
}
