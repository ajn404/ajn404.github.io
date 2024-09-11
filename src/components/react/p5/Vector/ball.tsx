import type p5 from "p5";
import Basic from "@components/react/p5/index.tsx";

export default () => {
  const sketch = (p: p5) => {
    let x = 100;
    let y = 200;
    let xSpeed = 0.5;
    let ySpeed = 0.5;
    const setup = () => {
      p.createCanvas(p.windowWidth / 2, 80);
      (x = p.width / 2), (y = p.height / 2);
    };
    const draw = () => {
      p.background(255);
      x += xSpeed;
      y += ySpeed;
      if (x + 8 > p.width || x < 8) {
        xSpeed *= -1;
      }
      if (y + 8 > p.height || y < 8) {
        ySpeed *= -1;
      }
      p.stroke(10);
      p.fill(127, 30, 30);
      p.circle(x, y, 16);
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
