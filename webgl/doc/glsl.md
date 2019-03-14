-   @ques 能不能直接用 webgl 绘制字体, 不用借助 canvas

    -   https://blog.mapbox.com/drawing-text-with-signed-distance-fields-in-mapbox-gl-b0933af6f817

-   @ques math.fract 到底是做什么的额
    -   一个数字的分数部分

## 2019-03-08 09:19:12

-   `smoothstep(pct-0.01, pct, .3) - smoothstep(pct, pct+0.01, .3))` 为什么可以画一个圆

```c
// Author @patriciogv - 2015
// http://patriciogonzalezvivo.com

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

void main(){
	vec2 st = gl_FragCoord.xy/u_resolution;
    float pct = 0.0;

    // a. The DISTANCE from the pixel to the center
    pct = distance(st,vec2(0.5));

    // b. The LENGTH of the vector
    //    from the pixel to the center
    // vec2 toCenter = vec2(0.5)-st;
    // pct = length(toCenter);

    // c. The SQUARE ROOT of the vector
    //    from the pixel to the center
    // vec2 tC = vec2(0.5)-st;
    // pct = sqrt(tC.x*tC.x+tC.y*tC.y);

    vec3 color = mix(vec3(0.0), vec3(1.0), smoothstep(pct-0.01, pct, .3) - smoothstep(pct, pct+0.01, .3));

	gl_FragColor = vec4( color, 1.0 );
}

```

-   @ques
    -   `vec2 st = gl_FragCoord.xy/u_resolution;`
    -   `vec3 color = vec3(y);`
    -   `color = (1.0-pct)*color+pct*vec3(0.040,1.000,0.178);`

## 2019-03-04 09:31:29

-   @ques glsl 上的值 能不能将打印出来

-   @ques
    `detail is that GLSL specs don’t guarantee that variables will be automatically casted`
