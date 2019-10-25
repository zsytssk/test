## 结束时清除绑定

```ts
import { Observable } from 'rxjs';

const a_obr = new Observable(subscriber => {
  let i = 0;
  const interval = setInterval(() => {
    console.log(`setInterval:>`, i);
    subscriber.next(i++);
  }, 1000);

  subscriber.add(() => {
    console.log(`teardown:>`);
    clearInterval(interval);
  });
  setTimeout(() => {
    console.log(`complete:>`);
    subscriber.complete();
  }, 10000);
}) as Observable<number>;

const a_sub = a_obr.subscribe(e => {
  console.log(e);
});
```

## 在传递中间处理数据

```ts
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

let ob = Observable.from([1, 2, 3]);
ob = ob.pipe(
  map(x => {
    console.log(`step1:>`, x);
    return x + 1;
  }),
);

ob.subscribe(e => {
  console.log(`step2:>`, e);
});
```
