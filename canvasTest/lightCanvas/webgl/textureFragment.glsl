precision mediump float;

varying vec2 v_texcoord;

uniform sampler2D u_texture;

uniform float u_alpha;

void main(){
   gl_FragColor=texture2D(u_texture,v_texcoord);
   gl_FragColor=gl_FragColor*u_alpha;
}