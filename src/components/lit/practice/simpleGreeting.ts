import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("simple-greeting")
export class SimpleGreeting extends LitElement {
  render() {
    return html`<p class="white">Hello, World!</p>`;
  }

  // 使用原生渲染
  createRenderRoot() {
    return this;
  }
}
