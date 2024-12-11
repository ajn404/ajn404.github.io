#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution; // 屏幕分辨率
uniform float u_time;      // 动态时间（可选）

#define PI 3.14159265359

varying vec2 v_uv; // 从顶点着色器传递过来的纹理坐标

// 网格平铺
vec2 tile(vec2 st, float zoom) {
    st *= zoom;
    return fract(st);
}

// 棱形图案生成（黑白交替）
float diamondPattern(vec2 st) {
    st = abs(st - 0.5); // 菱形对称坐标
    return step(st.x + st.y, 0.5); // 在菱形内返回1，否则返回0
}

// 主函数
void main() {
    // vec2 st = v_uv; // 标准化坐标
    vec2 st =gl_FragCoord.xy / u_resolution.xy; // 将纹理坐标映射到[-1, 1]范围

    // 调整坐标比例
    st.x *= u_resolution.x / u_resolution.y;

    // 平铺菱形图案
    float zoom = 4.0; // 控制网格密度
    st = tile(st, zoom);

    // 菱形黑白交替逻辑
    float pattern = diamondPattern(st);

    // 根据奇偶交替颜色
    float checker = mod(floor(gl_FragCoord.x / (u_resolution.x / zoom)) +
        floor(gl_FragCoord.y / (u_resolution.y / zoom)), 2.0);
    vec3 color = mix(vec3(1.0), vec3(0.0), abs(1. - pattern));

    // 输出颜色
    gl_FragColor = vec4(color, 1.0);
}
