import{j as r}from"./jsx-runtime.HYuwRzq_.js";import{r as c}from"./index.BhghmTrL.js";import d from"./index.DxNuBiDR.js";import"./_sentry-release-injection-file.MMOF6ud2.js";import"./_commonjsHelpers.DBhTrWiD.js";import"./preload-helper.FHr_ZLuP.js";/* empty css                       */import"./react-icons.esm.ClOtR-Dm.js";import"./createLucideIcon.CKyh-KVx.js";(function(){try{var e=typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{},i=new e.Error().stack;i&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[i]="84b3edce-00fc-4292-948b-bf5a4caac978",e._sentryDebugIdIdentifier="sentry-dbid-84b3edce-00fc-4292-948b-bf5a4caac978")}catch{}})();const m=`
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
`,C=({vertexShader:e=m,fragmentShader:i=f})=>{const n=c.useCallback(o=>{let t;o.preload=()=>{};const a=()=>{o.createCanvas(o.windowWidth/2,240,o.WEBGL),t=o.createShader(e,i),o.frameRate(120)},s=()=>{if(!t){t=o.createShader(e,i);return}o.background(0),o.shader(t),t.setUniform("u_resolution",[o.width,o.height]),t.setUniform("u_mouse",[o.mouseX,o.mouseY]),t.setUniform("u_time",o.frameCount/40),o.rect(-o.width/2,-o.height/2,o.width,o.height)},u=()=>{o.resizeCanvas(o.windowWidth/2,240)};o.setup=a,o.draw=s,o.windowResized=u},[e,i]);return r.jsx(r.Fragment,{children:r.jsx(d,{sketch:n})})};export{C as default};
//# sourceMappingURL=index.BZEoO1r8.js.map
