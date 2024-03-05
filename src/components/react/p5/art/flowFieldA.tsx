import type p5 from "p5";
import Basic from "@components/react/p5/index.tsx";
import { Slider } from "@shadcn/ui/slider";
import { cn } from "@utils/utils";
import { useDebounce } from "@uidotdev/usehooks";
import { useCallback, useState } from "react";

export default () => {
  let [density, setDensity] = useState(30);
  let debounceDensity = useDebounce(density, 200);
  const sketch = useCallback(
    (p: p5) => {
      let points: p5.Vector[];
      let mult: number;
      const setup = () => {
        points = [];
        mult = 0.005;
        p.createCanvas(p.windowWidth / 2, p.windowWidth / 2);
        p.noiseDetail(1, 0.5);
        p.angleMode(p.DEGREES);
        p.frameRate(120);
        p.pixelDensity(3);
        p.background(0);
        let density = debounceDensity || 200;
        let space = p.width / density;

        for (let i = 0; i < p.width; i += space) {
          for (let j = 0; j < p.height; j += space) {
            let point = p.createVector(i, j);
            points.push(point);
          }
        }
      };
      const draw = () => {
        if (p.frameCount > 1200) {
          p.noLoop();
          return;
        } else {
          p.noStroke();
          p.fill(255);
          for (let i = 0; i < points.length; i++) {
            let r = p.map(points[i].x, 0, p.width, 50, 255);
            let g = p.map(points[i].y, 0, p.height, 255, 50);
            let b = p.map(points[i].x, 0, p.width, 255, 50);
            p.fill(r, g, b);
            let noiseX = points[i].x * mult;
            let noiseY = points[i].y * mult;
            let angle = p.map(p.noise(noiseX, noiseY), 0, 1, 0, 720);
            let walk = p.createVector(p.cos(angle) * 1, p.sin(angle) * 1);
            points[i].add(walk);
            p.ellipse(points[i].x, points[i].y, 1, 1);
          }
        }
      };
      const resize = setup;
      p.setup = setup;
      p.draw = draw;
      p.windowResized = resize;
    },
    [debounceDensity]
  );
  return (
    <>
      密度{density}
      <Slider
        defaultValue={[30]}
        max={40}
        min={20}
        step={1}
        className={cn("w-[100%] m-4")}
        onValueChange={value => {
          setDensity(value[0]);
        }}
        value={[density]}
      />
      <Basic sketch={sketch}></Basic>
    </>
  );
};
