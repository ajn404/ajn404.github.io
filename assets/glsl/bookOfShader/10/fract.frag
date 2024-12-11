varying vec2 v_uv;
uniform float u_time;

void main() {
    float x = v_uv.x * 10.0; // 调整 10.0 来控制 x 轴的范围
    float y = fract(sin(x) * min(u_time, 100000.));
    gl_FragColor = vec4(y, y, y, 1.0); // 使用 y 值作为灰度颜色
}