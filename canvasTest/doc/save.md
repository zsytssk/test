## other

-   @ques 像 react 一样 分成几块渲染, wait...

    -   如果可以将 api 转化成 data, 我的 render 可以像 react 一样拆分成几部分

-   @ques 怎么记录 ctx translate 几次 rotate 几次

    -   能不能合并 translate
    -   @imp 将 rotation translate 转换成一次的函数...
        -   应该可以, 但是数学要求..
        -   能不能抄 laya 的代码
        -   还是学习这部分的知识...

-   @ques 怎么将 api 转化成 data
    -   比方说 rotation 这需要转化为 angle, 在设置的时候可以直接修改
    -   等到 render 的时候才将这些数据进行渲染...

## 2018-12-19 10:03:38

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
