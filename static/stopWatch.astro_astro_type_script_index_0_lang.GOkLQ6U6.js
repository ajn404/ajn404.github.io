const e=new CSSStyleSheet;e.replaceSync(`:host{
        font-size:2em;
        font-style:italic;
        color:rgba(var(--color-text-base), var(--tw-text-opacity));
    }`);class n extends HTMLElement{static define(t="stop-watch"){customElements.define(t,this)}shadowRoot=this.attachShadow({mode:"open"});#e=Date.now();connectedCallback(){this.shadowRoot.adoptedStyleSheets=[e],this.#t()}#t(){const t=Date.now()-this.#e,o=String(Math.floor(t/(1e3*60))).padStart(2,"0"),s=String(Math.floor(t/1e3%60)).padStart(2,"0"),a=String(Math.floor(t%1e3/10)).padStart(2,"0");this.shadowRoot.replaceChildren(`${o}:${s}:${a}`),requestAnimationFrame(this.#t.bind(this))}}n.define();
