- @ques behave 可以只关联 data 的一个属性...

  - 可以对多个属性使用同一个 behave, findBehave(data, class);
  - 比方说 从数组中寻找 删除一个对象...
  - 能不能是一组属性呢...
  - 将对象的任意组合属性 扔给一个 behave 去操作...
  - 需要一个名称去寻找这个 behave..
  - 如果是一个基本类型就需要将自己传进去...

- @ques 每次我都需要到数组中寻找一个 hehave 会不会消耗性能呢

- @ques behave 能不能再包含 behave 呢...

- @ques 将初始化 behave 的代码放在 data 中, 会不会不清晰...

- @ques 能不能将 behave 的依赖去掉, 我所有的东西都可以做成这个类型
  - 比方说 event..., addComponent
  - 先把这个问题分开, 不管这个问题哦

* 面向数据编程

- @note 如果可以将任意的 data 组合成一个大 data, 那么更牛 b

## 理念

- "composition over inheritance" 组合>继承

- 一组数据 对应可能多个行为...

- composition data behave

* @ques 能不能根据需要动态的添加 behave...
