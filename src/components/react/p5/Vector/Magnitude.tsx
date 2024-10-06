import type p5 from "p5";
import Basic from "@components/react/p5/index.tsx";
import { useCallback, useRef, useState } from "react";

import { cn } from "@utils/utils";
import { Slider } from "@shadcn/ui/slider";
// import { useDebounce } from "@uidotdev/usehooks";
// import { flushSync, unstable_batchedUpdates } from "react-dom";

export default () => {
  let [len, setLen] = useState(0);
  const slider = useRef(null);
  let [max, setMax] = useState(100);
  const sketch = useCallback((p: p5) => {
    console.log("sketch");

    let mouse: p5.Vector;
    const setup = () => {
      p.createCanvas(p.windowWidth / 2, 240);
      setMax(p.mag(p.width / 2, p.height / 2));
    };
    const draw = () => {
      p.background(255);
      p.stroke(28, 19, 73);
      p.strokeWeight(5);
      mouse = p.createVector(p.mouseX, p.mouseY);
      let center = p.createVector(p.width / 2, p.height / 2);
      mouse.sub(center);
      slider.current.value = [mouse.mag()];
      // unstable_batchedUpdates(() => {
      setLen(mouse.mag());
      // })

      p.translate(p.width / 2, p.height / 2);
      p.line(0, 0, mouse.x, mouse.y);
    };
    const resize = () => {
      p.resizeCanvas(p.windowWidth / 2, 240);
    };
    p.setup = setup;
    p.draw = draw;
    p.windowResized = resize;
  }, []);
  return (
    <>
      <Slider
        defaultValue={[50]}
        max={max}
        step={1}
        className={cn("w-[60%]")}
        ref={slider}
        value={[len]}
      />
      mag:{len}
      <br />
      max:{max}
      <Basic sketch={sketch} showControls></Basic>
    </>
  );
};
