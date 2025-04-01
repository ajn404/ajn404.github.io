import{j as r}from"./jsx-runtime.CuL11LcY.js";import{r as t}from"./index.DGhcy5yT.js";import{C as s}from"./react-three-fiber.esm.BpzeIxP_.js";import{S as a}from"./three.module.CLLF8inD.js";import"./_sentry-release-injection-file.LPfR-_S-.js";import"./_commonjsHelpers.DFB_zks4.js";(function(){try{var e=typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{},o=new Error().stack;o&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[o]="cbba1a4c-ee60-4bc0-afeb-a6a090de2f42",e._sentryDebugIdIdentifier="sentry-dbid-cbba1a4c-ee60-4bc0-afeb-a6a090de2f42")}catch{}})();const n=`
  void main() {
    gl_Position = vec4(position, 1.0);
  }
`,i=`
  void main() {
    gl_FragColor = vec4(gl_FragCoord.x / 800.0, gl_FragCoord.y / 600.0, 0.5, 1.0);
  }
`,d=()=>{const e=t.useRef(null),o=new a({vertexShader:n,fragmentShader:i});return r.jsx("mesh",{ref:e,material:o,children:r.jsx("boxGeometry",{args:[1,1,1]})})},u=()=>r.jsxs(s,{children:[r.jsx("ambientLight",{}),r.jsx("pointLight",{position:[10,10,10]}),r.jsx(d,{})]});export{u as default};
//# sourceMappingURL=index.C2I6DD63.js.map
