import type p5 from "p5";
import Basic from "@components/react/p5/index.tsx";

export default () => {
  const sketch = (p: p5) => {
    const setup = () => {
      p.createCanvas(p.windowWidth / 4, p.windowWidth / 3);
    };

    const draw = () => {
      let radius = 20;
      let amplitude = p.height - radius;
      let period = amplitude - radius;
      let x = amplitude * p.sin((p.TWO_PI * p.frameCount) / period);
      let position = p.map(x, -amplitude, amplitude, 20, amplitude);
      p.background(120, 24, 136);
      p.fill(p.map(position, 20, amplitude, 0, 255));
      p.stroke(255);
      p.translate(p.width / 2, 0);
      p.line(0, 0, 0, position);
      p.circle(0, position, 20);
    };
    const resize = () => {
      p.resizeCanvas(p.windowWidth / 4, p.windowWidth / 3);
    };
    p.setup = setup;
    p.draw = draw;
    p.windowResized = resize;
  };
  return <Basic sketch={sketch} showControls></Basic>;
};
