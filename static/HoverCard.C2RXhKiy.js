import{j as o}from"./jsx-runtime.C6v7sNnU.js";import{C as Y}from"./react-icons.esm.BYAXBCkL.js";import{r as a}from"./index.A1bncjHG.js";import{c as j,P as w,d as Z,u as E,b as f,a as ee}from"./index.CTam5Opi.js";import{c as S}from"./utils.ZJ_V-BP8.js";import"./_sentry-release-injection-file.DwF5PoZy.js";import{Button as te}from"./button.DdFpa7eA.js";import{u as re}from"./index.BUvKg88E.js";import{c as _,A as oe,C as ae,a as ne,R as se}from"./index.C40iHNIO.js";import{P as ie,D as ce}from"./index.DNy9wnS3.js";import"./_commonjsHelpers.g73XWfsI.js";import"./index.BZ012Z6J.js";import"./index.CLMpW3Is.js";import"./floating-ui.dom.CAzuI_-r.js";import"./index.BU6eJ7BP.js";(function(){try{var e=typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{},t=new e.Error().stack;t&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[t]="3b2f233f-12eb-4fb5-b609-e24c5eef0c3b",e._sentryDebugIdIdentifier="sentry-dbid-3b2f233f-12eb-4fb5-b609-e24c5eef0c3b")}catch{}})();var N="Avatar",[de,Fe]=j(N),[le,T]=de(N),H=a.forwardRef((e,t)=>{const{__scopeAvatar:r,...n}=e,[s,c]=a.useState("idle");return o.jsx(le,{scope:r,imageLoadingStatus:s,onImageLoadingStatusChange:c,children:o.jsx(w.span,{...n,ref:t})})});H.displayName=N;var D="AvatarImage",I=a.forwardRef((e,t)=>{const{__scopeAvatar:r,src:n,onLoadingStatusChange:s=()=>{},...c}=e,u=T(D,r),l=ue(n,c.referrerPolicy),d=Z(p=>{s(p),u.onImageLoadingStatusChange(p)});return E(()=>{l!=="idle"&&d(l)},[l,d]),l==="loaded"?o.jsx(w.img,{...c,ref:t,src:n}):null});I.displayName=D;var L="AvatarFallback",O=a.forwardRef((e,t)=>{const{__scopeAvatar:r,delayMs:n,...s}=e,c=T(L,r),[u,l]=a.useState(n===void 0);return a.useEffect(()=>{if(n!==void 0){const d=window.setTimeout(()=>l(!0),n);return()=>window.clearTimeout(d)}},[n]),u&&c.imageLoadingStatus!=="loaded"?o.jsx(w.span,{...s,ref:t}):null});O.displayName=L;function ue(e,t){const[r,n]=a.useState("idle");return E(()=>{if(!e){n("error");return}let s=!0;const c=new window.Image,u=l=>()=>{s&&n(l)};return n("loading"),c.onload=u("loaded"),c.onerror=u("error"),c.src=e,t&&(c.referrerPolicy=t),()=>{s=!1}},[e,t]),r}var k=H,F=I,M=O;const $=a.forwardRef(({className:e,...t},r)=>o.jsx(k,{ref:r,className:S("relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",e),...t}));$.displayName=k.displayName;const U=a.forwardRef(({className:e,...t},r)=>o.jsx(F,{ref:r,className:S("aspect-square h-full w-full",e),...t}));U.displayName=F.displayName;const B=a.forwardRef(({className:e,...t},r)=>o.jsx(M,{ref:r,className:S("flex h-full w-full items-center justify-center rounded-full bg-muted",e),...t}));B.displayName=M.displayName;var y,P="HoverCard",[W,Me]=j(P,[_]),R=_(),[fe,A]=W(P),z=e=>{const{__scopeHoverCard:t,children:r,open:n,defaultOpen:s,onOpenChange:c,openDelay:u=700,closeDelay:l=300}=e,d=R(t),p=a.useRef(0),m=a.useRef(0),h=a.useRef(!1),v=a.useRef(!1),[x=!1,i]=ee({prop:n,defaultProp:s,onChange:c}),g=a.useCallback(()=>{clearTimeout(m.current),p.current=window.setTimeout(()=>i(!0),u)},[u,i]),Q=a.useCallback(()=>{clearTimeout(p.current),!h.current&&!v.current&&(m.current=window.setTimeout(()=>i(!1),l))},[l,i]),X=a.useCallback(()=>i(!1),[i]);return a.useEffect(()=>()=>{clearTimeout(p.current),clearTimeout(m.current)},[]),o.jsx(fe,{scope:t,open:x,onOpenChange:i,onOpen:g,onClose:Q,onDismiss:X,hasSelectionRef:h,isPointerDownOnContentRef:v,children:o.jsx(se,{...d,children:r})})};z.displayName=P;var G="HoverCardTrigger",K=a.forwardRef((e,t)=>{const{__scopeHoverCard:r,...n}=e,s=A(G,r),c=R(r);return o.jsx(oe,{asChild:!0,...c,children:o.jsx(w.a,{"data-state":s.open?"open":"closed",...n,ref:t,onPointerEnter:f(e.onPointerEnter,b(s.onOpen)),onPointerLeave:f(e.onPointerLeave,b(s.onClose)),onFocus:f(e.onFocus,s.onOpen),onBlur:f(e.onBlur,s.onClose),onTouchStart:f(e.onTouchStart,u=>u.preventDefault())})})});K.displayName=G;var pe="HoverCardPortal",[$e,me]=W(pe,{forceMount:void 0}),C="HoverCardContent",V=a.forwardRef((e,t)=>{const r=me(C,e.__scopeHoverCard),{forceMount:n=r.forceMount,...s}=e,c=A(C,e.__scopeHoverCard);return o.jsx(ie,{present:n||c.open,children:o.jsx(ve,{"data-state":c.open?"open":"closed",...s,onPointerEnter:f(e.onPointerEnter,b(c.onOpen)),onPointerLeave:f(e.onPointerLeave,b(c.onClose)),ref:t})})});V.displayName=C;var ve=a.forwardRef((e,t)=>{const{__scopeHoverCard:r,onEscapeKeyDown:n,onPointerDownOutside:s,onFocusOutside:c,onInteractOutside:u,...l}=e,d=A(C,r),p=R(r),m=a.useRef(null),h=re(t,m),[v,x]=a.useState(!1);return a.useEffect(()=>{if(v){const i=document.body;return y=i.style.userSelect||i.style.webkitUserSelect,i.style.userSelect="none",i.style.webkitUserSelect="none",()=>{i.style.userSelect=y,i.style.webkitUserSelect=y}}},[v]),a.useEffect(()=>{if(m.current){const i=()=>{x(!1),d.isPointerDownOnContentRef.current=!1,setTimeout(()=>{document.getSelection()?.toString()!==""&&(d.hasSelectionRef.current=!0)})};return document.addEventListener("pointerup",i),()=>{document.removeEventListener("pointerup",i),d.hasSelectionRef.current=!1,d.isPointerDownOnContentRef.current=!1}}},[d.isPointerDownOnContentRef,d.hasSelectionRef]),a.useEffect(()=>{m.current&&ge(m.current).forEach(g=>g.setAttribute("tabindex","-1"))}),o.jsx(ce,{asChild:!0,disableOutsidePointerEvents:!1,onInteractOutside:u,onEscapeKeyDown:n,onPointerDownOutside:s,onFocusOutside:f(c,i=>{i.preventDefault()}),onDismiss:d.onDismiss,children:o.jsx(ae,{...p,...l,onPointerDown:f(l.onPointerDown,i=>{i.currentTarget.contains(i.target)&&x(!0),d.hasSelectionRef.current=!1,d.isPointerDownOnContentRef.current=!0}),ref:h,style:{...l.style,userSelect:v?"text":void 0,WebkitUserSelect:v?"text":void 0,"--radix-hover-card-content-transform-origin":"var(--radix-popper-transform-origin)","--radix-hover-card-content-available-width":"var(--radix-popper-available-width)","--radix-hover-card-content-available-height":"var(--radix-popper-available-height)","--radix-hover-card-trigger-width":"var(--radix-popper-anchor-width)","--radix-hover-card-trigger-height":"var(--radix-popper-anchor-height)"}})})}),he="HoverCardArrow",xe=a.forwardRef((e,t)=>{const{__scopeHoverCard:r,...n}=e,s=R(r);return o.jsx(ne,{...s,...n,ref:t})});xe.displayName=he;function b(e){return t=>t.pointerType==="touch"?void 0:e()}function ge(e){const t=[],r=document.createTreeWalker(e,NodeFilter.SHOW_ELEMENT,{acceptNode:n=>n.tabIndex>=0?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_SKIP});for(;r.nextNode();)t.push(r.currentNode);return t}var Ce=z,be=K,q=V;const we=Ce,Se=be,J=a.forwardRef(({className:e,align:t="center",sideOffset:r=4,...n},s)=>o.jsx(q,{ref:s,align:t,sideOffset:r,className:S("z-50 w-64 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",e),...n}));J.displayName=q.displayName;function Ue(){return o.jsxs(we,{children:[o.jsx(Se,{asChild:!0,children:o.jsx(te,{variant:"link",children:"@nextjs"})}),o.jsx(J,{className:"w-80",children:o.jsxs("div",{className:"flex justify-between space-x-4",children:[o.jsxs($,{children:[o.jsx(U,{src:"https://github.com/vercel.png"}),o.jsx(B,{children:"VC"})]}),o.jsxs("div",{className:"space-y-1",children:[o.jsx("h4",{className:"text-sm font-semibold",children:"@nextjs"}),o.jsx("p",{className:"text-sm",children:"The React Framework – created and maintained by @vercel."}),o.jsxs("div",{className:"flex items-center pt-2",children:[o.jsx(Y,{className:"mr-2 h-4 w-4 opacity-70"})," ",o.jsx("span",{className:"text-xs text-muted-foreground",children:"Joined December 2021"})]})]})]})})]})}export{Ue as default};
//# sourceMappingURL=HoverCard.C2RXhKiy.js.map