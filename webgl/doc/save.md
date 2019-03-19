## 新的框架

## 画一个三角形

    -   能不能借用矩形的公式
    -   能不能直接使用三角形的公式
    -   分割成一个个的矩形...

-   @note 解法 1 有点难搞

    -   一条边的直线方程
    -   任一点到中心的距离 < 点和中心形成直线和直线交点的距离
        -   点到中心直线
        -   点到中心直线和原直线的交点
        -   ...
    -   两点直线方程...

## 学习

-   matrix

    -   @ques 矩阵运算...

-   glsl

## 凹多边形如何处理

-   可以分割为多个凸多边形 - 我从外观上可以分割, 但是几何上如何处理, 胆码如何处理

-   @ques color 转化 red --> rgba

## webgl 2d

-   @todo 图片 repeat + 性能

## 其他

-   @ques 将(-1, 1) 坐标系转化成 canvas 坐标, 为什么这个 function 就可以做到

    -   `matrix = m3.projection(gl.canvas.clientWidth, gl.canvas.clientHeight);`
    -   projection 到底是做什么的

-   vertex shader -> vertex positions

    -   组成各种形状
    -   -1 to +1

-   fragment shader
    -   在 vertex shader(形状)上绘制颜色

*   gl.drawArrays | gl.drawElements
    -   绘制方法

-   Attributes and Buffers

    -   绘制的任何参数都必须先要存进 gpu --> buffers
    -   然后拿出来给 gpu 调用

-   Uniforms
    -   一些全部变量设置 用来运行 shader program

*   Textures
    -   数组类型数据 ?? 做什么的
    -   存储图片信息??

-   Varyings
    -   传递数据 vertex shader -> fragment shader
