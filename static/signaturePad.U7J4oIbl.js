import{j as f}from"./jsx-runtime.C6v7sNnU.js";import{r as P}from"./index.A1bncjHG.js";import{Button as w}from"./button.DdFpa7eA.js";import"./_sentry-release-injection-file.DwF5PoZy.js";import"./_commonjsHelpers.g73XWfsI.js";import"./index.BUvKg88E.js";import"./index.CLMpW3Is.js";import"./utils.ZJ_V-BP8.js";(function(){try{var d=typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{},t=new d.Error().stack;t&&(d._sentryDebugIds=d._sentryDebugIds||{},d._sentryDebugIds[t]="47efc485-c470-4cd0-8eb5-d15a1cf9f9fe",d._sentryDebugIdIdentifier="sentry-dbid-47efc485-c470-4cd0-8eb5-d15a1cf9f9fe")}catch{}})();/*!
 * Signature Pad v5.0.4 | https://github.com/szimek/signature_pad
 * (c) 2024 Szymon Nowak | Released under the MIT license
 */class v{constructor(t,e,s,n){if(isNaN(t)||isNaN(e))throw new Error(`Point is invalid: (${t}, ${e})`);this.x=+t,this.y=+e,this.pressure=s||0,this.time=n||Date.now()}distanceTo(t){return Math.sqrt(Math.pow(this.x-t.x,2)+Math.pow(this.y-t.y,2))}equals(t){return this.x===t.x&&this.y===t.y&&this.pressure===t.pressure&&this.time===t.time}velocityFrom(t){return this.time!==t.time?this.distanceTo(t)/(this.time-t.time):0}}class x{static fromPoints(t,e){const s=this.calculateControlPoints(t[0],t[1],t[2]).c2,n=this.calculateControlPoints(t[1],t[2],t[3]).c1;return new x(t[1],s,n,t[2],e.start,e.end)}static calculateControlPoints(t,e,s){const n=t.x-e.x,o=t.y-e.y,i=e.x-s.x,h=e.y-s.y,a={x:(t.x+e.x)/2,y:(t.y+e.y)/2},r={x:(e.x+s.x)/2,y:(e.y+s.y)/2},c=Math.sqrt(n*n+o*o),l=Math.sqrt(i*i+h*h),_=a.x-r.x,m=a.y-r.y,u=c+l==0?0:l/(c+l),p={x:r.x+_*u,y:r.y+m*u},y=e.x-p.x,E=e.y-p.y;return{c1:new v(a.x+y,a.y+E),c2:new v(r.x+y,r.y+E)}}constructor(t,e,s,n,o,i){this.startPoint=t,this.control2=e,this.control1=s,this.endPoint=n,this.startWidth=o,this.endWidth=i}length(){let e=0,s,n;for(let o=0;o<=10;o+=1){const i=o/10,h=this.point(i,this.startPoint.x,this.control1.x,this.control2.x,this.endPoint.x),a=this.point(i,this.startPoint.y,this.control1.y,this.control2.y,this.endPoint.y);if(o>0){const r=h-s,c=a-n;e+=Math.sqrt(r*r+c*c)}s=h,n=a}return e}point(t,e,s,n,o){return e*(1-t)*(1-t)*(1-t)+3*s*(1-t)*(1-t)*t+3*n*(1-t)*t*t+o*t*t*t}}class k{constructor(){try{this._et=new EventTarget}catch{this._et=document}}addEventListener(t,e,s){this._et.addEventListener(t,e,s)}dispatchEvent(t){return this._et.dispatchEvent(t)}removeEventListener(t,e,s){this._et.removeEventListener(t,e,s)}}function b(d,t=250){let e=0,s=null,n,o,i;const h=()=>{e=Date.now(),s=null,n=d.apply(o,i),s||(o=null,i=[])};return function(...r){const c=Date.now(),l=t-(c-e);return o=this,i=r,l<=0||l>t?(s&&(clearTimeout(s),s=null),e=c,n=d.apply(o,i),s||(o=null,i=[])):s||(s=window.setTimeout(h,l)),n}}class g extends k{constructor(t,e={}){var s,n,o;super(),this.canvas=t,this._drawingStroke=!1,this._isEmpty=!0,this._lastPoints=[],this._data=[],this._lastVelocity=0,this._lastWidth=0,this._handleMouseDown=i=>{!this._isLeftButtonPressed(i,!0)||this._drawingStroke||this._strokeBegin(this._pointerEventToSignatureEvent(i))},this._handleMouseMove=i=>{if(!this._isLeftButtonPressed(i,!0)||!this._drawingStroke){this._strokeEnd(this._pointerEventToSignatureEvent(i),!1);return}this._strokeMoveUpdate(this._pointerEventToSignatureEvent(i))},this._handleMouseUp=i=>{this._isLeftButtonPressed(i)||this._strokeEnd(this._pointerEventToSignatureEvent(i))},this._handleTouchStart=i=>{i.targetTouches.length!==1||this._drawingStroke||(i.cancelable&&i.preventDefault(),this._strokeBegin(this._touchEventToSignatureEvent(i)))},this._handleTouchMove=i=>{if(i.targetTouches.length===1){if(i.cancelable&&i.preventDefault(),!this._drawingStroke){this._strokeEnd(this._touchEventToSignatureEvent(i),!1);return}this._strokeMoveUpdate(this._touchEventToSignatureEvent(i))}},this._handleTouchEnd=i=>{i.targetTouches.length===0&&(i.cancelable&&i.preventDefault(),this.canvas.removeEventListener("touchmove",this._handleTouchMove),this._strokeEnd(this._touchEventToSignatureEvent(i)))},this._handlePointerDown=i=>{!i.isPrimary||!this._isLeftButtonPressed(i)||this._drawingStroke||(i.preventDefault(),this._strokeBegin(this._pointerEventToSignatureEvent(i)))},this._handlePointerMove=i=>{if(i.isPrimary){if(!this._isLeftButtonPressed(i,!0)||!this._drawingStroke){this._strokeEnd(this._pointerEventToSignatureEvent(i),!1);return}i.preventDefault(),this._strokeMoveUpdate(this._pointerEventToSignatureEvent(i))}},this._handlePointerUp=i=>{!i.isPrimary||this._isLeftButtonPressed(i)||(i.preventDefault(),this._strokeEnd(this._pointerEventToSignatureEvent(i)))},this.velocityFilterWeight=e.velocityFilterWeight||.7,this.minWidth=e.minWidth||.5,this.maxWidth=e.maxWidth||2.5,this.throttle=(s=e.throttle)!==null&&s!==void 0?s:16,this.minDistance=(n=e.minDistance)!==null&&n!==void 0?n:5,this.dotSize=e.dotSize||0,this.penColor=e.penColor||"black",this.backgroundColor=e.backgroundColor||"rgba(0,0,0,0)",this.compositeOperation=e.compositeOperation||"source-over",this.canvasContextOptions=(o=e.canvasContextOptions)!==null&&o!==void 0?o:{},this._strokeMoveUpdate=this.throttle?b(g.prototype._strokeUpdate,this.throttle):g.prototype._strokeUpdate,this._ctx=t.getContext("2d",this.canvasContextOptions),this.clear(),this.on()}clear(){const{_ctx:t,canvas:e}=this;t.fillStyle=this.backgroundColor,t.clearRect(0,0,e.width,e.height),t.fillRect(0,0,e.width,e.height),this._data=[],this._reset(this._getPointGroupOptions()),this._isEmpty=!0}fromDataURL(t,e={}){return new Promise((s,n)=>{const o=new Image,i=e.ratio||window.devicePixelRatio||1,h=e.width||this.canvas.width/i,a=e.height||this.canvas.height/i,r=e.xOffset||0,c=e.yOffset||0;this._reset(this._getPointGroupOptions()),o.onload=()=>{this._ctx.drawImage(o,r,c,h,a),s()},o.onerror=l=>{n(l)},o.crossOrigin="anonymous",o.src=t,this._isEmpty=!1})}toDataURL(t="image/png",e){switch(t){case"image/svg+xml":return typeof e!="object"&&(e=void 0),`data:image/svg+xml;base64,${btoa(this.toSVG(e))}`;default:return typeof e!="number"&&(e=void 0),this.canvas.toDataURL(t,e)}}on(){this.canvas.style.touchAction="none",this.canvas.style.msTouchAction="none",this.canvas.style.userSelect="none";const t=/Macintosh/.test(navigator.userAgent)&&"ontouchstart"in document;window.PointerEvent&&!t?this._handlePointerEvents():(this._handleMouseEvents(),"ontouchstart"in window&&this._handleTouchEvents())}off(){this.canvas.style.touchAction="auto",this.canvas.style.msTouchAction="auto",this.canvas.style.userSelect="auto",this.canvas.removeEventListener("pointerdown",this._handlePointerDown),this.canvas.removeEventListener("mousedown",this._handleMouseDown),this.canvas.removeEventListener("touchstart",this._handleTouchStart),this._removeMoveUpEventListeners()}_getListenerFunctions(){var t;const e=window.document===this.canvas.ownerDocument?window:(t=this.canvas.ownerDocument.defaultView)!==null&&t!==void 0?t:this.canvas.ownerDocument;return{addEventListener:e.addEventListener.bind(e),removeEventListener:e.removeEventListener.bind(e)}}_removeMoveUpEventListeners(){const{removeEventListener:t}=this._getListenerFunctions();t("pointermove",this._handlePointerMove),t("pointerup",this._handlePointerUp),t("mousemove",this._handleMouseMove),t("mouseup",this._handleMouseUp),t("touchmove",this._handleTouchMove),t("touchend",this._handleTouchEnd)}isEmpty(){return this._isEmpty}fromData(t,{clear:e=!0}={}){e&&this.clear(),this._fromData(t,this._drawCurve.bind(this),this._drawDot.bind(this)),this._data=this._data.concat(t)}toData(){return this._data}_isLeftButtonPressed(t,e){return e?t.buttons===1:(t.buttons&1)===1}_pointerEventToSignatureEvent(t){return{event:t,type:t.type,x:t.clientX,y:t.clientY,pressure:"pressure"in t?t.pressure:0}}_touchEventToSignatureEvent(t){const e=t.changedTouches[0];return{event:t,type:t.type,x:e.clientX,y:e.clientY,pressure:e.force}}_getPointGroupOptions(t){return{penColor:t&&"penColor"in t?t.penColor:this.penColor,dotSize:t&&"dotSize"in t?t.dotSize:this.dotSize,minWidth:t&&"minWidth"in t?t.minWidth:this.minWidth,maxWidth:t&&"maxWidth"in t?t.maxWidth:this.maxWidth,velocityFilterWeight:t&&"velocityFilterWeight"in t?t.velocityFilterWeight:this.velocityFilterWeight,compositeOperation:t&&"compositeOperation"in t?t.compositeOperation:this.compositeOperation}}_strokeBegin(t){if(!this.dispatchEvent(new CustomEvent("beginStroke",{detail:t,cancelable:!0})))return;const{addEventListener:s}=this._getListenerFunctions();switch(t.event.type){case"mousedown":s("mousemove",this._handleMouseMove),s("mouseup",this._handleMouseUp);break;case"touchstart":s("touchmove",this._handleTouchMove),s("touchend",this._handleTouchEnd);break;case"pointerdown":s("pointermove",this._handlePointerMove),s("pointerup",this._handlePointerUp);break}this._drawingStroke=!0;const n=this._getPointGroupOptions(),o=Object.assign(Object.assign({},n),{points:[]});this._data.push(o),this._reset(n),this._strokeUpdate(t)}_strokeUpdate(t){if(!this._drawingStroke)return;if(this._data.length===0){this._strokeBegin(t);return}this.dispatchEvent(new CustomEvent("beforeUpdateStroke",{detail:t}));const e=this._createPoint(t.x,t.y,t.pressure),s=this._data[this._data.length-1],n=s.points,o=n.length>0&&n[n.length-1],i=o?e.distanceTo(o)<=this.minDistance:!1,h=this._getPointGroupOptions(s);if(!o||!(o&&i)){const a=this._addPoint(e,h);o?a&&this._drawCurve(a,h):this._drawDot(e,h),n.push({time:e.time,x:e.x,y:e.y,pressure:e.pressure})}this.dispatchEvent(new CustomEvent("afterUpdateStroke",{detail:t}))}_strokeEnd(t,e=!0){this._removeMoveUpEventListeners(),this._drawingStroke&&(e&&this._strokeUpdate(t),this._drawingStroke=!1,this.dispatchEvent(new CustomEvent("endStroke",{detail:t})))}_handlePointerEvents(){this._drawingStroke=!1,this.canvas.addEventListener("pointerdown",this._handlePointerDown)}_handleMouseEvents(){this._drawingStroke=!1,this.canvas.addEventListener("mousedown",this._handleMouseDown)}_handleTouchEvents(){this.canvas.addEventListener("touchstart",this._handleTouchStart)}_reset(t){this._lastPoints=[],this._lastVelocity=0,this._lastWidth=(t.minWidth+t.maxWidth)/2,this._ctx.fillStyle=t.penColor,this._ctx.globalCompositeOperation=t.compositeOperation}_createPoint(t,e,s){const n=this.canvas.getBoundingClientRect();return new v(t-n.left,e-n.top,s,new Date().getTime())}_addPoint(t,e){const{_lastPoints:s}=this;if(s.push(t),s.length>2){s.length===3&&s.unshift(s[0]);const n=this._calculateCurveWidths(s[1],s[2],e),o=x.fromPoints(s,n);return s.shift(),o}return null}_calculateCurveWidths(t,e,s){const n=s.velocityFilterWeight*e.velocityFrom(t)+(1-s.velocityFilterWeight)*this._lastVelocity,o=this._strokeWidth(n,s),i={end:o,start:this._lastWidth};return this._lastVelocity=n,this._lastWidth=o,i}_strokeWidth(t,e){return Math.max(e.maxWidth/(t+1),e.minWidth)}_drawCurveSegment(t,e,s){const n=this._ctx;n.moveTo(t,e),n.arc(t,e,s,0,2*Math.PI,!1),this._isEmpty=!1}_drawCurve(t,e){const s=this._ctx,n=t.endWidth-t.startWidth,o=Math.ceil(t.length())*2;s.beginPath(),s.fillStyle=e.penColor;for(let i=0;i<o;i+=1){const h=i/o,a=h*h,r=a*h,c=1-h,l=c*c,_=l*c;let m=_*t.startPoint.x;m+=3*l*h*t.control1.x,m+=3*c*a*t.control2.x,m+=r*t.endPoint.x;let u=_*t.startPoint.y;u+=3*l*h*t.control1.y,u+=3*c*a*t.control2.y,u+=r*t.endPoint.y;const p=Math.min(t.startWidth+r*n,e.maxWidth);this._drawCurveSegment(m,u,p)}s.closePath(),s.fill()}_drawDot(t,e){const s=this._ctx,n=e.dotSize>0?e.dotSize:(e.minWidth+e.maxWidth)/2;s.beginPath(),this._drawCurveSegment(t.x,t.y,n),s.closePath(),s.fillStyle=e.penColor,s.fill()}_fromData(t,e,s){for(const n of t){const{points:o}=n,i=this._getPointGroupOptions(n);if(o.length>1)for(let h=0;h<o.length;h+=1){const a=o[h],r=new v(a.x,a.y,a.pressure,a.time);h===0&&this._reset(i);const c=this._addPoint(r,i);c&&e(c,i)}else this._reset(i),s(o[0],i)}}toSVG({includeBackgroundColor:t=!1}={}){const e=this._data,s=Math.max(window.devicePixelRatio||1,1),n=0,o=0,i=this.canvas.width/s,h=this.canvas.height/s,a=document.createElementNS("http://www.w3.org/2000/svg","svg");if(a.setAttribute("xmlns","http://www.w3.org/2000/svg"),a.setAttribute("xmlns:xlink","http://www.w3.org/1999/xlink"),a.setAttribute("viewBox",`${n} ${o} ${i} ${h}`),a.setAttribute("width",i.toString()),a.setAttribute("height",h.toString()),t&&this.backgroundColor){const r=document.createElement("rect");r.setAttribute("width","100%"),r.setAttribute("height","100%"),r.setAttribute("fill",this.backgroundColor),a.appendChild(r)}return this._fromData(e,(r,{penColor:c})=>{const l=document.createElement("path");if(!isNaN(r.control1.x)&&!isNaN(r.control1.y)&&!isNaN(r.control2.x)&&!isNaN(r.control2.y)){const _=`M ${r.startPoint.x.toFixed(3)},${r.startPoint.y.toFixed(3)} C ${r.control1.x.toFixed(3)},${r.control1.y.toFixed(3)} ${r.control2.x.toFixed(3)},${r.control2.y.toFixed(3)} ${r.endPoint.x.toFixed(3)},${r.endPoint.y.toFixed(3)}`;l.setAttribute("d",_),l.setAttribute("stroke-width",(r.endWidth*2.25).toFixed(3)),l.setAttribute("stroke",c),l.setAttribute("fill","none"),l.setAttribute("stroke-linecap","round"),a.appendChild(l)}},(r,{penColor:c,dotSize:l,minWidth:_,maxWidth:m})=>{const u=document.createElement("circle"),p=l>0?l:(_+m)/2;u.setAttribute("r",p.toString()),u.setAttribute("cx",r.x.toString()),u.setAttribute("cy",r.y.toString()),u.setAttribute("fill",c),a.appendChild(u)}),a.outerHTML}}const A=()=>{const d=P.useRef(null);let t;P.useEffect(()=>{const n=d.current;if(n){let o=function(){const i=Math.max(window.devicePixelRatio||1,1);n.width=n.offsetWidth*i,n.height=n.offsetHeight*i,n.getContext("2d").scale(i,i),t.clear()};t=new g(d.current,{backgroundColor:"rgb(255, 255, 255)"}),o(),addEventListener("resize",o)}});const e=()=>{const n=t?.toDataURL();if(n){const o=document.createElement("a");o.download="signature.png",o.href=n,o.click()}},s=()=>{const n=t?.toDataURL("image/svg+xml");if(n){const o=document.createElement("a");o.download="signature.svg",o.href=n,o.click()}};return f.jsxs(f.Fragment,{children:[f.jsx("canvas",{ref:d,className:"w-full h-40"}),f.jsxs("div",{className:"ope flex gap-5 justify-center pt-2",children:[f.jsx(w,{variant:"outline",onClick:e,children:"下载png"}),f.jsx(w,{variant:"outline",onClick:s,children:"下载svg"}),f.jsx(w,{variant:"outline",onClick:()=>{t?.clear()},children:"清空"})]})]})};export{A as default};
//# sourceMappingURL=signaturePad.U7J4oIbl.js.map