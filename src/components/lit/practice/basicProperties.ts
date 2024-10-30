import { LitElement, html } from "lit";
import { customElement, state } from "lit/decorators.js";

@customElement("name-tag")
export class NameTag extends LitElement {
  @state() name = "my-element";

  // constructor() {
  //     super();
  //     this.name = "123"
  // }

  override render() {
    return html` 👋，🎊哒🎦${this.name} `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "name-tag": NameTag;
  }
}
