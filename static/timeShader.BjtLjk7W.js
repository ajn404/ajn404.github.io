import{j as t}from"./jsx-runtime.CuL11LcY.js";import{r as n}from"./index.DGhcy5yT.js";import{e as a,C as c,b as m,u as v}from"./react-three-fiber.esm.BpzeIxP_.js";import"./_sentry-release-injection-file.LPfR-_S-.js";import{s as d}from"./shaderMaterial.Bmb2csUD.js";import"./_commonjsHelpers.DFB_zks4.js";import"./three.module.CLLF8inD.js";(function(){try{var e=typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{},i=new Error().stack;i&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[i]="9e17d9f3-64da-4637-9968-715bc183a401",e._sentryDebugIdIdentifier="sentry-dbid-9e17d9f3-64da-4637-9968-715bc183a401")}catch{}})();const o=d({time:0},`varying vec2 vUv;
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
    }`);a({TimeShaderMaterial:o});function l(){const e=n.useRef();m((r,s,u)=>{e.current.time+=s});const{viewport:i}=v();return t.jsxs("mesh",{scale:[i.width,i.height,1],children:[t.jsx("planeGeometry",{}),t.jsx("timeShaderMaterial",{ref:e},o.key)]})}function w(){return t.jsx(c,{className:"max-w-[100%]",style:{width:"500px",height:"416px",margin:"auto"},camera:{position:[0,0,2],fov:50},children:t.jsx(l,{})})}export{w as default};
//# sourceMappingURL=timeShader.BjtLjk7W.js.map
