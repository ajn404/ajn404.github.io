import{r as o}from"./index.A1bncjHG.js";import{T as c,a as u}from"./three.module.AgaRJhWa.js";import{u as y,a as i}from"./react-three-fiber.esm.YAT8fgpv.js";(function(){try{var e=typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{},s=new e.Error().stack;s&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[s]="346a4d11-1b24-43c0-9ba5-ca88f4823314",e._sentryDebugIdIdentifier="sentry-dbid-346a4d11-1b24-43c0-9ba5-ca88f4823314")}catch{}})();const n=e=>e===Object(e)&&!Array.isArray(e)&&typeof e!="function";function d(e,s){const a=y(t=>t.gl),r=i(c,n(e)?Object.values(e):e);return o.useLayoutEffect(()=>{s?.(r)},[s]),o.useEffect(()=>{if("initTexture"in a){let t=[];Array.isArray(r)?t=r:r instanceof u?t=[r]:n(r)&&(t=Object.values(r)),t.forEach(f=>{f instanceof u&&a.initTexture(f)})}},[a,r]),o.useMemo(()=>{if(n(e)){const t={};let f=0;for(const l in e)t[l]=r[f++];return t}else return r},[e,r])}d.preload=e=>i.preload(c,e);d.clear=e=>i.clear(c,e);export{d as u};
//# sourceMappingURL=Texture.DmnHT83W.js.map