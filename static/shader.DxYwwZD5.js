import{j as t}from"./jsx-runtime.A2Jwhp3O.js";import{r as v}from"./index.dFUwPPDs.js";import{e as c,C as d,u as l,b as u}from"./react-three-fiber.esm.DdQiZQSM.js";import{V as n}from"./three.module.Ddm6rSpf.js";import"./_sentry-release-injection-file.YJMKEV6W.js";import{s as f}from"./shaderMaterial.VeeJRrdn.js";import{e as p}from"./easing-0f4db1c0.esm.C9kIR-LB.js";import"./_commonjsHelpers.CZeiIxrb.js";(function(){try{var e=typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{},o=new e.Error().stack;o&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[o]="921d79c0-4ffb-41d1-8a3d-65489254f820",e._sentryDebugIdIdentifier="sentry-dbid-921d79c0-4ffb-41d1-8a3d-65489254f820")}catch{}})();const s=f({time:0,resolution:new n,pointer:new n},`
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
      }`);c({WaveMaterial:s});function m(){const e=v.useRef(),{viewport:o,size:i}=l();return u((a,r)=>{e.current.time+=r,p.damp3(e.current.pointer,a.pointer,.2,r)}),t.jsxs("mesh",{scale:[o.width,o.height,1],children:[t.jsx("planeGeometry",{}),t.jsx("waveMaterial",{ref:e,resolution:[i.width*o.dpr,i.height*o.dpr]},s.key)]})}function C(){return t.jsx(d,{style:{height:"300px",margin:"auto"},children:t.jsx(m,{})})}export{C as default};
//# sourceMappingURL=shader.DxYwwZD5.js.map
