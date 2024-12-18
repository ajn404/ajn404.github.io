import{j as r}from"./jsx-runtime.C6v7sNnU.js";import{r as d}from"./index.A1bncjHG.js";import c from"./index.B0NFdE7O.js";import"./_sentry-release-injection-file.DwF5PoZy.js";import"./_commonjsHelpers.g73XWfsI.js";import"./preload-helper.CSvDiOMA.js";/* empty css                       */import"./react-icons.esm.BYAXBCkL.js";import"./createLucideIcon.eeyzEiwb.js";(function(){try{var e=typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{},i=new e.Error().stack;i&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[i]="a2d020ca-5d16-41df-a21d-f40c999f7221",e._sentryDebugIdIdentifier="sentry-dbid-a2d020ca-5d16-41df-a21d-f40c999f7221")}catch{}})();const m=`
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
`,b=({vertexShader:e=m,fragmentShader:i=f})=>{const n=d.useCallback(o=>{let t;o.preload=()=>{};const a=()=>{o.createCanvas(o.windowWidth/2,240,o.WEBGL),t=o.createShader(e,i),o.frameRate(120)},s=()=>{if(!t){t=o.createShader(e,i);return}o.background(0),o.shader(t),t.setUniform("u_resolution",[o.width,o.height]),t.setUniform("u_mouse",[o.mouseX,o.mouseY]),t.setUniform("u_time",o.frameCount/40),o.rect(-o.width/2,-o.height/2,o.width,o.height)},u=()=>{o.resizeCanvas(o.windowWidth/2,240)};o.setup=a,o.draw=s,o.windowResized=u},[e,i]);return r.jsx(r.Fragment,{children:r.jsx(c,{sketch:n})})};export{b as default};
//# sourceMappingURL=index.CiJmhXFh.js.map
