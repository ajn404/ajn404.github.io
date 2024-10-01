import type p5 from "p5";
import Basic from "@components/react/p5/index.tsx";

export default () => {
  const sketch = (p: p5) => {
    let theta = 0;
    let r = 0;
    const setup = () => {
      p.createCanvas(p.windowWidth / 2, 240);
      p.background(0);
      r = p.height * 0.45;
      p.frameRate(120);
    };
    const draw = () => {
      p.background(100);
      theta += 0.02;
      p.translate(p.width / 2, p.height / 2);
      let x = r * Math.cos(theta);
      let y = r * Math.sin(theta);
      p.push();
      p.fill(0, 0, 0);
      p.stroke(255);
      p.circle(0, 0, r * 2);
      p.line(0, 0, x, y);
      p.pop();
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
