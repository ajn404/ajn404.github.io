import{j as S}from"./jsx-runtime.C6v7sNnU.js";import{r as N}from"./index.A1bncjHG.js";import"./_sentry-release-injection-file.DwF5PoZy.js";import"./_commonjsHelpers.g73XWfsI.js";(function(){try{var e=typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{},t=new e.Error().stack;t&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[t]="5fc4c079-41ec-44db-9056-0d134720480c",e._sentryDebugIdIdentifier="sentry-dbid-5fc4c079-41ec-44db-9056-0d134720480c")}catch{}})();const A="http://www.w3.org/2000/svg";class W{constructor(t){this.seed=t}next(){return this.seed?(2**31-1&(this.seed=Math.imul(48271,this.seed)))/2**31:Math.random()}}function M(e,t,s,n,i){return{type:"path",ops:R(e,t,s,n,i)}}function P(e,t,s){const n=(e||[]).length;if(n>2){const i=[];for(let a=0;a<n-1;a++)i.push(...R(e[a][0],e[a][1],e[a+1][0],e[a+1][1],s));return t&&i.push(...R(e[n-1][0],e[n-1][1],e[0][0],e[0][1],s)),{type:"path",ops:i}}return n===2?M(e[0][0],e[0][1],e[1][0],e[1][1],s):{type:"path",ops:[]}}function q(e,t,s,n,i){return function(a,c){return P(a,!0,c)}([[e,t],[e+s,t],[e+s,t+n],[e,t+n]],i)}function O(e,t,s,n,i){return function(a,c,o,h){const[w,d]=T(h.increment,a,c,h.rx,h.ry,1,h.increment*L(.1,L(.4,1,o),o),o);let m=I(w,null,o);if(!o.disableMultiStroke){const[g]=T(h.increment,a,c,h.rx,h.ry,1.5,0,o),f=I(g,null,o);m=m.concat(f)}return{estimatedPoints:d,opset:{type:"path",ops:m}}}(e,t,i,function(a,c,o){const h=Math.sqrt(2*Math.PI*Math.sqrt((Math.pow(a/2,2)+Math.pow(c/2,2))/2)),w=Math.max(o.curveStepCount,o.curveStepCount/Math.sqrt(200)*h),d=2*Math.PI/w;let m=Math.abs(a/2),g=Math.abs(c/2);const f=1-o.curveFitting;return m+=v(m*f,o),g+=v(g*f,o),{increment:d,rx:m,ry:g}}(s,n,i)).opset}function j(e){return e.randomizer||(e.randomizer=new W(e.seed||0)),e.randomizer.next()}function L(e,t,s,n=1){return s.roughness*n*(j(s)*(t-e)+e)}function v(e,t,s=1){return L(-e,e,t,s)}function R(e,t,s,n,i,a=!1){const c=a?i.disableMultiStrokeFill:i.disableMultiStroke,o=$(e,t,s,n,i,!0,!1);if(c)return o;const h=$(e,t,s,n,i,!0,!0);return o.concat(h)}function $(e,t,s,n,i,a,c){const o=Math.pow(e-s,2)+Math.pow(t-n,2),h=Math.sqrt(o);let w=1;w=h<200?1:h>500?.4:-.0016668*h+1.233334;let d=i.maxRandomnessOffset||0;d*d*100>o&&(d=h/10);const m=d/2,g=.2+.2*j(i);let f=i.bowing*i.maxRandomnessOffset*(n-t)/200,r=i.bowing*i.maxRandomnessOffset*(e-s)/200;f=v(f,i,w),r=v(r,i,w);const u=[],p=()=>v(m,i,w),l=()=>v(d,i,w);return c?u.push({op:"move",data:[e+p(),t+p()]}):u.push({op:"move",data:[e+v(d,i,w),t+v(d,i,w)]}),c?u.push({op:"bcurveTo",data:[f+e+(s-e)*g+p(),r+t+(n-t)*g+p(),f+e+2*(s-e)*g+p(),r+t+2*(n-t)*g+p(),s+p(),n+p()]}):u.push({op:"bcurveTo",data:[f+e+(s-e)*g+l(),r+t+(n-t)*g+l(),f+e+2*(s-e)*g+l(),r+t+2*(n-t)*g+l(),s+l(),n+l()]}),u}function I(e,t,s){const n=e.length,i=[];if(n>3){const a=[],c=1-s.curveTightness;i.push({op:"move",data:[e[1][0],e[1][1]]});for(let o=1;o+2<n;o++){const h=e[o];a[0]=[h[0],h[1]],a[1]=[h[0]+(c*e[o+1][0]-c*e[o-1][0])/6,h[1]+(c*e[o+1][1]-c*e[o-1][1])/6],a[2]=[e[o+1][0]+(c*e[o][0]-c*e[o+2][0])/6,e[o+1][1]+(c*e[o][1]-c*e[o+2][1])/6],a[3]=[e[o+1][0],e[o+1][1]],i.push({op:"bcurveTo",data:[a[1][0],a[1][1],a[2][0],a[2][1],a[3][0],a[3][1]]})}}else n===3?(i.push({op:"move",data:[e[1][0],e[1][1]]}),i.push({op:"bcurveTo",data:[e[1][0],e[1][1],e[2][0],e[2][1],e[2][0],e[2][1]]})):n===2&&i.push(...R(e[0][0],e[0][1],e[1][0],e[1][1],s));return i}function T(e,t,s,n,i,a,c,o){const h=[],w=[],d=v(.5,o)-Math.PI/2;w.push([v(a,o)+t+.9*n*Math.cos(d-e),v(a,o)+s+.9*i*Math.sin(d-e)]);for(let m=d;m<2*Math.PI+d-.01;m+=e){const g=[v(a,o)+t+n*Math.cos(m),v(a,o)+s+i*Math.sin(m)];h.push(g),w.push(g)}return w.push([v(a,o)+t+n*Math.cos(d+2*Math.PI+.5*c),v(a,o)+s+i*Math.sin(d+2*Math.PI+.5*c)]),w.push([v(a,o)+t+.98*n*Math.cos(d+c),v(a,o)+s+.98*i*Math.sin(d+c)]),w.push([v(a,o)+t+.9*n*Math.cos(d+.5*c),v(a,o)+s+.9*i*Math.sin(d+.5*c)]),[w,h]}function D(e,t){return{maxRandomnessOffset:2,roughness:e==="highlight"?3:1.5,bowing:1,stroke:"#000",strokeWidth:1.5,curveTightness:0,curveFitting:.95,curveStepCount:9,fillStyle:"hachure",fillWeight:-1,hachureAngle:-41,hachureGap:-1,dashOffset:-1,dashGap:-1,zigzagOffset:-1,combineNestedSvgPaths:!1,disableMultiStroke:e!=="double",disableMultiStrokeFill:!1,seed:t}}function F(e,t,s,n,i,a){const c=[];let o=s.strokeWidth||2;const h=function(f){const r=f.padding;if(r||r===0){if(typeof r=="number")return[r,r,r,r];if(Array.isArray(r)){const u=r;if(u.length)switch(u.length){case 4:return[...u];case 1:return[u[0],u[0],u[0],u[0]];case 2:return[...u,...u];case 3:return[...u,u[1]];default:return[u[0],u[1],u[2],u[3]]}}}return[5,5,5,5]}(s),w=s.animate===void 0||!!s.animate,d=s.iterations||2,m=s.rtl?1:0,g=D("single",a);switch(s.type){case"underline":{const f=t.y+t.h+h[2];for(let r=m;r<d+m;r++)r%2?c.push(M(t.x+t.w,f,t.x,f,g)):c.push(M(t.x,f,t.x+t.w,f,g));break}case"strike-through":{const f=t.y+t.h/2;for(let r=m;r<d+m;r++)r%2?c.push(M(t.x+t.w,f,t.x,f,g)):c.push(M(t.x,f,t.x+t.w,f,g));break}case"box":{const f=t.x-h[3],r=t.y-h[0],u=t.w+(h[1]+h[3]),p=t.h+(h[0]+h[2]);for(let l=0;l<d;l++)c.push(q(f,r,u,p,g));break}case"bracket":{const f=Array.isArray(s.brackets)?s.brackets:s.brackets?[s.brackets]:["right"],r=t.x-2*h[3],u=t.x+t.w+2*h[1],p=t.y-2*h[0],l=t.y+t.h+2*h[2];for(const y of f){let _;switch(y){case"bottom":_=[[r,t.y+t.h],[r,l],[u,l],[u,t.y+t.h]];break;case"top":_=[[r,t.y],[r,p],[u,p],[u,t.y]];break;case"left":_=[[t.x,p],[r,p],[r,l],[t.x,l]];break;case"right":_=[[t.x+t.w,p],[u,p],[u,l],[t.x+t.w,l]]}_&&c.push(P(_,!1,g))}break}case"crossed-off":{const f=t.x,r=t.y,u=f+t.w,p=r+t.h;for(let l=m;l<d+m;l++)l%2?c.push(M(u,p,f,r,g)):c.push(M(f,r,u,p,g));for(let l=m;l<d+m;l++)l%2?c.push(M(f,p,u,r,g)):c.push(M(u,r,f,p,g));break}case"circle":{const f=D("double",a),r=t.w+(h[1]+h[3]),u=t.h+(h[0]+h[2]),p=t.x-h[3]+r/2,l=t.y-h[0]+u/2,y=Math.floor(d/2),_=d-2*y;for(let b=0;b<y;b++)c.push(O(p,l,r,u,f));for(let b=0;b<_;b++)c.push(O(p,l,r,u,g));break}case"highlight":{const f=D("highlight",a);o=.95*t.h;const r=t.y+t.h/2;for(let u=m;u<d+m;u++)u%2?c.push(M(t.x+t.w,r,t.x,r,f)):c.push(M(t.x,r,t.x+t.w,r,f));break}}if(c.length){const f=function(y){const _=[];for(const b of y){let k="";for(const z of b.ops){const x=z.data;switch(z.op){case"move":k.trim()&&_.push(k.trim()),k=`M${x[0]} ${x[1]} `;break;case"bcurveTo":k+=`C${x[0]} ${x[1]}, ${x[2]} ${x[3]}, ${x[4]} ${x[5]} `;break;case"lineTo":k+=`L${x[0]} ${x[1]} `}}k.trim()&&_.push(k.trim())}return _}(c),r=[],u=[];let p=0;const l=(y,_,b)=>y.setAttribute(_,b);for(const y of f){const _=document.createElementNS(A,"path");if(l(_,"d",y),l(_,"fill","none"),l(_,"stroke",s.color||"currentColor"),l(_,"stroke-width",""+o),w){const b=_.getTotalLength();r.push(b),p+=b}e.appendChild(_),u.push(_)}if(w){let y=0;for(let _=0;_<u.length;_++){const b=u[_],k=r[_],z=p?i*(k/p):0,x=n+y,C=b.style;C.strokeDashoffset=""+k,C.strokeDasharray=""+k,C.animation=`rough-notation-dash ${z}ms ease-out ${x}ms forwards`,y+=z}}}}class J{constructor(t,s){this._state="unattached",this._resizing=!1,this._seed=Math.floor(Math.random()*2**31),this._lastSizes=[],this._animationDelay=0,this._resizeListener=()=>{this._resizing||(this._resizing=!0,setTimeout(()=>{this._resizing=!1,this._state==="showing"&&this.haveRectsChanged()&&this.show()},400))},this._e=t,this._config=JSON.parse(JSON.stringify(s)),this.attach()}get animate(){return this._config.animate}set animate(t){this._config.animate=t}get animationDuration(){return this._config.animationDuration}set animationDuration(t){this._config.animationDuration=t}get iterations(){return this._config.iterations}set iterations(t){this._config.iterations=t}get color(){return this._config.color}set color(t){this._config.color!==t&&(this._config.color=t,this.refresh())}get strokeWidth(){return this._config.strokeWidth}set strokeWidth(t){this._config.strokeWidth!==t&&(this._config.strokeWidth=t,this.refresh())}get padding(){return this._config.padding}set padding(t){this._config.padding!==t&&(this._config.padding=t,this.refresh())}attach(){if(this._state==="unattached"&&this._e.parentElement){(function(){if(!window.__rno_kf_s){const i=window.__rno_kf_s=document.createElement("style");i.textContent="@keyframes rough-notation-dash { to { stroke-dashoffset: 0; } }",document.head.appendChild(i)}})();const t=this._svg=document.createElementNS(A,"svg");t.setAttribute("class","rough-annotation");const s=t.style;s.position="absolute",s.top="0",s.left="0",s.overflow="visible",s.pointerEvents="none",s.width="100px",s.height="100px";const n=this._config.type==="highlight";if(this._e.insertAdjacentElement(n?"beforebegin":"afterend",t),this._state="not-showing",n){const i=window.getComputedStyle(this._e).position;(!i||i==="static")&&(this._e.style.position="relative")}this.attachListeners()}}detachListeners(){window.removeEventListener("resize",this._resizeListener),this._ro&&this._ro.unobserve(this._e)}attachListeners(){this.detachListeners(),window.addEventListener("resize",this._resizeListener,{passive:!0}),!this._ro&&"ResizeObserver"in window&&(this._ro=new window.ResizeObserver(t=>{for(const s of t)s.contentRect&&this._resizeListener()})),this._ro&&this._ro.observe(this._e)}haveRectsChanged(){if(this._lastSizes.length){const t=this.rects();if(t.length!==this._lastSizes.length)return!0;for(let s=0;s<t.length;s++)if(!this.isSameRect(t[s],this._lastSizes[s]))return!0}return!1}isSameRect(t,s){const n=(i,a)=>Math.round(i)===Math.round(a);return n(t.x,s.x)&&n(t.y,s.y)&&n(t.w,s.w)&&n(t.h,s.h)}isShowing(){return this._state!=="not-showing"}refresh(){this.isShowing()&&!this.pendingRefresh&&(this.pendingRefresh=Promise.resolve().then(()=>{this.isShowing()&&this.show(),delete this.pendingRefresh}))}show(){switch(this._state){case"unattached":break;case"showing":this.hide(),this._svg&&this.render(this._svg,!0);break;case"not-showing":this.attach(),this._svg&&this.render(this._svg,!1)}}hide(){if(this._svg)for(;this._svg.lastChild;)this._svg.removeChild(this._svg.lastChild);this._state="not-showing"}remove(){this._svg&&this._svg.parentElement&&this._svg.parentElement.removeChild(this._svg),this._svg=void 0,this._state="unattached",this.detachListeners()}render(t,s){let n=this._config;s&&(n=JSON.parse(JSON.stringify(this._config)),n.animate=!1);const i=this.rects();let a=0;i.forEach(h=>a+=h.w);const c=n.animationDuration||800;let o=0;for(let h=0;h<i.length;h++){const w=c*(i[h].w/a);F(t,i[h],n,o+this._animationDelay,w,this._seed),o+=w}this._lastSizes=i,this._state="showing"}rects(){const t=[];if(this._svg)if(this._config.multiline){const s=this._e.getClientRects();for(let n=0;n<s.length;n++)t.push(this.svgRect(this._svg,s[n]))}else t.push(this.svgRect(this._svg,this._e.getBoundingClientRect()));return t}svgRect(t,s){const n=t.getBoundingClientRect(),i=s;return{x:(i.x||i.left)-(n.x||n.left),y:(i.y||i.top)-(n.y||n.top),w:i.width,h:i.height}}}function E(e,t){return new J(e,t)}function B(e){let t=0;for(const n of e){const i=n;i._animationDelay=t,t+=i.animationDuration===0?0:i.animationDuration||800}const s=[...e];return{show(){for(const n of s)n.show()},hide(){for(const n of s)n.hide()}}}const U=()=>(N.useEffect(()=>{const e=E(document.querySelector("#e1"),{type:"underline"}),t=E(document.querySelector("#e2"),{type:"box"}),s=E(document.querySelector("#e3"),{type:"circle"});B([s,e,t]).show()}),S.jsx(S.Fragment,{children:S.jsxs("div",{className:"flex text-skin-base gap-8 ",children:[S.jsx("span",{id:"e1",children:"e1"}),S.jsx("span",{id:"e2",children:"e2"}),S.jsx("span",{id:"e3",children:"e3"})]})}));export{U as default};
//# sourceMappingURL=roughAnnotation.C2v0kuZV.js.map