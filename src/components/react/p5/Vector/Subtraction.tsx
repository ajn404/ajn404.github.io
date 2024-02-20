import type p5 from "p5";
import Basic from "@components/react/p5/index.tsx";

export default () => {
  let mouse: p5.Vector, centre: p5.Vector;
  const sketch = (p: p5) => {
    const setup = () => {
      p.createCanvas(p.windowWidth / 2, 240);
      centre = p.createVector(p.width / 2, p.height / 2);
    };
    const draw = () => {
      mouse = p.createVector(p.mouseX, p.mouseY);
      p.background(255);
      p.stroke(125, 99, 199);
      p.strokeWeight(5);

      p.line(0, 0, mouse.x, mouse.y);
      p.stroke(255, 26, 89);

      p.line(0, 0, centre.x, centre.y);

      mouse.sub(centre);
      p.strokeWeight(10);
      p.stroke(187, 199, 188);
      p.translate(p.width / 2, p.height / 2);
      p.line(0, 0, mouse.x, mouse.y);
    };
    const resize = () => p.setup();
    p.setup = setup;
    p.draw = draw;
    p.windowResized = resize;
  };
  return <Basic sketch={sketch} showControls></Basic>;
};
