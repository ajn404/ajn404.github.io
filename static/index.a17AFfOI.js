import"./_sentry-release-injection-file.B-UwqLso.js";import{r as i}from"./index.D4IXJ7me.js";(function(){try{var e=typeof window<"u"?window:typeof global<"u"?global:typeof globalThis<"u"?globalThis:typeof self<"u"?self:{},t=new e.Error().stack;t&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[t]="d2412ce2-ced0-45ce-a194-a691d5f3fc65",e._sentryDebugIdIdentifier="sentry-dbid-d2412ce2-ced0-45ce-a194-a691d5f3fc65")}catch{}})();var c={exports:{}},f={};/**
 * @license React
 * use-sync-external-store-shim.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var o=i;function d(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var l=typeof Object.is=="function"?Object.is:d,p=o.useState,y=o.useEffect,S=o.useLayoutEffect,v=o.useDebugValue;function E(e,t){var n=t(),u=p({inst:{value:n,getSnapshot:t}}),r=u[0].inst,a=u[1];return S(function(){r.value=n,r.getSnapshot=t,s(r)&&a({inst:r})},[e,n,t]),y(function(){return s(r)&&a({inst:r}),e(function(){s(r)&&a({inst:r})})},[e]),v(n),n}function s(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!l(e,n)}catch{return!0}}function b(e,t){return t()}var h=typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"?b:E;f.useSyncExternalStore=o.useSyncExternalStore!==void 0?o.useSyncExternalStore:h;c.exports=f;var m=c.exports;export{m as s};
//# sourceMappingURL=index.a17AFfOI.js.map
