## 2018-04-08 16:14:03

```ts
type BoxedValue<T> = { value: T };
type BoxedArray<T> = { value: T[] };

// 这是什么鬼
type Boxed<T> = T extends any[] ? BoxedArray<T[any]> : BoxedValue<T>;

type T20 = Boxed<string[]>;
```
