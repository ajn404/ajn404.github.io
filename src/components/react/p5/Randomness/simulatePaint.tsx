import type p5 from "p5";
import Basic from "@components/react/p5/index.tsx";
import { useCallback, useRef, useState } from "react";
import { useDebounce } from "@uidotdev/usehooks";
export default () => {
  let [sd, setSd] = useState(100);
  const slider = useRef(null);
  const debouncedSd = useDebounce(sd, 300);
  const [maxRange, setMaxRange] = useState(100);
  const sketch = useCallback(
    (p: p5) => {
      const setup = () => {
        p.createCanvas(p.windowWidth / 2, 240);
        setMaxRange(p.windowWidth / 4);
        p.background("aliceblue");
      };
      const draw = () => {
        let x = p.randomGaussian(p.width / 2, debouncedSd);
        let y = p.randomGaussian(p.height / 2, debouncedSd);
        p.noStroke();
        p.fill(0, 100);
        p.fill(
          p.randomGaussian(155, 100),
          p.randomGaussian(125, 125),
          p.randomGaussian(125, 120)
        );

        p.circle(x, y, p.random(16));
      };
      const resize = () => p.setup();
      p.setup = setup;
      p.draw = draw;
      p.windowResized = resize;
    },
    [debouncedSd]
  );
  const handleSliderChange = (val: string) => {
    setSd(parseFloat(val));
  };

  return (
    <>
      debouncedSd:{debouncedSd} sd:{sd}{" "}
      这里是二维的正态分布,但是两者用的是一个方差,待优化
      <input
        type="range"
        max={maxRange}
        className="transparent h-[4px] w-full cursor-pointer appearance-none border-transparent bg-neutral-200 dark:bg-neutral-600"
        ref={slider}
        value={sd}
        step={5}
        onChange={e => {
          handleSliderChange(e.target.value);
        }}
      />
      result:
      <Basic sketch={sketch} showControls></Basic>
    </>
  );
};
