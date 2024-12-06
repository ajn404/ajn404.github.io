uniform float u_time;

varying vec2 v_uv;

vec2 brickTile(vec2 _st, float _zoom) {
    _st *= _zoom;

    // 奇偶行对角线方向偏移
    float isOddRow = step(0.5, mod(floor(_st.x + _st.y), 2.0));

    // 对角线偏移（奇偶交替相反方向）
    _st += vec2(1.0, 1.0) * isOddRow * u_time;       // 奇数行向右上移动
    _st += vec2(-1.0, -1.0) * (1.0 - isOddRow) * u_time; // 偶数行向左下移动

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
    vec3 color2 = vec3(1.0); // 绿色
    float gridSize = 0.1;
    // 创建格子图案
    vec3 color = mix(color1, color2, step(gridSize, grid.x) * step(gridSize, grid.y));
    // 输出颜色
    gl_FragColor = vec4(color, 1.0);
}