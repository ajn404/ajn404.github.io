precision mediump float;

varying vec2 v_uv;

vec3 hsv2rgb(vec3 c) {
    vec4 K = vec4(1.0, 2.0/3.0, 1.0/3.0, 3.0);
    vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
    return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}

void main() {
    // 计算彩虹的宽度
    float rainbowWidth = 0.1; // 彩虹的宽度，可以根据需要调整
    float hue = mod(v_uv.x * 3.0, 1.0); // 彩虹的色相
    float saturation = 1.0; // 彩虹的饱和度
    float value = smoothstep(0.1, 0.9, v_uv.y); // 彩虹的亮度

    // 根据彩虹的宽度调整色相
    float bridgeWidth = 0.2; // 彩虹桥的宽度，可以根据需要调整
    float bridgePosition = 0.5; // 彩虹桥的位置，可以根据需要调整
    float bridgeOffset = smoothstep(bridgePosition - bridgeWidth / 2.0, bridgePosition + bridgeWidth / 2.0, v_uv.x);
    hue = mix(hue, hue + bridgeOffset, bridgeOffset);

    vec3 color = hsv2rgb(vec3(hue, saturation, value));
    gl_FragColor = vec4(color, 1.0);
}
