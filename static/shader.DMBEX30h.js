import{j as t}from"./jsx-runtime.DZ3s2XAB.js";import{r as v}from"./index.D4IXJ7me.js";import{e as c,C as l,u as d,b as u}from"./react-three-fiber.esm.DyszzK9N.js";import{V as n}from"./three.module.BN9nGcjX.js";import"./_sentry-release-injection-file.B-UwqLso.js";import{s as p}from"./shaderMaterial.CxB1mKoW.js";import{e as f}from"./easing-0f4db1c0.esm.ChcYbd4l.js";import"./_commonjsHelpers.DqoTaOmB.js";(function(){try{var e=typeof window<"u"?window:typeof global<"u"?global:typeof globalThis<"u"?globalThis:typeof self<"u"?self:{},o=new e.Error().stack;o&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[o]="0bf1712b-68b7-4821-be6b-e986e5732942",e._sentryDebugIdIdentifier="sentry-dbid-0bf1712b-68b7-4821-be6b-e986e5732942")}catch{}})();const s=p({time:0,resolution:new n,pointer:new n},`
      varying vec2 vUv;
      void main() {
        vec4 modelPosition = modelMatrix * vec4(position, 1.0);
        vec4 viewPosition = viewMatrix * modelPosition;
        vec4 projectionPosition = projectionMatrix * viewPosition;
        gl_Position = projectionPosition;
        vUv = uv;
      }`,`
      uniform float time;
      uniform vec2 resolution;
      uniform vec2 pointer;
      varying vec2 vUv;      

      vec3 palette(float t) {
        vec3 a = vec3(0.5, 0.5, 0.5);
        vec3 b = vec3(0.5, 0.5, 0.5);
        vec3 c = vec3(1.0, 1.0, 1.0);
        vec3 d = vec3(0.263, 0.416, 0.557);
        return a + b * cos(6.28318 * (c * t + d));
      }

      void main() {
        vec2 uv = (gl_FragCoord.xy * 2.0 - resolution.xy) / resolution.y;      
        vec2 uv0 = uv;
        vec3 finalColor = vec3(0.0);
        uv = fract(uv * 1.5) - 0.5;     
        uv = sin(uv * 0.5) - pointer;     
        float d = length(uv) * exp(-length(uv0));
        vec3 col = palette(length(uv0) + time * 0.4);
        d = sin(d * 8.0 + time) / 8.0;
        d = abs(d);
        d = pow(0.02 / d, 2.0);
        finalColor += col * d;
        gl_FragColor = vec4(finalColor, 1.0);   
      }`);c({WaveMaterial:s});function m(){const e=v.useRef(),{viewport:o,size:i}=d();return u((a,r)=>{e.current.time+=r,f.damp3(e.current.pointer,a.pointer,.2,r)}),t.jsxs("mesh",{scale:[o.width,o.height,1],children:[t.jsx("planeGeometry",{}),t.jsx("waveMaterial",{ref:e,resolution:[i.width*o.dpr,i.height*o.dpr]},s.key)]})}function C(){return t.jsx(l,{style:{height:"300px",margin:"auto"},children:t.jsx(m,{})})}export{C as default};
//# sourceMappingURL=shader.DMBEX30h.js.map
