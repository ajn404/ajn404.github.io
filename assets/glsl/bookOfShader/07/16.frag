#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359

uniform vec2 u_resolution;
uniform float u_time;
varying vec2 v_uv;

mat2 scale2d(vec2 _scale) {
    return mat2(_scale.x, 0.0, 0.0, _scale.y);
}

float box(in vec2 _st, in vec2 _size) {
    _size = vec2(0.5) - _size * 0.5;
    vec2 uv = smoothstep(_size, _size + vec2(0.001), _st);
    uv *= smoothstep(_size, _size + vec2(0.001), vec2(1.0) - _st);
    return uv.x * uv.y;
}

float cross_fun(in vec2 _st, float _size) {
    return box(_st, vec2(_size, _size / 4.)) +
        box(_st, vec2(_size / 4., _size));
}

void main() {
    vec2 st = v_uv;
    vec3 color = vec3(0.0);

    st -= vec2(0.5);
    st = scale2d(vec2(sin(u_time))) * st;
    st += vec2(0.5);

    // Show the coordinates of the space on the background
    color = vec3(st.x,st.y,0.0);

    // Add the shape on the foreground
    color += vec3(cross_fun(st, 0.2));

    gl_FragColor = vec4(color, 1.0);
}
