import{j as t}from"./jsx-runtime.C6v7sNnU.js";import{r as n}from"./index.A1bncjHG.js";import{e as a,C as c,b as m,u as v}from"./react-three-fiber.esm.YAT8fgpv.js";import"./_sentry-release-injection-file.DwF5PoZy.js";import{s as d}from"./shaderMaterial.ILM-x0wr.js";import"./_commonjsHelpers.g73XWfsI.js";import"./three.module.AgaRJhWa.js";(function(){try{var e=typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{},i=new e.Error().stack;i&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[i]="100f7a95-f970-45f2-a7e1-270785e46d5c",e._sentryDebugIdIdentifier="sentry-dbid-100f7a95-f970-45f2-a7e1-270785e46d5c")}catch{}})();const o=d({time:0},`varying vec2 vUv;
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
//# sourceMappingURL=timeShader.CM4Kv3pN.js.map
