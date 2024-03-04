import type p5 from "p5";
import Basic from "@components/react/p5/index.tsx";

export default () => {
  const sketch = (p: p5) => {
    let points = [];

    const setup = () => {
      p.createCanvas(p.windowHeight / 2, p.windowHeight / 2);
      p.background(30);
      let density = 20;
      let space = p.width / density;
      for (let i = 0; i < p.width; i += space) {
        for (let j = 0; j < p.height; j += space) {
          let point = p.createVector(i, j);
          points.push(point);
        }
      }
    };
    const draw = () => {
      p.noStroke();
      p.fill(255);
      for (let i = 0; i < points.length; i++) {
        let angle = p.map(p.noise(i, p.frameCount * 0.01), 0, 1, 0, p.TWO_PI);
        console.log(angle);

        let walk = p.createVector(p.cos(angle) * 2, p.sin(angle) * 2);
        points[i].add(walk);
        p.ellipse(points[i].x, points[i].y, 1, 1);
      }
    };
    const resize = () => p.setup();
    p.setup = setup;
    p.draw = draw;
    p.windowResized = resize;
  };
  return <Basic sketch={sketch}></Basic>;
};
