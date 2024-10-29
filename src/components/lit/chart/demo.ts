import { LitElement, html, css } from "lit";
import Vizzu from "vizzu";
import { customElement } from "lit/decorators.js";
import VizzuModule from "vizzu/cvizzu.wasm?url";

@customElement("my-chart-component")
export class MyChartComponent extends LitElement {
  static styles = css`
    #chart {
      width: 80%;
      height: 400px;
      margin: 20px auto;
    }
    button {
      display: block;
      margin: 20px auto;
      padding: 10px 20px;
      font-size: 16px;
    }
  `;

  public chart: any; // 用于存储图表实例

  constructor() {
    super();
    Vizzu.options({
      wasmUrl: VizzuModule,
    });
  }

  firstUpdated() {
    this.renderChart();
  }

  async renderChart() {
    // 确保在浏览器环境中运行
    if (typeof window !== "undefined") {
      await Vizzu.initialize();
    }
  }

  async handleButtonClick() {
    const { data }: any = await import(
      "https://lib.vizzuhq.com/0.15/assets/data/chart_types_eu.js" as any
    );
    const element = this.renderRoot.querySelector("#chart");
    if (!element) return;

    if (!this.chart) this.chart = new Vizzu(element as HTMLElement);
    this.chart.animate({
      data,
    });
    this.chart.animate({
      config: (Vizzu.presets as any).percentageArea({
        x: "Year",
        y: "Value 2 (+)",
        stackedBy: "Country",
        title: "Percentage Area Chart",
      }),
    });
  }

  override render() {
    return html`
      <div id="chart"></div>
      <button @click="${this.handleButtonClick}">显示区域图</button>
    `;
  }
}

@customElement("animate-element")
export class AnimateElement extends MyChartComponent {
  render() {
    return html`
      <div id="chart"></div>
      <button @click="${this.handleButtonClick}">加载动画</button>
    `;
  }

  public data_8: any;
  async renderChart() {
    // 确保在浏览器环境中运行
    if (typeof window !== "undefined") {
      await Vizzu.initialize();
      const { data_8 } = await import(
        "https://lib.vizzuhq.com/0.15/assets/data/chart_types_eu.js" as any
      );
      this.data_8 = data_8;
    }
  }

  async handleButtonClick() {
    const element = this.renderRoot.querySelector("#chart");
    if (!element) return;
    if (!this.chart) this.chart = new Vizzu(element as HTMLElement);
    this.chart.animate({
      data: this.data_8,
    });
    this.chart.animate({
      config: {
        channels: {
          x: "Country",
          y: "Value 2 (+)",
          label: "Value 2 (+)",
        },
      },
    });
    this.chart.animate({
      config: {
        channels: {
          y: ["Value 2 (+)", "Joy factors"],
          color: "Joy factors",
        },
      },

      style: {
        plot: {
          marker: {
            colorPalette: "#ef675aFF #6d8cccFF #e6cf99FF #9c50abFF",
          },
        },
      },
    });
  }
}
