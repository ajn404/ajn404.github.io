import type p5 from "p5";
import Basic from "@components/react/p5/index.tsx";

export default () => {
  const sketch = (p: p5) => {
    let yoff = 0;
    let seed = 5;
    let { PI } = p;

    const branch = (h: number, xoff: number) => {
      let sw = p.map(h, 2, 100, 1, 5);
      p.strokeWeight(sw);
      p.line(0, 0, 0, -h);
      p.translate(0, -h);

      h *= 0.71;
      xoff += 0.1;

      if (h > p.height / 60) {
        let n = p.floor(p.random(1, 5));
        for (let i = 0; i < n; i++) {
          let noise = p.noise(xoff + i, yoff);
          let theta = p.map(noise, 0, 1, -PI / 2, PI / 2);
          if (n % 2 == 0) theta *= -1;
          p.stroke(0);
          p.push();
          p.rotate(theta);
          branch(h, xoff);
          p.pop();
        }
      }
    };

    const setup = () => {
      p.createCanvas(p.windowWidth / 4 + 20, 200);
    };

    const draw = () => {
      p.background(255);
      p.translate(p.width / 2, p.height);
      yoff += 0.005;
      p.randomSeed(seed);
      branch(p.height / 5, 0);
    };

    p.mouseClicked = () => {
      yoff = p.random(1000);
      seed = p.millis();
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
