uniform vec2 u_resolution;
uniform float u_time;
varying vec2 v_uv;

float circle(in vec2 _st, in float _radius) {
    vec2 l = _st - vec2(0.5);
    return 1. - smoothstep(_radius - (_radius * 0.01), _radius + (_radius * 0.01), dot(l, l) * 4.0);
}

vec2 tile(vec2 _st, float rows, float cols) {
    _st *= vec2(cols, rows);
    return fract(_st);
}

float box(in vec2 _st, in vec2 _size) {
    _size = vec2(0.5) - _size * 0.5;
    vec2 uv = smoothstep(_size, _size + vec2(0.001), _st);
    uv *= smoothstep(_size, _size + vec2(0.001), vec2(1.0) - _st);
    return uv.x * uv.y;
}

float cross_fun(in vec2 _st, float _size) {
    // 将坐标系统旋转45度
    vec2 st = _st;
    float angle = radians(45.0);
    st = mat2(cos(angle), -sin(angle),
              sin(angle), cos(angle)) * (st - 0.5) + 0.5;
              
    return box(st, vec2(_size, _size / 4.)) +
           box(st, vec2(_size / 4., _size));
}



void main() {
    vec2 st = v_uv;
    vec3 color = vec3(0.0);
    
    vec2 orig_st = st;
    
    st = tile(st, 3.0, 3.0);
    
    float c = circle(st, 0.4);
    float x = cross_fun(st, 0.6);
    
    bool isTopLeft = orig_st.x < 1./3. && orig_st.y > 2./3.;
    bool isCenter = orig_st.x > 1./3. && orig_st.x < 2./3. && orig_st.y > 1./3. && orig_st.y < 2./3.;
    bool isBottomRight = orig_st.x > 2./3. && orig_st.y < 1./3.;
    
    float shape = (isTopLeft || isCenter || isBottomRight) ? x : c;
    
    vec2 grid = step(vec2(0.98), st) + step(vec2(0.98), 1.0 - st);
    float gridLines = max(grid.x, grid.y);
    
    color = vec3(shape);
    color = mix(color, vec3(1.0), gridLines);

    gl_FragColor = vec4(color, 1.0);
}
