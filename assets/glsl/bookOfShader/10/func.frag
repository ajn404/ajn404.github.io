varying vec2 v_uv;
uniform float u_time;

float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) *
        43758.5453123);
}

void main() {
    vec2 st = v_uv * 10.0; // 调整 10.0 来控制纹理的分辨率
    float x = v_uv.x * 10.0; // 调整 10.0 来控制 x 轴的范围
    float y = fract(sin(x) * min(u_time, 100000.));
    st  = st /2.;
    gl_FragColor = vec4(random(st)*st.x, y*st.x, random(st)*st.x, 1.0); // 使用 y 值作为灰度颜色
}