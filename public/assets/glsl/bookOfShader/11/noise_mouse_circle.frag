uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;
varying vec2 v_uv;

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

float circle(in vec2 st, in float radius) {
    return smoothstep(radius, radius + 0.01, length(st - 0.5));
}

void main() {
    vec2 st = v_uv;
    // st*=5.;
    vec2 pos = vec2(st * 5. + u_time * 1.); 

    float n = noise(pos);
    float c = circle(st, n * 0.5);

    gl_FragColor = vec4(vec3(c), 1.0);
}