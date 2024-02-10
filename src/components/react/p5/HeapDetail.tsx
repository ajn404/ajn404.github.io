import type p5 from "p5";
import { buildMaxHeap, swap } from "./heap";
import Basic from "./index";
let articleWidth: number | undefined = 100;
let width: number = 100;
//维护最大堆的性质
const maxHeapify = (array: number[], i: number, heapSize: number, p?: p5) => {
  const left = 2 * i + 1;
  const right = 2 * i + 2;
  let largest = i;

  // 找到左右子节点中最大的节点
  if (left < heapSize && array[left] > array[largest]) {
    largest = left;
  }
  if (right < heapSize && array[right] > array[largest]) {
    largest = right;
  }

  // 如果最大节点不是当前节点，则交换节点并递归调整堆
  if (largest !== i) {
    // if (p) {
    //     p.fill(255);
    //     p.strokeWeight(0);
    //     p.text("largest" + array[largest], largest * (width || 100), p.height - array[largest] + 16);
    // }
    swap(array, i, largest);
    maxHeapify(array, largest, heapSize);
  }
};

export default function HeapDetail(): React.JSX.Element {
  const sketch = (p: p5) => {
    articleWidth = document.querySelector("article")?.clientWidth;
    width = (articleWidth && articleWidth / 50) || 100;
    let i = 0;
    let values: number[] = [];
    const rate = 1;
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
        p.rect(m * width, line_height, width, p.height - line_height);
      }

      p.fill(255);
      p.strokeWeight(0);
      p.text(values[i + 1], i * width, p.height - values[i + 1]);
    };

    p.mouseClicked = (e: PointerEvent) => {
      // @ts-ignore
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
        maxHeapify(values, 0, i, p);
        i--;
      } else {
        p.noLoop();
      }
      drawLine();
    };
  };

  return <Basic sketch={sketch}></Basic>;
}
