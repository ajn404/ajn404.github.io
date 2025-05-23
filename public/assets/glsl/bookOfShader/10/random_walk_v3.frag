// Author @patriciogv - 2015
// Title: Truchet - 10 print

#ifdef GL_ES
precision highp float;
#endif

#define PI 3.14159265358979323846

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

varying vec2 v_uv;


float random(in vec2 _st) {
    return fract(sin(dot(_st.xy, vec2(12.9898, 78.233))) *
        43758.5453123);
}

vec2 truchetPattern(in vec2 _st, in float _index) {
    _index = fract(((_index - 0.5) * 2.0));
    if(_index > 0.75) {
        _st = vec2(1.0) - _st;
    } else if(_index > 0.5) {
        _st = vec2(1.0 - _st.x, _st.y);
    } else if(_index > 0.25) {
        _st = 1.0 - vec2(1.0 - _st.x, _st.y);
    }
    return _st;
}

void main() {
    vec2 st = v_uv;
    st *= 10.0;
    // st = (st-vec2(5.0))*(abs(sin(u_time*0.2))*5.);
    // st.x += u_time*3.0;

    vec2 ipos = floor(st);  // integer
    vec2 fpos = fract(st);  // fraction

    vec2 tile = truchetPattern(fpos, random(ipos));

    float color = 0.0;


    // Truchet (2 triangles)
    color = step(tile.x,tile.y);

    gl_FragColor = vec4(vec3(color), 1.0);
}
