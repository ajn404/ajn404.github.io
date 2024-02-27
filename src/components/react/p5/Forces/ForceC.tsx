import type p5 from "p5";
import Basic from "@components/react/p5/index.tsx";
import { ForceMoverC } from "./ForceMoverC";
import { useCallback, useState } from "react";
import { useDebounce } from "@uidotdev/usehooks";
import { Slider } from "@shadcn/ui/slider";
import { cn } from "@utils/utils";

export default () => {
  let moverWithWind: ForceMoverC;
  let wind: p5.Vector;
  let [mass, setMass] = useState(0.1);
  let debounceMass = useDebounce(mass, 200);

  const sketch = useCallback(
    (p: p5) => {
      const setup = () => {
        p.createCanvas(p.windowWidth / 2, 240);
        moverWithWind = new ForceMoverC(
          p,
          "press mouse",
          32,
          null,
          debounceMass
        );
        p.frameRate(120);
        moverWithWind.position = p.createVector(p.width / 2, p.height / 2);
      };
      const draw = () => {
        p.background(moverWithWind.color);
        moverWithWind.applyForce(p.createVector(0, 0.1));
        if (p.mouseIsPressed) {
          wind = p.createVector(0.1, 0);
          moverWithWind.applyForce(wind); // 应用风
        }
        moverWithWind.move();
        moverWithWind.show();
        moverWithWind.showName();
        moverWithWind.checkEdges();
      };
      const resize = () => p.setup();
      p.setup = setup;
      p.draw = draw;
      p.windowResized = resize;
    },
    [debounceMass]
  );
  return (
    <>
      小球质量{mass}(单位:any)
      <Slider
        defaultValue={[0.1]}
        max={10}
        min={0.1}
        step={0.1}
        className={cn("w-[100%] m-4")}
        onValueChange={value => {
          setMass(value[0]);
        }}
        value={[mass]}
      />
      风力大小为 f = m*a;这里的m = mass;a = 0.1; f = {(mass * 0.1).toFixed(2)}
      <Basic sketch={sketch} showControls></Basic>
    </>
  );
};
