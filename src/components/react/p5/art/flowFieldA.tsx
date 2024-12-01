import type p5 from "p5";
import Basic from "@components/react/p5/index.tsx";
import { Slider } from "@shadcn/ui/slider";
import { cn } from "@utils/utils";
import { useDebounce } from "@uidotdev/usehooks";
import { useCallback, useEffect, useState } from "react";

export default () => {
  const [density, setDensity] = useState(30);
  const debounceDensity = useDebounce(density, 200);

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

        const densityValue = debounceDensity || 30; // 使用默认值30
        const space = p.width / densityValue;

        for (let i = 0; i < p.width; i += space) {
          for (let j = 0; j < p.height; j += space) {
            let point = p.createVector(i, j);
            points.push(point);
          }
        }
      };

      const draw = () => {
        p.noStroke();
        for (let i = 0; i < points.length; i++) {
          // 预先计算颜色值
          const r = p.map(points[i].x, 0, p.width, 50, 255);
          const g = p.map(points[i].y, 0, p.height, 255, 50);
          const b = p.map(points[i].x, 0, p.width, 255, 50);
          p.fill(r, g, b);

          const noiseX = points[i].x * mult;
          const noiseY = points[i].y * mult;
          const angle = p.map(p.noise(noiseX, noiseY), 0, 1, 0, 720);
          const walk = p.createVector(p.cos(angle), p.sin(angle)); // 简化向量创建
          points[i].add(walk);
          p.ellipse(points[i].x, points[i].y, 1, 1);
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
      密度 {density}
      <Slider
        defaultValue={[30]}
        max={100}
        min={20}
        step={1}
        className={cn("w-[100%] m-4")}
        onValueChange={value => {
          setDensity(value[0]);
        }}
        value={[density]}
      />
      <Basic key={debounceDensity} sketch={sketch} /> {/* 添加key属性 */}
    </>
  );
};
