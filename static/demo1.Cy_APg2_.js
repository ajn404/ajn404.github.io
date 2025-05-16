import{j as u}from"./jsx-runtime.DZ3s2XAB.js";import{r as o}from"./index.D4IXJ7me.js";import{C as g,u as p,b as h}from"./react-three-fiber.esm.DyszzK9N.js";import{P as x,S as b,V as v}from"./three.module.BN9nGcjX.js";import{S as w}from"./slider.UtFttJc2.js";import{c as y}from"./utils.CQ2vwKer.js";import{u as _}from"./index.BS-qR_3E.js";import"./_sentry-release-injection-file.B-UwqLso.js";import"./_commonjsHelpers.DqoTaOmB.js";import"./index.DSKVgZYz.js";import"./index.Dgakj2qx.js";import"./index.CEsCW6vM.js";import"./index.D4qPoAuk.js";import"./index.DB_Y-4NU.js";import"./index.8q4ZzGYF.js";(function(){try{var n=typeof window<"u"?window:typeof global<"u"?global:typeof globalThis<"u"?globalThis:typeof self<"u"?self:{},i=new n.Error().stack;i&&(n._sentryDebugIds=n._sentryDebugIds||{},n._sentryDebugIds[i]="7d8ef818-4b54-44d2-a845-24e59da09bc6",n._sentryDebugIdIdentifier="sentry-dbid-7d8ef818-4b54-44d2-a845-24e59da09bc6")}catch{}})();const E=({mouse:n,vertexShader:i,fragmentShader:l})=>{const c=o.useMemo(()=>new x(2,2),[]),d=o.useRef(null),{size:e,gl:r}=p(),s=o.useMemo(()=>new b({vertexShader:i,fragmentShader:l,uniforms:{u_time:{value:0},u_resolution:{value:new v},u_mouse:{value:new v}}}),[i,l]);return o.useEffect(()=>()=>{s.dispose(),c.dispose()},[s,c]),o.useEffect(()=>{const t=window.devicePixelRatio||2;r.setPixelRatio(t),r.setSize(e.width,e.height),s.uniforms.u_resolution.value.set(e.width,e.height)},[e.width,e.height,r,s]),h(({clock:t})=>{s.uniforms.u_time.value=t.getElapsedTime(),s.uniforms.u_mouse.value.set(n.x,n.y)}),o.useEffect(()=>{const t=r.domElement,m=f=>{f.preventDefault(),console.log("WebGL context lost. Attempting to restore...")},a=()=>{console.log("WebGL context restored"),r.setPixelRatio(window.devicePixelRatio||2),r.setSize(e.width,e.height),s.uniforms.u_resolution.value.set(e.width,e.height)};return t.addEventListener("webglcontextlost",m),t.addEventListener("webglcontextrestored",a),()=>{t.removeEventListener("webglcontextlost",m),t.removeEventListener("webglcontextrestored",a)}},[r,e,s]),o.useEffect(()=>{d.current&&(d.current.position.z=0)},[]),u.jsx("mesh",{ref:d,material:s,geometry:c})},G=({vertexShader:n=`
    uniform vec2 u_resolution;
    varying vec2 v_uv;

    void main() {
      v_uv = (position.xy + 1.0) / 2.0; // Convert coordinates to [0, 1] range
      gl_Position = vec4(position, 1.0);
    }
  `,width:i="20",height:l="20"})=>{const[c,d]=o.useState({x:0,y:0}),e=o.useRef(null),[r,s]=o.useState(10),t=_(r,300);o.useEffect(()=>{const a=f=>{d({x:f.clientX,y:f.clientY})};return e.current?.addEventListener("mousemove",a),()=>{e.current?.removeEventListener("mousemove",a)}},[]);const m=o.useMemo(()=>`
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
    `,[t]);return u.jsxs("div",{className:"flex flex-col items-center justify-center my-4",children:[u.jsxs(g,{dpr:[1,2],className:"m-auto",gl:{antialias:!1},camera:{position:[0,0,15],fov:17.5,near:1,far:20},style:{width:`${i}vw`,height:`${l}vw`},ref:e,children:[u.jsx("color",{attach:"background",args:["black"]}),u.jsx(E,{mouse:c,vertexShader:n,fragmentShader:m})]}),u.jsx("code",{children:`gl_FragColor = vec4(vec3(fract(d * ${t})), 1.0);`}),u.jsx(w,{defaultValue:[30],max:100,min:5,step:1,className:y("w-[50%] m-4"),onValueChange:a=>s(a[0]),value:[r]})]})};export{G as default};
//# sourceMappingURL=demo1.Cy_APg2_.js.map
