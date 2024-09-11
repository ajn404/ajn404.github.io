import type p5 from "p5";
import Basic from "@components/react/p5/index.tsx";
import { useCallback, useState } from "react";
import { useDebounce } from "@uidotdev/usehooks";
import { Slider } from "@shadcn/ui/slider";
import { cn } from "@utils/utils";

export default () => {
  let [Num, setNum] = useState(5);
  let debounceNum = useDebounce(Num, 200);

  const sketch = useCallback(
    (p: p5) => {
      let points: p5.Vector[] = [];

      const setup = () => {
        p.createCanvas(p.windowWidth / 2, p.windowWidth / 2);
        for (let i = 0; i < (p.windowWidth * debounceNum) / p.PI; i++) {
          let vector = p.createVector(i, i);
          points.push(vector);
        }
        p.background(255);
        p.translate(p.windowWidth / 4, p.windowWidth / 4);
        p.stroke(0);
        p.fill(0);
        p.line(0, p.height / 2, p.width, p.height / 2);
        p.line(p.width / 2, 0, p.width / 2, p.height);
        p.noStroke();
        for (let i = 0; i < points.length; i++) {
          let len = points[i].x;
          let x1 = p.cos(len) * len;
          let y1 = p.sin(len) * len;
          x1 = Number(x1.toFixed(2));
          y1 = Number(y1.toFixed(2));
          p.ellipse(
            x1 / debounceNum,
            y1 / debounceNum,
            debounceNum,
            debounceNum
          );
        }
      };
      const draw = () => {
        p.stroke(0);
        p.strokeWeight(debounceNum / 4);
        p.fill(0);
        p.line(0, p.height / 2, p.width, p.height / 2);
        p.line(p.width / 2, 0, p.width / 2, p.height);
      };
      const resize = () => {
        p.resizeCanvas(p.windowWidth / 2, 240);
      };
      p.setup = setup;
      p.draw = draw;
      p.windowResized = resize;
    },
    [debounceNum]
  );
  return (
    <>
      数量{Num}
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
      <Basic sketch={sketch}></Basic>
    </>
  );
};
