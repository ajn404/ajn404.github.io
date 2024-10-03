import type p5 from "p5";
import Basic from "@components/react/p5/index.tsx";
import MouseLeadingCar from "./mouseLeadingCar";

export default () => {
  const sketch = (p: p5) => {
    let mover: MouseLeadingCar;
    const setup = () => {
      p.createCanvas(p.windowWidth / 2, 240);
      p.background(255);
      mover = new MouseLeadingCar(p);
      p.frameRate(120);
    };
    const draw = () => {
      p.background(255);
      mover.update();
      mover.checkEdges();
      mover.show();
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
