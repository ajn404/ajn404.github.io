import { LitElement, html, css } from "lit";

export class MyButton extends LitElement {
  static styles = css`
    button {
      padding: 10px 20px;
      border: none;
      background-color: #007bff;
      color: #fff;
      cursor: pointer;
      border-radius: 4px;
      transition: background-color 0.3s ease;
    }

    button:hover {
      background-color: #0056b3;
    }
  `;

  render() {
    return html`
      <button @click=${this.handleClick}>
        <slot></slot>
      </button>
    `;
  }
  handleClick() {
    console.log(this);
  }
  connectedCallback(): void {
    console.log(this);
    super.connectedCallback();
    this.handleClick = this.handleClick.bind(this);
  }
}

customElements.define("my-button", MyButton);
