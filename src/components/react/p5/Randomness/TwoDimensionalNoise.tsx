import type p5 from "p5";
import Basic from "@components/react/p5/index.tsx";

export default () => {
  const sketch = (p: p5) => {
    const setup = () => {
      p.createCanvas(p.windowWidth / 2, 240);
      p.loadPixels();
      let xoff = 0.0;
      for (let x = 0; x < p.width; x++) {
        let yoff = 0.0;
        for (let y = 0; y < p.height; y++) {
          const bright = p.map(p.noise(xoff, yoff), 0, 1, 0, 255);
          p.set(x, y, p.floor(bright));
          yoff += 0.01;
        }
        xoff += 0.01;
      }
      p.updatePixels();
    };
    const draw = () => {};
    const resize = () => p.setup();
    p.setup = setup;
    p.draw = draw;
    p.windowResized = resize;
  };
  return <Basic sketch={sketch} showControls></Basic>;
};
