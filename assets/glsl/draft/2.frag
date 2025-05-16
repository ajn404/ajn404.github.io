#ifdef GL_ES
precision highp float;
#endif

#define PI 3.141592653589793
#define HALF_PI 1.5707963267948966

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float cubicIn(float t) {
  return t * t * t;
}

void main() {
    vec3 colorA = vec3(0.149,0.141,0.912);
    vec3 colorB = vec3(1.000,0.833,0.224);

    float t = u_time*0.5;
    float pct = cubicIn( abs(fract(t)*2.0-1.) );

    gl_FragColor = vec4(vec3(mix(colorA, colorB, pct)),1.0);
}
