(function(){try{var e=typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{},t=new Error().stack;t&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[t]="515d4db8-fa57-4e27-9e71-8b6c1f5dcdb3",e._sentryDebugIdIdentifier="sentry-dbid-515d4db8-fa57-4e27-9e71-8b6c1f5dcdb3")}catch{}})();const o=new CSSStyleSheet;o.replaceSync(`:host{
        font-size:2em;
        font-style:italic;
        color:rgba(var(--color-text-base), var(--tw-text-opacity));
    }`);class a extends HTMLElement{constructor(){super(...arguments),this.shadowRoot=this.attachShadow({mode:"open"}),this.#t=Date.now()}static define(t="stop-watch"){customElements.define(t,this)}#t;connectedCallback(){this.shadowRoot.adoptedStyleSheets=[o],this.#e()}#e(){const t=Date.now()-this.#t,s=String(Math.floor(t/(1e3*60))).padStart(2,"0"),n=String(Math.floor(t/1e3%60)).padStart(2,"0"),d=String(Math.floor(t%1e3/10)).padStart(2,"0");this.shadowRoot.replaceChildren(`${s}:${n}:${d}`),requestAnimationFrame(this.#e.bind(this))}}a.define();
//# sourceMappingURL=stopWatch.astro_astro_type_script_index_0_lang.4_oPRGZz.js.map
