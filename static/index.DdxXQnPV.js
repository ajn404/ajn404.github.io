import"./_sentry-release-injection-file.DBVj9-TS.js";import{r as i}from"./index.Dr01XSYZ.js";(function(){try{var e=typeof window<"u"?window:typeof global<"u"?global:typeof globalThis<"u"?globalThis:typeof self<"u"?self:{},t=new e.Error().stack;t&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[t]="6c327f37-1a77-4901-82b6-2b168c53123e",e._sentryDebugIdIdentifier="sentry-dbid-6c327f37-1a77-4901-82b6-2b168c53123e")}catch{}})();var f={exports:{}},c={};/**
 * @license React
 * use-sync-external-store-shim.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var u=i;function d(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var l=typeof Object.is=="function"?Object.is:d,p=u.useState,y=u.useEffect,S=u.useLayoutEffect,b=u.useDebugValue;function v(e,t){var n=t(),o=p({inst:{value:n,getSnapshot:t}}),r=o[0].inst,s=o[1];return S(function(){r.value=n,r.getSnapshot=t,a(r)&&s({inst:r})},[e,n,t]),y(function(){return a(r)&&s({inst:r}),e(function(){a(r)&&s({inst:r})})},[e]),b(n),n}function a(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!l(e,n)}catch{return!0}}function E(e,t){return t()}var h=typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"?E:v;c.useSyncExternalStore=u.useSyncExternalStore!==void 0?u.useSyncExternalStore:h;f.exports=c;var m=f.exports;export{m as s};
//# sourceMappingURL=index.DdxXQnPV.js.map
