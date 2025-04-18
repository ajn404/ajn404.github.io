#ifdef GL_ES
precision highp float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;
varying vec2 v_uv;


float random(in float x) {
    return fract(sin(x) * 1e4);
}

float random(in vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}

float pattern(vec2 st, vec2 v, float t) {
    vec2 p = floor(st + v);
    return step(t, random(50. + p * .000001) + random(p.x) * 0.5);
}

void main() {
    vec2 st = v_uv;
    
    st.x *= u_resolution.x / u_resolution.y;

    vec2 grid = vec2(10.0, 30.); // 可以通过 uniform 动态调整
    st *= grid;

    vec2 ipos = floor(st); // 整数部分
    vec2 fpos = fract(st); // 小数部分

    vec2 vel = vec2(u_time * 2. * max(grid.x, grid.y)); // 速度
    vel *= vec2(-1., 0.0) * random(1.0 + ipos.y); // 方向

    vec2 offset = vec2(0.1, 0.);

    vec3 color = vec3(0.);
    color.r = pattern(st + offset, vel, 0.5);
    color.g = pattern(st, vel, 0.5);
    color.b = pattern(st - offset, vel, 0.5);

    // 边缘处理
    color *= step(0.2, fpos.y);

    gl_FragColor = vec4(1.0 - color, 1.0);
}