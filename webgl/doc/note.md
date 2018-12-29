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
