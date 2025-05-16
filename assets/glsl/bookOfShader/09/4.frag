varying vec2 v_uv;

void main() {
    vec2 st = v_uv;
    vec2 grid = fract(st * 10.0); // 10.0是一行格子的数量
    vec3 color1 = vec3(0.24, 0.68, 0.85); // 红色
    vec3 color2 = vec3(0.0, 0.1, 1.0); // 绿色
    vec3 color = mix(color1, color2, step(0.5, grid.x) * step(0.5, grid.y));
    gl_FragColor = vec4(color, 1.0);
}