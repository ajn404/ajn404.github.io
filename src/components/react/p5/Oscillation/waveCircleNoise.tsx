import type p5 from "p5";
import Basic from "@components/react/p5/index.tsx";
import { useCallback, useState } from "react";
import { Slider } from "@components/react/shadcn/ui/slider";
import { cn } from "@utils/utils";
import { useDebounce } from "@uidotdev/usehooks";

export default () => {
  let [density, setDensity] = useState(30);
  let debounceDensity = useDebounce(density, 200);

  let [deltaAngle, setDeltaAngle] = useState(0.2);
  let debounceDeltaAngle = useDebounce(deltaAngle, 200);
  const sketch = useCallback(
    (p: p5) => {
      let beginAngle = 0;
      const setup = () => {
        p.createCanvas(p.windowWidth / 2, 240);
        p.frameRate(120);
        p.background(0);
      };
      const draw = () => {
        // Add your drawing code here
        let angle = beginAngle;
        p.background(0);
        p.stroke(255);
        for (let i = 0; i < p.width; i += debounceDensity) {
          let height = p.map(p.noise(angle), 0, 1, 0, p.height);
          p.circle(i, height, (debounceDensity * 5) / 4);
          p.fill((p.sin(angle) + 1) * 255, 100, (i / p.width) * 255);
          angle += debounceDeltaAngle;
        }
        beginAngle += 0.02;
      };
      const resize = () => {
        p.resizeCanvas(p.windowWidth / 2, 240);
      };

      p.setup = setup;
      p.draw = draw;
      p.windowResized = resize;
    },
    [debounceDensity, debounceDeltaAngle]
  );

  return (
    <>
      <Basic sketch={sketch} showControls />i gap++ :{density}
      <Slider
        defaultValue={[30]}
        max={100}
        min={5}
        step={1}
        className={cn("w-[100%] m-4")}
        onValueChange={value => {
          setDensity(value[0]);
        }}
        value={[density]}
      />
      deltaAngle :{deltaAngle}
      <Slider
        defaultValue={[0.2]}
        max={1}
        min={0.01}
        step={0.01}
        className={cn("w-[100%] m-4")}
        onValueChange={value => {
          setDeltaAngle(value[0]);
        }}
        value={[deltaAngle]}
      />
    </>
  );
};
