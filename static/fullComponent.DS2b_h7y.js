import{a,i,t as c}from"./custom-element.CxHSgrnX.js";import{x as u}from"./lit-html.C67ygu-D.js";import"./_sentry-release-injection-file.b82t1l8g.js";(function(){try{var e=typeof window<"u"?window:typeof global<"u"?global:typeof globalThis<"u"?globalThis:typeof self<"u"?self:{},t=new e.Error().stack;t&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[t]="d20d6c74-5fad-48ca-a00d-c568e2d071bb",e._sentryDebugIdIdentifier="sentry-dbid-d20d6c74-5fad-48ca-a00d-c568e2d071bb")}catch{}})();var p=Object.getOwnPropertyDescriptor,b=(e,t,d,l)=>{for(var n=l>1?void 0:l?p(t,d):t,o=e.length-1,s;o>=0;o--)(s=e[o])&&(n=s(n)||n);return n};let r=class extends i{constructor(){super(...arguments),this.name="World"}handleClick(){this.name=this.name==="World"?"Lit":"World"}render(){return u`<p>Hello, ${this.name}!</p>
      <button @click=${this.handleClick}>Change name</button>`}};r.styles=a`
    p {
      color: white;
    }
    button {
      background-color: blue;
      color: white;
    }
  `;r.properties={name:{type:String}};r=b([c("full-component")],r);export{r as FullComponent};
//# sourceMappingURL=fullComponent.DS2b_h7y.js.map
