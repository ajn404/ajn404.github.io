import{j as t}from"./jsx-runtime.OHnxCjeH.js";import{r as n}from"./index.xZRu5XGr.js";import{e as a,C as c,b as m,u as v}from"./react-three-fiber.esm.CY8g7tVo.js";import"./_sentry-release-injection-file.CB6rd3Pg.js";import{s as d}from"./shaderMaterial.CplTYKpd.js";import"./_commonjsHelpers.CapIYjSr.js";import"./three.module.BJMOHD3u.js";(function(){try{var e=typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{},i=new e.Error().stack;i&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[i]="ef18e2b8-be25-468a-8e17-748a0710c6bf",e._sentryDebugIdIdentifier="sentry-dbid-ef18e2b8-be25-468a-8e17-748a0710c6bf")}catch{}})();const o=d({time:0},`varying vec2 vUv;
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
//# sourceMappingURL=timeShader.By2LYRMH.js.map
