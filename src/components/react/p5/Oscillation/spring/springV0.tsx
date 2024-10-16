import type p5 from "p5";
import Basic from "@components/react/p5/index.tsx";
import { useCallback, useState } from "react";
import { Bob } from "./Bob";
import { Spring } from "./Spring";
import { useDebounce } from "@uidotdev/usehooks";
import { Slider } from "@shadcn/ui/slider";
import { cn } from "@utils/utils";

export default () => {
  let bob: Bob;
  let spring: Spring;

  let [k, setK] = useState(0.2); //弹性系数
  let debounceK = useDebounce(k, 500);

  const sketch = useCallback(
    (p: p5) => {
      const setup = () => {
        p.createCanvas(p.windowWidth / 2, 240);
        bob = new Bob(p, p.width / 2, 150);
        spring = new Spring(p, p.width / 2, 1, 150, debounceK);
      };

      const draw = () => {
        p.background(255);
        let gravity = p.createVector(0, 0.2);
        bob.applyForce(gravity);
        bob.update();
        bob.handleDrag(p.mouseX, p.mouseY);
        spring.connect(bob);
        spring.constrainLength(bob, 30, 230);
        spring.showLine(bob);
        bob.show();
        spring.show();
      };

      p.mousePressed = () => {
        bob.handleMousePressed(p.mouseX, p.mouseY);
      };

      p.touchStarted = () => {
        bob.handleMousePressed(p.mouseX, p.mouseY);
      };

      p.touchEnded = () => {
        bob.handleMouseReleased();
      };

      p.mouseReleased = () => {
        bob.handleMouseReleased();
      };

      const resize = () => {
        p.resizeCanvas(p.windowWidth / 2, 240);
      };

      p.setup = setup;
      p.draw = draw;
      p.windowResized = resize;
    },
    [debounceK]
  );

  return (
    <>
      <Basic sketch={sketch} showControls />
      弹性系数：{debounceK}
      <Slider
        defaultValue={[0.2]}
        max={1}
        min={0.1}
        step={0.01}
        className={cn("w-[100%] m-4")}
        onValueChange={value => {
          setK(value[0]);
        }}
        value={[k]}
      />
    </>
  );
};
