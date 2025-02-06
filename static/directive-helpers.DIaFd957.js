import{Z as o}from"./lit-html.BwZoqC9v.js";(function(){try{var e=typeof window<"u"?window:typeof global<"u"?global:typeof globalThis<"u"?globalThis:typeof self<"u"?self:{},t=new e.Error().stack;t&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[t]="aa7ebb45-8f59-4aad-b708-5c5d18b85f03",e._sentryDebugIdIdentifier="sentry-dbid-aa7ebb45-8f59-4aad-b708-5c5d18b85f03")}catch{}})();/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const c={ATTRIBUTE:1,CHILD:2,PROPERTY:3,EVENT:5,ELEMENT:6},b=e=>(...t)=>({_$litDirective$:e,values:t});let p=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,n,i){this._$Ct=t,this._$AM=n,this._$Ci=i}_$AS(t,n){return this.update(t,n)}update(t,n){return this.render(...n)}};/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{I:A}=o,y=e=>e===null||typeof e!="object"&&typeof e!="function",T=(e,t)=>e?._$litType$!==void 0,h=e=>e?._$litType$?.h!=null,I=e=>e.strings===void 0,_=()=>document.createComment(""),E=(e,t,n)=>{const i=e._$AA.parentNode,r=t===void 0?e._$AB:t._$AA;if(n===void 0){const d=i.insertBefore(_(),r),f=i.insertBefore(_(),r);n=new A(d,f,e,e.options)}else{const d=n._$AB.nextSibling,f=n._$AM,$=f!==e;if($){let s;n._$AQ?.(e),n._$AM=e,n._$AP!==void 0&&(s=e._$AU)!==f._$AU&&n._$AP(s)}if(d!==r||$){let s=n._$AA;for(;s!==d;){const l=s.nextSibling;i.insertBefore(s,r),s=l}}}return n},m=(e,t,n=e)=>(e._$AI(t,n),e),u={},B=(e,t=u)=>e._$AH=t,w=e=>e._$AH,D=e=>{e._$AP?.(!1,!0);let t=e._$AA;const n=e._$AB.nextSibling;for(;t!==n;){const i=t.nextSibling;t.remove(),t=i}};export{D as M,b as a,p as b,T as e,I as f,y as i,h as l,B as m,w as p,E as r,c as t,m as v};
//# sourceMappingURL=directive-helpers.DIaFd957.js.map
