import{i as f,r as d,t as a}from"./custom-element.BnJXoOz7.js";import{x as c}from"./lit-html.BwZoqC9v.js";import"./_sentry-release-injection-file.DBVj9-TS.js";(function(){try{var e=typeof window<"u"?window:typeof global<"u"?global:typeof globalThis<"u"?globalThis:typeof self<"u"?self:{},t=new e.Error().stack;t&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[t]="3b54f948-6d58-43cf-a6cf-f5e0c7a99f9e",e._sentryDebugIdIdentifier="sentry-dbid-3b54f948-6d58-43cf-a6cf-f5e0c7a99f9e")}catch{}})();var u=Object.getOwnPropertyDescriptor,p=(e,t,l,s)=>{for(var n=s>1?void 0:s?u(t,l):t,o=e.length-1,i;o>=0;o--)(i=e[o])&&(n=i(n)||n);return n};let r=class extends d{constructor(){super(...arguments),this.name="World"}handleClick(){this.name=this.name==="World"?"Lit":"World"}render(){return c`<p>Hello, ${this.name}!</p>
      <button @click=${this.handleClick}>Change name</button>`}};r.styles=f`
    p {
      color: white;
    }
    button {
      background-color: blue;
      color: white;
    }
  `;r.properties={name:{type:String}};r=p([a("full-component")],r);export{r as FullComponent};
//# sourceMappingURL=fullComponent.Wf0PGtvO.js.map
