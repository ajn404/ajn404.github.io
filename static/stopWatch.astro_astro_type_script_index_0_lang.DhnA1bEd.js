(function(){try{var e=typeof window<"u"?window:typeof global<"u"?global:typeof globalThis<"u"?globalThis:typeof self<"u"?self:{},t=new e.Error().stack;t&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[t]="1e068a5b-5240-47a7-a68c-c2749c819934",e._sentryDebugIdIdentifier="sentry-dbid-1e068a5b-5240-47a7-a68c-c2749c819934")}catch{}})();const o=new CSSStyleSheet;o.replaceSync(`:host{
        font-size:2em;
        font-style:italic;
        color:rgba(var(--color-text-base), var(--tw-text-opacity));
    }`);class i extends HTMLElement{constructor(){super(...arguments),this.shadowRoot=this.attachShadow({mode:"open"}),this.#t=Date.now()}static define(t="stop-watch"){customElements.define(t,this)}#t;connectedCallback(){this.shadowRoot.adoptedStyleSheets=[o],this.#e()}#e(){const t=Date.now()-this.#t,s=String(Math.floor(t/(1e3*60))).padStart(2,"0"),n=String(Math.floor(t/1e3%60)).padStart(2,"0"),a=String(Math.floor(t%1e3/10)).padStart(2,"0");this.shadowRoot.replaceChildren(`${s}:${n}:${a}`),requestAnimationFrame(this.#e.bind(this))}}i.define();
//# sourceMappingURL=stopWatch.astro_astro_type_script_index_0_lang.DhnA1bEd.js.map
