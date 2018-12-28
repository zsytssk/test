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
