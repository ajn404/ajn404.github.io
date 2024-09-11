import type p5 from "p5";
import Basic from "@components/react/p5/index.tsx";
import { ForceMoverC } from "./ForceMoverC";
import { useCallback, useState } from "react";
import { useDebounce } from "@uidotdev/usehooks";
import { Slider } from "@shadcn/ui/slider";
import { cn } from "@utils/utils";

export default () => {
  let moverWithWind: ForceMoverC[];
  let wind: p5.Vector;
  let [mass, setMass] = useState(2.8);
  let debounceMass = useDebounce(mass, 200);

  const sketch = useCallback(
    (p: p5) => {
      const setup = () => {
        p.createCanvas((p.windowWidth * 2) / 3, debounceMass * 100);
        moverWithWind = new Array(12).fill(0).map((_, i) => {
          let radius = p.random(debounceMass);
          let res = new ForceMoverC(
            p,
            "press mouse",
            radius * 15,
            null,
            radius
          );
          res.position = p.createVector(
            p.random(res.circleRadius + 1, p.width - res.circleRadius - 1),
            p.random(res.circleRadius + 1, p.height - res.circleRadius - 1)
          );

          return res;
        });
        p.frameRate(120);
      };
      const draw = () => {
        p.background(0);
        moverWithWind.forEach(m => {
          m.applyForce(p.createVector(0, 0.1));
          if (p.mouseIsPressed) {
            wind = p.createVector(0.1, 0);
            m.applyForce(wind); // 应用风
          }
          m.move();
          m.show();
          m.checkEdges();
        });
      };
      const resize = () => {
        p.resizeCanvas(p.windowWidth / 2, 240);
      };
      p.setup = setup;
      p.draw = draw;
      p.windowResized = resize;
    },
    [debounceMass]
  );
  return (
    <>
      <Slider
        defaultValue={[2.8]}
        max={5}
        min={1}
        step={0.01}
        className={cn("w-[100%] m-4")}
        onValueChange={value => {
          setMass(value[0]);
        }}
        value={[mass]}
      />
      <Basic sketch={sketch} showControls></Basic>
    </>
  );
};
