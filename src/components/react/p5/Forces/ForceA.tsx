import type p5 from "p5";
import Basic from "@components/react/p5/index.tsx";
import { ForceMoverA } from "./ForceMoverA";

export default () => {
  const sketch = (p: p5) => {
    let mover: ForceMoverA;
    const setup = () => {
      p.createCanvas(p.windowWidth / 2, 240);
      mover = new ForceMoverA(p);
      p.frameRate(120);
    };
    const draw = () => {
      mover.move();
      mover.checkEdges();
      mover.show();
    };
    const resize = () => {
      p.resizeCanvas(p.windowWidth / 2, 240);
    };
    p.setup = setup;
    p.draw = draw;
    p.windowResized = resize;
  };
  return <Basic sketch={sketch} showControls></Basic>;
};
