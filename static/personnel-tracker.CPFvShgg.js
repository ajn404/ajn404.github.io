import{j as l}from"./jsx-runtime.C6v7sNnU.js";import{r}from"./index.A1bncjHG.js";/* empty css                         */import"./_sentry-release-injection-file.DwF5PoZy.js";import{V as a,C as i,E as f,a as u,I as d}from"./Viewer.BTCuc00v.js";import"./_commonjsHelpers.g73XWfsI.js";(function(){try{var e=typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{},t=new e.Error().stack;t&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[t]="0c331f53-c98b-44eb-9bbc-e03425d5803c",e._sentryDebugIdIdentifier="sentry-dbid-0c331f53-c98b-44eb-9bbc-e03425d5803c")}catch{}})();d.defaultAccessToken="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIwOWRkMzFlYS0yMDVhLTRkNzYtYWJmMC1hMmE1NjljN2MyNjMiLCJpZCI6NzMzNDQsImlhdCI6MTYzNjgxNDEzNX0.Q2MfD_lkQgsJ-R3NPfYjS9QA9q_j4Py8DktYKsPmZNg";function w(){const e=r.useRef(null),t=r.useRef(null);return r.useEffect(()=>{if(e.current&&!t.current){t.current=new a(e.current,{terrainProvider:void 0,baseLayerPicker:!1,geocoder:!1,homeButton:!1,sceneModePicker:!1,navigationHelpButton:!1,animation:!1,timeline:!1,fullscreenButton:!1});const n=t.current;n._cesiumWidget._creditContainer.parentNode.removeChild(n._cesiumWidget._creditContainer);const s=i.fromDegrees(-75.59777,40.03883),c=new f({position:s,point:{pixelSize:10,color:u.RED},label:{text:"Personnel 1",font:"14pt sans-serif",horizontalOrigin:0,verticalOrigin:1,pixelOffset:new i(5,5,10)}});t.current.entities.add(c),t.current.camera.flyTo({destination:i.fromDegrees(-75.59777,40.03883,1e3)})}const o=n=>{n.stopPropagation()};return e.current.addEventListener("wheel",o),()=>{t.current&&t.current.destroy()}},[]),l.jsx("div",{onDoubleClick:()=>{e&&(document.fullscreenElement?document.exitFullscreen():e.current.requestFullscreen())},ref:e,style:{width:"100%",height:"500px",userSelect:"none"}})}export{w as default};
//# sourceMappingURL=personnel-tracker.CPFvShgg.js.map