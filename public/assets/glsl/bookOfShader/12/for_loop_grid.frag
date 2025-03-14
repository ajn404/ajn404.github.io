#ifdef GL_ES
precision highp float;
#endif

uniform vec2 u_resolution;
uniform float u_time;
uniform vec2 u_mouse;

varying vec2 v_uv;


vec2 random2(vec2 p) {
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}


void main() {
    vec2 st = v_uv;
    vec3 color = vec3(.0);
    st *= 3.;

    vec2 i_st = floor(st);//整数
    vec2 f_st = fract(st);//小数表示为网格内的每个像素点

    vec2 point = random2(i_st);//随机点
    vec2 diff = point - f_st;

    float dist = length(diff);
    color += dist;
    //计算网格内的每个像素点到随机点的距离

    // Draw cell center
    color += 1. - step(.02, dist);

    // Draw grid
    color.r += step(.98, f_st.x) + step(.98, f_st.y);

    // Show isolines
    // color -= step(.7,abs(sin(27.0*dist)))*.5;

    gl_FragColor = vec4(color, 1.0);
}
