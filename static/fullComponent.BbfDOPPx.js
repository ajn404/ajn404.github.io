import{i as a,r as d,t as u}from"./custom-element.Db2dgVEs.js";import{x as b}from"./lit-html.B5wDGxnS.js";import"./_sentry-release-injection-file.DXPJa_4z.js";(function(){try{var e=typeof window<"u"?window:typeof global<"u"?global:typeof globalThis<"u"?globalThis:typeof self<"u"?self:{},t=new e.Error().stack;t&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[t]="bebc6e6d-2996-4e88-95aa-75b8a4d964a9",e._sentryDebugIdIdentifier="sentry-dbid-bebc6e6d-2996-4e88-95aa-75b8a4d964a9")}catch{}})();var p=Object.defineProperty,f=Object.getOwnPropertyDescriptor,c=(e,t,r,o)=>{for(var n=o>1?void 0:o?f(t,r):t,s=e.length-1,i;s>=0;s--)(i=e[s])&&(n=(o?i(t,r,n):i(n))||n);return o&&n&&p(t,r,n),n};let l=class extends d{constructor(){super(...arguments),this.name="World"}handleClick(){this.name=this.name==="World"?"Lit":"World"}render(){return b`<p>Hello, ${this.name}!</p>
      <button @click=${this.handleClick}>Change name</button>`}};l.styles=a`
    p {
      color: white;
    }
    button {
      background-color: blue;
      color: white;
    }
  `;l.properties={name:{type:String}};l=c([u("full-component")],l);export{l as FullComponent};
//# sourceMappingURL=fullComponent.BbfDOPPx.js.map
