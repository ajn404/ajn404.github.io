import"./_sentry-release-injection-file.b82t1l8g.js";import{r as f}from"./index.KNIQqnlE.js";(function(){try{var e=typeof window<"u"?window:typeof global<"u"?global:typeof globalThis<"u"?globalThis:typeof self<"u"?self:{},t=new e.Error().stack;t&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[t]="aceb822b-74d2-472c-82be-1088538a87b9",e._sentryDebugIdIdentifier="sentry-dbid-aceb822b-74d2-472c-82be-1088538a87b9")}catch{}})();var c={exports:{}},i={};/**
 * @license React
 * use-sync-external-store-shim.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var o=f;function d(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var l=typeof Object.is=="function"?Object.is:d,b=o.useState,p=o.useEffect,y=o.useLayoutEffect,S=o.useDebugValue;function v(e,t){var n=t(),u=b({inst:{value:n,getSnapshot:t}}),r=u[0].inst,a=u[1];return y(function(){r.value=n,r.getSnapshot=t,s(r)&&a({inst:r})},[e,n,t]),p(function(){return s(r)&&a({inst:r}),e(function(){s(r)&&a({inst:r})})},[e]),S(n),n}function s(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!l(e,n)}catch{return!0}}function E(e,t){return t()}var h=typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"?E:v;i.useSyncExternalStore=o.useSyncExternalStore!==void 0?o.useSyncExternalStore:h;c.exports=i;var m=c.exports;export{m as s};
//# sourceMappingURL=index.CaBYCiXe.js.map
