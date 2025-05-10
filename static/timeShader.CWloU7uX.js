import{j as t}from"./jsx-runtime.BlJElA5X.js";import{r as a}from"./index.KNIQqnlE.js";import{e as n,C as m,b as c,u as v}from"./react-three-fiber.esm.DXOLdOrB.js";import"./_sentry-release-injection-file.b82t1l8g.js";import{s as d}from"./shaderMaterial.CxB1mKoW.js";import"./_commonjsHelpers.DWWLd87L.js";import"./three.module.BN9nGcjX.js";(function(){try{var e=typeof window<"u"?window:typeof global<"u"?global:typeof globalThis<"u"?globalThis:typeof self<"u"?self:{},i=new e.Error().stack;i&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[i]="0f11d87a-7078-4b17-a024-14aff9fd78f2",e._sentryDebugIdIdentifier="sentry-dbid-0f11d87a-7078-4b17-a024-14aff9fd78f2")}catch{}})();const o=d({time:0},`varying vec2 vUv;
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
    }`);n({TimeShaderMaterial:o});function f(){const e=a.useRef();c((r,s,l)=>{e.current.time+=s});const{viewport:i}=v();return t.jsxs("mesh",{scale:[i.width,i.height,1],children:[t.jsx("planeGeometry",{}),t.jsx("timeShaderMaterial",{ref:e},o.key)]})}function w(){return t.jsx(m,{className:"max-w-[100%]",style:{width:"500px",height:"416px",margin:"auto"},camera:{position:[0,0,2],fov:50},children:t.jsx(f,{})})}export{w as default};
//# sourceMappingURL=timeShader.CWloU7uX.js.map
