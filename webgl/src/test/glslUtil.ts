import * as shapeFragmentShaderSource from './shapeFragment.glsl';
import * as shapeVertexShaderSource from './shapeVertex.glsl';
import * as textureFragmentShaderSource from './textureFragment.glsl';
import * as textureVertexShaderSource from './textureVertex.glsl';

const glsl_map = {
    shape: {
        vertex: shapeVertexShaderSource,
        fragment: shapeFragmentShaderSource,
    },
    texture: {
        vertex: textureVertexShaderSource,
        fragment: textureFragmentShaderSource,
    },
};

export type ProgramInfo = {
    program: WebGLProgram;
    set: Function;
    keys: string[];
};
export type ProgramMap = {
    [key: string]: ProgramInfo;
};
const program_map = {} as ProgramMap;

export function getProgramInfo(
    gl: WebGLRenderingContext,
    type: string,
): ProgramInfo {
    let program_info = program_map[type];
    if (!program_info) {
        const set_map = {};
        const keys = [];
        const set = (key, ...params) => {
            set_map[key](...params);
        };
        const { vertex, fragment } = glsl_map[type];
        // Link the two shaders into a program
        const program = createProgram(gl, vertex, fragment);

        const uniforms = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);
        const attributes = gl.getProgramParameter(
            program,
            gl.ACTIVE_ATTRIBUTES,
        );

        for (let i = 0; i < uniforms; i++) {
            const info = gl.getActiveUniform(program, i);
            const { name } = info;
            const index = gl.getUniformLocation(program, name);
            set_map[name] = createUniformSetter(gl, index, info);
            keys.push(name);
        }
        for (let i = 0; i < attributes; i++) {
            const { name } = gl.getActiveAttrib(program, i);
            const index = gl.getAttribLocation(program, name);
            const buffer = gl.createBuffer();
            set_map[name] = createAttribSetter(gl, index, buffer);
            keys.push(name);
        }
        program_info = {
            program,
            set,
            keys,
        };

        program_map[type] = program_info;
    }
    gl.useProgram(program_info.program);

    return program_info;
}

type AttributeData = {
    value;
    size;
    type;
    normalize;
    stride;
    offset;
};

function createAttribSetter(
    gl: WebGLRenderingContext,
    location: number,
    buffer: WebGLBuffer,
) {
    return (data: AttributeData) => {
        const { value, size, type, normalize, stride, offset } = data;
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        // prettier-ignore
        gl.bufferData( gl.ARRAY_BUFFER, value, gl.STATIC_DRAW );
        gl.enableVertexAttribArray(location);
        gl.vertexAttribPointer(
            location,
            size || 2,
            type || gl.FLOAT,
            normalize || false,
            stride || 0,
            offset || 0,
        );
    };
}

function createUniformSetter(
    gl: WebGLRenderingContext,
    location: WebGLUniformLocation,
    uniformInfo: WebGLActiveInfo,
) {
    const type = uniformInfo.type;
    // Check if this uniform is an array
    const isArray =
        uniformInfo.size > 1 && uniformInfo.name.substr(-3) === '[0]';
    if (type === gl.FLOAT && isArray) {
        return v => {
            gl.uniform1fv(location, v);
        };
    }
    if (type === gl.FLOAT) {
        return v => {
            gl.uniform1f(location, v);
        };
    }
    if (type === gl.FLOAT_VEC2) {
        return v => {
            gl.uniform2fv(location, v);
        };
    }
    if (type === gl.FLOAT_VEC3) {
        return v => {
            gl.uniform3fv(location, v);
        };
    }
    if (type === gl.FLOAT_VEC4) {
        return v => {
            gl.uniform4fv(location, v);
        };
    }
    if (type === gl.INT && isArray) {
        return v => {
            gl.uniform1iv(location, v);
        };
    }
    if (type === gl.INT) {
        return v => {
            gl.uniform1i(location, v);
        };
    }
    if (type === gl.INT_VEC2) {
        return v => {
            gl.uniform2iv(location, v);
        };
    }
    if (type === gl.INT_VEC3) {
        return v => {
            gl.uniform3iv(location, v);
        };
    }
    if (type === gl.INT_VEC4) {
        return v => {
            gl.uniform4iv(location, v);
        };
    }
    if (type === gl.BOOL) {
        return v => {
            gl.uniform1iv(location, v);
        };
    }
    if (type === gl.BOOL_VEC2) {
        return v => {
            gl.uniform2iv(location, v);
        };
    }
    if (type === gl.BOOL_VEC3) {
        return v => {
            gl.uniform3iv(location, v);
        };
    }
    if (type === gl.BOOL_VEC4) {
        return v => {
            gl.uniform4iv(location, v);
        };
    }
    if (type === gl.FLOAT_MAT2) {
        return v => {
            gl.uniformMatrix2fv(location, false, v);
        };
    }
    if (type === gl.FLOAT_MAT3) {
        return v => {
            gl.uniformMatrix3fv(location, false, v);
        };
    }
    if (type === gl.FLOAT_MAT4) {
        return v => {
            gl.uniformMatrix4fv(location, false, v);
        };
    }
    if (type === gl.SAMPLER_2D || type === gl.SAMPLER_CUBE) {
        return texture => {
            gl.uniform1i(location, 0);
            gl.activeTexture(gl.TEXTURE0);
            gl.bindTexture(getBindPointForSamplerType(gl, type), texture);
        };
    }
    return undefined;
}

function getBindPointForSamplerType(gl: WebGLRenderingContext, type: number) {
    if (type === gl.SAMPLER_2D) {
        return gl.TEXTURE_2D;
    }
    if (type === gl.SAMPLER_CUBE) {
        return gl.TEXTURE_CUBE_MAP;
    }
    return undefined;
}

function createShader(gl, type, source) {
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

function createProgram(
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
