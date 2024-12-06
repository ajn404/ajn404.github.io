import{j as r}from"./jsx-runtime.FSheFbns.js";import{r as t}from"./index.C_R3-YKG.js";import{C as s}from"./react-three-fiber.esm.CAXsAetI.js";import{S as n}from"./three.module.Ddm6rSpf.js";import"./_sentry-release-injection-file.DGvnCq9K.js";import"./_commonjsHelpers.CCocDEcR.js";(function(){try{var e=typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{},o=new e.Error().stack;o&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[o]="7400572c-e4e9-427f-abe5-8e0e283cc072",e._sentryDebugIdIdentifier="sentry-dbid-7400572c-e4e9-427f-abe5-8e0e283cc072")}catch{}})();const i=`
  void main() {
    gl_Position = vec4(position, 1.0);
  }
`,a=`
  void main() {
    gl_FragColor = vec4(gl_FragCoord.x / 800.0, gl_FragCoord.y / 600.0, 0.5, 1.0);
  }
`,d=()=>{const e=t.useRef(null),o=new n({vertexShader:i,fragmentShader:a});return r.jsx("mesh",{ref:e,material:o,children:r.jsx("boxGeometry",{args:[1,1,1]})})},x=()=>r.jsxs(s,{children:[r.jsx("ambientLight",{}),r.jsx("pointLight",{position:[10,10,10]}),r.jsx(d,{})]});export{x as default};
//# sourceMappingURL=index.DM0Qgkaz.js.map
