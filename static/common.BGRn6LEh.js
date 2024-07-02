import{_ as u}from"./preload-helper.hlDPvxQM.js";import{j as t}from"./jsx-runtime.eyAvPMM5.js";import{r as o}from"./index.-CUiy3Z4.js";import"./_commonjsHelpers.4gQjN7DL.js";const f=({children:r,download:s,grid:l})=>{let d=r.props.value,e=o.useRef(null),[n,a]=o.useState(!1);o.useEffect(()=>{u(()=>import("./css-doodle.min.JHzAfktI.js"),__vite__mapDeps([])).then(()=>{a(!0)})});const i=()=>{e.current&&e.current.export({scale:8,download:!0})};return t.jsxs("div",{children:[n&&t.jsx("css-doodle",{style:{cursor:"none"},ref:e,grid:l?.toString(),"click-to-update":!0,children:d}),s&&t.jsx("button",{className:"text-l w-[50vmin] pt-1 text-skin-base hover:drop-shadow-md",onClick:i,children:"下载"})]})};export{f as default};
function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = []
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}
