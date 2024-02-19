import type p5 from "p5";
import Basic from "@components/react/p5/index.tsx";

export default () => {
  const sketch = (p: p5) => {
    let pos, velocity;
    const setup = () => {
      p.createCanvas(p.windowWidth / 2, 240);
    };
    const draw = () => {
      p.background(204);
      p.fill(255, 0, 0);
      p.stroke(88);
    };
    const resize = () => p.setup();
    p.setup = setup;
    p.draw = draw;
    p.windowResized = resize;
  };
  return <Basic sketch={sketch} showControls></Basic>;
};
