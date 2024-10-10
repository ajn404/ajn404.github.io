import{r as d}from"./index.gJB7zx5L.js";import{a as I,_ as N}from"./tslib.es6.BZRksbWG.js";(function(){try{var e=typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{},t=new e.Error().stack;t&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[t]="8d0ea4c6-8fb9-41c4-a343-67ee290a0e10",e._sentryDebugIdIdentifier="sentry-dbid-8d0ea4c6-8fb9-41c4-a343-67ee290a0e10")}catch{}})();var T=function(e){if(typeof document>"u")return null;var t=Array.isArray(e)?e[0]:e;return t.ownerDocument.body},l=new WeakMap,g=new WeakMap,m={},b=0,_=function(e){return e&&(e.host||_(e.parentNode))},z=function(e,t){return t.map(function(n){if(e.contains(n))return n;var r=_(n);return r&&e.contains(r)?r:(console.error("aria-hidden",n,"in not contained inside",e,". Doing nothing"),null)}).filter(function(n){return!!n})},B=function(e,t,n,r){var a=z(t,Array.isArray(e)?e:[e]);m[n]||(m[n]=new WeakMap);var o=m[n],u=[],i=new Set,y=new Set(a),h=function(c){!c||i.has(c)||(i.add(c),h(c.parentNode))};a.forEach(h);var s=function(c){!c||y.has(c)||Array.prototype.forEach.call(c.children,function(f){if(i.has(f))s(f);else try{var p=f.getAttribute(r),C=p!==null&&p!=="false",k=(l.get(f)||0)+1,x=(o.get(f)||0)+1;l.set(f,k),o.set(f,x),u.push(f),k===1&&C&&g.set(f,!0),x===1&&f.setAttribute(n,"true"),C||f.setAttribute(r,"true")}catch(D){console.error("aria-hidden: cannot operate on ",f,D)}})};return s(t),i.clear(),b++,function(){u.forEach(function(c){var f=l.get(c)-1,p=o.get(c)-1;l.set(c,f),o.set(c,p),f||(g.has(c)||c.removeAttribute(r),g.delete(c)),p||c.removeAttribute(n)}),b--,b||(l=new WeakMap,l=new WeakMap,g=new WeakMap,m={})}},ae=function(e,t,n){n===void 0&&(n="data-aria-hidden");var r=Array.from(Array.isArray(e)?e:[e]),a=T(e);return a?(r.push.apply(r,Array.from(a.querySelectorAll("[aria-live]"))),B(r,a,n,"aria-hidden")):function(){return null}},w="right-scroll-bar-position",S="width-before-scroll-bar",L="with-scroll-bars-hidden",V="--removed-body-scroll-bar-size";function E(e,t){return typeof e=="function"?e(t):e&&(e.current=t),e}function O(e,t){var n=d.useState(function(){return{value:e,callback:t,facade:{get current(){return n.value},set current(r){var a=n.value;a!==r&&(n.value=r,n.callback(r,a))}}}})[0];return n.callback=t,n.facade}var P=typeof window<"u"?d.useLayoutEffect:d.useEffect,M=new WeakMap;function ie(e,t){var n=O(null,function(r){return e.forEach(function(a){return E(a,r)})});return P(function(){var r=M.get(n);if(r){var a=new Set(r),o=new Set(e),u=n.current;a.forEach(function(i){o.has(i)||E(i,null)}),o.forEach(function(i){a.has(i)||E(i,u)})}M.set(n,e)},[e]),n}function j(e){return e}function G(e,t){t===void 0&&(t=j);var n=[],r=!1,a={read:function(){if(r)throw new Error("Sidecar: could not `read` from an `assigned` medium. `read` could be used only with `useMedium`.");return n.length?n[n.length-1]:e},useMedium:function(o){var u=t(o,r);return n.push(u),function(){n=n.filter(function(i){return i!==u})}},assignSyncMedium:function(o){for(r=!0;n.length;){var u=n;n=[],u.forEach(o)}n={push:function(i){return o(i)},filter:function(){return n}}},assignMedium:function(o){r=!0;var u=[];if(n.length){var i=n;n=[],i.forEach(o),u=n}var y=function(){var s=u;u=[],s.forEach(o)},h=function(){return Promise.resolve().then(y)};h(),n={push:function(s){u.push(s),h()},filter:function(s){return u=u.filter(s),n}}}};return a}function oe(e){e===void 0&&(e={});var t=G(null);return t.options=I({async:!0,ssr:!1},e),t}var R=function(e){var t=e.sideCar,n=N(e,["sideCar"]);if(!t)throw new Error("Sidecar: please provide `sideCar` property to import the right car");var r=t.read();if(!r)throw new Error("Sidecar medium not found");return d.createElement(r,I({},n))};R.isSideCarExport=!0;function ue(e,t){return e.useMedium(t),R}var Q=function(){if(typeof __webpack_nonce__<"u")return __webpack_nonce__};function q(){if(!document)return null;var e=document.createElement("style");e.type="text/css";var t=Q();return t&&e.setAttribute("nonce",t),e}function F(e,t){e.styleSheet?e.styleSheet.cssText=t:e.appendChild(document.createTextNode(t))}function H(e){var t=document.head||document.getElementsByTagName("head")[0];t.appendChild(e)}var K=function(){var e=0,t=null;return{add:function(n){e==0&&(t=q())&&(F(t,n),H(t)),e++},remove:function(){e--,!e&&t&&(t.parentNode&&t.parentNode.removeChild(t),t=null)}}},U=function(){var e=K();return function(t,n){d.useEffect(function(){return e.add(t),function(){e.remove()}},[t&&n])}},J=function(){var e=U(),t=function(n){var r=n.styles,a=n.dynamic;return e(r,a),null};return t},X={left:0,top:0,right:0,gap:0},A=function(e){return parseInt(e||"",10)||0},Y=function(e){var t=window.getComputedStyle(document.body),n=t[e==="padding"?"paddingLeft":"marginLeft"],r=t[e==="padding"?"paddingTop":"marginTop"],a=t[e==="padding"?"paddingRight":"marginRight"];return[A(n),A(r),A(a)]},Z=function(e){if(e===void 0&&(e="margin"),typeof window>"u")return X;var t=Y(e),n=document.documentElement.clientWidth,r=window.innerWidth;return{left:t[0],top:t[1],right:t[2],gap:Math.max(0,r-n+t[2]-t[0])}},$=J(),v="data-scroll-locked",ee=function(e,t,n,r){var a=e.left,o=e.top,u=e.right,i=e.gap;return n===void 0&&(n="margin"),`
  .`.concat(L,` {
   overflow: hidden `).concat(r,`;
   padding-right: `).concat(i,"px ").concat(r,`;
  }
  body[`).concat(v,`] {
    overflow: hidden `).concat(r,`;
    overscroll-behavior: contain;
    `).concat([t&&"position: relative ".concat(r,";"),n==="margin"&&`
    padding-left: `.concat(a,`px;
    padding-top: `).concat(o,`px;
    padding-right: `).concat(u,`px;
    margin-left:0;
    margin-top:0;
    margin-right: `).concat(i,"px ").concat(r,`;
    `),n==="padding"&&"padding-right: ".concat(i,"px ").concat(r,";")].filter(Boolean).join(""),`
  }
  
  .`).concat(w,` {
    right: `).concat(i,"px ").concat(r,`;
  }
  
  .`).concat(S,` {
    margin-right: `).concat(i,"px ").concat(r,`;
  }
  
  .`).concat(w," .").concat(w,` {
    right: 0 `).concat(r,`;
  }
  
  .`).concat(S," .").concat(S,` {
    margin-right: 0 `).concat(r,`;
  }
  
  body[`).concat(v,`] {
    `).concat(V,": ").concat(i,`px;
  }
`)},W=function(){var e=parseInt(document.body.getAttribute(v)||"0",10);return isFinite(e)?e:0},ne=function(){d.useEffect(function(){return document.body.setAttribute(v,(W()+1).toString()),function(){var e=W()-1;e<=0?document.body.removeAttribute(v):document.body.setAttribute(v,e.toString())}},[])},ce=function(e){var t=e.noRelative,n=e.noImportant,r=e.gapMode,a=r===void 0?"margin":r;ne();var o=d.useMemo(function(){return Z(a)},[a]);return d.createElement($,{styles:ee(o,!t,a,n?"":"!important")})};export{ce as R,oe as c,ue as e,S as f,ae as h,J as s,ie as u,w as z};
//# sourceMappingURL=component.3I7M9oDv.js.map
