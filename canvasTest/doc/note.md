## 2018-12-17 09:13:37

-   @todo image

    -   位置
    -   旋转
    -   alpha...

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
