## 2018-04-18 08:49:25
* @ques 能不能将object属性中 包含_去掉

* @ques 能不能让 extends<T, U> U存在用U类型, 不然用T类型

* @ques  Destructuring with rest 类型如何处理
`{const children, let ...other} = this.props as Panel[];`

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
