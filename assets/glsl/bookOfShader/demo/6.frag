varying vec2 v_uv;

uniform float u_time;
uniform vec2 u_mouse;


float circle(in vec2 _st, in float _radius, in vec2 _center) {
    vec2 dist = _st - _center;
    return 1.0 - step(_radius, length(dist)); // 0 代表在圆外，1 代表在圆内
}

// ... 其他代码保持不变
vec2 tile(vec2 _st, float _zoom) {
    _st *= _zoom;
    return fract(_st);
}


void main() {
    vec2 st = v_uv;
    // st = tile(st, abs(sin(u_time)*5.)+2.);
    st = tile(st, 5.);
    float radius = smoothstep( -1.,1. , sin(u_time*5.))+0.5;

    float circle1 = circle(st, radius, vec2(0.5));
    float circle2 = circle(st, radius, vec2(0.0, 0.0));
    float circle3 = circle(st, radius, vec2(1.0, 0.0));
    float circle4 = circle(st, radius, vec2(1.0, 1.0));
    float circle5 = circle(st, radius, vec2(0.0, 1.0));


    float combinedCircle = 0.;
    if(max(circle2, max(circle3, max(circle4, circle5))) == 1.0 && circle1 == 1.0) {
        combinedCircle = 1.0;
    }

    combinedCircle = abs(sin(combinedCircle));

    vec3 color = vec3(combinedCircle);

    gl_FragColor = vec4(color, 1.0);
}