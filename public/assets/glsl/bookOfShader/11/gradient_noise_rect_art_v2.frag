#ifdef GL_ES
precision mediump float;
#endif
uniform float u_time;
uniform sampler2D u_texture0;

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

    return mix(mix(dot(random2(i + vec2(0.0, 0.0)), f - vec2(0.0, 0.0)), dot(random2(i + vec2(1.0, 0.0)), f - vec2(1.0, 0.0)), u.x), mix(dot(random2(i + vec2(0.0, 1.0)), f - vec2(0.0, 1.0)), dot(random2(i + vec2(1.0, 1.0)), f - vec2(1.0, 1.0)), u.x), u.y)*1.+1.;
}

void main() {
    vec2 st = v_uv;

    vec2 pos = vec2(abs(sin(st.x + u_time)), abs(cos(st.x + u_time)));

    vec2 u_size = vec2(noise(pos), noise(1.0 - pos));
    float u_borderWidth = 0.;   // Constant border width
    vec4 color = vec4(noise(vec2(abs(sin(u_time / 100.)) * 2.)), .2, 1., 0.0); // Red border color

    float border = smoothBorderRect(v_uv, u_size, u_borderWidth);

 // 定义右上角矩形区域的位置和大小
    vec2 rectPos = vec2(0.,0. ); // 矩形的左下角位置 (相对于 UV 坐标)
    // vec2 rectSize = vec2(0.1, 0.1); // 矩形的宽度和高度
    vec2 rectSize = u_size; 
    // 计算纹理 UV 坐标映射到矩形内部
    vec2 texUV = (st - rectPos) / rectSize;

    // 判断当前像素是否在矩形区域内
    float inRect = step(0.0, texUV.x) * step(0.0, texUV.y) *
        step(texUV.x, 1.0) * step(texUV.y, 1.0);
        // 采样纹理颜色
    vec4 textureColor = texture2D(u_texture0, texUV);
    vec4 fixColor = vec4(color.rgb, color.a * border);

    vec4 finalColor = mix(fixColor, textureColor, inRect);
    gl_FragColor = finalColor ;
}
