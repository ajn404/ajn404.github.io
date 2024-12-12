uniform vec2 u_resolution;
uniform float u_time; // 时间变量
varying vec2 v_uv;

float rand(float co){
    return fract(sin(co) * 43758.5453123);
}

void main() {

    vec2 st = v_uv;

    float f = fract(st.x);
    float i = floor(st.x);

    float u = f * f * (3.0 - 2.0 * f); // custom cubic curve
    float y = mix(rand(i), rand(i + 1.0), u); // using it in the interpolation

    
    gl_FragColor = vec4(y, 0.0, 0.0, 1.0); // 设置颜色为红色
}