import{z as f}from"./lit-html.CTWWsjOq.js";(function(){try{var t=typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{},e=new Error().stack;e&&(t._sentryDebugIds=t._sentryDebugIds||{},t._sentryDebugIds[e]="7a5dd538-5a2f-4a3f-add1-bc72c1f09517",t._sentryDebugIdIdentifier="sentry-dbid-7a5dd538-5a2f-4a3f-add1-bc72c1f09517")}catch{}})();/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const u={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},b=t=>(...e)=>({_$litDirective$:t,values:e});let p=class{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,i,n){this._$Ct=e,this._$AM=i,this._$Ci=n}_$AS(e,i){return this.update(e,i)}update(e,i){return this.render(...i)}};/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{I:c}=f,g=t=>t===null||typeof t!="object"&&typeof t!="function",T=(t,e)=>t?._$litType$!==void 0,v=t=>t?._$litType$?.h!=null,E=t=>t.strings===void 0,o=()=>document.createComment(""),I=(t,e,i)=>{const n=t._$AA.parentNode,r=e===void 0?t._$AB:e._$AA;if(i===void 0){const $=n.insertBefore(o(),r),_=n.insertBefore(o(),r);i=new c($,_,t,t.options)}else{const $=i._$AB.nextSibling,_=i._$AM,d=_!==t;if(d){let s;i._$AQ?.(t),i._$AM=t,i._$AP!==void 0&&(s=t._$AU)!==_._$AU&&i._$AP(s)}if($!==r||d){let s=i._$AA;for(;s!==$;){const A=s.nextSibling;n.insertBefore(s,r),s=A}}}return i},h=(t,e,i=t)=>(t._$AI(e,i),t),l={},B=(t,e=l)=>t._$AH=e,m=t=>t._$AH,w=t=>{t._$AP?.(!1,!0);let e=t._$AA;const i=t._$AB.nextSibling;for(;e!==i;){const n=e.nextSibling;e.remove(),e=n}};export{b as a,p as b,T as e,E as f,w as h,g as i,v as l,B as m,m as p,I as r,u as t,h as v};
//# sourceMappingURL=directive-helpers.zFxno-SU.js.map
