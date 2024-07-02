import{_ as a}from"./preload-helper.hlDPvxQM.js";import{j as e}from"./jsx-runtime.eyAvPMM5.js";import{g as i}from"./index.35H_NU9g.js";import{r as n}from"./index.-CUiy3Z4.js";import"./_commonjsHelpers.4gQjN7DL.js";const g=()=>{const r=["color-warm-frame","color-spring-warmth","color-night-fade"];return n.useEffect(()=>{a(()=>import("./ScrollTrigger.PsUwhSWY.js"),__vite__mapDeps([])).then(o=>{const t=o.default;i.registerPlugin(t),i.to(`.${r[r.length-1]}`,{x:"40vmin",duration:3,rotation:360,scrollTrigger:{trigger:`.${r[r.length-1]}`,start:"top center",end:"top 100px",scrub:!0,id:"box3"}});const s=i.to(`.${r[0]}`,{x:"40vmin",rotation:360,duration:3});t.create({trigger:`.${r[0]}`,animation:s,start:"top 500px",end:"top 50px",scrub:!0,id:"box1"})})}),e.jsx("div",{children:e.jsx("ul",{className:"grid grid-cols-1 gap-5",children:r.map((o,t)=>e.jsxs("li",{className:`flex min-h-[40vmin] max-w-[40vmin] items-center justify-center rounded-md transition-all hover:scale-105 ${o}`,children:["box",t+1]},t))})})};export{g as default};
function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = []
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}
