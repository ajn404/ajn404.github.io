import type p5 from "p5";
import Basic from "@components/react/p5/index.tsx";
import { Attractor } from "./composition/attractMover";
import Mover from "./composition/attractMover";
import { useCallback, useState } from "react";
import { useDebounce } from "@uidotdev/usehooks";
import { Slider } from "@shadcn/ui/slider";

import { cn } from "@utils/utils";

export default () => {
  const [num, setNum] = useState(10);
  const useDebouncedNum = useDebounce(num, 100);
  const sketch = useCallback(
    (p: p5) => {
      let mover: Mover[];
      let attractor: Attractor;
      const setup = () => {
        p.createCanvas(p.windowWidth / 2, 240);
        mover = new Array(useDebouncedNum).fill(0).map(() => new Mover(p));
        attractor = new Attractor(p, p.width / 2, p.height / 2);
        p.frameRate(60);
      };
      const draw = () => {
        try {
          p.background(255);
          attractor.display();
          mover.forEach(async m => {
            const force = await attractor.attract(m);
            m.applyForce(force);
            m.update();
            m.checkEdges();
            m.show();
          });
        } catch (e) {
          p.noLoop();
          console.log(e);
        }
      };
      const resize = () => {
        p.resizeCanvas(p.windowWidth / 2, 240);
      };
      p.setup = setup;
      p.draw = draw;
      p.windowResized = resize;
    },
    [useDebouncedNum]
  );
  return (
    <>
      小球数量debounceNum:{useDebouncedNum}
      <br />
      <Slider
        defaultValue={[50]}
        max={100}
        min={1}
        step={1}
        className={cn("w-[100%] m-4")}
        onValueChange={value => {
          setNum(value[0]);
        }}
        value={[num]}
      />
      <Basic sketch={sketch} showControls></Basic>
    </>
  );
};
