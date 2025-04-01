#ifdef GL_ES
precision highp float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;
varying vec2 v_uv;


vec3 mod289(vec3 x) {
    return x - floor(x * (1.0 / 289.0)) * 289.0;
}
vec2 mod289(vec2 x) {
    return x - floor(x * (1.0 / 289.0)) * 289.0;
}
vec3 permute(vec3 x) {
    return mod289(((x * 34.0) + 1.0) * x);
}

//通过计算输入坐标的相邻点的加权和来生成平滑的噪声值。
float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
    vec2 i = floor(v + dot(v, C.yy));
    vec2 x0 = v - i + dot(i, C.xx);
    vec2 i1 = vec2(0.0);
    i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec2 x1 = x0.xy + C.xx - i1;
    vec2 x2 = x0.xy + C.zz;
    i = mod289(i);
    vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x1, x1), dot(x2, x2)), 0.0);

    m = m * m;
    m = m * m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);

    vec3 g = vec3(0.0);
    g.x = a0.x * x0.x + h.x * x0.y;
    g.yz = a0.yz * vec2(x1.x, x2.x) + h.yz * vec2(x1.y, x2.y);
    return 130.0 * dot(m, g);
}

void main() {
    vec2 st = v_uv;
    st.x *= u_resolution.x / u_resolution.y;
    vec3 color = vec3(0.0);
    vec2 pos = vec2(st * 3.);

    
    float DF = 0.0;//用于累积噪声值。
    float a = 0.0;//
    vec2 vel = vec2(u_time * .1);//基于时间的速度向量，随着时间的推移而变化
    DF += snoise(pos + vel) * .25 + .25;//使用 snoise 函数计算噪声，并将结果加到 DF 中，增加了一个常数偏移量（0.25）


     //计算一个角度 a，这个角度是基于噪声和时间的函数
    a = snoise(pos * vec2(cos(u_time * 0.15), sin(u_time * 0.1)) * 0.1) * 3.1415926535;
   
    vel = vec2(cos(a), sin(a));
    //vel 更新为基于角度 a 的单位向量。
    DF += snoise(pos + vel) * .25 + .25;
    //再次使用 snoise 计算噪声并累加到 DF
    color = vec3(smoothstep(.7, .75, fract(DF)));
    //使用 fract(DF) 获取 DF 的小数部分，并通过 smoothstep 函数将其映射到 [0, 1] 范围，生成平滑的颜色过渡。

    gl_FragColor = vec4(1.0 - color, 1.0);
}
