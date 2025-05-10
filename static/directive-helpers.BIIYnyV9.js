import{Z as l}from"./lit-html.C67ygu-D.js";(function(){try{var e=typeof window<"u"?window:typeof global<"u"?global:typeof globalThis<"u"?globalThis:typeof self<"u"?self:{},t=new e.Error().stack;t&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[t]="d6ea8343-518b-424f-9ce3-0df260df21fd",e._sentryDebugIdIdentifier="sentry-dbid-d6ea8343-518b-424f-9ce3-0df260df21fd")}catch{}})();/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const a={ATTRIBUTE:1,CHILD:2,PROPERTY:3,EVENT:5,ELEMENT:6},b=e=>(...t)=>({_$litDirective$:e,values:t});let p=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,i,n){this._$Ct=t,this._$AM=i,this._$Ci=n}_$AS(t,i){return this.update(t,i)}update(t,i){return this.render(...i)}};/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{I:A}=l,y=e=>e===null||typeof e!="object"&&typeof e!="function",T=(e,t)=>e?._$litType$!==void 0,h=e=>e?._$litType$?.h!=null,v=e=>e.strings===void 0,o=()=>document.createComment(""),I=(e,t,i)=>{const n=e._$AA.parentNode,r=t===void 0?e._$AB:t._$AA;if(i===void 0){const $=n.insertBefore(o(),r),d=n.insertBefore(o(),r);i=new A($,d,e,e.options)}else{const $=i._$AB.nextSibling,d=i._$AM,f=d!==e;if(f){let s;i._$AQ?.(e),i._$AM=e,i._$AP!==void 0&&(s=e._$AU)!==d._$AU&&i._$AP(s)}if($!==r||f){let s=i._$AA;for(;s!==$;){const _=s.nextSibling;n.insertBefore(s,r),s=_}}}return i},E=(e,t,i=e)=>(e._$AI(t,i),e),c={},m=(e,t=c)=>e._$AH=t,B=e=>e._$AH,w=e=>{e._$AP?.(!1,!0);let t=e._$AA;const i=e._$AB.nextSibling;for(;t!==i;){const n=t.nextSibling;t.remove(),t=n}};export{w as M,b as a,p as b,T as e,v as f,y as i,h as l,m,B as p,I as r,a as t,E as v};
//# sourceMappingURL=directive-helpers.BIIYnyV9.js.map
