import type p5 from "p5";
import Basic from "@components/react/p5/index.tsx";
import { ForceMoverRebound } from "./ForceMoverRebound";
import { useCallback, useState } from "react";
import { useDebounce } from "@uidotdev/usehooks";
import { Slider } from "@shadcn/ui/slider";
import { cn } from "@utils/utils";

export default () => {
  let moverWithWinds: ForceMoverRebound[];
  let [mass, setMass] = useState(2.8);
  let debounceMass = useDebounce(mass, 200);

  const sketch = useCallback(
    (p: p5) => {
      const setup = () => {
        p.createCanvas((p.windowWidth * 2) / 3, p.windowHeight / 3);
        p.frameRate(120);
        moverWithWinds = new Array(10).fill(0).map((_, i) => {
          let moverWithWind = new ForceMoverRebound(
            p,
            "rebound demo",
            2 * 15,
            null,
            debounceMass
          );
          moverWithWind.position = p.createVector(p.width / 2, p.height / 2);
          return moverWithWind;
        });
      };

      const draw = () => {
        p.background(255);
        moverWithWinds.forEach((moverWithWind, i) => {
          moverWithWind.applyForce(
            p.createVector(p.noise(i + 10) / 10, p.noise(i + 10) / 10)
          );
          moverWithWind.move();
          moverWithWind.show();
          moverWithWind.showName();
          moverWithWind.rebound(5);
          moverWithWind.acceleration.limit(10);
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
      <br />
      <Basic sketch={sketch} showControls></Basic>
    </>
  );
};
