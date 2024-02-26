import type p5 from "p5";
import Basic from "@components/react/p5/index.tsx";
import { ForceMoverB } from "./ForceMoverB";

export default () => {
  const sketch = (p: p5) => {
    let mover: ForceMoverB;
    const setup = () => {
      p.createCanvas(p.windowWidth / 2, 240);
      mover = new ForceMoverB(p);
      p.frameRate(120);
    };
    const draw = () => {
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
