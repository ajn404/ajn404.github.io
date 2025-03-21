
varying vec2 v_uv;
uniform float u_time;
uniform vec2 u_mouse;

float random(vec2 coord) {
    return fract(sin(dot(coord.xy, vec2(12.9898, 78.233))) * 43758.5453);
}

void main() {
    float num = 0.000001;
    num += (u_mouse.x * u_mouse.y * 100. + u_time*20.) / 10000000.;
    float y = random(v_uv*(abs(sin(num))));
    gl_FragColor = vec4(y, y, y, 1.0); // 使用 y 值作为灰度颜色
}