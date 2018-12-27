const canvas = document.getElementById('canvas') as HTMLCanvasElement;
const gl = canvas.getContext('webgl');
gl.viewport(0, 0, canvas.width, canvas.height);

function createSquare(gl: WebGLRenderingContext) {
    const vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);

    // prettier-ignore
    const verts = [
        .5, .5, 0.0,
        -.5, .5, 0.0,
        .5, -.5, 0.0,
        -.5, -.5, 0.0,
    ];
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(verts), gl.STATIC_DRAW);

    const square = {
        buffer: vertexBuffer,
        vertSize: 3,
        nVerts: 4,
        promtype: gl.TRIANGLE_STRIP,
    };

    return square;
}

function initMatrics() {
    // prettier-ignore
    const modelViewMatrix = new Float32Array([
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        0, 0, -3.333, 1,
    ]);

    // prettier-ignore
    const projectionViewMatrix = new Float32Array([
        2.41421, 0, 0, 0,
        0, 2.41421, 0, 0,
        0, 0, -1.002002, -1,
        0, 0, -0.2002002, 0,
    ]);
}

// @ques 怎么使用外部定义的变量projectionViewMatrix
const vertexShaderSource = `
    attribute vec3 vertexPos;
    uniform mat4 modelViewMatrix;
    uniform mat4 projectionMatrix;
    void main(void) {
        gl_Position = projectionMatrix * modelViewMatrix *Vec4(vertexPos, 1.0);
    }
`;

const fragmentShaderSource = `
    void main(void) {
        gl_FragColor = vec4(1.0, 1.0, 1.0,1.0);
    }
`;

function draw(gl: WebGLRenderingContext, obj) {
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.bindBuffer(gl.ARRAY_BUFFER, obj.buffer);
    gl.useProgram(shaderProgram);
}
