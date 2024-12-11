varying vec2 v_uv;
uniform float u_time;
uniform vec2 u_mouse;
uniform vec2 u_resolution;

float random(vec2 coord) {
    return fract(sin(dot(coord.xy, vec2(v_uv.x * 10., v_uv.y * 10.))) * 43758.5453);
}

void main() {
    float num = 0.00000001;
    num += (u_mouse.x * u_mouse.y + u_time * 20.) / 100000000.;
    float y = random(v_uv * (abs(sin(num))));
    gl_FragColor = vec4(y, y, y, 1.0); // 使用 y 值作为灰度颜色
}