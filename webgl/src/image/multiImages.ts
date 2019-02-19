// https://codepen.io/pen/?&editable=true&editors=101
// WebGL - Triangle with position for color
// from https://webglfundamentals.org/webgl/webgl-2d-triangle-with-position-for-color.html

'use strict';

import { createProgram } from '../../doc/utils1';
import * as fragmentShaderSource from './multiImagesFragment.glsl';
import * as vertexShaderSource from './multiImagesVertex.glsl';

export async function drawMultiImages(gl: WebGLRenderingContext) {
    // Link the two shaders into a program
    const program = createProgram(gl, vertexShaderSource, fragmentShaderSource);

    // look up where the vertex data needs to go.
    const positionLocation = gl.getAttribLocation(program, 'a_position');
    const texcoordLocation = gl.getAttribLocation(program, 'a_texcoord');

    const matrixLocation = gl.getUniformLocation(program, 'u_matrix');
    const textureLocation = gl.getUniformLocation(program, 'u_texture');

    // Create a buffer to put three 2d clip space points in
    const positionBuffer = gl.createBuffer();
    // Bind it to ARRAY_BUFFER (think of it as ARRAY_BUFFER = positionBuffer)
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

    // prettier-ignore
    const positions = [
        0, 0,
        0, 1,
        1, 0,
        1, 0,
        0, 1,
        1, 1,
    ];
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

    // provide texture coordinates for the rectangle.
    const texcoordBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, texcoordBuffer);
    gl.bufferData(
        gl.ARRAY_BUFFER,
        // prettier-ignore
        new Float32Array([
            0, 0,
            0, 1,
            1, 0,
            1, 0,
            0, 1,
            1, 1,
        ]),
        gl.STATIC_DRAW,
    );

    const textureInfos = [
        loadImageAndCreateTextureInfo(gl, '/dist/image/star.jpg'),
        loadImageAndCreateTextureInfo(gl, '/dist/image/leaves.jpg'),
        loadImageAndCreateTextureInfo(gl, '/dist/image/keyboard.jpg'),
    ];
    const drawInfos = [];
    const numToDraw = 1;
    const speed = 100;

    for (let ii = 0; ii < numToDraw; ii++) {
        const drawInfo = {
            x: Math.random() * gl.canvas.width,
            y: Math.random() * gl.canvas.height,
            dx: Math.random() > 0.5 ? -1 : 1,
            dy: Math.random() > 0.5 ? -1 : 1,
            textureInfo:
                textureInfos[(Math.random() * textureInfos.length) | 0],
        };
        drawInfos.push(drawInfo);
    }

    let then = 0;
    function render(time) {
        const now = time * 0.001;
        const deltaTime = Math.min(0.1, now - then);
        then = now;
        update(deltaTime);
        draw();
        requestAnimationFrame(render);
    }
    requestAnimationFrame(render);

    function drawImage(
        tex: WebGLTexture,
        texWidth: any,
        texHeight: any,
        dstX: any,
        dstY: any,
    ) {
        gl.bindTexture(gl.TEXTURE_2D, tex);
        gl.useProgram(program);

        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        gl.enableVertexAttribArray(positionLocation);
        gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

        gl.bindBuffer(gl.ARRAY_BUFFER, texcoordBuffer);
        gl.enableVertexAttribArray(texcoordLocation);
        gl.vertexAttribPointer(texcoordLocation, 2, gl.FLOAT, false, 0, 0);

        let matrix = m4.orthographic(
            0,
            gl.canvas.width,
            gl.canvas.height,
            0,
            -1,
            1,
        );
        matrix = m4.translate(matrix, dstX, dstY, 0);

        matrix = m4.scale(matrix, texWidth, texHeight, 1);

        gl.uniformMatrix4fv(matrixLocation, false, matrix);
        gl.uniform1i(textureLocation, 0);
        gl.drawArrays(gl.TRIANGLES, 0, 6);
    }

    function draw() {
        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
        gl.clear(gl.COLOR_BUFFER_BIT);
        drawInfos.forEach(drawInfo => {
            drawImage(
                drawInfo.textureInfo.texture,
                drawInfo.textureInfo.width,
                drawInfo.textureInfo.height,
                drawInfo.x,
                drawInfo.y,
            );
        });
    }

    function update(deltaTime) {
        drawInfos.forEach(drawInfo => {
            const {
                textureInfo: { width, height },
            } = drawInfo;
            drawInfo.x += drawInfo.dx * speed * deltaTime;
            drawInfo.y += drawInfo.dy * speed * deltaTime;

            if (drawInfo.x < 0) {
                drawInfo.dx = 1;
            }
            if (drawInfo.x > gl.canvas.width - width) {
                drawInfo.dx = -1;
            }
            if (drawInfo.y < 0) {
                drawInfo.dy = 1;
            }
            if (drawInfo.y > gl.canvas.height - height) {
                drawInfo.dy = -1;
            }
        });
    }
}

function loadImageAndCreateTextureInfo(gl: WebGLRenderingContext, url: string) {
    const tex = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.texImage2D(
        gl.TEXTURE_2D,
        0,
        gl.RGBA,
        1,
        1,
        0,
        gl.RGBA,
        gl.UNSIGNED_BYTE,
        new Uint8Array([0, 0, 255, 255]),
    );
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);

    const textureInfo = {
        width: 1,
        height: 1,
        texture: tex,
    };
    const img = new Image();
    img.addEventListener('load', () => {
        textureInfo.width = img.width;
        textureInfo.height = img.height;

        gl.bindTexture(gl.TEXTURE_2D, textureInfo.texture);
        gl.texImage2D(
            gl.TEXTURE_2D,
            0,
            gl.RGBA,
            gl.RGBA,
            gl.UNSIGNED_BYTE,
            img,
        );
    });
    img.src = url;
    return textureInfo;
}
