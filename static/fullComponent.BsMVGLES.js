import{i as d,s as f,t as p}from"./custom-element.N0c8TjST.js";import{x as u}from"./lit-html.CTWWsjOq.js";import"./_sentry-release-injection-file.LPfR-_S-.js";(function(){try{var e=typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{},t=new Error().stack;t&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[t]="9382dee9-9a65-4366-8bf8-ef79e05621eb",e._sentryDebugIdIdentifier="sentry-dbid-9382dee9-9a65-4366-8bf8-ef79e05621eb")}catch{}})();var a=Object.defineProperty,b=Object.getOwnPropertyDescriptor,c=(e,t,n,o)=>{for(var r=o>1?void 0:o?b(t,n):t,s=e.length-1,i;s>=0;s--)(i=e[s])&&(r=(o?i(t,n,r):i(r))||r);return o&&r&&a(t,n,r),r};let l=class extends f{constructor(){super(...arguments),this.name="World"}handleClick(){this.name=this.name==="World"?"Lit":"World"}render(){return u`<p>Hello, ${this.name}!</p>
      <button @click=${this.handleClick}>Change name</button>`}};l.styles=d`
    p {
      color: white;
    }
    button {
      background-color: blue;
      color: white;
    }
  `;l.properties={name:{type:String}};l=c([p("full-component")],l);export{l as FullComponent};
//# sourceMappingURL=fullComponent.BsMVGLES.js.map
