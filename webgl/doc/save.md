## webgl 2d 的游戏我还缺少什么

    -   文字 -- 还不会
    -   @ques 坐标的转换我现在可以了吗 -- 应该可以了
        -   translate scale rotation...
    -   @ques 图片的绘制 -- 没有试过
    -   @ques 形状 -> 应该可行
        -   所有图形都可以用三角形来代替
        -   多边形如何画 --> 多个三角形围绕一个圆心 边就是多边形的边... 中心点在其中任意取

## webgl 和 canvas 相同坐标

```js
// Get the strings for our GLSL shaders
const vertexShaderSource = `
    attribute vec4 a_position;

    uniform vec2 u_resolution;

    void main() {
       // convert the position from pixels to 0.0 to 1.0
       vec2 zeroToOne = a_position.xy / u_resolution;

       // convert from 0->1 to 0->2
       vec2 zeroToTwo = zeroToOne * 2.0;

       // convert from 0->2 to -1->+1 (clipspace)
       vec2 clipSpace = zeroToTwo - 1.0;

       gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1);
    }
`;

// look up where the vertex data needs to go.
const resolutionUniformLocation = gl.getUniformLocation(
    program,
    'u_resolution',
);

gl.uniform2f(resolutionUniformLocation, gl.canvas.width, gl.canvas.height);
```

## 其他

-   @ques 将(-1, 1) 坐标系转化成 canvas 坐标, 为什么这个 function 就可以做到

    -   `matrix = m3.projection(gl.canvas.clientWidth, gl.canvas.clientHeight);`

-   vertex shader -> vertex positions

    -   组成各种形状
    -   -1 to +1

-   fragment shader
    -   在 vertex shader(形状)上绘制颜色

*   gl.drawArrays | gl.drawElements
    -   绘制方法

-

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
