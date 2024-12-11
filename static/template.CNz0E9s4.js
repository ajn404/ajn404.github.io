import{j as n}from"./jsx-runtime.HYuwRzq_.js";import{r}from"./index.BhghmTrL.js";import{C as m,u as d,b as v}from"./react-three-fiber.esm.CtDp9Qp7.js";import{S as p,V as f}from"./three.module.Ddm6rSpf.js";import"./_sentry-release-injection-file.MMOF6ud2.js";import"./_commonjsHelpers.DBhTrWiD.js";(function(){try{var t=typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{},s=new t.Error().stack;s&&(t._sentryDebugIds=t._sentryDebugIds||{},t._sentryDebugIds[s]="c3fa4246-fcac-4854-ad2d-c758628b9a80",t._sentryDebugIdIdentifier="sentry-dbid-c3fa4246-fcac-4854-ad2d-c758628b9a80")}catch{}})();const h=({mouse:t,vertexShader:s,fragmentShader:i})=>{const c=r.useRef(null),{size:e,gl:u}=d(),o=r.useMemo(()=>new p({vertexShader:s,fragmentShader:i,uniforms:{u_time:{value:0},u_resolution:{value:new f(e.width,e.height)},u_mouse:{value:new f(t.x,t.y)}}}),[s,i,e]);return r.useEffect(()=>{u.setPixelRatio(window.devicePixelRatio||2),u.setSize(e.width,e.height),o.uniforms.u_resolution.value.set(e.width,e.height)},[e]),v(({clock:a})=>{o.uniforms.u_time.value=a.getElapsedTime(),o.uniforms.u_mouse.value.set(t.x,t.y),o.uniforms.u_resolution.value.set(e.width,e.height)}),n.jsx("mesh",{ref:c,material:o,children:n.jsx("planeGeometry",{args:[e.width,e.height,1]})})},E=({vertexShader:t=`
    uniform vec2 u_resolution;
    varying vec2 v_uv;

    void main() {
      v_uv = (position.xy + 1.0) / 2.0; // 将坐标转换到 [0, 1] 范围
      gl_Position = vec4(position, 1.0);
    }
  `,fragmentShader:s=`
    #ifdef GL_ES
    precision mediump float;
    #endif

    uniform vec2 u_resolution;
    uniform vec2 u_mouse;
    uniform float u_time;

    float plot(vec2 st) {
      return smoothstep(0.02, 0.0, abs(st.y - st.x));
    }

    void main() {
      vec2 st = gl_FragCoord.xy / u_resolution;
      float y = st.x;
      vec3 color = vec3(y);
      float pct = plot(st);
      color = (1.0 - pct) * color + pct * vec3(1.000, 0.895, 0.688);
      gl_FragColor = vec4(color, 1.0);
    }
  `,width:i=45,height:c=45})=>{const[e,u]=r.useState({x:0,y:0}),o=r.useRef(null);return r.useEffect(()=>{const a=l=>{u({x:l.clientX,y:l.clientY})};return o.current&&o.current.addEventListener("mousemove",a),()=>{o.current&&o.current.removeEventListener("mousemove",a)}},[]),n.jsxs(m,{dpr:[1,2],className:"m-auto",gl:{antialias:!1},camera:{position:[0,0,15],fov:17.5,near:1,far:20},style:{width:`${i}vw`,height:`${c}vw`},ref:o,children:[n.jsx("color",{attach:"background",args:["black"]}),n.jsx(h,{mouse:e,vertexShader:t,fragmentShader:s})]})};export{E as default};
//# sourceMappingURL=template.CNz0E9s4.js.map
