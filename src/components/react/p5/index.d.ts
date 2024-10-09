// index.d.ts

import type p5 from "p5";
import * as React from "react";

type Sketch = (p: p5) => void;

export interface P5CanvasProps {
  /**
   * 用于绘制 p5 画布的 Sketch 函数。
   */
  sketch: Sketch;

  /**
   * 是否显示控制按钮。默认为 `false`。
   */
  showControls?: boolean;
}

/**
 * 组件用于在 React 应用中集成 p5.js 画布。
 */
declare const P5Canvas: React.MemoExoticComponent<React.FC<P5CanvasProps>>;

export default P5Canvas;
