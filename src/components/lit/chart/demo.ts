//@ts-nocheck
import { LitElement, html, css } from "lit";
import { customElement } from "lit/decorators.js";
import Vizzu from "vizzu";
import VizzuModule from "vizzu/cvizzu.wasm?url";

@customElement("my-chart-component")
export class MyChartComponent extends LitElement {
  static styles = css`
    #chart {
      width: 80%;
      height: 400px;
      margin: 0 auto;
    }
    button {
      display: block;
      margin: 20px auto;
      padding: 10px 20px;
      font-size: 16px;
    }
  `;

  private chart: any; // 用于存储图表实例

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
      const { data } = await import(
        "https://lib.vizzuhq.com/0.14/assets/data/chart_types_eu.js" as any
      );
      const element = this.renderRoot.querySelector("#chart");
      if (!element) return;

      this.chart = new Vizzu(element as HTMLElement);
      this.chart.animate({
        data,
      });
    }
  }

  private handleButtonClick() {
    if (this.chart) {
      this.chart.animate({
        config: Vizzu.presets.percentageArea({
          x: "Year",
          y: "Value 2 (+)",
          stackedBy: "Country",
          title: "Percentage Area Chart",
        }),
      });
    }
  }

  override render() {
    return html`
      <div id="chart"></div>
      <button @click="${this.handleButtonClick}">显示区域图</button>
    `;
  }
}
