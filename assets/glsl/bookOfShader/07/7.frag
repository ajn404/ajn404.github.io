
varying vec2 v_uv;
uniform vec2 u_resolution;

void main(){
    vec2 st = v_uv;
    st.x *= u_resolution.x/u_resolution.y;
    vec3 color = vec3(0.0);
    float d = 0.0;
    st = st*2.-1.;
    d = length(abs(st)-0.3);
    gl_FragColor = vec4(vec3(fract(d*10.0)),1.0);
}