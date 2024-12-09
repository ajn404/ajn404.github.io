import{j as t}from"./jsx-runtime.A2Jwhp3O.js";import{r as n}from"./index.dFUwPPDs.js";import{e as a,C as c,b as m,u as v}from"./react-three-fiber.esm.DdQiZQSM.js";import"./_sentry-release-injection-file.YJMKEV6W.js";import{s as d}from"./shaderMaterial.VeeJRrdn.js";import"./_commonjsHelpers.CZeiIxrb.js";import"./three.module.Ddm6rSpf.js";(function(){try{var e=typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{},i=new e.Error().stack;i&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[i]="ba767d78-10fe-40cd-8606-b25fa0c107c5",e._sentryDebugIdIdentifier="sentry-dbid-ba767d78-10fe-40cd-8606-b25fa0c107c5")}catch{}})();const o=d({time:0},`varying vec2 vUv;
      void main() {
        vec4 modelPosition = modelMatrix * vec4(position, 1.0);
        vec4 viewPosition = viewMatrix * modelPosition;
        vec4 projectionPosition = projectionMatrix * viewPosition;
        gl_Position = projectionPosition;
        vUv = uv;
      }`,`uniform float time;
    varying vec2 vUv;
    void main() {
      vec2 uv = vUv;
      vec4 tl = vec4((cos(time)+1.)/2.,0.,0.,(sin(time)+1.)/2.);
    vec4 tr = vec4(0.,0.,(sin(time)+1.)/2.,(cos(time)+1.)/2.);
    vec4 bl = vec4(0.,(cos(time)+1.)/2.,(sin(time)+1.)/2.,1.);
    vec4 br = vec4((sin(time)+1.)/2.,1.,0.,(cos(time)+1.)/2.);
    vec4 color = mix(mix(tl,tr,uv.x),mix(bl,br,uv.x),uv.y);
    gl_FragColor = color;
    }`);a({TimeShaderMaterial:o});function l(){const e=n.useRef();m((r,s,f)=>{e.current.time+=s});const{viewport:i}=v();return t.jsxs("mesh",{scale:[i.width,i.height,1],children:[t.jsx("planeGeometry",{}),t.jsx("timeShaderMaterial",{ref:e},o.key)]})}function w(){return t.jsx(c,{className:"max-w-[100%]",style:{width:"500px",height:"416px",margin:"auto"},camera:{position:[0,0,2],fov:50},children:t.jsx(l,{})})}export{w as default};
//# sourceMappingURL=timeShader.BqLF1OO6.js.map
