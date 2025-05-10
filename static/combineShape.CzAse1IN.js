import{j as i}from"./jsx-runtime.BlJElA5X.js";import r from"./index.MQZJjy8e.js";import{r as n}from"./index.KNIQqnlE.js";import"./_sentry-release-injection-file.b82t1l8g.js";import"./preload-helper.CLGjVpZq.js";/* empty css                       */import"./react-icons.esm.DQLo3Xml.js";import"./createLucideIcon.C5mtGDfT.js";import"./_commonjsHelpers.DWWLd87L.js";(function(){try{var t=typeof window<"u"?window:typeof global<"u"?global:typeof globalThis<"u"?globalThis:typeof self<"u"?self:{},e=new t.Error().stack;e&&(t._sentryDebugIds=t._sentryDebugIds||{},t._sentryDebugIds[e]="0539bdb0-6924-44be-a823-df60f90eb31c",t._sentryDebugIdIdentifier="sentry-dbid-0539bdb0-6924-44be-a823-df60f90eb31c")}catch{}})();const a=`
#ifdef GL_ES
precision highp float;
precision highp int;
#endif

attribute vec3 aPosition;
uniform mat4 uModelViewMatrix;
uniform mat4 uProjectionMatrix;
uniform mat3 uNormalMatrix;

void main() {
    gl_Position = uProjectionMatrix * uModelViewMatrix * vec4(aPosition, 1.0);
}`,s=`
#ifdef GL_ES
precision highp float;
#endif

#define PI 3.141592653589793238

uniform vec2 res;
uniform float time;

// Signed distance function for an octahedron


float opSmoothUnion( float d1, float d2, float k )
{
    float h = clamp( 0.5 + 0.5*(d2-d1)/k, 0.0, 1.0 );
    return mix( d2, d1, h ) - k*h*(1.0-h);
}


float sdOctahedron(vec3 p, float s) {
    p = abs(p);
    float m = p.x + p.y + p.z - s;
    vec3 q;
    if (3.0 * p.x < m) q = p.xyz;
    else if (3.0 * p.y < m) q = p.yzx;
    else if (3.0 * p.z < m) q = p.zxy;
    else return m * 0.57735027; // 0.57735027 is approximately 1/sqrt(3)
    
    float k = clamp(0.5 * (q.z - q.y + s), 0.0, s);
    return length(vec3(q.x, q.y - s + k, q.z - k));
}

// Signed distance function for a sphere
float sdSphere(vec3 p, float s) {
    return length(p) - s;
}

float SDF(vec3 p) {
  float d = -sin(time * PI / 3.0) * 0.125 + 0.25; 
  return opSmoothUnion(sdOctahedron(p - vec3(d, 0.0, 0.0), 0.2), sdSphere(p + vec3(d, 0.0, 0.0), 0.1), 0.2);
}

void main(void) {
    float minSide = min(res.x, res.y);
    vec2 crd = (gl_FragCoord.xy - res * 0.5) / minSide;
    
    // Compute distance from the fragment to the shapes
    float d = SDF(vec3(crd, 0.0));
    vec3 color = vec3(d);

    // Mix the color based on the distance to the shapes
    color = mix(color, vec3(1.0, 0.0, 0.0), 1.0 - smoothstep(0.0, 1.0 / minSide, abs(d)));
    
    gl_FragColor = vec4(color, 1.0);
}`,b=()=>{const t=n.useCallback(e=>{let o;e.setup=()=>{e.pixelDensity(1),e.createCanvas(e.windowWidth/2,500,e.WEBGL),e.noStroke(),e.fill(1),o=e.createShader(a,s),e.shader(o),e.frameRate(120)},e.draw=()=>{e.background(0),o.setUniform("res",[e.width,e.height]),o.setUniform("time",e.frameCount/120),e.translate(-e.width/2,-e.height/2),e.rect(0,0,e.width,e.height)},e.windowResized=()=>{e.resizeCanvas(e.windowWidth/2,500)}},[]);return i.jsx(r,{sketch:t,showControls:!0})};export{b as default};
//# sourceMappingURL=combineShape.CzAse1IN.js.map
