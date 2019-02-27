precision mediump float;

uniform vec4 u_color;

uniform float u_alpha;

void main(){
   gl_FragColor=u_color*u_alpha;
}