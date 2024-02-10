import type p5 from "p5";
import heapSort, { buildMaxHeap, swap, maxHeapify } from "./heap";
import Basic from "./index";
import React from "react";

export default function Heap(): React.JSX.Element {
  let articleWidth: number | undefined = 100;

  const sketch = (p: p5) => {
    articleWidth = document.querySelector("article")?.clientWidth;
    let i = 0;
    let values: number[] = [];
    const width: number = 1;
    const rate = 60;
    let g = 0;
    let dark = false;

    p.setup = () => {
      i = 0;
      g = p.random(255);
      dark = document.querySelector("html")?.dataset.theme === "dark";
      p.createCanvas(
        articleWidth as number | 100,
        (articleWidth as number | 100) / 2
      );
      p.frameRate(rate);
      values = new Array(Math.round(p.width / width));
      for (let n = 0; n < values.length; n++) {
        values[n] = p.random(p.height);
      }
      i = values.length - 1;
      buildMaxHeap(values);
    };
    const drawLine = () => {
      for (let m = 0; m < values.length; m++) {
        const color = (m / values.length) * 255;
        const reverseColor = 255 - color;
        p.stroke(g, reverseColor, color);
        p.strokeWeight(width);
        const line_height = p.height - values[m];
        p.line(m * width, p.height, m * width, line_height);
      }
    };

    p.mouseClicked = (e: PointerEvent) => {
      if (e?.target === p["canvas"]) {
        p.setup();
        p.loop();
      }
    };
    p.keyPressed = () => {
      if (p.key === "s") {
        p.saveGif("heapSort", 2, {});
      }
    };
    p.draw = () => {
      p.translate(0.5 * width, 0);
      p.background(50);
      if (dark) p.background(200);
      if (i > 0) {
        swap(values, 0, i);
        maxHeapify(values, 0, i);
        i--;
      } else {
        p.noLoop();
      }
      drawLine();
    };
  };

  return <Basic sketch={sketch}></Basic>;
}
