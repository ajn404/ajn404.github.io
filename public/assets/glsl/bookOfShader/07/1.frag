#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

varying vec2 v_uv;

void main(){
    vec2 st = v_uv;
    vec3 color = vec3(0.0);
    float w = 0.1;
    vec2 bl = step(vec2(w),st);
    vec2 tr = step(vec2(w),1.0-st);

    float pct = bl.x * bl.y* tr.x * tr.y;
    color = vec3(1.0-pct,abs(sin(u_time))/10.,1.0-pct);

    gl_FragColor = vec4(color,1.0);
}
