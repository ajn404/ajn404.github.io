#ifdef GL_ES
precision highp float;
#endif
uniform float u_time;

varying vec2 v_uv;

float borderRect(vec2 uv, vec2 size, float borderWidth) {
    vec2 dist = abs(uv - size * 0.5) - size * 0.5 + vec2(borderWidth * 0.5);
    return max(max(dist.x, dist.y), 0.0) < borderWidth ? 1.0 : 0.0;
}

// Helper functions (same as before)
float smoothBorderRect(vec2 uv, vec2 size, float borderWidth) {
    vec2 dist = abs(uv - size * 0.5) - size * 0.5 + vec2(borderWidth * 0.5);
    float d = max(max(dist.x, dist.y), 0.0);
    return smoothstep(borderWidth - borderWidth * 0.5, borderWidth + borderWidth * 0.5, d);
}

float random(in vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}

float noise(in vec2 st) {

    //把空间分成更小的单元
    vec2 i = floor(st);
    vec2 f = fract(st);

    //计算整数位置的顶点的坐标，并给每个顶点生成一个随机值
    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));

    vec2 u = f * f * (3.0 - 2.0 * f);
    u = smoothstep(0., 1., f);

    //用我们之前储存的小数位置的值，在四个顶点的随机值之间插值
    return mix(a, b, u.x) +
        (c - a) * u.y * (1.0 - u.x) +
        (d - b) * u.x * u.y;
}

void main() {
    vec2 st = v_uv;
    vec2 pos = vec2(st * 5. + u_time * 1.);
    vec2 u_size = vec2(0.5, 0.2);
    float u_borderWidth = noise(pos);   // Constant border width
    vec4 color = vec4(noise(vec2(abs(sin(u_time/10.))*2.)), 1.0, 0.3, 1.0); // Red border color

    float border = borderRect(v_uv, u_size, u_borderWidth);

    gl_FragColor = vec4(color.rgb, color.a * border );
}
