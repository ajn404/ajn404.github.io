#ifdef GL_ES
precision highp float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;
varying vec2 v_uv;

vec2 random2(vec2 p) {
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}

void main() {
    vec2 st = v_uv;
    vec3 color = vec3(.0);
    st *= 3.;
    vec2 i_st = floor(st);
    vec2 f_st = fract(st);

    float m_dist = 1.; // 最小距离

    for(int y = -1; y <= 1; y++) {
        for(int x = -1; x <= 1; x++) {
            vec2 neighbor = vec2(float(x), float(y)); // 邻居单元格偏移
            vec2 point = random2(i_st + neighbor);   // 随机点位置
            point = 0.5 + 0.5 * sin(u_time + 6.2831 * point); // 动画化随机点
            vec2 diff = neighbor + point - f_st;     // 当前像素与随机点的向量
            float dist = length(diff);               // 计算到随机点的距离
            m_dist = min(m_dist, dist);              // 更新最小距离
        }
    }

    color += m_dist;                 // 绘制最小距离（平滑的灰度场）
    color += 1. - step(.02, m_dist); // 绘制网格中心的圆点
    color -= step(.7,abs(sin(27.0*m_dist)))*.5;

    gl_FragColor = vec4(color, 1.0);
}
