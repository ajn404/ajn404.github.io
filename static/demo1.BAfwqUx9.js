import{j as u}from"./jsx-runtime.CuL11LcY.js";import{r as o}from"./index.DGhcy5yT.js";import{C as g,u as p,b as h}from"./react-three-fiber.esm.BpzeIxP_.js";import{P as x,S as w,V as v}from"./three.module.CLLF8inD.js";import{S as b}from"./slider.C4x8GgoV.js";import{c as y}from"./utils.DUwhPGmT.js";import{u as _}from"./index.C5v3dL1t.js";import"./_sentry-release-injection-file.LPfR-_S-.js";import"./_commonjsHelpers.DFB_zks4.js";import"./index.Cf1thC6Z.js";import"./index.C7Mxd2Kk.js";import"./index.DFmoD254.js";import"./index.CzvXAXhw.js";import"./index.C38bFQrl.js";import"./index.Cnw40_lh.js";(function(){try{var r=typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{},i=new Error().stack;i&&(r._sentryDebugIds=r._sentryDebugIds||{},r._sentryDebugIds[i]="49d51930-afb8-468b-9cd2-c6aea513caf0",r._sentryDebugIdIdentifier="sentry-dbid-49d51930-afb8-468b-9cd2-c6aea513caf0")}catch{}})();const E=({mouse:r,vertexShader:i,fragmentShader:c})=>{const l=o.useMemo(()=>new x(2,2),[]),d=o.useRef(null),{size:e,gl:n}=p(),s=o.useMemo(()=>new w({vertexShader:i,fragmentShader:c,uniforms:{u_time:{value:0},u_resolution:{value:new v},u_mouse:{value:new v}}}),[i,c]);return o.useEffect(()=>()=>{s.dispose(),l.dispose()},[s,l]),o.useEffect(()=>{const t=window.devicePixelRatio||2;n.setPixelRatio(t),n.setSize(e.width,e.height),s.uniforms.u_resolution.value.set(e.width,e.height)},[e.width,e.height,n,s]),h(({clock:t})=>{s.uniforms.u_time.value=t.getElapsedTime(),s.uniforms.u_mouse.value.set(r.x,r.y)}),o.useEffect(()=>{const t=n.domElement,m=f=>{f.preventDefault(),console.log("WebGL context lost. Attempting to restore...")},a=()=>{console.log("WebGL context restored"),n.setPixelRatio(window.devicePixelRatio||2),n.setSize(e.width,e.height),s.uniforms.u_resolution.value.set(e.width,e.height)};return t.addEventListener("webglcontextlost",m),t.addEventListener("webglcontextrestored",a),()=>{t.removeEventListener("webglcontextlost",m),t.removeEventListener("webglcontextrestored",a)}},[n,e,s]),o.useEffect(()=>{d.current&&(d.current.position.z=0)},[]),u.jsx("mesh",{ref:d,material:s,geometry:l})},N=({vertexShader:r=`
    uniform vec2 u_resolution;
    varying vec2 v_uv;

    void main() {
      v_uv = (position.xy + 1.0) / 2.0; // Convert coordinates to [0, 1] range
      gl_Position = vec4(position, 1.0);
    }
  `,width:i="20",height:c="20"})=>{const[l,d]=o.useState({x:0,y:0}),e=o.useRef(null),[n,s]=o.useState(10),t=_(n,300);o.useEffect(()=>{const a=f=>{d({x:f.clientX,y:f.clientY})};return e.current?.addEventListener("mousemove",a),()=>{e.current?.removeEventListener("mousemove",a)}},[]);const m=o.useMemo(()=>`
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
    `,[t]);return u.jsxs("div",{className:"flex flex-col items-center justify-center my-4",children:[u.jsxs(g,{dpr:[1,2],className:"m-auto",gl:{antialias:!1},camera:{position:[0,0,15],fov:17.5,near:1,far:20},style:{width:`${i}vw`,height:`${c}vw`},ref:e,children:[u.jsx("color",{attach:"background",args:["black"]}),u.jsx(E,{mouse:l,vertexShader:r,fragmentShader:m})]}),u.jsx("code",{children:`gl_FragColor = vec4(vec3(fract(d * ${t})), 1.0);`}),u.jsx(b,{defaultValue:[30],max:100,min:5,step:1,className:y("w-[50%] m-4"),onValueChange:a=>s(a[0]),value:[n]})]})};export{N as default};
//# sourceMappingURL=demo1.BAfwqUx9.js.map
