-   @ques ts 如何抽取 数组中元素的 key

    -   找到 data.behaves 中第一个元素拥有 的属性

-   @ques 能不能将 dom 的修改独立出来, 每次只是计算这些内容...

-   @ques 如何在 dop 上面组织代码
    -   保证同样的 api
    -   代码的公用...

*   @todo load 资源列表...

-   @note 全局关键字

    -   Lc, lc

-   @ques 能不能使用 面向对象作为接口, 核心计算使用 dop !!

## 代码的结构

-   dom --> render (canvas | webgl)

-   dom 组织所有的数据 - dop

    -   相当于虚拟 dom
    -   层级结构 各层各种数据

-   render(canvas| webgl) -- 函数式

    -   调用 canvas webgl 渲染 页面

*   @ques api 层独立功能 抽出 api 给外层调用, 面向对象
    -   需要吗 ? 应该是要的

-   dom 和 render 相互独立
