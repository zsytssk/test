import { of } from 'rxjs/observable/of';
import { concatMap, map } from 'rxjs/operators';

// 发出 'Hello'
const source2 = of('world');
const source1 = of('Hello');
// 映射成 promise 并发出结果
const example = source1.pipe(
  concatMap(val1 => source2.pipe(map(val2 => `${val1} ${val2}`))),
);
// 输出: 'Hello World From Promise'
example.subscribe(val => console.log(val));
