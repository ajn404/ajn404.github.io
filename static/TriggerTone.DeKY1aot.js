import{j as n}from"./jsx-runtime.C6v7sNnU.js";import{i as y,S as l,n as d,s as u,T as p}from"./index.DuXFPtvb.js";import{Button as e}from"./button.DdFpa7eA.js";import"./_sentry-release-injection-file.DwF5PoZy.js";import"./index.A1bncjHG.js";import"./_commonjsHelpers.g73XWfsI.js";import"./tslib.es6.B2J5OodL.js";import"./index.BUvKg88E.js";import"./index.CLMpW3Is.js";import"./utils.ZJ_V-BP8.js";(function(){try{var t=typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{},i=new t.Error().stack;i&&(t._sentryDebugIds=t._sentryDebugIds||{},t._sentryDebugIds[i]="835ca0fa-1fb3-43c5-aaf6-6725072e5ca1",t._sentryDebugIdIdentifier="sentry-dbid-835ca0fa-1fb3-43c5-aaf6-6725072e5ca1")}catch{}})();const D=()=>{function t(r="C4"){if(y(r)){const o=new l().toDestination(),s=d();o.triggerAttack(r,s),o.triggerRelease(s+.1)}}const i=[{note:"A3",duration:"4n"},{note:"C4",duration:"4n"},{note:"E4",duration:"4n"},{note:"G4",duration:"4n"},{note:"A4",duration:"4n"},{note:"G4",duration:"4n"},{note:"E4",duration:"4n"},{note:"C4",duration:"4n"}];function a(){const r=new l().toDestination();let o=d();i.forEach(({note:s,duration:c})=>{r.triggerAttackRelease(s,c,o),o+=p(c).toSeconds()})}const f=async()=>{await u(),a()};return n.jsx(n.Fragment,{children:n.jsxs("div",{children:[n.jsx("p",{children:"Tone.js"}),n.jsxs("div",{className:"flex flex-col gap-2",children:[n.jsx(e,{onClick:()=>t("A3"),children:"Play A3"}),n.jsx(e,{onClick:()=>t("A1"),children:"Play A1"}),n.jsx(e,{onClick:()=>t("A2"),children:"Play A2"}),n.jsx(e,{onClick:()=>t("A4"),children:"Play A4"}),n.jsx(e,{onClick:()=>t("C3"),children:"Play A3"})]}),n.jsx("p",{children:"自制好听的旋律"}),n.jsx(e,{onClick:f,children:"播放"})]})})};export{D as default};
//# sourceMappingURL=TriggerTone.DeKY1aot.js.map