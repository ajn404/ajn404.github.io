(function(){try{var t=typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{},e=new t.Error().stack;e&&(t._sentryDebugIds=t._sentryDebugIds||{},t._sentryDebugIds[e]="15f1b078-63df-4223-a484-ea238bfb1fb1",t._sentryDebugIdIdentifier="sentry-dbid-15f1b078-63df-4223-a484-ea238bfb1fb1")}catch{}})();const Et=["top","right","bottom","left"],bt=["start","end"],At=Et.reduce((t,e)=>t.concat(e,e+"-"+bt[0],e+"-"+bt[1]),[]),$=Math.min,S=Math.max,it=Math.round,ot=Math.floor,z=t=>({x:t,y:t}),Vt={left:"right",right:"left",bottom:"top",top:"bottom"},_t={start:"end",end:"start"};function ut(t,e,n){return S(t,$(e,n))}function H(t,e){return typeof t=="function"?t(e):t}function k(t){return t.split("-")[0]}function W(t){return t.split("-")[1]}function mt(t){return t==="x"?"y":"x"}function ht(t){return t==="y"?"height":"width"}function X(t){return["top","bottom"].includes(k(t))?"y":"x"}function gt(t){return mt(X(t))}function Pt(t,e,n){n===void 0&&(n=!1);const o=W(t),i=gt(t),s=ht(i);let r=i==="x"?o===(n?"end":"start")?"right":"left":o==="start"?"bottom":"top";return e.reference[s]>e.floating[s]&&(r=rt(r)),[r,rt(r)]}function It(t){const e=rt(t);return[st(t),e,st(e)]}function st(t){return t.replace(/start|end/g,e=>_t[e])}function zt(t,e,n){const o=["left","right"],i=["right","left"],s=["top","bottom"],r=["bottom","top"];switch(t){case"top":case"bottom":return n?e?i:o:e?o:i;case"left":case"right":return e?s:r;default:return[]}}function Yt(t,e,n,o){const i=W(t);let s=zt(k(t),n==="start",o);return i&&(s=s.map(r=>r+"-"+i),e&&(s=s.concat(s.map(st)))),s}function rt(t){return t.replace(/left|right|bottom|top/g,e=>Vt[e])}function jt(t){return{top:0,right:0,bottom:0,left:0,...t}}function pt(t){return typeof t!="number"?jt(t):{top:t,right:t,bottom:t,left:t}}function Q(t){const{x:e,y:n,width:o,height:i}=t;return{width:o,height:i,top:n,left:e,right:e+o,bottom:n+i,x:e,y:n}}function Ot(t,e,n){let{reference:o,floating:i}=t;const s=X(e),r=gt(e),c=ht(r),f=k(e),a=s==="y",d=o.x+o.width/2-i.width/2,l=o.y+o.height/2-i.height/2,m=o[c]/2-i[c]/2;let u;switch(f){case"top":u={x:d,y:o.y-i.height};break;case"bottom":u={x:d,y:o.y+o.height};break;case"right":u={x:o.x+o.width,y:l};break;case"left":u={x:o.x-i.width,y:l};break;default:u={x:o.x,y:o.y}}switch(W(e)){case"start":u[r]-=m*(n&&a?-1:1);break;case"end":u[r]+=m*(n&&a?-1:1);break}return u}const Xt=async(t,e,n)=>{const{placement:o="bottom",strategy:i="absolute",middleware:s=[],platform:r}=n,c=s.filter(Boolean),f=await(r.isRTL==null?void 0:r.isRTL(e));let a=await r.getElementRects({reference:t,floating:e,strategy:i}),{x:d,y:l}=Ot(a,o,f),m=o,u={},h=0;for(let g=0;g<c.length;g++){const{name:p,fn:w}=c[g],{x,y,data:A,reset:v}=await w({x:d,y:l,initialPlacement:o,placement:m,strategy:i,middlewareData:u,rects:a,platform:r,elements:{reference:t,floating:e}});d=x??d,l=y??l,u={...u,[p]:{...u[p],...A}},v&&h<=50&&(h++,typeof v=="object"&&(v.placement&&(m=v.placement),v.rects&&(a=v.rects===!0?await r.getElementRects({reference:t,floating:e,strategy:i}):v.rects),{x:d,y:l}=Ot(a,m,f)),g=-1)}return{x:d,y:l,placement:m,strategy:i,middlewareData:u}};async function K(t,e){var n;e===void 0&&(e={});const{x:o,y:i,platform:s,rects:r,elements:c,strategy:f}=t,{boundary:a="clippingAncestors",rootBoundary:d="viewport",elementContext:l="floating",altBoundary:m=!1,padding:u=0}=H(e,t),h=pt(u),p=c[m?l==="floating"?"reference":"floating":l],w=Q(await s.getClippingRect({element:(n=await(s.isElement==null?void 0:s.isElement(p)))==null||n?p:p.contextElement||await(s.getDocumentElement==null?void 0:s.getDocumentElement(c.floating)),boundary:a,rootBoundary:d,strategy:f})),x=l==="floating"?{x:o,y:i,width:r.floating.width,height:r.floating.height}:r.reference,y=await(s.getOffsetParent==null?void 0:s.getOffsetParent(c.floating)),A=await(s.isElement==null?void 0:s.isElement(y))?await(s.getScale==null?void 0:s.getScale(y))||{x:1,y:1}:{x:1,y:1},v=Q(s.convertOffsetParentRelativeRectToViewportRelativeRect?await s.convertOffsetParentRelativeRectToViewportRelativeRect({elements:c,rect:x,offsetParent:y,strategy:f}):x);return{top:(w.top-v.top+h.top)/A.y,bottom:(v.bottom-w.bottom+h.bottom)/A.y,left:(w.left-v.left+h.left)/A.x,right:(v.right-w.right+h.right)/A.x}}const qt=t=>({name:"arrow",options:t,async fn(e){const{x:n,y:o,placement:i,rects:s,platform:r,elements:c,middlewareData:f}=e,{element:a,padding:d=0}=H(t,e)||{};if(a==null)return{};const l=pt(d),m={x:n,y:o},u=gt(i),h=ht(u),g=await r.getDimensions(a),p=u==="y",w=p?"top":"left",x=p?"bottom":"right",y=p?"clientHeight":"clientWidth",A=s.reference[h]+s.reference[u]-m[u]-s.floating[h],v=m[u]-s.reference[u],O=await(r.getOffsetParent==null?void 0:r.getOffsetParent(a));let T=O?O[y]:0;(!T||!await(r.isElement==null?void 0:r.isElement(O)))&&(T=c.floating[y]||s.floating[h]);const F=A/2-v/2,L=T/2-g[h]/2-1,b=$(l[w],L),R=$(l[x],L),E=b,P=T-g[h]-R,C=T/2-g[h]/2+F,_=ut(E,C,P),M=!f.arrow&&W(i)!=null&&C!==_&&s.reference[h]/2-(C<E?b:R)-g[h]/2<0,B=M?C<E?C-E:C-P:0;return{[u]:m[u]+B,data:{[u]:_,centerOffset:C-_-B,...M&&{alignmentOffset:B}},reset:M}}});function Ut(t,e,n){return(t?[...n.filter(i=>W(i)===t),...n.filter(i=>W(i)!==t)]:n.filter(i=>k(i)===i)).filter(i=>t?W(i)===t||(e?st(i)!==i:!1):!0)}const Kt=function(t){return t===void 0&&(t={}),{name:"autoPlacement",options:t,async fn(e){var n,o,i;const{rects:s,middlewareData:r,placement:c,platform:f,elements:a}=e,{crossAxis:d=!1,alignment:l,allowedPlacements:m=At,autoAlignment:u=!0,...h}=H(t,e),g=l!==void 0||m===At?Ut(l||null,u,m):m,p=await K(e,h),w=((n=r.autoPlacement)==null?void 0:n.index)||0,x=g[w];if(x==null)return{};const y=Pt(x,s,await(f.isRTL==null?void 0:f.isRTL(a.floating)));if(c!==x)return{reset:{placement:g[0]}};const A=[p[k(x)],p[y[0]],p[y[1]]],v=[...((o=r.autoPlacement)==null?void 0:o.overflows)||[],{placement:x,overflows:A}],O=g[w+1];if(O)return{data:{index:w+1,overflows:v},reset:{placement:O}};const T=v.map(b=>{const R=W(b.placement);return[b.placement,R&&d?b.overflows.slice(0,2).reduce((E,P)=>E+P,0):b.overflows[0],b.overflows]}).sort((b,R)=>b[1]-R[1]),L=((i=T.filter(b=>b[2].slice(0,W(b[0])?2:3).every(R=>R<=0))[0])==null?void 0:i[0])||T[0][0];return L!==c?{data:{index:w+1,overflows:v},reset:{placement:L}}:{}}}},Gt=function(t){return t===void 0&&(t={}),{name:"flip",options:t,async fn(e){var n,o;const{placement:i,middlewareData:s,rects:r,initialPlacement:c,platform:f,elements:a}=e,{mainAxis:d=!0,crossAxis:l=!0,fallbackPlacements:m,fallbackStrategy:u="bestFit",fallbackAxisSideDirection:h="none",flipAlignment:g=!0,...p}=H(t,e);if((n=s.arrow)!=null&&n.alignmentOffset)return{};const w=k(i),x=X(c),y=k(c)===c,A=await(f.isRTL==null?void 0:f.isRTL(a.floating)),v=m||(y||!g?[rt(c)]:It(c)),O=h!=="none";!m&&O&&v.push(...Yt(c,g,h,A));const T=[c,...v],F=await K(e,p),L=[];let b=((o=s.flip)==null?void 0:o.overflows)||[];if(d&&L.push(F[w]),l){const C=Pt(i,r,A);L.push(F[C[0]],F[C[1]])}if(b=[...b,{placement:i,overflows:L}],!L.every(C=>C<=0)){var R,E;const C=(((R=s.flip)==null?void 0:R.index)||0)+1,_=T[C];if(_)return{data:{index:C,overflows:b},reset:{placement:_}};let M=(E=b.filter(B=>B.overflows[0]<=0).sort((B,I)=>B.overflows[1]-I.overflows[1])[0])==null?void 0:E.placement;if(!M)switch(u){case"bestFit":{var P;const B=(P=b.filter(I=>{if(O){const q=X(I.placement);return q===x||q==="y"}return!0}).map(I=>[I.placement,I.overflows.filter(q=>q>0).reduce((q,Nt)=>q+Nt,0)]).sort((I,q)=>I[1]-q[1])[0])==null?void 0:P[0];B&&(M=B);break}case"initialPlacement":M=c;break}if(i!==M)return{reset:{placement:M}}}return{}}}};function Rt(t,e){return{top:t.top-e.height,right:t.right-e.width,bottom:t.bottom-e.height,left:t.left-e.width}}function Ct(t){return Et.some(e=>t[e]>=0)}const Jt=function(t){return t===void 0&&(t={}),{name:"hide",options:t,async fn(e){const{rects:n}=e,{strategy:o="referenceHidden",...i}=H(t,e);switch(o){case"referenceHidden":{const s=await K(e,{...i,elementContext:"reference"}),r=Rt(s,n.reference);return{data:{referenceHiddenOffsets:r,referenceHidden:Ct(r)}}}case"escaped":{const s=await K(e,{...i,altBoundary:!0}),r=Rt(s,n.floating);return{data:{escapedOffsets:r,escaped:Ct(r)}}}default:return{}}}}};function Dt(t){const e=$(...t.map(s=>s.left)),n=$(...t.map(s=>s.top)),o=S(...t.map(s=>s.right)),i=S(...t.map(s=>s.bottom));return{x:e,y:n,width:o-e,height:i-n}}function Qt(t){const e=t.slice().sort((i,s)=>i.y-s.y),n=[];let o=null;for(let i=0;i<e.length;i++){const s=e[i];!o||s.y-o.y>o.height/2?n.push([s]):n[n.length-1].push(s),o=s}return n.map(i=>Q(Dt(i)))}const Zt=function(t){return t===void 0&&(t={}),{name:"inline",options:t,async fn(e){const{placement:n,elements:o,rects:i,platform:s,strategy:r}=e,{padding:c=2,x:f,y:a}=H(t,e),d=Array.from(await(s.getClientRects==null?void 0:s.getClientRects(o.reference))||[]),l=Qt(d),m=Q(Dt(d)),u=pt(c);function h(){if(l.length===2&&l[0].left>l[1].right&&f!=null&&a!=null)return l.find(p=>f>p.left-u.left&&f<p.right+u.right&&a>p.top-u.top&&a<p.bottom+u.bottom)||m;if(l.length>=2){if(X(n)==="y"){const b=l[0],R=l[l.length-1],E=k(n)==="top",P=b.top,C=R.bottom,_=E?b.left:R.left,M=E?b.right:R.right,B=M-_,I=C-P;return{top:P,bottom:C,left:_,right:M,width:B,height:I,x:_,y:P}}const p=k(n)==="left",w=S(...l.map(b=>b.right)),x=$(...l.map(b=>b.left)),y=l.filter(b=>p?b.left===x:b.right===w),A=y[0].top,v=y[y.length-1].bottom,O=x,T=w,F=T-O,L=v-A;return{top:A,bottom:v,left:O,right:T,width:F,height:L,x:O,y:A}}return m}const g=await s.getElementRects({reference:{getBoundingClientRect:h},floating:o.floating,strategy:r});return i.reference.x!==g.reference.x||i.reference.y!==g.reference.y||i.reference.width!==g.reference.width||i.reference.height!==g.reference.height?{reset:{rects:g}}:{}}}};async function te(t,e){const{placement:n,platform:o,elements:i}=t,s=await(o.isRTL==null?void 0:o.isRTL(i.floating)),r=k(n),c=W(n),f=X(n)==="y",a=["left","top"].includes(r)?-1:1,d=s&&f?-1:1,l=H(e,t);let{mainAxis:m,crossAxis:u,alignmentAxis:h}=typeof l=="number"?{mainAxis:l,crossAxis:0,alignmentAxis:null}:{mainAxis:l.mainAxis||0,crossAxis:l.crossAxis||0,alignmentAxis:l.alignmentAxis};return c&&typeof h=="number"&&(u=c==="end"?h*-1:h),f?{x:u*d,y:m*a}:{x:m*a,y:u*d}}const ee=function(t){return t===void 0&&(t=0),{name:"offset",options:t,async fn(e){var n,o;const{x:i,y:s,placement:r,middlewareData:c}=e,f=await te(e,t);return r===((n=c.offset)==null?void 0:n.placement)&&(o=c.arrow)!=null&&o.alignmentOffset?{}:{x:i+f.x,y:s+f.y,data:{...f,placement:r}}}}},ne=function(t){return t===void 0&&(t={}),{name:"shift",options:t,async fn(e){const{x:n,y:o,placement:i}=e,{mainAxis:s=!0,crossAxis:r=!1,limiter:c={fn:p=>{let{x:w,y:x}=p;return{x:w,y:x}}},...f}=H(t,e),a={x:n,y:o},d=await K(e,f),l=X(k(i)),m=mt(l);let u=a[m],h=a[l];if(s){const p=m==="y"?"top":"left",w=m==="y"?"bottom":"right",x=u+d[p],y=u-d[w];u=ut(x,u,y)}if(r){const p=l==="y"?"top":"left",w=l==="y"?"bottom":"right",x=h+d[p],y=h-d[w];h=ut(x,h,y)}const g=c.fn({...e,[m]:u,[l]:h});return{...g,data:{x:g.x-n,y:g.y-o,enabled:{[m]:s,[l]:r}}}}}},oe=function(t){return t===void 0&&(t={}),{options:t,fn(e){const{x:n,y:o,placement:i,rects:s,middlewareData:r}=e,{offset:c=0,mainAxis:f=!0,crossAxis:a=!0}=H(t,e),d={x:n,y:o},l=X(i),m=mt(l);let u=d[m],h=d[l];const g=H(c,e),p=typeof g=="number"?{mainAxis:g,crossAxis:0}:{mainAxis:0,crossAxis:0,...g};if(f){const y=m==="y"?"height":"width",A=s.reference[m]-s.floating[y]+p.mainAxis,v=s.reference[m]+s.reference[y]-p.mainAxis;u<A?u=A:u>v&&(u=v)}if(a){var w,x;const y=m==="y"?"width":"height",A=["top","left"].includes(k(i)),v=s.reference[l]-s.floating[y]+(A&&((w=r.offset)==null?void 0:w[l])||0)+(A?0:p.crossAxis),O=s.reference[l]+s.reference[y]+(A?0:((x=r.offset)==null?void 0:x[l])||0)-(A?p.crossAxis:0);h<v?h=v:h>O&&(h=O)}return{[m]:u,[l]:h}}}},ie=function(t){return t===void 0&&(t={}),{name:"size",options:t,async fn(e){var n,o;const{placement:i,rects:s,platform:r,elements:c}=e,{apply:f=()=>{},...a}=H(t,e),d=await K(e,a),l=k(i),m=W(i),u=X(i)==="y",{width:h,height:g}=s.floating;let p,w;l==="top"||l==="bottom"?(p=l,w=m===(await(r.isRTL==null?void 0:r.isRTL(c.floating))?"start":"end")?"left":"right"):(w=l,p=m==="end"?"top":"bottom");const x=g-d.top-d.bottom,y=h-d.left-d.right,A=$(g-d[p],x),v=$(h-d[w],y),O=!e.middlewareData.shift;let T=A,F=v;if((n=e.middlewareData.shift)!=null&&n.enabled.x&&(F=y),(o=e.middlewareData.shift)!=null&&o.enabled.y&&(T=x),O&&!m){const b=S(d.left,0),R=S(d.right,0),E=S(d.top,0),P=S(d.bottom,0);u?F=h-2*(b!==0||R!==0?b+R:S(d.left,d.right)):T=g-2*(E!==0||P!==0?E+P:S(d.top,d.bottom))}await f({...e,availableWidth:F,availableHeight:T});const L=await r.getDimensions(c.floating);return h!==L.width||g!==L.height?{reset:{rects:!0}}:{}}}};function ct(){return typeof window<"u"}function tt(t){return kt(t)?(t.nodeName||"").toLowerCase():"#document"}function D(t){var e;return(t==null||(e=t.ownerDocument)==null?void 0:e.defaultView)||window}function j(t){var e;return(e=(kt(t)?t.ownerDocument:t.document)||window.document)==null?void 0:e.documentElement}function kt(t){return ct()?t instanceof Node||t instanceof D(t).Node:!1}function N(t){return ct()?t instanceof Element||t instanceof D(t).Element:!1}function Y(t){return ct()?t instanceof HTMLElement||t instanceof D(t).HTMLElement:!1}function Tt(t){return!ct()||typeof ShadowRoot>"u"?!1:t instanceof ShadowRoot||t instanceof D(t).ShadowRoot}function nt(t){const{overflow:e,overflowX:n,overflowY:o,display:i}=V(t);return/auto|scroll|overlay|hidden|clip/.test(e+o+n)&&!["inline","contents"].includes(i)}function se(t){return["table","td","th"].includes(tt(t))}function lt(t){return[":popover-open",":modal"].some(e=>{try{return t.matches(e)}catch{return!1}})}function wt(t){const e=xt(),n=N(t)?V(t):t;return n.transform!=="none"||n.perspective!=="none"||(n.containerType?n.containerType!=="normal":!1)||!e&&(n.backdropFilter?n.backdropFilter!=="none":!1)||!e&&(n.filter?n.filter!=="none":!1)||["transform","perspective","filter"].some(o=>(n.willChange||"").includes(o))||["paint","layout","strict","content"].some(o=>(n.contain||"").includes(o))}function re(t){let e=U(t);for(;Y(e)&&!Z(e);){if(wt(e))return e;if(lt(e))return null;e=U(e)}return null}function xt(){return typeof CSS>"u"||!CSS.supports?!1:CSS.supports("-webkit-backdrop-filter","none")}function Z(t){return["html","body","#document"].includes(tt(t))}function V(t){return D(t).getComputedStyle(t)}function ft(t){return N(t)?{scrollLeft:t.scrollLeft,scrollTop:t.scrollTop}:{scrollLeft:t.scrollX,scrollTop:t.scrollY}}function U(t){if(tt(t)==="html")return t;const e=t.assignedSlot||t.parentNode||Tt(t)&&t.host||j(t);return Tt(e)?e.host:e}function Ft(t){const e=U(t);return Z(e)?t.ownerDocument?t.ownerDocument.body:t.body:Y(e)&&nt(e)?e:Ft(e)}function et(t,e,n){var o;e===void 0&&(e=[]),n===void 0&&(n=!0);const i=Ft(t),s=i===((o=t.ownerDocument)==null?void 0:o.body),r=D(i);if(s){const c=dt(r);return e.concat(r,r.visualViewport||[],nt(i)?i:[],c&&n?et(c):[])}return e.concat(i,et(i,[],n))}function dt(t){return t.parent&&Object.getPrototypeOf(t.parent)?t.frameElement:null}function Mt(t){const e=V(t);let n=parseFloat(e.width)||0,o=parseFloat(e.height)||0;const i=Y(t),s=i?t.offsetWidth:n,r=i?t.offsetHeight:o,c=it(n)!==s||it(o)!==r;return c&&(n=s,o=r),{width:n,height:o,$:c}}function yt(t){return N(t)?t:t.contextElement}function J(t){const e=yt(t);if(!Y(e))return z(1);const n=e.getBoundingClientRect(),{width:o,height:i,$:s}=Mt(e);let r=(s?it(n.width):n.width)/o,c=(s?it(n.height):n.height)/i;return(!r||!Number.isFinite(r))&&(r=1),(!c||!Number.isFinite(c))&&(c=1),{x:r,y:c}}const ce=z(0);function Bt(t){const e=D(t);return!xt()||!e.visualViewport?ce:{x:e.visualViewport.offsetLeft,y:e.visualViewport.offsetTop}}function le(t,e,n){return e===void 0&&(e=!1),!n||e&&n!==D(t)?!1:e}function G(t,e,n,o){e===void 0&&(e=!1),n===void 0&&(n=!1);const i=t.getBoundingClientRect(),s=yt(t);let r=z(1);e&&(o?N(o)&&(r=J(o)):r=J(t));const c=le(s,n,o)?Bt(s):z(0);let f=(i.left+c.x)/r.x,a=(i.top+c.y)/r.y,d=i.width/r.x,l=i.height/r.y;if(s){const m=D(s),u=o&&N(o)?D(o):o;let h=m,g=dt(h);for(;g&&o&&u!==h;){const p=J(g),w=g.getBoundingClientRect(),x=V(g),y=w.left+(g.clientLeft+parseFloat(x.paddingLeft))*p.x,A=w.top+(g.clientTop+parseFloat(x.paddingTop))*p.y;f*=p.x,a*=p.y,d*=p.x,l*=p.y,f+=y,a+=A,h=D(g),g=dt(h)}}return Q({width:d,height:l,x:f,y:a})}function vt(t,e){const n=ft(t).scrollLeft;return e?e.left+n:G(j(t)).left+n}function Wt(t,e,n){n===void 0&&(n=!1);const o=t.getBoundingClientRect(),i=o.left+e.scrollLeft-(n?0:vt(t,o)),s=o.top+e.scrollTop;return{x:i,y:s}}function fe(t){let{elements:e,rect:n,offsetParent:o,strategy:i}=t;const s=i==="fixed",r=j(o),c=e?lt(e.floating):!1;if(o===r||c&&s)return n;let f={scrollLeft:0,scrollTop:0},a=z(1);const d=z(0),l=Y(o);if((l||!l&&!s)&&((tt(o)!=="body"||nt(r))&&(f=ft(o)),Y(o))){const u=G(o);a=J(o),d.x=u.x+o.clientLeft,d.y=u.y+o.clientTop}const m=r&&!l&&!s?Wt(r,f,!0):z(0);return{width:n.width*a.x,height:n.height*a.y,x:n.x*a.x-f.scrollLeft*a.x+d.x+m.x,y:n.y*a.y-f.scrollTop*a.y+d.y+m.y}}function ae(t){return Array.from(t.getClientRects())}function ue(t){const e=j(t),n=ft(t),o=t.ownerDocument.body,i=S(e.scrollWidth,e.clientWidth,o.scrollWidth,o.clientWidth),s=S(e.scrollHeight,e.clientHeight,o.scrollHeight,o.clientHeight);let r=-n.scrollLeft+vt(t);const c=-n.scrollTop;return V(o).direction==="rtl"&&(r+=S(e.clientWidth,o.clientWidth)-i),{width:i,height:s,x:r,y:c}}function de(t,e){const n=D(t),o=j(t),i=n.visualViewport;let s=o.clientWidth,r=o.clientHeight,c=0,f=0;if(i){s=i.width,r=i.height;const a=xt();(!a||a&&e==="fixed")&&(c=i.offsetLeft,f=i.offsetTop)}return{width:s,height:r,x:c,y:f}}function me(t,e){const n=G(t,!0,e==="fixed"),o=n.top+t.clientTop,i=n.left+t.clientLeft,s=Y(t)?J(t):z(1),r=t.clientWidth*s.x,c=t.clientHeight*s.y,f=i*s.x,a=o*s.y;return{width:r,height:c,x:f,y:a}}function St(t,e,n){let o;if(e==="viewport")o=de(t,n);else if(e==="document")o=ue(j(t));else if(N(e))o=me(e,n);else{const i=Bt(t);o={x:e.x-i.x,y:e.y-i.y,width:e.width,height:e.height}}return Q(o)}function $t(t,e){const n=U(t);return n===e||!N(n)||Z(n)?!1:V(n).position==="fixed"||$t(n,e)}function he(t,e){const n=e.get(t);if(n)return n;let o=et(t,[],!1).filter(c=>N(c)&&tt(c)!=="body"),i=null;const s=V(t).position==="fixed";let r=s?U(t):t;for(;N(r)&&!Z(r);){const c=V(r),f=wt(r);!f&&c.position==="fixed"&&(i=null),(s?!f&&!i:!f&&c.position==="static"&&!!i&&["absolute","fixed"].includes(i.position)||nt(r)&&!f&&$t(t,r))?o=o.filter(d=>d!==r):i=c,r=U(r)}return e.set(t,o),o}function ge(t){let{element:e,boundary:n,rootBoundary:o,strategy:i}=t;const r=[...n==="clippingAncestors"?lt(e)?[]:he(e,this._c):[].concat(n),o],c=r[0],f=r.reduce((a,d)=>{const l=St(e,d,i);return a.top=S(l.top,a.top),a.right=$(l.right,a.right),a.bottom=$(l.bottom,a.bottom),a.left=S(l.left,a.left),a},St(e,c,i));return{width:f.right-f.left,height:f.bottom-f.top,x:f.left,y:f.top}}function pe(t){const{width:e,height:n}=Mt(t);return{width:e,height:n}}function we(t,e,n){const o=Y(e),i=j(e),s=n==="fixed",r=G(t,!0,s,e);let c={scrollLeft:0,scrollTop:0};const f=z(0);if(o||!o&&!s)if((tt(e)!=="body"||nt(i))&&(c=ft(e)),o){const m=G(e,!0,s,e);f.x=m.x+e.clientLeft,f.y=m.y+e.clientTop}else i&&(f.x=vt(i));const a=i&&!o&&!s?Wt(i,c):z(0),d=r.left+c.scrollLeft-f.x-a.x,l=r.top+c.scrollTop-f.y-a.y;return{x:d,y:l,width:r.width,height:r.height}}function at(t){return V(t).position==="static"}function Lt(t,e){if(!Y(t)||V(t).position==="fixed")return null;if(e)return e(t);let n=t.offsetParent;return j(t)===n&&(n=n.ownerDocument.body),n}function Ht(t,e){const n=D(t);if(lt(t))return n;if(!Y(t)){let i=U(t);for(;i&&!Z(i);){if(N(i)&&!at(i))return i;i=U(i)}return n}let o=Lt(t,e);for(;o&&se(o)&&at(o);)o=Lt(o,e);return o&&Z(o)&&at(o)&&!wt(o)?n:o||re(t)||n}const xe=async function(t){const e=this.getOffsetParent||Ht,n=this.getDimensions,o=await n(t.floating);return{reference:we(t.reference,await e(t.floating),t.strategy),floating:{x:0,y:0,width:o.width,height:o.height}}};function ye(t){return V(t).direction==="rtl"}const ve={convertOffsetParentRelativeRectToViewportRelativeRect:fe,getDocumentElement:j,getClippingRect:ge,getOffsetParent:Ht,getElementRects:xe,getClientRects:ae,getDimensions:pe,getScale:J,isElement:N,isRTL:ye};function be(t,e){let n=null,o;const i=j(t);function s(){var c;clearTimeout(o),(c=n)==null||c.disconnect(),n=null}function r(c,f){c===void 0&&(c=!1),f===void 0&&(f=1),s();const{left:a,top:d,width:l,height:m}=t.getBoundingClientRect();if(c||e(),!l||!m)return;const u=ot(d),h=ot(i.clientWidth-(a+l)),g=ot(i.clientHeight-(d+m)),p=ot(a),x={rootMargin:-u+"px "+-h+"px "+-g+"px "+-p+"px",threshold:S(0,$(1,f))||1};let y=!0;function A(v){const O=v[0].intersectionRatio;if(O!==f){if(!y)return r();O?r(!1,O):o=setTimeout(()=>{r(!1,1e-7)},1e3)}y=!1}try{n=new IntersectionObserver(A,{...x,root:i.ownerDocument})}catch{n=new IntersectionObserver(A,x)}n.observe(t)}return r(!0),s}function Ae(t,e,n,o){o===void 0&&(o={});const{ancestorScroll:i=!0,ancestorResize:s=!0,elementResize:r=typeof ResizeObserver=="function",layoutShift:c=typeof IntersectionObserver=="function",animationFrame:f=!1}=o,a=yt(t),d=i||s?[...a?et(a):[],...et(e)]:[];d.forEach(w=>{i&&w.addEventListener("scroll",n,{passive:!0}),s&&w.addEventListener("resize",n)});const l=a&&c?be(a,n):null;let m=-1,u=null;r&&(u=new ResizeObserver(w=>{let[x]=w;x&&x.target===a&&u&&(u.unobserve(e),cancelAnimationFrame(m),m=requestAnimationFrame(()=>{var y;(y=u)==null||y.observe(e)})),n()}),a&&!f&&u.observe(a),u.observe(e));let h,g=f?G(t):null;f&&p();function p(){const w=G(t);g&&(w.x!==g.x||w.y!==g.y||w.width!==g.width||w.height!==g.height)&&n(),g=w,h=requestAnimationFrame(p)}return n(),()=>{var w;d.forEach(x=>{i&&x.removeEventListener("scroll",n),s&&x.removeEventListener("resize",n)}),l?.(),(w=u)==null||w.disconnect(),u=null,f&&cancelAnimationFrame(h)}}const Oe=K,Re=ee,Ce=Kt,Te=ne,Se=Gt,Le=ie,Ee=Jt,Pe=qt,De=Zt,ke=oe,Fe=(t,e,n)=>{const o=new Map,i={platform:ve,...n},s={...i.platform,_c:o};return Xt(t,e,{...i,platform:s})};export{Le as a,Pe as b,Fe as c,Ae as d,Ce as e,Se as f,Oe as g,Ee as h,De as i,ke as l,Re as o,Te as s};
//# sourceMappingURL=floating-ui.dom.CAzuI_-r.js.map