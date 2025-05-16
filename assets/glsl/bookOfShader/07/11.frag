uniform vec2 u_resolution;
uniform float u_time;

varying vec2 v_uv;

void main(){
    vec2 uv  = v_uv;
    vec3 color = vec3(0.0);
    vec2 pos= vec2(0.5)- uv;
    float d = length(pos);
    float r = d*2.0;
    float a = atan(pos.y,pos.x);
    float f = cos(a*4.0+u_time);
    color = vec3(1.0 - smoothstep(f, f+0.01, r));
    gl_FragColor = vec4(color, 1.0);
}