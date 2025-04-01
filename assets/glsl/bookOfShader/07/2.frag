#ifdef GL_ES
precision highp float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

varying vec2 v_uv;

void main(){
    vec2 st = v_uv;
    vec3 color = vec3(0.0);
    float w = 0.2;
    float smooth_width = 0.02; 
    vec2 bl = smoothstep(vec2(w - smooth_width), vec2(w + smooth_width), st);
    vec2 tr = smoothstep(vec2(1.0 - w + smooth_width), vec2(1.0 - w - smooth_width), st);

    float pct = bl.x * bl.y * tr.x * tr.y;
    color = vec3(pct, pct, pct);

    gl_FragColor = vec4(color, 1.0);
}