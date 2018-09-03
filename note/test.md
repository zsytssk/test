- observer pipe
  - mergeMap
  - concatMap

```mermaid
classDiagram
Class01 <|-- AveryLongClass : Cool
Class03 *-- Class04
Class05 o-- Class06
Class07 .. Class08
Class09 --> C2 : Where am i?
Class09 --* C3
Class09 --|> Class07
Class07 : equals()
Class07 : Object[] elementData
Class01 : size()
Class01 : int gorilla
Class08 <--> C2: Cool label
```

- @ques 如何测试..

  - 在浏览器中直接运行
  - describe assert beforeAll beforeEach after...
  - 可以执行某个文件夹的所有测试 可以执行全部测试
  - 直接在 console 中输出结果...
  - 异步函数...
  - api 简单明了
  - coverage
  - 浏览器中直接展示 ui...

* @ques 本地 ui 的测试..

  - 启动 test 页面
  - 直接 dynamic import

- prettier markdown config
