import type p5 from "p5";
import Basic from "@components/react/p5/index.tsx";
import { useCallback, useState } from "react";
import { useDebounce } from "@uidotdev/usehooks";
import { Slider } from "@shadcn/ui/slider";
import { cn } from "@utils/utils";

export default () => {
  let [Num, setNum] = useState(5);
  let [frameRate, setFrameRate] = useState(60);
  let debounceNum = useDebounce(Num, 200);
  let debounceFrameRate = useDebounce(frameRate, 200);

  const sketch = useCallback(
    (p: p5) => {
      let points: p5.Vector[] = [];

      const setup = () => {
        p.createCanvas(p.windowWidth / 2, p.windowWidth / 2);
        for (let i = 0; i < (p.windowWidth * debounceNum) / p.PI; i++) {
          let vector = p.createVector(i, i);
          points.push(vector);
        }
        p.setAttributes("antialias", true);
        p.background(255);
        p.frameRate(debounceFrameRate);
      };
      let i = 0;
      const draw = () => {
        p.translate(p.windowWidth / 4, p.windowWidth / 4);
        p.strokeWeight(debounceNum);
        if (i < points.length) {
          let len = points[i].x;
          let x1 = p.cos(len) * len;
          let y1 = p.sin(len) * len;
          x1 = Number(x1.toFixed(2));
          y1 = Number(y1.toFixed(2));
          p.point(x1, y1);
          i++;
        } else {
          i = 0;
        }
      };
      const resize = () => {
        p.resizeCanvas(p.windowWidth / 2, 240);
      };
      p.setup = setup;
      p.draw = draw;
      p.windowResized = resize;
    },
    [debounceNum, debounceFrameRate]
  );
  return (
    <>
      <Basic sketch={sketch}></Basic>
    </>
  );
};
