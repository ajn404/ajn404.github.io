import type p5 from "p5";
import Basic from "@components/react/p5/index.tsx";

export default () => {
  const sketch = (p: p5) => {
    let theta = 0;
    let r = 0;
    const setup = () => {
      p.createCanvas(p.windowWidth / 2, 240);
      p.background(0);
      r = 0;
      p.frameRate(120);
    };
    const draw = () => {
      theta += 0.02;
      r += 0.02;
      p.translate(p.width / 2, p.height / 2);
      let x = r * Math.cos(theta);
      let y = r * Math.sin(theta);
      p.push();
      p.fill(0, 0, 0);
      p.stroke(255);
      p.point(x, y);
      p.pop();
      if (r > p.width / 2) p.noLoop();
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
