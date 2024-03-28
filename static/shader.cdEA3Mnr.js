import{j as e}from"./jsx-runtime.eyAvPMM5.js";import{r as s}from"./index.-CUiy3Z4.js";import{s as c,e as l,V as n,C as u,u as p,b as m}from"./shaderMaterial.huxFqsw4.js";import{e as d}from"./easing-18d5168d.esm.TxAgmdoj.js";import"./_commonjsHelpers.4gQjN7DL.js";import"./extends.dGVwEr9R.js";const a=c({time:0,resolution:new n,pointer:new n},`
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
      }`);l({WaveMaterial:a});function f(){const i=s.useRef(),{viewport:o,size:t}=p();return m((v,r)=>{i.current.time+=r,d.damp3(i.current.pointer,v.pointer,.2,r)}),e.jsxs("mesh",{scale:[o.width,o.height,1],children:[e.jsx("planeGeometry",{}),e.jsx("waveMaterial",{ref:i,resolution:[t.width*o.dpr,t.height*o.dpr]},a.key)]})}function P(){return e.jsx(u,{style:{height:"300px",margin:"auto"},children:e.jsx(f,{})})}export{P as default};
