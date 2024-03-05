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
        let len = (p.windowWidth * debounceNum) / (p.PI * 8);
        let de = len % 4;
        for (let i = 0; i < len - de; i++) {
          let vector = p.createVector(i, i);
          points.push(vector);
        }
        p.setAttributes("antialias", true);
        // p.background(255);
        p.frameRate(debounceFrameRate);
      };
      let i = 0;
      const draw = () => {
        p.translate(p.windowWidth / 4, p.windowWidth / 4);
        p.strokeWeight(debounceNum);
        p.noFill();
        if (i < points.length) {
          let len = points[i].x;
          let len2 = points[i + 1].x;
          let len3 = points[i + 2].x;
          let len4 = points[i + 3].x;
          let [x1, y1] = [p.cos(len) * len, p.sin(len) * len];
          let [x2, y2] = [p.cos(len2) * len2, p.sin(len2) * len];
          let [x3, y3] = [p.cos(len3) * len3, p.sin(len3) * len3];
          let [x4, y4] = [p.cos(len4) * len4, p.sin(len4) * len4];
          [x1, x2, x3, x4, y1, y2, y3, y4].forEach(item => {
            item = Number(item.toFixed(2));
          });
          p.curve(...[x1, y1, x2, y2, x3, y3, x4, y4]);
          i += 4;
        } else {
          p.erase();
          p.fill(0);
          p.circle(0, 0, p.width * 2);
          p.noErase();
          i = 0;
        }
      };
      const resize = () => p.setup();
      p.setup = setup;
      p.draw = draw;
      p.windowResized = resize;
    },
    [debounceNum, debounceFrameRate]
  );
  return (
    <>
      半径{Num},半径越小数量越多
      <Slider
        defaultValue={[5]}
        max={10}
        min={1}
        step={0.1}
        className={cn("w-[100%] m-4")}
        onValueChange={value => {
          setNum(value[0]);
        }}
        value={[Num]}
      />
      帧率{frameRate}
      <Slider
        defaultValue={[60]}
        max={120}
        min={1}
        step={1}
        className={cn("w-[100%] m-4")}
        onValueChange={value => {
          setFrameRate(value[0]);
        }}
        value={[frameRate]}
      />
      <Basic sketch={sketch}></Basic>
    </>
  );
};
