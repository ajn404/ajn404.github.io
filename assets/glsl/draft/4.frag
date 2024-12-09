#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;
varying vec2 v_uv;

void main() {
    vec2 st = v_uv;
    vec3 color = vec3(0.0);

    float sunAngle = u_time * 0.1;
    vec2 sunPos = vec2(cos(sunAngle) * 0.5 + 0.5, sin(sunAngle) * 0.3 + 0.7);

    // 海平面高度
    float seaLevel = 0.5; 

    // 判断片段是否在海平面以下
    bool belowSeaLevel = st.y < seaLevel;

    // 根据太阳位置和海平面高度调整颜色
    float y = st.y;
    vec3 baseColor = mix(vec3(0.1, 0.0, 0.2), // 夜晚的深蓝色/紫色
                       vec3(1.0, 0.6, 0.1), // 正午的橙色/金色
                       smoothstep(0.0, 1.0, sin(sunAngle) * 0.5 + 0.5)); // 根据太阳高度调整颜色

    color = mix(vec3(0.5, 0.0, 0.1), // 深红色
                baseColor,
                smoothstep(0.0, 0.5, y));
    color = mix(color,
                vec3(0.8, 0.2, 0.4), // 紫色/粉红色
                smoothstep(0.5, 1.0, y));
    if (!belowSeaLevel) {
        float dist = distance(st, sunPos);
        color += vec3(1.0, 0.8, 0.4) * smoothstep(0.2, 0.0, dist);
    }
    if (belowSeaLevel) {
         float dist = distance(st, sunPos);
         color += vec3(0.5, 0.0, 0.1) * smoothstep(0.2, 0.0, dist);
    }


    gl_FragColor = vec4(color, 1.0);
}