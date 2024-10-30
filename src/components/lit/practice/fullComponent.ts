import { LitElement, html, css } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("full-component")
export class FullComponent extends LitElement {
  static styles = css`
    p {
      color: white;
    }
    button {
      background-color: blue;
      color: white;
    }
  `;

  static properties = {
    name: { type: String },
  };
  name = "World";

  handleClick() {
    this.name = this.name === "World" ? "Lit" : "World";
  }

  render() {
    return html`<p>Hello, ${this.name}!</p>
      <button @click=${this.handleClick}>Change name</button>`;
  }
}
