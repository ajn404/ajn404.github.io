import{j as r}from"./jsx-runtime.BlJElA5X.js";import{r as d}from"./index.KNIQqnlE.js";import c from"./index.MQZJjy8e.js";import"./_sentry-release-injection-file.b82t1l8g.js";import"./_commonjsHelpers.DWWLd87L.js";import"./preload-helper.CLGjVpZq.js";/* empty css                       */import"./react-icons.esm.DQLo3Xml.js";import"./createLucideIcon.C5mtGDfT.js";(function(){try{var e=typeof window<"u"?window:typeof global<"u"?global:typeof globalThis<"u"?globalThis:typeof self<"u"?self:{},t=new e.Error().stack;t&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[t]="9b9cdc41-9455-44b4-a053-220f333bda8d",e._sentryDebugIdIdentifier="sentry-dbid-9b9cdc41-9455-44b4-a053-220f333bda8d")}catch{}})();const m=`
precision highp float;
uniform mat4 uModelViewMatrix;
uniform mat4 uProjectionMatrix;
uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

attribute vec3 aPosition;
attribute vec2 aTexCoord;
varying vec2 vTexCoord;

void main() {
  vTexCoord = aTexCoord;
  vec4 positionVec4 = vec4(aPosition, 1.0);
  gl_Position = uProjectionMatrix * uModelViewMatrix * positionVec4;
}
`,f=`
precision highp float;

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution;
  float color = 0.5 + 0.5 * sin(u_time + uv.x * 10.0);
  vec3 dynamicColor = vec3(color, 0.5, 1.0 - color);
  gl_FragColor = vec4(dynamicColor, 1.0);
}
`,C=({vertexShader:e=m,fragmentShader:t=f})=>{const n=d.useCallback(o=>{let i;o.preload=()=>{};const a=()=>{o.createCanvas(o.windowWidth/2,240,o.WEBGL),i=o.createShader(e,t),o.frameRate(120)},s=()=>{if(!i){i=o.createShader(e,t);return}o.background(0),o.shader(i),i.setUniform("u_resolution",[o.width,o.height]),i.setUniform("u_mouse",[o.mouseX,o.mouseY]),i.setUniform("u_time",o.frameCount/40),o.rect(-o.width/2,-o.height/2,o.width,o.height)},u=()=>{o.resizeCanvas(o.windowWidth/2,240)};o.setup=a,o.draw=s,o.windowResized=u},[e,t]);return r.jsx(r.Fragment,{children:r.jsx(c,{sketch:n})})};export{C as default};
//# sourceMappingURL=index.BFX1Yr8-.js.map
