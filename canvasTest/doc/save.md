## 将 node 转化为一维数组

-   目的 提高渲染性能

-   必须要逻辑简单易于使用, 不然就没有意义了

-   结构

    -   父亲 --> 最先子类 --> ...

-   @ques 如何创建节点...

    -   如何更新节点的数据

-   @ques 如何将节点的数据渲染出来...

    -   一维数组数据适合渲染吗...
    -   matrix alpha `engine.save();engine.restore();`
    -   我怎么知道什么时候 save 什么时候 restore
        -   level 表示距离上的层级...
            -   ...
        -   @ques 能不能将 save+restore 逻辑去掉, 所有节点都使用自己的 matrix..
            -   这样是最好的...
            -   但是这样的性能如何呢??
            -   每次父亲改变都要要遍历所有的子类改变, 这性能将会怎样...

-   level 每次修改 都要遍历所有子类 这很没有效率

## other

-   @ques 如何提高性能呢

    -   减少不必要的计算
    -   合并函数计算
    -   避免重复计算, 只会引用用到的变量

-   @ques core + lib

    -   就像 rust 的核心库+lib+第三方库的形式
    -   core:> texture2d + text2d + graphic2d
    -   lib:> image list clip ....
        -   其他的功能像 react 的 component 一样

-   @ques 像 react 一样 分成几块渲染, wait...

    -   如果可以将 api 转化成 data, 我的 render 可以像 react 一样拆分成几部分
    -   全部换成一个 translate 数据格式

-   @ques 怎么记录 ctx translate 几次 rotate 几次

    -   能不能合并 translate
    -   @imp 将 rotation translate 转换成一次的函数...
        -   应该可以, 但是数学要求..
        -   能不能抄 laya 的代码
        -   还是学习这部分的知识...

-   @ques 怎么将 api 转化成 data

    -   比方说 rotation 这需要转化为 angle, 在设置的时候可以直接修改
    -   等到 render 的时候才将这些数据进行渲染...

-   ui 编辑器
    -   最好看的 ui
        -   https://mockflow.com/
        -   https://www.fluidui.com/ 很大的编辑 ui 空间
        -   有没有可能像 ps 一样
        -   https://framer.com/
        -   https://blocsapp.com/
        -   https://proto.io/
        -   直接搜索 设置属性
        -   widget 随意组合
        -   根据选中的对象 显示操作
        -   像画图一样中间是图纸旁边是工具, 图纸很大
    -   像 react shadow dom 一样组织 ui
    -   直接拖拽本地模块
    -   直接可以测试代码
    -   节点添加注释, 知道节点是做什么的

## 2018-12-19 10:03:38

-   @ques dop ts 如何抽取 数组中元素的 key

    -   找到 data.behaves 中第一个元素拥有 的属性

-   @ques 能不能将 dom 的修改独立出来, 每次只是计算这些内容...

    -   将修改元素的地址记录, 然后每次通过这个, 去遍历重绘

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

-   data: 绘制 ui 所需的数据 - dop

    -   相当于虚拟 dom
    -   层级结构 各层各种数据
    -   最精简的结构, 最快的渲染

-   render: (canvas| webgl) -- 函数式

    -   调用 canvas webgl 渲染 页面
