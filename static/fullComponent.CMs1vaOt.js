import{i as a,r as d,t as f}from"./custom-element.D6BWsaPY.js";import{x as p}from"./lit-html.Btg8wm4r.js";import"./_sentry-release-injection-file.YJMKEV6W.js";(function(){try{var e=typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{},t=new e.Error().stack;t&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[t]="95b8af19-26b4-4cd9-ab56-f6425903a458",e._sentryDebugIdIdentifier="sentry-dbid-95b8af19-26b4-4cd9-ab56-f6425903a458")}catch{}})();var u=Object.defineProperty,b=Object.getOwnPropertyDescriptor,c=(e,t,n,o)=>{for(var r=o>1?void 0:o?b(t,n):t,s=e.length-1,i;s>=0;s--)(i=e[s])&&(r=(o?i(t,n,r):i(r))||r);return o&&r&&u(t,n,r),r};let l=class extends d{constructor(){super(...arguments),this.name="World"}handleClick(){this.name=this.name==="World"?"Lit":"World"}render(){return p`<p>Hello, ${this.name}!</p>
      <button @click=${this.handleClick}>Change name</button>`}};l.styles=a`
    p {
      color: white;
    }
    button {
      background-color: blue;
      color: white;
    }
  `;l.properties={name:{type:String}};l=c([f("full-component")],l);export{l as FullComponent};
//# sourceMappingURL=fullComponent.CMs1vaOt.js.map
