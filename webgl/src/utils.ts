export function createShader(gl, type, source) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    if (success) {
        return shader;
    }

    // tslint:disable-next-line: no-console
    console.log(gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
}

export function createProgram(
    gl: WebGLRenderingContext,
    vertexShaderSource: string,
    fragmentShaderSource: string,
) {
    const program = gl.createProgram();
    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = createShader(
        gl,
        gl.FRAGMENT_SHADER,
        fragmentShaderSource,
    );

    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    const success = gl.getProgramParameter(program, gl.LINK_STATUS);
    if (success) {
        return program;
    }

    // tslint:disable-next-line: no-console
    console.log(gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
}

export function initWebGl(): WebGLRenderingContext {
    // Get A WebGL context
    const canvas = document.getElementById('canvas') as HTMLCanvasElement;
    const gl = canvas.getContext('webgl');
    if (!gl) {
        return;
    }
    fixCanvas(canvas);
    return gl;
}

export function fixCanvas(canvas: HTMLCanvasElement, listener?: Function) {
    setStyle(canvas, {
        position: 'absolute',
        left: 0,
        top: 0,
    });

    window.addEventListener('resize', canvasFullScreen);
    canvasFullScreen();

    function canvasFullScreen() {
        const { clientWidth, clientHeight } = document.documentElement;
        canvas.width = clientWidth;
        canvas.height = clientHeight;
        if (listener) {
            listener(clientWidth, clientHeight);
        }
    }
}

export function setStyle(node: HTMLElement, style: {}) {
    for (const key in style) {
        if (!style.hasOwnProperty(key)) {
            continue;
        }
        node.style[key] = style[key];
    }
}

export function loadImage(url): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
        const image = new Image();
        image.src = url; // MUST BE SAME DOMAIN!!!
        image.onload = () => {
            resolve(image);
        };
        image.onerror = () => {
            resolve(image);
        };
    });
}

export function hexToRgbA(hex) {
    let c;
    if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
        c = hex.substring(1).split('');
        if (c.length === 3) {
            c = [c[0], c[0], c[1], c[1], c[2], c[2]];
        }
        return [(c >> 16) & 255, (c >> 8) & 255, c & 255, 1];
    }
    throw new Error('Bad Hex');
}
