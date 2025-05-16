#define moblur 4
#define harmonic 25
#define triangle 1 // comment this line out for only square


uniform vec2 u_resolution;
uniform float u_time;
uniform int u_frame;
uniform vec3 u_color;     // 控制颜色
varying vec2 v_uv;

//这个函数用于绘制一个带有边界的圆形
vec3 circle(vec2 uv, float rr, float cc, float ss) {
    uv *= mat2(cc, ss, -ss, cc);
    if(rr < 0.)
        uv.y = -uv.y;
    rr = abs(rr);
    float r = length(uv) - rr;
    float pix = fwidth(r);
    float c = smoothstep(0., pix, abs(r));
    float l = smoothstep(0., pix, abs(uv.x) + step(uv.y, 0.) + step(rr, uv.y));
    return vec3(c, c * l, c * l);
}
vec3 ima(vec2 uv, float th0) {
    vec3 col = vec3(1.0);
    vec2 uv0 = uv;
    th0 -= max(0., uv0.x - 1.5) * 2.;
    th0 -= max(0., uv0.y - 1.5) * 2.;
#ifndef triangle
    float lerpy = 1.;
#else
    float lerpy = smoothstep(-0.6, 0.2, cos(th0 * 0.1));
#endif


    for(int i = 1; i < harmonic; i += 2) {
        float th = th0 * float(i);
        float fl = mod(float(i), 4.) - 2.;// used to be repeated assignment fl=-fl, but compiler bugs. :(
        float cc = cos(th) * fl, ss = sin(th);
        float trir = -fl / float(i * i);
        float sqrr = 1. / float(i);
        float rr = mix(trir, sqrr, lerpy);
        col = min(col, circle(uv, rr, cc, ss));
        uv.x += rr * ss;
        uv.y -= rr * cc;
    }
    float pix = fwidth(uv0.x);
    if(uv.y > 0. && fract(uv0.y * 10.) < 0.5)
        col.yz = min(col.yz, smoothstep(0., pix, abs(uv.x)));
    if(uv.x > 0. && fract(uv0.x * 10.) < 0.5)
        col.yz = min(col.yz, smoothstep(0., pix, abs(uv.y)));
    if(uv0.x >= 1.5)
        col.xy = vec2(smoothstep(0., fwidth(uv.y), abs(uv.y)));
    if(uv0.y >= 1.5)
        col.xy = vec2(smoothstep(0., fwidth(uv.x), abs(uv.x)));

    // 添加颜色变化
    col = mix(col, u_color, 1.0 - col.r);

    // 添加光晕效果
    float glow = exp(-length(uv0) * 2.0);
    col += u_color * glow * 0.5;

    return col;
}
void mainImage(out vec4 fragColor, in vec2 fragCoord) {
    vec2 uv = v_uv;
    uv.y = 1. - uv.y;
    uv *= 5.;
    uv -= 1.5;
    float th0 = u_time * 2.;
    float dt = 2. / 60. / float(moblur);
    vec3 col = vec3(0.);
    for(int mb = 0; mb < moblur; ++mb) {
        col += ima(uv, th0);
        th0 += dt;
    }
    col = pow(col * (1. / float(moblur)), vec3(1. / 2.2));

    // 添加色彩调整
    col = mix(col, col.gbr, sin(u_time * 0.5) * 0.5 + 0.5);

    fragColor = vec4(col, 1.);
}

void main(){
    mainImage(gl_FragColor, gl_FragCoord.xy);
}