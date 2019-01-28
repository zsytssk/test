-   @todo
    -   shape 2d --> ...
    -   pos | scale | rotation | pivot
    -   图片 2d ->
    -   text 2d -> ...
    -   3d ...

https://webglfundamentals.org/webgl/lessons/webgl-text-texture.html

https://webglfundamentals.org/webgl/lessons/webgl-2d-drawimage.html

-   @ques 如何设置文字的大小 定位

## 2019-01-28 09:45:42

-   @ques program

    -   各种 program 保存, 然后使用...
    -   快速读取 program 中的值...
    -   设置数据...
    -   绘制

-   @ques 如何使用透明度...

## 2019-01-23 09:19:06

-   @ques 绘制的字体问什么那么破碎
    -   没有设置大小的缘故

attempt to access out of range vertices in attribute 0

-   @ques 如果用 webgl 画文字, 文字超出范围我怎么处理
    -   因为要先在 canvas 上画, 难以自己文字占用空间的大小...
    -   @ques 即使是在 canvas 中我又如何知道文字占用空间的大小呢
    -   如果知道大小那就只是 图片的相对定位而已
    -   裁剪 png
    -   `const w = utils_ctx.measureText(text); const h = parseInt(utils_ctx.font);`

## 2019-01-21 09:07:36

-   gl.COLOR_BUFFER_BIT
-   能不能给 webgl 设置其他颜色

## 2019-01-17 08:55:51

-   @ques 怎么从一张大图中抽出小图 生成 texture

-   @ques webgl 和 canvas 提供相同的 api

-   webgl + canvas 要一样通过渲染测试

## 2019-01-16 19:30:33

-   @save 绘制 text

```js
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
temp2.fillStyle = '#fff';
temp2.fillText('hello', 100, 100);
canvas.toDataURL('image/png');
```

## 2019-01-16 09:12:59

-   @ques webgl text <--- texture <--- canvas fillText 来处理

    -   这好麻烦啊

-   matrix 三维计算...

-   @imp createProgramInfo 可以 获取 shader 中的变量 这挺好用的...

-   @note 可以使用不同的 shader

-   @ques 可以 webgl 和 canvas 混用??

-   @ques 能不能将 webglutil 转换成 es 模块...

*   @ques 三维太复杂了 许多概念 + 运算

*   @ques 位置 + rotation 如何确定

*   @ques 这一大堆 m4 是做什么?

    -   @ques 在哪里转化 matrix

*   @ques `Compute the camera's matrix` 什么意思

    -   相机位置 我还没有概念...

*   @ques 下面代码什么意思
    `gl.enable(gl.CULL_FACE); gl.enable(gl.DEPTH_TEST);`

*   cameraMatrix --> viewMatrix --> viewProjectionMatrix --> u_matrix

### save

-   在什么地方绘制立方体的 `primitives.createCubeVertices(10)`

## 2019-01-10 09:43:20

-   @ques webgl2d 的游戏我还缺少什么

    -   文字 -- 还不会
    -   @ques 坐标的转换我现在可以了吗 -- 应该可以了
        -   translate scale rotation...
    -   @ques 图片的绘制 -- 没有试过
    -   @ques 形状 -> 应该可行
        -   所有图形都可以用三角形来代替
        -   多边形如何画 --> 多个三角形围绕一个圆心 边就是多边形的边... 中心点在其中任意取

*   @todo [学习]矩阵的算法

    -   二维矩阵
    -   @ques math projection 的实际意义
        -   怎么将原来的像素投影到 clipspace

