import{j as o}from"./jsx-runtime.BlJElA5X.js";import{r as t}from"./index.KNIQqnlE.js";import{C as s}from"./react-three-fiber.esm.DXOLdOrB.js";import{S as n}from"./three.module.BN9nGcjX.js";import"./_sentry-release-injection-file.b82t1l8g.js";import"./_commonjsHelpers.DWWLd87L.js";(function(){try{var e=typeof window<"u"?window:typeof global<"u"?global:typeof globalThis<"u"?globalThis:typeof self<"u"?self:{},r=new e.Error().stack;r&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[r]="731e87b1-eb68-431e-a60d-ee9f7d702dd0",e._sentryDebugIdIdentifier="sentry-dbid-731e87b1-eb68-431e-a60d-ee9f7d702dd0")}catch{}})();const i=`
  void main() {
    gl_Position = vec4(position, 1.0);
  }
`,d=`
  void main() {
    gl_FragColor = vec4(gl_FragCoord.x / 800.0, gl_FragCoord.y / 600.0, 0.5, 1.0);
  }
`,a=()=>{const e=t.useRef(null),r=new n({vertexShader:i,fragmentShader:d});return o.jsx("mesh",{ref:e,material:r,children:o.jsx("boxGeometry",{args:[1,1,1]})})},c=()=>o.jsxs(s,{children:[o.jsx("ambientLight",{}),o.jsx("pointLight",{position:[10,10,10]}),o.jsx(a,{})]});export{c as default};
//# sourceMappingURL=index.CFS_1NRa.js.map
