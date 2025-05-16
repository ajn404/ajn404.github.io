import{a as i,i as d,t as c}from"./custom-element.CxHSgrnX.js";import{x as u}from"./lit-html.C67ygu-D.js";import"./_sentry-release-injection-file.B-UwqLso.js";(function(){try{var e=typeof window<"u"?window:typeof global<"u"?global:typeof globalThis<"u"?globalThis:typeof self<"u"?self:{},t=new e.Error().stack;t&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[t]="c95c2e24-4ae8-45fc-90a6-4f91a44d0384",e._sentryDebugIdIdentifier="sentry-dbid-c95c2e24-4ae8-45fc-90a6-4f91a44d0384")}catch{}})();var f=Object.getOwnPropertyDescriptor,p=(e,t,l,s)=>{for(var n=s>1?void 0:s?f(t,l):t,o=e.length-1,a;o>=0;o--)(a=e[o])&&(n=a(n)||n);return n};let r=class extends d{constructor(){super(...arguments),this.name="World"}handleClick(){this.name=this.name==="World"?"Lit":"World"}render(){return u`<p>Hello, ${this.name}!</p>
      <button @click=${this.handleClick}>Change name</button>`}};r.styles=i`
    p {
      color: white;
    }
    button {
      background-color: blue;
      color: white;
    }
  `;r.properties={name:{type:String}};r=p([c("full-component")],r);export{r as FullComponent};
//# sourceMappingURL=fullComponent.BTy5qTa9.js.map
