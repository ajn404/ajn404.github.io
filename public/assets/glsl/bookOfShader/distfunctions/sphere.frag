varying vec3 v_uv;
uniform float u_time;

float sdSphere(vec3 p, float s) {
    return length(p) - s;
}
void main() {
    float dist = sdSphere(v_uv, sin(u_time) * 0.5 + 0.5);
    gl_FragColor = mix(
        vec4(1.0, 0.0, 0.0, 1.0),
        vec4(0.0, 0.0, 0.0, 1.0),
        smoothstep(0.1, 0.5, dist)
    );
}