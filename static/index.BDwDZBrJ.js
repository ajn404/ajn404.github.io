import"./_sentry-release-injection-file.D-PFEXYZ.js";import{r as c}from"./index.bLcCnRqq.js";(function(){try{var e=typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{},t=new e.Error().stack;t&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[t]="35ae1e86-75fc-4ff0-a04d-6d095e4eeefc",e._sentryDebugIdIdentifier="sentry-dbid-35ae1e86-75fc-4ff0-a04d-6d095e4eeefc")}catch{}})();var i={exports:{}},d={};/**
 * @license React
 * use-sync-external-store-shim.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var o=c;function a(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var p=typeof Object.is=="function"?Object.is:a,y=o.useState,l=o.useEffect,v=o.useLayoutEffect,S=o.useDebugValue;function g(e,t){var n=t(),u=y({inst:{value:n,getSnapshot:t}}),r=u[0].inst,f=u[1];return v(function(){r.value=n,r.getSnapshot=t,s(r)&&f({inst:r})},[e,n,t]),l(function(){return s(r)&&f({inst:r}),e(function(){s(r)&&f({inst:r})})},[e]),S(n),n}function s(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!p(e,n)}catch{return!0}}function m(e,t){return t()}var w=typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"?m:g;d.useSyncExternalStore=o.useSyncExternalStore!==void 0?o.useSyncExternalStore:w;i.exports=d;var h=i.exports;export{h as s};
//# sourceMappingURL=index.BDwDZBrJ.js.map
