import type p5 from "p5";
import Basic from "@components/react/p5/index.tsx";
import Oscillator from "./Oscillator";

export default () => {
  const sketch = (p: p5) => {
    let osi: Oscillator[];
    const setup = () => {
      p.createCanvas(p.windowWidth / 2, 240);
      p.frameRate(120);
      osi = new Array(10).fill(0).map(_ => {
        return new Oscillator(p);
      });
      console.log(osi);
    };
    const draw = () => {
      p.background(255);
      osi.forEach(item => {
        item.update();
        item.show();
      });
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
