import type p5 from "p5";
import Basic from "@components/react/p5/index.tsx";
import { Mover } from "./Mover";

export default () => {
  const sketch = (p: p5) => {
    let mover: Mover;
    const setup = () => {
      p.createCanvas(p.windowWidth / 2, 240);
      mover = new Mover(p);
    };
    const draw = () => {
      p.background(255);
      mover.move();
      mover.checkEdges();
      mover.show();
    };
    const resize = () => p.setup();
    p.setup = setup;
    p.draw = draw;
    p.windowResized = resize;
  };
  return <Basic sketch={sketch} showControls></Basic>;
};
