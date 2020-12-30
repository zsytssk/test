import { fn1, fn2 as test1Fn2 } from './test1';

const { a, b } = { a: 1, b: 2 };
function add(): number {
    const c = a + b;
    return fn1();
}
