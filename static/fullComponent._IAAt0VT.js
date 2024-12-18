import{i,r as d,t as c}from"./custom-element.DvFyBSus.js";import{x as p}from"./lit-html.Btg8wm4r.js";import"./_sentry-release-injection-file.DwF5PoZy.js";(function(){try{var e=typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{},t=new e.Error().stack;t&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[t]="2fe6cef1-7720-42cf-b4cd-92d567a2f81b",e._sentryDebugIdIdentifier="sentry-dbid-2fe6cef1-7720-42cf-b4cd-92d567a2f81b")}catch{}})();var u=Object.defineProperty,a=Object.getOwnPropertyDescriptor,b=(e,t,n,o)=>{for(var r=o>1?void 0:o?a(t,n):t,s=e.length-1,f;s>=0;s--)(f=e[s])&&(r=(o?f(t,n,r):f(r))||r);return o&&r&&u(t,n,r),r};let l=class extends d{constructor(){super(...arguments),this.name="World"}handleClick(){this.name=this.name==="World"?"Lit":"World"}render(){return p`<p>Hello, ${this.name}!</p>
      <button @click=${this.handleClick}>Change name</button>`}};l.styles=i`
    p {
      color: white;
    }
    button {
      background-color: blue;
      color: white;
    }
  `;l.properties={name:{type:String}};l=b([c("full-component")],l);export{l as FullComponent};
//# sourceMappingURL=fullComponent._IAAt0VT.js.map
