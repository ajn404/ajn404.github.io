import{j as o}from"./jsx-runtime.Br6NZf7z.js";import{r as t}from"./index.CoDvW3iS.js";import{C as s}from"./react-three-fiber.esm.DVKcpZbW.js";import{S as n}from"./three.module.CNaziSk3.js";import"./_sentry-release-injection-file.DXPJa_4z.js";import"./_commonjsHelpers.B9f9TEuB.js";(function(){try{var e=typeof window<"u"?window:typeof global<"u"?global:typeof globalThis<"u"?globalThis:typeof self<"u"?self:{},r=new e.Error().stack;r&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[r]="be0ec6f9-4bc6-409a-81bc-2e5247bc78e2",e._sentryDebugIdIdentifier="sentry-dbid-be0ec6f9-4bc6-409a-81bc-2e5247bc78e2")}catch{}})();const i=`
  void main() {
    gl_Position = vec4(position, 1.0);
  }
`,a=`
  void main() {
    gl_FragColor = vec4(gl_FragCoord.x / 800.0, gl_FragCoord.y / 600.0, 0.5, 1.0);
  }
`,d=()=>{const e=t.useRef(null),r=new n({vertexShader:i,fragmentShader:a});return o.jsx("mesh",{ref:e,material:r,children:o.jsx("boxGeometry",{args:[1,1,1]})})},u=()=>o.jsxs(s,{children:[o.jsx("ambientLight",{}),o.jsx("pointLight",{position:[10,10,10]}),o.jsx(d,{})]});export{u as default};
//# sourceMappingURL=index.Dun5UYxz.js.map
