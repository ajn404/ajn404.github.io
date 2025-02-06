import{j as o}from"./jsx-runtime.CxCZCP1r.js";import{r as t}from"./index.Dr01XSYZ.js";import{C as s}from"./react-three-fiber.esm.BnelCREW.js";import{S as n}from"./three.module.BBI0Ls2A.js";import"./_sentry-release-injection-file.DBVj9-TS.js";import"./_commonjsHelpers.CiKuKuYW.js";(function(){try{var e=typeof window<"u"?window:typeof global<"u"?global:typeof globalThis<"u"?globalThis:typeof self<"u"?self:{},r=new e.Error().stack;r&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[r]="9a119546-d9e4-4e6d-9245-b60149c90a8f",e._sentryDebugIdIdentifier="sentry-dbid-9a119546-d9e4-4e6d-9245-b60149c90a8f")}catch{}})();const i=`
  void main() {
    gl_Position = vec4(position, 1.0);
  }
`,a=`
  void main() {
    gl_FragColor = vec4(gl_FragCoord.x / 800.0, gl_FragCoord.y / 600.0, 0.5, 1.0);
  }
`,d=()=>{const e=t.useRef(null),r=new n({vertexShader:i,fragmentShader:a});return o.jsx("mesh",{ref:e,material:r,children:o.jsx("boxGeometry",{args:[1,1,1]})})},b=()=>o.jsxs(s,{children:[o.jsx("ambientLight",{}),o.jsx("pointLight",{position:[10,10,10]}),o.jsx(d,{})]});export{b as default};
//# sourceMappingURL=index.Cfb6myv4.js.map
