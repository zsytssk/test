## 2018-04-18 08:49:25

- @note 新建绑定 + 销毁取消...

- @ques 能不能将 model+socket 的依赖独立出来

  - 同时相互创建 下级元素 依赖 如何取消
  - 而且还有父类子类不同的绑定如何处理...

- @ques 能不能将 object 属性中 包含\_去掉

- @ques 能不能让 extends<T, U> U 存在用 U 类型, 不然用 T 类型

- @ques Destructuring with rest 类型如何处理
  `{const children, let ...other} = this.props as Panel[];`

## 2018-04-08 16:14:03

- @ques 如何只提取 public 属性
- @ques 如何只提取 private 属性
- @ques ...

```ts
type BoxedValue<T> = { value: T };
type BoxedArray<T> = { value: T[] };

// 这是什么鬼
type Boxed<T> = T extends any[] ? BoxedArray<T[any]> : BoxedValue<T>;

type T20 = Boxed<string[]>;
```
