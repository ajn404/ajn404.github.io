import type p5 from "p5";
import Basic from "@components/react/p5/index.tsx";
import { useCallback } from "react";
import { Bob } from "./Bob";
import { Spring } from "./Spring";

export default () => {
  let bob: Bob;
  let spring: Spring;
  const sketch = useCallback((p: p5) => {
    const setup = () => {
      p.createCanvas(p.windowWidth / 2, 240);
      bob = new Bob(p, p.width / 2, 100);
      spring = new Spring(p, p.width / 2, 10, 100);
    };

    const draw = () => {
      p.background(255);
      let gravity = p.createVector(0, 0.2);
      bob.applyForce(gravity);
      bob.update();
      bob.handleDrag(p.mouseX, p.mouseY);
      spring.connect(bob);
      spring.constrainLength(bob, 30, 200);
      spring.showLine(bob);
      bob.show();
      spring.show();
    };

    p.mousePressed = () => {
      bob.handleMousePressed(p.mouseX, p.mouseY);
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
  }, []);

  return (
    <>
      <Basic sketch={sketch} showControls />
    </>
  );
};
