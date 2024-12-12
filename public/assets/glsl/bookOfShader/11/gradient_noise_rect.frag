#ifdef GL_ES
precision mediump float;
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

vec2 random2(vec2 st) {
    st = vec2(dot(st, vec2(127.1, 311.7)), dot(st, vec2(269.5, 183.3)));
    return -1.0 + 2.0 * fract(sin(st) * 43758.5453123);
}

float noise(vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);

    vec2 u = f * f * (3.0 - 2.0 * f);

    return mix(mix(dot(random2(i + vec2(0.0, 0.0)), f - vec2(0.0, 0.0)), dot(random2(i + vec2(1.0, 0.0)), f - vec2(1.0, 0.0)), u.x), mix(dot(random2(i + vec2(0.0, 1.0)), f - vec2(0.0, 1.0)), dot(random2(i + vec2(1.0, 1.0)), f - vec2(1.0, 1.0)), u.x), u.y);
}

void main() {
    vec2 st = v_uv;
    vec2 pos = vec2(st * 5. + u_time * 1.);
    vec2 u_size = vec2(0.9, 0.8);
    float u_borderWidth = noise(pos);   // Constant border width
    vec4 color = vec4(noise(vec2(abs(sin(u_time/10.))*2.)), 1.0, 0.3, 1.0); // Red border color

    float border = borderRect(v_uv, u_size, u_borderWidth);

    gl_FragColor = vec4(color.rgb, color.a * border );
}
