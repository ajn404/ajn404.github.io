import{j as o}from"./jsx-runtime.DZ3s2XAB.js";import{r as t}from"./index.D4IXJ7me.js";import{C as s}from"./react-three-fiber.esm.DyszzK9N.js";import{S as n}from"./three.module.BN9nGcjX.js";import"./_sentry-release-injection-file.B-UwqLso.js";import"./_commonjsHelpers.DqoTaOmB.js";(function(){try{var e=typeof window<"u"?window:typeof global<"u"?global:typeof globalThis<"u"?globalThis:typeof self<"u"?self:{},r=new e.Error().stack;r&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[r]="bfada3f4-2066-4444-97f0-b759f8600c80",e._sentryDebugIdIdentifier="sentry-dbid-bfada3f4-2066-4444-97f0-b759f8600c80")}catch{}})();const i=`
  void main() {
    gl_Position = vec4(position, 1.0);
  }
`,a=`
  void main() {
    gl_FragColor = vec4(gl_FragCoord.x / 800.0, gl_FragCoord.y / 600.0, 0.5, 1.0);
  }
`,d=()=>{const e=t.useRef(null),r=new n({vertexShader:i,fragmentShader:a});return o.jsx("mesh",{ref:e,material:r,children:o.jsx("boxGeometry",{args:[1,1,1]})})},b=()=>o.jsxs(s,{children:[o.jsx("ambientLight",{}),o.jsx("pointLight",{position:[10,10,10]}),o.jsx(d,{})]});export{b as default};
//# sourceMappingURL=index.DMlLMJNB.js.map
