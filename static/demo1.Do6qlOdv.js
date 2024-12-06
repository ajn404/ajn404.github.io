import{j as s}from"./jsx-runtime.FSheFbns.js";import{r as o}from"./index.C_R3-YKG.js";import{C as p,u as h,b as g}from"./react-three-fiber.esm.CAXsAetI.js";import{S as b,V as f}from"./three.module.Ddm6rSpf.js";import{S as x}from"./slider.TEeSUCTg.js";import{c as y}from"./utils.C3_730Cl.js";import{u as _}from"./index.J0guJX7P.js";import"./_sentry-release-injection-file.DGvnCq9K.js";import"./_commonjsHelpers.CCocDEcR.js";import"./index.B7Tfcwu0.js";import"./index.Bv4g6pFZ.js";import"./index.Dp5pie5I.js";import"./index.CK4PwTkQ.js";import"./index.D5zSx_pH.js";import"./index.DlcDr_9B.js";import"./index.DpDUzMex.js";(function(){try{var e=typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{},r=new e.Error().stack;r&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[r]="dec837d2-be5f-4a23-9064-0fdb6fb5bb6c",e._sentryDebugIdIdentifier="sentry-dbid-dec837d2-be5f-4a23-9064-0fdb6fb5bb6c")}catch{}})();const w=({mouse:e,vertexShader:r,fragmentShader:a})=>{const c=o.useRef(null),{size:t,gl:n}=h(),i=o.useMemo(()=>new b({vertexShader:r,fragmentShader:a,uniforms:{u_time:{value:0},u_resolution:{value:new f(t.width,t.height)},u_mouse:{value:new f(e.x,e.y)}}}),[r,a]);return o.useEffect(()=>{n.setPixelRatio(window.devicePixelRatio||2),n.setSize(t.width,t.height),i.uniforms.u_resolution.value.set(t.width,t.height)},[t]),g(({clock:l})=>{i.uniforms.u_time.value=l.getElapsedTime(),i.uniforms.u_mouse.value.set(e.x,e.y)}),s.jsx("mesh",{ref:c,material:i,children:s.jsx("planeGeometry",{args:[t.width,t.height,1]})})},T=({vertexShader:e=`
    uniform vec2 u_resolution;
    varying vec2 v_uv;

    void main() {
      v_uv = (position.xy + 1.0) / 2.0; // Convert coordinates to [0, 1] range
      gl_Position = vec4(position, 1.0);
    }
  `,width:r="40",height:a="40"})=>{const[c,t]=o.useState({x:0,y:0}),n=o.useRef(null),[i,l]=o.useState(10),m=_(i,300);o.useEffect(()=>{const u=d=>{t({x:d.clientX,y:d.clientY})};return n.current?.addEventListener("mousemove",u),()=>{n.current?.removeEventListener("mousemove",u)}},[]);const v=o.useMemo(()=>`
      varying vec2 v_uv;
      uniform vec2 u_resolution;

      void main() {
        vec2 st = v_uv;
        st.x *= u_resolution.x / u_resolution.y;
        vec3 color = vec3(0.0);
        float d = 0.0;
        st = st * 2.0 - 1.0;
        d = length(abs(st) - 0.3);
        gl_FragColor = vec4(vec3(fract(d * ${m}.)), 1.0);
      }
    `,[m]);return s.jsxs("div",{className:"flex flex-col items-center justify-center",children:[s.jsxs(p,{dpr:[1,2],className:"m-auto",gl:{antialias:!1},camera:{position:[0,0,15],fov:17.5,near:1,far:20},style:{width:`${r}vw`,height:`${a}vw`},ref:n,children:[s.jsx("color",{attach:"background",args:["black"]}),s.jsx(w,{mouse:c,vertexShader:e,fragmentShader:v})]}),s.jsx("code",{children:`gl_FragColor = vec4(vec3(fract(d * ${m})), 1.0);`}),s.jsx(x,{defaultValue:[30],max:100,min:5,step:1,className:y("w-[50%] m-4"),onValueChange:u=>l(u[0]),value:[i]})]})};export{T as default};
//# sourceMappingURL=demo1.Do6qlOdv.js.map
