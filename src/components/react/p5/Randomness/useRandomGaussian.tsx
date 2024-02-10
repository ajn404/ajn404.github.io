import type p5 from "p5";
import Basic from "@components/react/p5/index.tsx";

export default () => {
  const sketch = (p: p5) => {
    const setup = () => {
      p.createCanvas(p.windowWidth / 2, 240);
      p.background("teal");
    };
    const draw = () => {
      let x = p.randomGaussian(p.width / 2, 60);
      p.noStroke();
      p.fill(0, 100);
      p.circle(x, p.height / 2 - 16, 16);
      p.fill(255, 244, 233);
      p.circle(p.width - x, p.height / 2 + 16, 16);
    };
    const resize = () => p.setup();
    p.setup = setup;
    p.draw = draw;
    p.windowResized = resize;
  };
  return <Basic sketch={sketch} showControls></Basic>;
};
