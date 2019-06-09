## 目的

- 用 jsx 来做游戏的 ui 展示

* @ques jsx 可以很好的表示 ui 的结构，但是会不会存在性能问题
  - state 来驱动 ui 改变，要自己的分析 ui 之间的区别
  - 而不能只更新自己想要改变的地方...

- @ques 怎么自己写一个 jsx 解析器
  - https://medium.com/@deathmood/how-to-write-your-own-virtual-dom-ee74acc13060

* 如何将虚拟 dom 和真正的 dom 联系起来

```jsx
// 这个真实的 dom 包裹 自定义的函数如何处理。。。
<div>
  <Customize />
</div>
```
