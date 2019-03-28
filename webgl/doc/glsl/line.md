```c
// 怎么画两条线 怎么让一个x对应多个y

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

float curve(vec2 st, float d) {
    float t = -0.044;
    float w = 2.200;
    float y = sin(st.x*w) + d;
    return smoothstep(st.y - t, st.y, y) * (1.0 - smoothstep(st.y, st.y+t, y));
}

void main(void){
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    vec3 color = vec3(0.0);


    color = vec3(curve(st*10.0, 1.5));
    color = mix(color,vec3(1.0,1.0,1.0),vec3(curve(st*10.0, 3.0)));

    gl_FragColor = vec4(color,1.0);
}
```
