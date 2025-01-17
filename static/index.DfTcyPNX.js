import"./_sentry-release-injection-file.DXPJa_4z.js";import{r as i}from"./index.CoDvW3iS.js";(function(){try{var e=typeof window<"u"?window:typeof global<"u"?global:typeof globalThis<"u"?globalThis:typeof self<"u"?self:{},t=new e.Error().stack;t&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[t]="1c5db49a-3798-4ee8-9ce0-a4066ff8b1f6",e._sentryDebugIdIdentifier="sentry-dbid-1c5db49a-3798-4ee8-9ce0-a4066ff8b1f6")}catch{}})();var f={exports:{}},c={};/**
 * @license React
 * use-sync-external-store-shim.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var u=i;function d(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var l=typeof Object.is=="function"?Object.is:d,p=u.useState,y=u.useEffect,S=u.useLayoutEffect,b=u.useDebugValue;function v(e,t){var n=t(),o=p({inst:{value:n,getSnapshot:t}}),r=o[0].inst,a=o[1];return S(function(){r.value=n,r.getSnapshot=t,s(r)&&a({inst:r})},[e,n,t]),y(function(){return s(r)&&a({inst:r}),e(function(){s(r)&&a({inst:r})})},[e]),b(n),n}function s(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!l(e,n)}catch{return!0}}function E(e,t){return t()}var h=typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"?E:v;c.useSyncExternalStore=u.useSyncExternalStore!==void 0?u.useSyncExternalStore:h;f.exports=c;var m=f.exports;export{m as s};
//# sourceMappingURL=index.DfTcyPNX.js.map
