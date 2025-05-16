#ifdef GL_ES
precision highp float;
#endif

uniform float u_time; // 时间变量
uniform vec2 u_resolution; // 屏幕分辨率

varying vec2 v_uv;

// 随机数生成器
float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}

void main() {
    vec2 st = v_uv; // 归一化屏幕坐标
    st.y *= 40.0; // 增加 y 轴缩放因子以创建更多行
    float row = floor(st.y); // 计算当前行
    float seed = random(vec2(row, row)); // 为当前行生成种子
    float speed = 0.1 + 0.2 * random(vec2(row, seed)); // 随机速度
    float offset = mod(u_time * speed, 1.0); // 计算偏移量
    st.x = fract(st.x + offset); // 更新 x 坐标

    // 减小块的宽度
    float blockSize = 0.05 + 0.1 * random(vec2(row, seed + 1.0)); // 随机块大小
    float blockStart = random(vec2(row, seed + 2.0)); // 随机块起始位置
    float inBlock = step(blockStart, st.x) * step(st.x, blockStart + blockSize); // 判断当前像素是否在块内

    // 为每一行块添加不同的颜色
    vec3 color = vec3(inBlock * random(vec2(row, 0.0)), inBlock * random(vec2(row, 1.0)), inBlock * random(vec2(row, 2.0)));

    gl_FragColor = vec4(color, 1.0); // 输出颜色
}