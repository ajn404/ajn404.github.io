import{j as y}from"./jsx-runtime.C6v7sNnU.js";import{r as u}from"./index.A1bncjHG.js";/* empty css                         */import"./_sentry-release-injection-file.DwF5PoZy.js";import{c as C,U as v,d as M,L as w,e as E,f,g as s,C as m,S as _,h as D,V as b,I as k}from"./Viewer.BTCuc00v.js";import"./_commonjsHelpers.g73XWfsI.js";(function(){try{var e=typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{},n=new e.Error().stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="7d8883a1-ae85-47cc-bd57-c95472430d5d",e._sentryDebugIdIdentifier="sentry-dbid-7d8883a1-ae85-47cc-bd57-c95472430d5d")}catch{}})();k.defaultAccessToken="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIwOWRkMzFlYS0yMDVhLTRkNzYtYWJmMC1hMmE1NjljN2MyNjMiLCJpZCI6NzMzNDQsImlhdCI6MTYzNjgxNDEzNX0.Q2MfD_lkQgsJ-R3NPfYjS9QA9q_j4Py8DktYKsPmZNg";function z(){const e=u.useRef(null),n=u.useRef(null);return u.useEffect(()=>{let t;const p=()=>{e.current&&!n.current&&(n.current=new b(e.current,{terrainProvider:void 0,baseLayerPicker:!1,geocoder:!1,homeButton:!1,sceneModePicker:!1,navigationHelpButton:!1,animation:!1,timeline:!1,fullscreenButton:!1}),t=n.current,t._cesiumWidget._creditContainer.parentNode.removeChild(t._cesiumWidget._creditContainer))},g=r=>{r.stopPropagation()};return p(),requestIdleCallback(async()=>{const r=new C({uniforms:{u_time:{value:0,type:v.FLOAT}},mode:M.MODIFY_MATERIAL,lightingModel:w.PBR,translucencyMode:E.TRANSLUCENT,vertexShaderText:`
        void vertexMain(VertexInput vsInput, inout czm_modelVertexOutput vsOutput) {
            // 这里可以添加自定义的顶点着色器代码
        }
    `,fragmentShaderText:`
        void fragmentMain(FragmentInput fsInput, inout czm_modelMaterial material) {
            float r = u_time; // 红色分量
            float b = 1.0 - u_time; // 蓝色分量
            vec4 color = vec4(r, r , b, 1.0);
            material.diffuse = color.rgb; // 设置漫反射颜色为红色
            material.alpha = 1.0; // 设置透明度
        }
    `});function a(){const I=performance.now()*.001;r.setUniform("u_time",Math.sin(I))}t.scene.preRender.addEventListener(a);const i=new m(-1.5719521361662298e6,439524197876768e-8,4.3321493142119665e6),o=f.fromCartesian(i),c=s.toDegrees(o.longitude),l=s.toDegrees(o.latitude),d=o.height,h=t.trackedEntity=t.entities.add({name:"animate",position:m.fromDegrees(c,l,d),model:{uri:"/assets/models/gltf/animate.gltf",scale:1e6,customShader:r}});t.trackedEntity=h}),new _(t.scene.canvas).setInputAction(r=>{const a=r.position,i=t.camera.pickEllipsoid(a);if(i){const o=f.fromCartesian(i),c=s.toDegrees(o.longitude),l=s.toDegrees(o.latitude),d=m.fromDegrees(c,l,200);console.log(d)}else console.log("未点击到地球表面")},D.RIGHT_CLICK),e.current.addEventListener("wheel",g),()=>{n.current&&(n.current.destroy(),t=null)}},[]),y.jsx("div",{onDoubleClick:()=>{e&&(document.fullscreenElement?document.exitFullscreen():e.current.requestFullscreen())},ref:e,style:{width:"100%",height:"500px",userSelect:"none"}})}export{z as default};
//# sourceMappingURL=demo.Bx6bbikH.js.map