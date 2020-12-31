import { fn1, fn2 as test1Fn2 } from './test1';

let list = [];
function add(x: A, y: A): number {
    list.push({ x, y });
    return fn1();
}

type A = number;
