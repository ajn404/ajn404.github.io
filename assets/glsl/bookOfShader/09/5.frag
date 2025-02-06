varying vec2 v_uv;

vec2 brickTile(vec2 _st, float _zoom) {
    _st *= _zoom;
    // Here is where the offset is happening
    _st.x += step(1., mod(_st.y, 2.0)) * 0.5;

    return fract(_st);
}

// 片段着色器
void main() {
    // 获取当前像素的坐标
    vec2 st = v_uv;
     st = brickTile(st, 10.0);
    // 放大坐标以创建重复的图案
    vec2 grid = fract(st * 1.0); // 10.0是格子的数量
    // 定义颜色
    vec3 color1 = vec3(0.3, 0.0, 0.0); // 红色
    vec3 color2 = vec3(0.35, 0.31, 0.7); // 绿色
    float gridSize = 0.1;
    // 创建格子图案
    vec3 color = mix(color1, color2, step(gridSize, grid.x) * step(gridSize, grid.y));
    // 输出颜色
    gl_FragColor = vec4(color, 1.0);
}