*   @todo [学习][着色器](https://thebookofshaders.com/)

-   @save clipspace 是(-1, 1)坐标轴

## 2019-01-08 09:05:47

-   webglLessonsUI 的工具其实蛮有用的

-   @todo

-   @ques shader 本身支持 module, 我怎么在其中 import

-   config.glslangValidatorPath

-   @ques webpack glsl

    -   直接使用 text 类型
    -   .glsl 语法

-   glsl 语法 挺强大的吗

    -   `T sin(T angle)`

-   @ques v_positionWithOffset 的具体作用

## 2019-01-07 09:07:23

-   @ques todo 伸展

    -   吃肉
    -   意识 给自己 准备 --> 感觉的流淌

-   @ques select text vscode

-   @ques `precision mediump float;`

-   @ques 怎么把图片换一个位置

-   @ques Vertex Shader's --> clipspace coordinates

-   @ques float, vec2, vec3, vec4, mat2, mat3, and mat4 分别是什么样子的

-   @ques gl.uniform4fv(offsetLoc, [1, 0, 0, 0]); 这代表什么意思

-   @ques 一个游戏中那么多的 shader 怎么处理
    -   laya 的 shader 是怎么设置的???

## 2019-01-04 09:41:27

-   texture --> varying 传递变量

-   texture text shape
    -   2d 3d
    -   shape --> line-线 面-plane 立方体
        -   这个总称叫形状吗

*   texture text graphic

*   @ques laya stat 中的 cache draw ?? 是什么意思

## 2019-01-03 09:26:51

-   @ques clipspace vertices

    -   https://codepen.io/pen/?&editable=true&editors=101

-   We define “varyings” for each value we want to pass from the vertex shader to the fragment shader.

    -   “varyings” 的意义

-   @ques count = 3, 取三个数据 画一个三角形 count=6 取 6 格数据画两个三角形??

-   vertex shader 索取的数据是同时三个 还是一个个的取呢

    -   应该是 一个个的取, 一个个的分析 一个个的传给 fragment shader

-   @ques 理解 顶点作色器 网格作色器

    -   `vec2 zeroToOne = a_position.xy / u_resolution;`
    -   `vec4(clipSpace * vec2(1, -1), 0, 1)`
    -   这两句话是什么意思

-   @ques 需要自己写作色器吗

    -   因该是需要的...

## 2019-01-02 09:19:15

-   @ques 画一个矩形为什么使用 6 个点

    -   只会画三角形 画两个三角形就是矩形

-   @ques 怎么将 webgl 的坐标转换成和 canvas 一致

    -   能否实现和 canvas api 一致

-   webgl 绘制就是在 shader 中定义好变量, 然后再用 js 去改变 然后绘制...

https://github.com/toji/glmatrix

-   将初始化代码和 render 代码分离出来

## 2018-12-29 09:16:21

-   怎么麻烦如何调用 webgl 接口去绘制图片 text...

-   下面这句话是什么意思
    `Because we set primitiveType to gl.TRIANGLES, each time our vertex shader is run 3 times WebGL will draw a triangle based on the 3 values we set gl_Position to.`

-   @ques positions 如何存贮 如何使用

    -   ??
    -   bindBuffer 中只有一个数据
    -   vertexAttribPointer 配置好数据的格式,
    -   gl 自己 buffer 中找到数据
    -   将他传给 a_position
        -   positionAttributeLocation

*   @ques enableVertexAttribArray

*   @ques gl.getShaderParameter(shader, gl.COMPILE_STATUS)

    -   gl 这种运算能用异步吗

*   @ques GLSL programs 什么意思
    -   GL Shader Language
    -   written in a very strictly typed C/C++ like language -运行 显示页面

## 2018-12-28 09:48:35

-   @ques 小米包 进不去自定义房间

## 2018-12-28 09:21:51

-   Textures

    -   数组类型数据 ?? 做什么的
    -   存储图片信息??

-   Varyings 在什么地方设置>??

*   program --> positionAttributeLocation --> enableVertexAttribArray
    -   vertexAttribPointer
*   @ques

    -   getAttribLocation
    -   attachShader
    -   getProgramParameter
    -   linkProgram
    -   useProgram
    -   enableVertexAttribArray

    -   createBuffer
    -   bindBuffer
    -   bufferData

*   @ques vertex shader | fragment shader

-   drawArrays 是什么意思
    -   vertexAttribPointer 这是将参数传给 gpu 吗

*   @ques 怎么画出一个三角形
    -   位置 颜色 三个边的大小 如何确认(默认的样式吗??)
    -   三个边的大小 positions - (矩阵 transform??)
        -   三角形三个边的长度 ??

-   @ques texture coordinates, vertex colors
    -   什么意思

*   gpu 需要先存进去
    -   gpu 调用需要内存中的位置, 找到数据...
    -   然后来计算..
