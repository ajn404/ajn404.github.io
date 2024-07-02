import{r as d}from"./index.-CUiy3Z4.js";import{_ as k,a as _}from"./tslib.es6.H3XcWfKE.js";var T=function(n){if(typeof document>"u")return null;var t=Array.isArray(n)?n[0]:n;return t.ownerDocument.body},l=new WeakMap,p=new WeakMap,g={},y=0,W=function(n){return n&&(n.host||W(n.parentNode))},N=function(n,t){return t.map(function(e){if(n.contains(e))return e;var r=W(e);return r&&n.contains(r)?r:(console.error("aria-hidden",e,"in not contained inside",n,". Doing nothing"),null)}).filter(function(e){return!!e})},z=function(n,t,e,r){var a=N(t,Array.isArray(n)?n:[n]);g[e]||(g[e]=new WeakMap);var o=g[e],c=[],i=new Set,m=new Set(a),v=function(u){!u||i.has(u)||(i.add(u),v(u.parentNode))};a.forEach(v);var s=function(u){!u||m.has(u)||Array.prototype.forEach.call(u.children,function(f){if(i.has(f))s(f);else{var h=f.getAttribute(r),x=h!==null&&h!=="false",C=(l.get(f)||0)+1,A=(o.get(f)||0)+1;l.set(f,C),o.set(f,A),c.push(f),C===1&&x&&p.set(f,!0),A===1&&f.setAttribute(e,"true"),x||f.setAttribute(r,"true")}})};return s(t),i.clear(),y++,function(){c.forEach(function(u){var f=l.get(u)-1,h=o.get(u)-1;l.set(u,f),o.set(u,h),f||(p.has(u)||u.removeAttribute(r),p.delete(u)),h||u.removeAttribute(e)}),y--,y||(l=new WeakMap,l=new WeakMap,p=new WeakMap,g={})}},$=function(n,t,e){e===void 0&&(e="data-aria-hidden");var r=Array.from(Array.isArray(n)?n:[n]),a=t||T(n);return a?(r.push.apply(r,Array.from(a.querySelectorAll("[aria-live]"))),z(r,a,e,"aria-hidden")):function(){return null}},w="right-scroll-bar-position",S="width-before-scroll-bar",B="with-scroll-bars-hidden",I="--removed-body-scroll-bar-size";function b(n,t){return typeof n=="function"?n(t):n&&(n.current=t),n}function D(n,t){var e=d.useState(function(){return{value:n,callback:t,facade:{get current(){return e.value},set current(r){var a=e.value;a!==r&&(e.value=r,e.callback(r,a))}}}})[0];return e.callback=t,e.facade}var M=new WeakMap;function nn(n,t){var e=D(t||null,function(r){return n.forEach(function(a){return b(a,r)})});return d.useLayoutEffect(function(){var r=M.get(e);if(r){var a=new Set(r),o=new Set(n),c=e.current;a.forEach(function(i){o.has(i)||b(i,null)}),o.forEach(function(i){a.has(i)||b(i,c)})}M.set(e,n)},[n]),e}function L(n){return n}function O(n,t){t===void 0&&(t=L);var e=[],r=!1,a={read:function(){if(r)throw new Error("Sidecar: could not `read` from an `assigned` medium. `read` could be used only with `useMedium`.");return e.length?e[e.length-1]:n},useMedium:function(o){var c=t(o,r);return e.push(c),function(){e=e.filter(function(i){return i!==c})}},assignSyncMedium:function(o){for(r=!0;e.length;){var c=e;e=[],c.forEach(o)}e={push:function(i){return o(i)},filter:function(){return e}}},assignMedium:function(o){r=!0;var c=[];if(e.length){var i=e;e=[],i.forEach(o),c=e}var m=function(){var s=c;c=[],s.forEach(o)},v=function(){return Promise.resolve().then(m)};v(),e={push:function(s){c.push(s),v()},filter:function(s){return c=c.filter(s),e}}}};return a}function en(n){n===void 0&&(n={});var t=O(null);return t.options=k({async:!0,ssr:!1},n),t}var R=function(n){var t=n.sideCar,e=_(n,["sideCar"]);if(!t)throw new Error("Sidecar: please provide `sideCar` property to import the right car");var r=t.read();if(!r)throw new Error("Sidecar medium not found");return d.createElement(r,k({},e))};R.isSideCarExport=!0;function tn(n,t){return n.useMedium(t),R}var P=function(){if(typeof __webpack_nonce__<"u")return __webpack_nonce__};function V(){if(!document)return null;var n=document.createElement("style");n.type="text/css";var t=P();return t&&n.setAttribute("nonce",t),n}function j(n,t){n.styleSheet?n.styleSheet.cssText=t:n.appendChild(document.createTextNode(t))}function G(n){var t=document.head||document.getElementsByTagName("head")[0];t.appendChild(n)}var Q=function(){var n=0,t=null;return{add:function(e){n==0&&(t=V())&&(j(t,e),G(t)),n++},remove:function(){n--,!n&&t&&(t.parentNode&&t.parentNode.removeChild(t),t=null)}}},q=function(){var n=Q();return function(t,e){d.useEffect(function(){return n.add(t),function(){n.remove()}},[t&&e])}},H=function(){var n=q(),t=function(e){var r=e.styles,a=e.dynamic;return n(r,a),null};return t},K={left:0,top:0,right:0,gap:0},E=function(n){return parseInt(n||"",10)||0},F=function(n){var t=window.getComputedStyle(document.body),e=t[n==="padding"?"paddingLeft":"marginLeft"],r=t[n==="padding"?"paddingTop":"marginTop"],a=t[n==="padding"?"paddingRight":"marginRight"];return[E(e),E(r),E(a)]},J=function(n){if(n===void 0&&(n="margin"),typeof window>"u")return K;var t=F(n),e=document.documentElement.clientWidth,r=window.innerWidth;return{left:t[0],top:t[1],right:t[2],gap:Math.max(0,r-e+t[2]-t[0])}},U=H(),X=function(n,t,e,r){var a=n.left,o=n.top,c=n.right,i=n.gap;return e===void 0&&(e="margin"),`
  .`.concat(B,` {
   overflow: hidden `).concat(r,`;
   padding-right: `).concat(i,"px ").concat(r,`;
  }
  body {
    overflow: hidden `).concat(r,`;
    overscroll-behavior: contain;
    `).concat([t&&"position: relative ".concat(r,";"),e==="margin"&&`
    padding-left: `.concat(a,`px;
    padding-top: `).concat(o,`px;
    padding-right: `).concat(c,`px;
    margin-left:0;
    margin-top:0;
    margin-right: `).concat(i,"px ").concat(r,`;
    `),e==="padding"&&"padding-right: ".concat(i,"px ").concat(r,";")].filter(Boolean).join(""),`
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
  
  body {
    `).concat(I,": ").concat(i,`px;
  }
`)},rn=function(n){var t=n.noRelative,e=n.noImportant,r=n.gapMode,a=r===void 0?"margin":r,o=d.useMemo(function(){return J(a)},[a]);return d.createElement(U,{styles:X(o,!t,a,e?"":"!important")})};export{rn as R,en as c,tn as e,S as f,$ as h,H as s,nn as u,w as z};
