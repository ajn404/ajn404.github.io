import{j as r}from"./jsx-runtime.C6v7sNnU.js";import{r as t}from"./index.A1bncjHG.js";import{C as s}from"./react-three-fiber.esm.YAT8fgpv.js";import{S as a}from"./three.module.AgaRJhWa.js";import"./_sentry-release-injection-file.DwF5PoZy.js";import"./_commonjsHelpers.g73XWfsI.js";(function(){try{var e=typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{},o=new e.Error().stack;o&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[o]="34bfaa58-895c-4c76-b89a-c05cd21aed83",e._sentryDebugIdIdentifier="sentry-dbid-34bfaa58-895c-4c76-b89a-c05cd21aed83")}catch{}})();const n=`
  void main() {
    gl_Position = vec4(position, 1.0);
  }
`,i=`
  void main() {
    gl_FragColor = vec4(gl_FragCoord.x / 800.0, gl_FragCoord.y / 600.0, 0.5, 1.0);
  }
`,d=()=>{const e=t.useRef(null),o=new a({vertexShader:n,fragmentShader:i});return r.jsx("mesh",{ref:e,material:o,children:r.jsx("boxGeometry",{args:[1,1,1]})})},b=()=>r.jsxs(s,{children:[r.jsx("ambientLight",{}),r.jsx("pointLight",{position:[10,10,10]}),r.jsx(d,{})]});export{b as default};
//# sourceMappingURL=index.BzSQoyp4.js.map
