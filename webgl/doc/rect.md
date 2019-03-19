```c
// 矩形分割

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

float circle(in vec2 _st, in float _radius){
    vec2 l = _st-vec2(0.5);
    return 1.-smoothstep(_radius-(_radius*0.01),
                         _radius+(_radius*0.01),
                         dot(l,l)*4.0);
}

float rect(in vec2 _st, in float _radius){
    vec2 l = abs(_st-vec2(0.5));
    return step(l.x, 1.0-_radius) * step(l.y, 1.0-_radius);
}

void main() {
	vec2 st = gl_FragCoord.xy/u_resolution;
    vec3 color = vec3(0.0);

    st *= 5.0;      // Scale up the space by 3
    float a = 1.972;
    float n = floor(st.x/a) + floor(st.y/a);
    st = fract(st); // Wrap arround 1.0

    // Now we have 3 spaces that goes from 0-1

    color = vec3(st,0.0);
    if (n > 1.024) {
        color = vec3(rect(st,0.612));
    } else {
        color = vec3(circle(st,0.612));
    }


	gl_FragColor = vec4(color,1.0);
}
```

```c
// https://thebookofshaders.com/edit.php#09/diamondtiles.frag
// Author @patriciogv - 2015

#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265358979323846

uniform vec2 u_resolution;
uniform float u_time;

float circle(in vec2 _st, in float _radius){
    vec2 l = _st-vec2(0.5);
    return 1.-smoothstep(_radius-(_radius*0.01),
                         _radius+(_radius*0.01),
                         dot(l,l)*4.0);
}

float rect(in vec2 _st, in float _radius){
    vec2 l = abs(_st-vec2(0.5));
    return step(l.x, 1.0-_radius) * step(l.y, 1.0-_radius);
}
vec2 rotate2D(vec2 _st, float _angle){
    _st -= 0.5;
    _st =  mat2(cos(_angle),-sin(_angle),
                sin(_angle),cos(_angle)) * _st;
    _st += 0.5;
    return _st;
}

void main() {
	vec2 st = gl_FragCoord.xy/u_resolution;
    vec3 color = vec3(0.0);

    st *= 10.0;      // Scale up the space by 3
    vec2 st1 = st+0.5;

    float a = 1.972;
    float n = floor(st.x/a) + floor(st.y/a);
    st = fract(st); // Wrap arround 1.0
    st1 = fract(st1);
    float m = st.x;
    // Use a matrix to rotate the space 45 degrees


    // Now we have 3 spaces that goes from 0-1

    color = vec3(st,0.0);
    color = vec3(rect(st,0.522));
    float b = 0.824;

    st1 = rotate2D(st1,PI*0.250);
    if (rect(st1,b) == 1.0) {
      color = vec3(-rect(st1,b));
    }
    if (rect(st1,b) == 1.0) {
      color = vec3(rect(st1,b+0.028));
    }
    gl_FragColor = vec4(color,1.0);
}
```
