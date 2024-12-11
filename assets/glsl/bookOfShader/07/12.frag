#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359
#define TWO_PI 6.28318530718

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;
varying vec2 v_uv;


// 输入：
// pos: 归一化的坐标点 (-1 到 1 的范围)
// N: 多边形的边数
// 返回：该点到多边形边界的距离场值
float getNGonDistance(vec2 pos, int N) {
    // 计算角度和半径
    float a = atan(pos.x, pos.y) + PI;
    float r = TWO_PI / float(N);
    
    // 使用整形函数计算距离场
    return cos(floor(.5 + a / r) * r - a) * length(pos);
}

void main() {
    vec2 st = v_uv;
    st.x *= u_resolution.x / u_resolution.y;
    
    // 将坐标重映射到 -1 到 1 的范围
    st = st * 2. - 1.;
    
    // 使用新函数计算距离场
    float d = getNGonDistance(st, max(3, int(ceil(sin(u_time * 2.0) * 10.0))));
    
    vec3 color = vec3(1.0 - smoothstep(.4, .41, d));
    
    gl_FragColor = vec4(color, 1.0);
}
