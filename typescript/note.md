## 2018-04-08 16:14:03

* @ques 如何只提取public属性
* @ques 如何只提取private属性
* @ques ...

```ts
type BoxedValue<T> = { value: T };
type BoxedArray<T> = { value: T[] };

// 这是什么鬼
type Boxed<T> = T extends any[] ? BoxedArray<T[any]> : BoxedValue<T>;

type T20 = Boxed<string[]>;
```
