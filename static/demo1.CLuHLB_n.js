import{j as u}from"./jsx-runtime.C6v7sNnU.js";import{r as o}from"./index.A1bncjHG.js";import{C as g,u as p,b as h}from"./react-three-fiber.esm.YAT8fgpv.js";import{P as x,S as b,V as v}from"./three.module.AgaRJhWa.js";import{S as w}from"./slider.DNztCqvC.js";import{c as y}from"./utils.ZJ_V-BP8.js";import{u as _}from"./index.1gP8PJiE.js";import"./_sentry-release-injection-file.DwF5PoZy.js";import"./_commonjsHelpers.g73XWfsI.js";import"./index.CTam5Opi.js";import"./index.BZ012Z6J.js";import"./index.BUvKg88E.js";import"./index.B-Olwami.js";import"./index.CXL6VmG4.js";import"./index.BU6eJ7BP.js";(function(){try{var n=typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{},i=new n.Error().stack;i&&(n._sentryDebugIds=n._sentryDebugIds||{},n._sentryDebugIds[i]="b95c9fbc-b5f8-4bce-a7d2-57c644aceff3",n._sentryDebugIdIdentifier="sentry-dbid-b95c9fbc-b5f8-4bce-a7d2-57c644aceff3")}catch{}})();const E=({mouse:n,vertexShader:i,fragmentShader:c})=>{const l=o.useMemo(()=>new x(2,2),[]),m=o.useRef(null),{size:e,gl:r}=p(),s=o.useMemo(()=>new b({vertexShader:i,fragmentShader:c,uniforms:{u_time:{value:0},u_resolution:{value:new v},u_mouse:{value:new v}}}),[i,c]);return o.useEffect(()=>()=>{s.dispose(),l.dispose()},[s,l]),o.useEffect(()=>{const t=window.devicePixelRatio||2;r.setPixelRatio(t),r.setSize(e.width,e.height),s.uniforms.u_resolution.value.set(e.width,e.height)},[e.width,e.height,r,s]),h(({clock:t})=>{s.uniforms.u_time.value=t.getElapsedTime(),s.uniforms.u_mouse.value.set(n.x,n.y)}),o.useEffect(()=>{const t=r.domElement,d=f=>{f.preventDefault(),console.log("WebGL context lost. Attempting to restore...")},a=()=>{console.log("WebGL context restored"),r.setPixelRatio(window.devicePixelRatio||2),r.setSize(e.width,e.height),s.uniforms.u_resolution.value.set(e.width,e.height)};return t.addEventListener("webglcontextlost",d),t.addEventListener("webglcontextrestored",a),()=>{t.removeEventListener("webglcontextlost",d),t.removeEventListener("webglcontextrestored",a)}},[r,e,s]),o.useEffect(()=>{m.current&&(m.current.position.z=0)},[]),u.jsx("mesh",{ref:m,material:s,geometry:l})},N=({vertexShader:n=`
    uniform vec2 u_resolution;
    varying vec2 v_uv;

    void main() {
      v_uv = (position.xy + 1.0) / 2.0; // Convert coordinates to [0, 1] range
      gl_Position = vec4(position, 1.0);
    }
  `,width:i="20",height:c="20"})=>{const[l,m]=o.useState({x:0,y:0}),e=o.useRef(null),[r,s]=o.useState(10),t=_(r,300);o.useEffect(()=>{const a=f=>{m({x:f.clientX,y:f.clientY})};return e.current?.addEventListener("mousemove",a),()=>{e.current?.removeEventListener("mousemove",a)}},[]);const d=o.useMemo(()=>`
      varying vec2 v_uv;
      uniform vec2 u_resolution;

      void main() {
        vec2 st = v_uv;
        st.x *= u_resolution.x / u_resolution.y;
        vec3 color = vec3(0.0);
        float d = 0.0;
        st = st * 2.0 - 1.0;
        d = length(abs(st) - 0.3);
        gl_FragColor = vec4(vec3(fract(d * ${t}.)), 1.0);
      }
    `,[t]);return u.jsxs("div",{className:"flex flex-col items-center justify-center my-4",children:[u.jsxs(g,{dpr:[1,2],className:"m-auto",gl:{antialias:!1},camera:{position:[0,0,15],fov:17.5,near:1,far:20},style:{width:`${i}vw`,height:`${c}vw`},ref:e,children:[u.jsx("color",{attach:"background",args:["black"]}),u.jsx(E,{mouse:l,vertexShader:n,fragmentShader:d})]}),u.jsx("code",{children:`gl_FragColor = vec4(vec3(fract(d * ${t})), 1.0);`}),u.jsx(w,{defaultValue:[30],max:100,min:5,step:1,className:y("w-[50%] m-4"),onValueChange:a=>s(a[0]),value:[r]})]})};export{N as default};
//# sourceMappingURL=demo1.CLuHLB_n.js.map
