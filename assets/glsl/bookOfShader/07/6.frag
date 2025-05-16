varying vec2 v_uv;
uniform float u_time;
uniform vec2 u_mouse;

float circle(in vec2 _st,in float _radius){
    vec2 dist = _st-vec2(0.5);
    return 1.-smoothstep(
        _radius-_radius*0.01,
        _radius+_radius*0.01,
        dot(dist,dist)*4.);
}

void main(){
    vec2 st  = v_uv;

    vec3 color = vec3(circle(st,0.9));

    gl_FragColor = vec4(color,1.0);
}