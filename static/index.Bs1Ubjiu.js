import"./_sentry-release-injection-file.zXuGWfuW.js";import{r as d}from"./index.gJB7zx5L.js";(function(){try{var e=typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{},t=new e.Error().stack;t&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[t]="230aeb7e-61c2-47ba-9304-dc5e6edb04fc",e._sentryDebugIdIdentifier="sentry-dbid-230aeb7e-61c2-47ba-9304-dc5e6edb04fc")}catch{}})();var c={exports:{}},f={};/**
 * @license React
 * use-sync-external-store-shim.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var o=d;function a(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var p=typeof Object.is=="function"?Object.is:a,y=o.useState,l=o.useEffect,v=o.useLayoutEffect,S=o.useDebugValue;function b(e,t){var n=t(),u=y({inst:{value:n,getSnapshot:t}}),r=u[0].inst,s=u[1];return v(function(){r.value=n,r.getSnapshot=t,i(r)&&s({inst:r})},[e,n,t]),l(function(){return i(r)&&s({inst:r}),e(function(){i(r)&&s({inst:r})})},[e]),S(n),n}function i(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!p(e,n)}catch{return!0}}function g(e,t){return t()}var m=typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"?g:b;f.useSyncExternalStore=o.useSyncExternalStore!==void 0?o.useSyncExternalStore:m;c.exports=f;var E=c.exports;export{E as s};
//# sourceMappingURL=index.Bs1Ubjiu.js.map
