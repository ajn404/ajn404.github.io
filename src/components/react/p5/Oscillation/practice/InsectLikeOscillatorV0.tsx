import type p5 from "p5";
import Basic from "@components/react/p5/index.tsx";
import { Insect } from "./insectLike.ts";

export default () => {
  const sketch = (p: p5) => {
    let osi: Insect;
    const setup = () => {
      p.createCanvas(p.windowWidth / 2, 240);
      p.frameRate(120);
      osi = new Insect(p);
    };
    const draw = () => {
      p.background(255);
      osi.update();
      osi.show();
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
