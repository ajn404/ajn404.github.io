import{_ as i}from"./preload-helper.hlDPvxQM.js";import{j as c}from"./jsx-runtime.eyAvPMM5.js";import{r as t}from"./index.-CUiy3Z4.js";import"./_commonjsHelpers.4gQjN7DL.js";const u=()=>{let[o]=t.useState(` @grid: 18 / 50vmin / #0a0c27;
      --hue: calc(180 + 1.5 * @x * @y);
      background: hsl(var(--hue), 50%, 70%);
      margin: -.5px;
      transition: @r(.5s) ease;
      clip-path: polygon(@pick(
        '0 0, 100% 0, 100% 100%',
        '0 0, 100% 0, 0 100%',
        '0 0, 100% 100%, 0 100%',
        '100% 0, 100% 100%, 0 100%'
      ));
   `),[r,e]=t.useState(!1);const s=()=>{e(a=>!a)};return t.useEffect(()=>{i(()=>import("./css-doodle.min.JHzAfktI.js"),__vite__mapDeps([])).then(()=>{e(!0)})}),r&&c.jsx("css-doodle",{onClick:s,children:o})};export{u as default};
function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = []
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}
