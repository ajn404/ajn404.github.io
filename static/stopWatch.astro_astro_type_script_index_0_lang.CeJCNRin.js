(function(){try{var e=typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{},t=new e.Error().stack;t&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[t]="f6c3177f-ca96-4042-89c8-dd4aa6ba51e4",e._sentryDebugIdIdentifier="sentry-dbid-f6c3177f-ca96-4042-89c8-dd4aa6ba51e4")}catch{}})();const s=new CSSStyleSheet;s.replaceSync(`:host{
        font-size:2em;
        font-style:italic;
        color:rgba(var(--color-text-base), var(--tw-text-opacity));
    }`);class d extends HTMLElement{static define(t="stop-watch"){customElements.define(t,this)}shadowRoot=this.attachShadow({mode:"open"});#e=Date.now();connectedCallback(){this.shadowRoot.adoptedStyleSheets=[s],this.#t()}#t(){const t=Date.now()-this.#e,o=String(Math.floor(t/(1e3*60))).padStart(2,"0"),a=String(Math.floor(t/1e3%60)).padStart(2,"0"),n=String(Math.floor(t%1e3/10)).padStart(2,"0");this.shadowRoot.replaceChildren(`${o}:${a}:${n}`),requestAnimationFrame(this.#t.bind(this))}}d.define();
//# sourceMappingURL=stopWatch.astro_astro_type_script_index_0_lang.CeJCNRin.js.map
