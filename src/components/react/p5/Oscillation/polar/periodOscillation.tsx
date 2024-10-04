import type p5 from "p5";
import Basic from "@components/react/p5/index.tsx";

export default () => {
  const sketch = (p: p5) => {
    const setup = () => {
      p.createCanvas(p.windowWidth / 2, 240);
      p.frameRate(120);
    };
    const draw = () => {
      let amplitude = p.width / 2 - 24;
      let period = amplitude - 48;
      let x = amplitude * p.sin((p.TWO_PI * p.frameCount) / period);
      p.background(0);
      p.stroke(255);
      p.fill(127);
      p.translate(p.width / 2, p.height / 2);
      p.line(0, 0, x, 0);
      p.circle(x, 0, 48);
    };
    const resize = () => {
      p.resizeCanvas(p.windowWidth / 2, 240);
    };
    p.setup = setup;
    p.draw = draw;
    p.windowResized = resize;
  };
  return <Basic sketch={sketch}></Basic>;
};
