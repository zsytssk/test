-   @ques 3d 最复杂可能就是光照了...

-   @ques skew 如何实现

*   https://pixijs.io/examples/#/demos/cacheAsBitmap.js

    -   性能
    -   有没有可能将 绘制转化成图片, 将没有变化的全部转化成图片 直接渲染这图片就可以了

*   @ques 如何重复渲染 texture

    -   https://riptutorial.com/html5-canvas/example/15184/createpattern--creates-a-path-styling-object-
    -   `context.fillStyle = ptrn;`

    -   如何扭曲图片....

*   @note 超出不绘制

    -   `ctx.rect(0, 0, 150, 100);`

*   @todo Graphics

    -   drawCurves

*   @ques 如何独立出 data 层

    -   绘制需要哪些数据, 将这些数据最简化的形式组织

*   @ques 能不能将 graphics 直接映射到 ctx 的方法上

*   纹理 [Texture](https://layaair.ldc.layabox.com/api/?category=Core&class=laya.resource.Texture)

## 2018-12-28 11:11:15

-   @ques 能不能将所有的 render 全部放到对应的 node 中

    -   这样打包代码没有 image 就不会打包 drawImage 部分..
    -   当然方法要存对象上独立出来, 防止每一个对象都有一个方法消耗内存

-   @note 所有的渲染其实都是 texture | text
    -   能否将图片变化成 texture

## 2018-12-26 09:20:08

-   @ques 如何进行性能测试 检测修改对性能有没有影响

    -   对函数的调用时间测试

-   @ques buffer shader 是什么鬼

-   @ques 这 canvas api 都比较简单, 最难的地方可能是

    -   webgl
    -   react 的方式组织 ui

-   @ques graphic 只是为了绘制形状了
    -   线条 矩形 圆 扇形 ...

*   @ques 怎么在 ie 上面报错???
    -   也许是 sourcemap

-   @ques number !== Number

## 2018-12-24 10:07:40

-   @note ctx.save 可以记下 font...所有的一切

    -   @ques ctx.save 到底能记下哪些属性

-   @ques texture 缓存

-   @todo italic bold

*   @ques 字的位置有问题

    -   有点靠左上

*   @bug 图片的资源没有加载 怎么办

*   cache
    -   createImageData()
    -   getImageData()
    -   putImageData()

-   @ques 怎么绘制 node 的范围

    -   backgroundColor

-   @ques 要不要将 child ... 从 node 中分离出来

    -   这不是关键 最方便就可以了

-   @ques 怎么从一张大图中找小图...

-   @ques ui 编辑器, 直接拖拽 本地生成的 ui

    -   list 可以 直接拖拽 item

-   @ques fillText 的位置很奇怪

-   @ques 需要做什么兼容代码 @蒙哥

-   @ques 将没有实现的属性全部加上 ?

-   @ques measureText 是做什么的

-   @ques 如何将数据抽离出来 | 怎么提升渲染逻辑

    -   减少不必要的计算 合并计算

*   @ques 如果 data 要能抽离出来, canvas webgl 要使用相同的数据结构

*   @ques 将所有的数据结构 使用一级数组会不会性能高些

*   @ques api 要能支持 wasm

*   @ques 能不能将 jsx 直接打包成 node 节点,
    -   这样只在开发的时候需要 jsx 逻辑, 真正发布的时候就不需要了...
    -   节省大量的发布代码...

## 2018-12-24 10:07:36

-   @todo image

    -   位置
    -   旋转
    -   scale
    -   alpha...

## 2018-12-24 09:17:03

-   @ques scale 要不要对位置产生影响

    -   对自己的位置不产生影响, 对子节点产生影响

-   @ques 能不能像将 render 变成 laya function queue

    -   一个个的分开, 这样更有条理...

-   @ques 如何让 test 和代码独立...
    -   资源也相互的独立??
        -   图片不依赖 image 中的
        -   单独有 test 所用的资源, 不会收正式代码影响
    -   很容易的切换 url change?

## 2018-12-19 19:59:38

-   @ques 如何清理 canvas 如何 cache canvas

    -   `_drawCachedSceneCanvas`

-   @ques 如何将坐标...转化成 transform
    -   canvas transform order
    -   origin
    -   https://github.com/konvajs/konva/blob/d48868621cee57729f3e55a8fd9a0b12bf9408cf/src/Util.js

*   @ques 位置如何处理
    -   旋转的中心点
    -   绘制开始点...
    -   three.js [https://threejs.org/examples/#webgl_animation_cloth](https://threejs.org/examples/#webgl_animation_cloth)

## 2018-12-19 09:20:12

-   @ques 如何获取图片的大小..

-   @ques load 同时加载多个 retry 几次...

-   @ques x, y.. 这些的改变都要重新计算 transform

    -   能不能做成 decorator
    -   decorator this.xxx
    -   不用每次都去改变, 只要在编译的时候运行下就可以了

-   @ques compress p-map

-   @ques 怎么使用 decorator 改变 node 的属性 每次调用
    -   calcTransform

```js
export function callThisFun(target: Node, key, descriptor) {
    return {
        ...descriptor,
        get: () => {
            return target[`_${key}`];
        },
        set: val => {
            target[`_${key}`] = val;
        },
    };
}
```

-   @ques ts `[number, number, number, number, number, number]`

    -   怎么定义

-   @ques 像 laya 一样的去定位呢...

## 2018-12-18 09:58:51

-   @ques 这一大堆的 dom api 相同的名字 真的很烦 如何处理

    -   也许 dom 只需要一种就可以了...

-   @ques texture 是做什么的...

-   @ques destroy 如何去做...

## 2018-12-17 09:13:37

-   @ques load image

-   @ques 如何在 dop 上面组织代码

    -   保证同样的 api
    -   代码的公用...

-   @note displayInStage --> parent

-   @ques 先考虑最优的实现, 然后考虑兼容 laya 的接口...

## 2018-12-11 09:45:34

-   @todo canvas 接收 data 然后渲染数据

-   @ques dop call

    -   无法自动补全
    -   没有好的方法去执行

-   ## @ques 如何索引 this type

    -   call 中通过 this 索引 this.behave type ...

*   学习步骤
    -   先核心 再慢慢补齐周边...
    -   学习 --> 练习 --> 学习

## 2018-12-10 16:31:36

-   @ques 凡人休闲装 爬虫 下载

## 2018-12-10 10:51:50

-   数组每一个元素不一样, infer 所有 而不全部都是相同的...

    -   array last item

-   @ques generic type 为什么不能引用他自己
    -   https://github.com/Microsoft/TypeScript/issues/6230
    -   可能是 type 不知道什么时候停止...
    -   也许可以像函数对自己调用一样, 超过次数就会报错

## 2018-12-07 09:18:57

-   @ques transform 什么意思

-   @note globalCompositeOperation 颜色叠加 滤镜

-   @note clip mask

*   @ques [公转图](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Basic_animations)

    -   公转图 太阳照不到地方变黑怎么处理的

*   @ques drawImage dx dy 是什么意思

## 2018-12-06 09:28:21

-   ? 如何只将需要的清除掉...

    -   restore 前面所有, 然后清除所有, 再将前面恢复, 再画后面??

-   @ques 矩阵转化又是什么意思...

-   @imp 最核心的渲染是 dop

    -   一层一层的节点最终只是改变 data 中的数据...
    -   data 根据自己的数据去渲染...
    -   data 保持最干净的数据, 最快的渲染...

-   @ques 如果发布到 npm, 能不能是 ts+js 版本

-   @ques 颜色的十六进制如何转换...

-   @ques ffffff != 255*255*255

## 2018-12-06 09:28:18

-   @ques ctx stroke 的宽度...
-   @ques 什么时候需要 closePath

-   @ques markdown 的格式化

-   canvas 全屏 自适应...

-   @ques 多层的画如何处理 canvas 只有一个 ctx

    -   下面的先画, 后面后画
    -   save cache??

-   @ques 怎么会有滚动条
