uniform vec2 u_resolution;
uniform float u_time;
varying vec2 v_uv;

const mat2 m = mat2(0.80, 0.60, -0.60, 0.80);

float noise(in vec2 p) {
    return sin(p.x) * sin(p.y);
}


// 分形布朗运动
float fbm4(vec2 p) {
    float f = 0.0;
    f += 0.5000 * noise(p);
    p = m * p * 2.02;
    f += 0.2500 * noise(p);
    p = m * p * 2.03;
    f += 0.1250 * noise(p);
    p = m * p * 2.01;
    f += 0.0625 * noise(p);
    return f / 0.9375;
}

float fbm6(vec2 p) {
    float f = 0.0;
    f += 0.500000 * (0.5 + 0.5 * noise(p));
    p = m * p * 2.02;
    f += 0.250000 * (0.5 + 0.5 * noise(p));
    p = m * p * 2.03;
    f += 0.125000 * (0.5 + 0.5 * noise(p));
    p = m * p * 2.01;
    f += 0.062500 * (0.5 + 0.5 * noise(p));
    p = m * p * 2.04;
    f += 0.031250 * (0.5 + 0.5 * noise(p));
    p = m * p * 2.01;
    f += 0.015625 * (0.5 + 0.5 * noise(p));
    return f / 0.96875;
}

vec2 fbm4_2(vec2 p) {
    return vec2(fbm4(p), fbm4(p + vec2(7.8)));
}

vec2 fbm6_2(vec2 p) {
    return vec2(fbm6(p + vec2(16.8)), fbm6(p + vec2(11.5)));
}

//====================================================================

//生成一个基于噪声的复杂值 f，并输出额外的噪声信息 ron。
// 通过调整输入坐标 q 和时间 u_time，引入动态效果。
float func(vec2 q, out vec4 ron) {
    q += 0.03 *  sin(vec2(0.27, 0.23) * u_time  + length(q) * vec2(4.1, 4.3));

    vec2 o = fbm4_2(0.9 * q);

    o += 0.04 * sin(vec2(0.12, 0.14) * u_time + length(o));

    vec2 n = fbm6_2(3.0 * o);

    ron = vec4(o, n);

    float f = 0.5 + 0.5 * fbm4(1.8 * q + 6.0 * n);

    return mix(f, f * f * f * 3.5, f * abs(n.x));
}

//根据当前像素坐标 fragCoord 和分辨率 u_resolution，计算颜色值 fragColor。
// 结合噪声值和光照模型，生成最终的视觉效果
void mainImage(out vec4 fragColor, in vec2 fragCoord) {
    vec2 p = (2.0 * fragCoord - u_resolution.xy) / u_resolution.y;
    float e = 2.0 / u_resolution.y;

    vec4 on = vec4(0.0);
    float f = func(p, on);

    vec3 col = vec3(0.0);
    col = mix(vec3(0.2, 0.1, 0.4), vec3(0.3, 0.05, 0.05), f);
    col = mix(col, vec3(0.9, 0.9, 0.9), dot(on.zw, on.zw));
    col = mix(col, vec3(0.4, 0.3, 0.3), 0.2 + 0.5 * on.y * on.y);
    col = mix(col, vec3(0.0, 0.2, 0.4), 0.5 * smoothstep(1.2, 1.3, abs(on.z) + abs(on.w)));
    col = clamp(col * f * 2.0, 0.0, 1.0);

#if 0
    // gpu derivatives - bad quality, but fast
    vec3 nor = normalize(vec3(dFdx(f) * u_resolution.x, 6.0, dFdy(f) * u_resolution.y));
#else    
    // manual derivatives - better quality, but slower
    vec4 kk;
    vec3 nor = normalize(vec3(func(p + vec2(e, 0.0), kk) - f, 2.0 * e, func(p + vec2(0.0, e), kk) - f));
#endif    

    vec3 lig = normalize(vec3(0.9, 0.2, -0.4));
    float dif = clamp(0.3 + 0.7 * dot(nor, lig), 0.0, 1.0);
    vec3 lin = vec3(0.70, 0.90, 0.95) * (nor.y * 0.5 + 0.5) + vec3(0.15, 0.10, 0.05) * dif;
    col *= 1.2 * lin;
    col = 1.0 - col;
    col = 1.1 * col * col;

    fragColor = vec4(col, 1.0);
}

void main() {
    mainImage(gl_FragColor, gl_FragCoord.xy);
}