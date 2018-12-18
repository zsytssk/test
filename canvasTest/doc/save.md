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

-   @ques 3d 和 2d 如何区分

## 代码的结构

-   api --> data --> render (canvas | webgl)

    -   相互独立

-   api: 是独立 抽出给外层调用, 面向对象的方式组织

    -   用于填充数据...
    -   方便外层调用
    -   最好兼容 laya 接口

-   dom: 绘制 ui 所需的数据 - dop

    -   相当于虚拟 dom
    -   层级结构 各层各种数据
    -   最精简的结构, 最快的渲染

-   render: (canvas| webgl) -- 函数式

    -   调用 canvas webgl 渲染 页面
