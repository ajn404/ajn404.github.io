import type p5 from "p5";
import Basic from "@components/react/p5/index.tsx";

export default () => {
  const sketch = (p: p5) => {
    let pos, velocity;
    const setup = () => {
      p.createCanvas(p.windowWidth / 2, 80);
      pos = p.createVector(p.width / 2, p.height / 2);
      velocity = p.createVector(1.2, 0.8);
    };
    const draw = () => {
      p.background(204);
      p.fill(255, 0, 0);
      p.stroke(88);

      if (pos.x + 8 > p.width || pos.x < 8) {
        velocity.x = velocity.x * -1;
      }
      if (pos.y + 8 > p.height || pos.y < 8) {
        velocity.y = velocity.y * -1;
      }
      pos.add(velocity);
      p.circle(pos.x, pos.y, 16);
    };
    const resize = () => p.setup();
    p.setup = setup;
    p.draw = draw;
    p.windowResized = resize;
  };
  return <Basic sketch={sketch} showControls></Basic>;
};
