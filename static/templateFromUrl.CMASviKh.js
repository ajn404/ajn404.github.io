import{j as p}from"./jsx-runtime.C6v7sNnU.js";import{r as t}from"./index.A1bncjHG.js";import{C,u as I,b as L}from"./react-three-fiber.esm.YAT8fgpv.js";import{P as j,V as E,S as M,T as R,C as S}from"./three.module.AgaRJhWa.js";import"./_sentry-release-injection-file.DwF5PoZy.js";import"./_commonjsHelpers.g73XWfsI.js";(function(){try{var s=typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{},n=new s.Error().stack;n&&(s._sentryDebugIds=s._sentryDebugIds||{},s._sentryDebugIds[n]="ee291bf6-c9fa-4519-b1da-2a9609040713",s._sentryDebugIdIdentifier="sentry-dbid-ee291bf6-c9fa-4519-b1da-2a9609040713")}catch{}})();const T=({mouse:s,vertexShader:n,fragmentShader:c,texturePaths:u})=>{const l=t.useMemo(()=>new j(2,2),[]),r=t.useMemo(()=>{const a={u_time:{value:0},u_resolution:{value:new E},u_mouse:{value:new E}};return u.forEach((g,d)=>{a[`u_texture${d}`]={value:null}}),new M({vertexShader:n,fragmentShader:c,uniforms:a})},[n,c,u]),{size:f,gl:x}=I();return t.useEffect(()=>{r.uniforms.u_resolution.value.set(f.width,f.height);const a=new R;return u.forEach((g,d)=>{a.load(g,m=>{m.wrapS=S,m.wrapT=S,r.uniforms[`u_texture${d}`].value=m})}),()=>{r.dispose(),l.dispose()}},[f,r,u,l]),L(({clock:a})=>{r.uniforms.u_time.value=a.getElapsedTime(),r.uniforms.u_mouse.value.set(s.x,s.y)}),p.jsx("mesh",{geometry:l,material:r})},F=({vertexShaderPath:s="/assets/glsl/all.vert",fragmentShaderPath:n="/assets/glsl/draft/1.frag",width:c="45",height:u="45",imgPaths:l=""})=>{const[r,f]=t.useState({vertexShader:"",fragmentShader:""}),[x,a]=t.useState({x:0,y:0}),[g,d]=t.useState(!1),[m,b]=t.useState(!0),i=t.useRef(null),_=t.useMemo(()=>l.split(",").map(e=>e.trim()),[l]),y=t.useCallback(async()=>{try{b(!0);const[e,o]=await Promise.all([fetch(s),fetch(n)]);if(!e.ok||!o.ok)throw new Error("Failed to load shaders.");const[v,w]=await Promise.all([e.text(),o.text()]);f({vertexShader:v,fragmentShader:w})}catch(e){console.error("Error loading shaders:",e)}finally{b(!1)}},[s,n]);t.useEffect(()=>{y()},[y]);const h=t.useCallback(e=>{if(!i.current)return;const o=i.current.getBoundingClientRect(),v="clientX"in e?e.clientX:e.touches[0]?.clientX,w="clientY"in e?e.clientY:e.touches[0]?.clientY;a({x:(v-o.left)/o.width,y:1-(w-o.top)/o.height})},[i]);return t.useEffect(()=>{const e=i.current;return e&&(e.addEventListener("mousemove",h),e.addEventListener("touchmove",h)),()=>{e&&(e.removeEventListener("mousemove",h),e.removeEventListener("touchmove",h))}},[h]),t.useEffect(()=>{const e=new IntersectionObserver(([o])=>d(o.isIntersecting),{threshold:.1});return i.current&&e.observe(i.current),()=>e.disconnect()},[]),p.jsx("div",{ref:i,style:{width:`${c}vw`,height:`${u}vw`,margin:"2rem auto",boxShadow:"rgba(200, 211, 211, 0.2) 0px 7px 29px 0px",cursor:"pointer"},children:m||!g?p.jsx("div",{className:"flex justify-center items-center h-full",children:"Loading..."}):p.jsx(C,{dpr:[1,2],camera:{position:[0,0,1],fov:45},gl:{antialias:!0,powerPreference:"high-performance",alpha:!1},className:"w-full h-full",children:p.jsx(T,{mouse:x,vertexShader:r.vertexShader,fragmentShader:r.fragmentShader,texturePaths:_})})})};export{F as default};
//# sourceMappingURL=templateFromUrl.CMASviKh.js.map