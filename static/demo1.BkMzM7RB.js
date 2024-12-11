import{j as u}from"./jsx-runtime.HYuwRzq_.js";import{r as o}from"./index.BhghmTrL.js";import{C as p,u as g,b as h}from"./react-three-fiber.esm.CtDp9Qp7.js";import{P as x,S as w,V as v}from"./three.module.Ddm6rSpf.js";import{S as y}from"./slider.BxhtgeYH.js";import{c as b}from"./utils.DQrwH-VZ.js";import{u as _}from"./index.ByhpNys3.js";import"./_sentry-release-injection-file.MMOF6ud2.js";import"./_commonjsHelpers.DBhTrWiD.js";import"./index.CffJsrlH.js";import"./index.DwgqzPh9.js";import"./index.B6ScjF2H.js";import"./index.CONJJmuK.js";import"./index.Bogizp-M.js";import"./index.CBUlQxnV.js";import"./index.CWqNWUSp.js";(function(){try{var n=typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{},i=new n.Error().stack;i&&(n._sentryDebugIds=n._sentryDebugIds||{},n._sentryDebugIds[i]="2570a013-7072-40af-970d-0574b7181586",n._sentryDebugIdIdentifier="sentry-dbid-2570a013-7072-40af-970d-0574b7181586")}catch{}})();const E=({mouse:n,vertexShader:i,fragmentShader:l})=>{const c=o.useMemo(()=>new x(2,2),[]),m=o.useRef(null),{size:e,gl:r}=g(),s=o.useMemo(()=>new w({vertexShader:i,fragmentShader:l,uniforms:{u_time:{value:0},u_resolution:{value:new v},u_mouse:{value:new v}}}),[i,l]);return o.useEffect(()=>()=>{s.dispose(),c.dispose()},[s,c]),o.useEffect(()=>{const t=window.devicePixelRatio||2;r.setPixelRatio(t),r.setSize(e.width,e.height),s.uniforms.u_resolution.value.set(e.width,e.height)},[e.width,e.height,r,s]),h(({clock:t})=>{s.uniforms.u_time.value=t.getElapsedTime(),s.uniforms.u_mouse.value.set(n.x,n.y)}),o.useEffect(()=>{const t=r.domElement,d=f=>{f.preventDefault(),console.log("WebGL context lost. Attempting to restore...")},a=()=>{console.log("WebGL context restored"),r.setPixelRatio(window.devicePixelRatio||2),r.setSize(e.width,e.height),s.uniforms.u_resolution.value.set(e.width,e.height)};return t.addEventListener("webglcontextlost",d),t.addEventListener("webglcontextrestored",a),()=>{t.removeEventListener("webglcontextlost",d),t.removeEventListener("webglcontextrestored",a)}},[r,e,s]),o.useEffect(()=>{m.current&&(m.current.position.z=0)},[]),u.jsx("mesh",{ref:m,material:s,geometry:c})},A=({vertexShader:n=`
    uniform vec2 u_resolution;
    varying vec2 v_uv;

    void main() {
      v_uv = (position.xy + 1.0) / 2.0; // Convert coordinates to [0, 1] range
      gl_Position = vec4(position, 1.0);
    }
  `,width:i="20",height:l="20"})=>{const[c,m]=o.useState({x:0,y:0}),e=o.useRef(null),[r,s]=o.useState(10),t=_(r,300);o.useEffect(()=>{const a=f=>{m({x:f.clientX,y:f.clientY})};return e.current?.addEventListener("mousemove",a),()=>{e.current?.removeEventListener("mousemove",a)}},[]);const d=o.useMemo(()=>`
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
    `,[t]);return u.jsxs("div",{className:"flex flex-col items-center justify-center my-4",children:[u.jsxs(p,{dpr:[1,2],className:"m-auto",gl:{antialias:!1},camera:{position:[0,0,15],fov:17.5,near:1,far:20},style:{width:`${i}vw`,height:`${l}vw`},ref:e,children:[u.jsx("color",{attach:"background",args:["black"]}),u.jsx(E,{mouse:c,vertexShader:n,fragmentShader:d})]}),u.jsx("code",{children:`gl_FragColor = vec4(vec3(fract(d * ${t})), 1.0);`}),u.jsx(y,{defaultValue:[30],max:100,min:5,step:1,className:b("w-[50%] m-4"),onValueChange:a=>s(a[0]),value:[r]})]})};export{A as default};
//# sourceMappingURL=demo1.BkMzM7RB.js.map
