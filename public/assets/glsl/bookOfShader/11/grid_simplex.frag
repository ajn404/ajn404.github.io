#ifdef GL_ES
precision highp float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

varying vec2 v_uv;

vec2 skew(vec2 st) {
    vec2 r = vec2(0.0);
    r.x = 1.1547 * st.x;
    r.y = st.y + 0.5 * r.x;
    return r;
}

vec3 simplexGrid(vec2 st) {
    vec3 xyz = vec3(0.0);

    vec2 p = fract(skew(st));
    if(p.x > p.y) {
        xyz.xy = 1.0 - vec2(p.x, p.y - p.x);
        xyz.z = p.y;
    } else {
        xyz.yz = 1.0 - vec2(p.x - p.y, p.y);
        xyz.x = p.x;
    }

    return fract(xyz);
}

void main() {
    vec2 st = v_uv;
    vec3 color = vec3(0.0);

    st *= 10.;

    color = simplexGrid(st);

    gl_FragColor = vec4(color, 1.0);
}
