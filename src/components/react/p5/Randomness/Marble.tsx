import type p5 from "p5";
import Basic from "@components/react/p5/index.tsx";

export default () => {
  const sketch = (p: p5) => {
    let w = p.windowWidth / 2;
    const setup = () => {
      p.createCanvas(w, p.windowHeight / 3);
      p.loadPixels();
      let xoff = 0.0;
      for (let x = 0; x < p.width; x++) {
        let yoff = 0.0;
        for (let y = 0; y < p.height; y++) {
          p.noiseDetail(6, 0.25);
          const color = colorizeMarble(p.noise(xoff, yoff));
          p.set(x, y, color);
          yoff += 0.1;
        }
        xoff += 0.1;
      }
      p.updatePixels();
    };
    function colorizeMarble(noiseVal) {
      let marbleColor = p.map(noiseVal, 0, 1, 150, 255);
      return p.color(marbleColor);
    }
    const draw = () => {};
    const resize = () => {
      p.resizeCanvas(p.windowWidth / 2, 240);
    };
    p.setup = setup;
    p.draw = draw;
    p.windowResized = resize;
  };
  return <Basic sketch={sketch}></Basic>;
};
