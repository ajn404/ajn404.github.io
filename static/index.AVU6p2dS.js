import"./_sentry-release-injection-file.CB6rd3Pg.js";import{r as c}from"./index.xZRu5XGr.js";(function(){try{var e=typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{},t=new e.Error().stack;t&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[t]="7872c7d6-11e9-46a4-a24d-d673371864b1",e._sentryDebugIdIdentifier="sentry-dbid-7872c7d6-11e9-46a4-a24d-d673371864b1")}catch{}})();var d={exports:{}},f={};/**
 * @license React
 * use-sync-external-store-shim.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var o=c;function a(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var p=typeof Object.is=="function"?Object.is:a,y=o.useState,l=o.useEffect,v=o.useLayoutEffect,S=o.useDebugValue;function g(e,t){var n=t(),u=y({inst:{value:n,getSnapshot:t}}),r=u[0].inst,s=u[1];return v(function(){r.value=n,r.getSnapshot=t,i(r)&&s({inst:r})},[e,n,t]),l(function(){return i(r)&&s({inst:r}),e(function(){i(r)&&s({inst:r})})},[e]),S(n),n}function i(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!p(e,n)}catch{return!0}}function m(e,t){return t()}var w=typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"?m:g;f.useSyncExternalStore=o.useSyncExternalStore!==void 0?o.useSyncExternalStore:w;d.exports=f;var h=d.exports;export{h as s};
//# sourceMappingURL=index.AVU6p2dS.js.map
