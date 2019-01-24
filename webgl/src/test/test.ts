import * as fragmentShaderSource from './fragment.glsl';
import * as vertexShaderSource from './vertex.glsl';

export function testDraw(gl: WebGLRenderingContext) {
    const cubeBufferInfo = createFlattenedVertices(
        gl,
        primitives.createCubeVertices(20),
    );

    const programInfo = webglUtils.createProgramInfo(gl, [
        vertexShaderSource,
        fragmentShaderSource,
    ]);

    const fieldOfViewRadians = degToRad(70);
    const cubeUniforms = {
        u_colorMult: [0, 0.5, 0.5, 1],
        u_matrix: m4.identity(),
    };
    const cubeTranslation = [0, 0, 0];

    requestAnimationFrame(drawScene);

    function drawScene(time) {
        time *= 0.0005;

        webglUtils.resizeCanvasToDisplaySize(gl.canvas);

        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

        gl.enable(gl.CULL_FACE);
        gl.enable(gl.DEPTH_TEST);

        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
        const projectionMatrix = m4.perspective(
            fieldOfViewRadians,
            aspect,
            1,
            2000,
        );

        const cameraPosition = [0, 0, 200];
        const target = [0, 0, 0];
        const up = [0, 1, 0];
        const cameraMatrix = m4.lookAt(cameraPosition, target, up);

        const viewMatrix = m4.inverse(cameraMatrix);

        const viewProjectionMatrix = m4.multiply(projectionMatrix, viewMatrix);

        const cubeXRotation = -time;
        const cubeYRotation = time;
        const cubeXScale = time / 10;
        const cubeYScale = time / 10;
        const cubeZScale = time / 10;
        gl.useProgram(programInfo.program);

        webglUtils.setBuffersAndAttributes(gl, programInfo, cubeBufferInfo);

        cubeUniforms.u_matrix = computeMatrix(
            viewProjectionMatrix,
            cubeTranslation,
            cubeXRotation,
            cubeYRotation,
            cubeXScale,
            cubeYScale,
            cubeZScale,
        );

        webglUtils.setUniforms(programInfo, cubeUniforms);

        gl.drawArrays(gl.TRIANGLES, 0, cubeBufferInfo.numElements);
        requestAnimationFrame(drawScene);
    }
}

function createFlattenedVertices(gl, vertices) {
    return webglUtils.createBufferInfoFromArrays(
        gl,
        primitives.makeRandomVertexColors(
            primitives.deindexVertices(vertices),
            {
                vertsPerColor: 6,
                rand: (ndx, channel) => {
                    return channel < 3 ? (128 + Math.random() * 128) | 0 : 255;
                },
            },
        ),
    );
}
function degToRad(d) {
    return (d * Math.PI) / 180;
}

function computeMatrix(
    viewProjectionMatrix,
    translation,
    xRotation,
    yRotation,
    xScale,
    yScale,
    zScale,
) {
    let matrix = m4.translate(
        viewProjectionMatrix,
        translation[0],
        translation[1],
        translation[2],
    );
    matrix = m4.xRotate(matrix, xRotation);
    matrix = m4.yRotate(matrix, yRotation);
    return m4.scale(matrix, xScale, yScale, zScale);
}
