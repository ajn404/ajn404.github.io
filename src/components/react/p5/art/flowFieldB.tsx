import type p5 from "p5";
import Basic from "@components/react/p5/index.tsx";

export default () => {
  const sketch = (p: p5) => {
    let points: p5.Vector[] = [];
    let mult = 0.005;

    const setup = () => {
      p.createCanvas(p.windowWidth / 2, p.windowWidth / 2);
      p.background(30);
      // p.angleMode(p.RADIANS);
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
        let noiseX = points[i].x * mult;
        let noiseY = points[i].y * mult;
        let angle = p.map(p.noise(noiseX, noiseY), 0, 1, 0, 200);
        let walk = p.createVector(p.cos(angle) * 1, p.sin(angle) * 1);
        points[i].add(walk);
        p.ellipse(points[i].x, points[i].y, 1, 1);
      }
    };

    const click = () => {
      points = [];
      setup();
    };

    const resize = () => p.setup();

    p.setup = setup;
    p.draw = draw;
    p.mouseClicked = click;
    p.windowResized = resize;
  };
  return <Basic sketch={sketch}></Basic>;
};
