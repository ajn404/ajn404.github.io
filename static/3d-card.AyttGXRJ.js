import{j as r}from"./jsx-runtime.C6v7sNnU.js";import{c as h}from"./utils.ZJ_V-BP8.js";import{r as c}from"./index.A1bncjHG.js";import"./_sentry-release-injection-file.DwF5PoZy.js";import{D as N}from"./Datetime.B0GzfbaY.js";import"./_commonjsHelpers.g73XWfsI.js";(function(){try{var t=typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{},n=new t.Error().stack;n&&(t._sentryDebugIds=t._sentryDebugIds||{},t._sentryDebugIds[n]="c06fe025-a65c-4fb7-9e93-e5a70a3769e5",t._sentryDebugIdIdentifier="sentry-dbid-c06fe025-a65c-4fb7-9e93-e5a70a3769e5")}catch{}})();const M=c.createContext(void 0),$=({children:t,className:n,containerClassName:l})=>{const e=c.useRef(null),[i,a]=c.useState(!1),u=s=>{if(!e.current)return;const{left:m,top:y,width:v,height:j}=e.current.getBoundingClientRect(),w=(s.clientX-m-v/2)/25,b=(s.clientY-y-j/2)/25;e.current.style.transform=`rotateY(${w}deg) rotateX(${b}deg)`},d=s=>{a(!0),e.current},g=s=>{e.current&&(a(!1),e.current.style.transform="rotateY(0deg) rotateX(0deg)")},p=s=>{a(!0),e.current},o=s=>{if(!e.current)return;const m=s.touches[0],{left:y,top:v,width:j,height:w}=e.current.getBoundingClientRect(),b=(m.clientX-y-j/2)/25,E=(m.clientY-v-w/2)/25;e.current.style.transform=`rotateY(${b}deg) rotateX(${E}deg)`},f=s=>{e.current&&(a(!1),e.current.style.transform="rotateY(0deg) rotateX(0deg)")};return r.jsx(M.Provider,{value:[i,a],children:r.jsx("div",{className:h("py-20 inline-flex items-center justify-center mx-auto",l),style:{perspective:"1000px"},children:r.jsx("div",{ref:e,onMouseEnter:d,onMouseMove:u,onMouseLeave:g,onTouchStart:p,onTouchMove:o,onTouchEnd:f,className:h("flex items-center justify-center relative transition-all duration-200 ease-linear",n),style:{transformStyle:"preserve-3d"},children:t})})})},C=({children:t,className:n})=>r.jsx("div",{className:h("h-96 w-96 [transform-style:preserve-3d]  [&>*]:[transform-style:preserve-3d]",n),children:t}),x=({as:t="div",children:n,className:l,translateX:e=0,translateY:i=0,translateZ:a=0,rotateX:u=0,rotateY:d=0,rotateZ:g=0,...p})=>{const o=c.useRef(null),[f]=X();c.useEffect(()=>{s()},[f]);const s=()=>{o.current&&(f?o.current.style.transform=`translateX(${e}px) translateY(${i}px) translateZ(${a}px) rotateX(${u}deg) rotateY(${d}deg) rotateZ(${g}deg)`:o.current.style.transform="translateX(0px) translateY(0px) translateZ(0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg)")};return r.jsx(t,{ref:o,className:h("w-fit transition duration-200 ease-linear",l),...p,children:n})},X=()=>{const t=c.useContext(M);if(t===void 0)throw new Error("useMouseEnter must be used within a MouseEnterProvider");return t},T=({href:t,frontmatter:n,secHeading:l=!0})=>{const{title:e,pubDatetime:i,description:a,ogImage:u}=n,d=Math.floor(Math.random()*20)+1;return r.jsx($,{className:"inter-var",children:r.jsxs(C,{className:`w-auto sm:w-[30rem] h-auto rounded-xl p-6   highlight highlight-variant-${d} after:bg-gradient-to-tr after:from-[rgb(111,93,193,0.8)]  after:to-[rgb(47,111,123,0.8)]`,children:[r.jsx(x,{translateZ:"50",className:"text-xl font-bold text-neutral-600 dark:text-white",children:e}),r.jsx(x,{as:"p",translateZ:"60",className:"text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300",children:a}),r.jsx(x,{translateZ:"100",className:"w-full mt-4",children:r.jsx("img",{src:u||"/assets/ajn404.jpeg",className:"h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl",alt:"thumbnail"})}),r.jsxs("div",{className:"flex justify-between items-center mt-20",children:[r.jsx(N,{className:"w-3/4",datetime:i}),r.jsx(x,{translateZ:20,as:"a",href:t,target:"__blank",className:"px-4 py-2 rounded-xl text-xs font-normal text-white",children:"跳转 →"})]})]})})};export{T as default};
//# sourceMappingURL=3d-card.AyttGXRJ.js.map