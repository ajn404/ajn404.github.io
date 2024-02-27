import type p5 from "p5";
import Basic from "@components/react/p5/index.tsx";
import { ForceMoverB } from "./ForceMoverB";
export default () => {
  const sketch = (p: p5) => {
    let moverWithWind: ForceMoverB;
    const setup = () => {
      p.createCanvas(p.windowWidth / 2, 240);
      moverWithWind = new ForceMoverB(p, "press mouse", 32);
      p.frameRate(120);
    };
    const draw = () => {
      p.background(255);
      moverWithWind.applyForce(p.createVector(0, 0.1));

      if (p.mouseIsPressed) {
        let wind = p.createVector(0.1, 0);
        moverWithWind.applyForce(wind); // 应用风
      }
      moverWithWind.move();
      moverWithWind.show();
      moverWithWind.showName();
      moverWithWind.checkEdges();
    };
    const resize = () => p.setup();
    p.setup = setup;
    p.draw = draw;
    p.windowResized = resize;
  };
  return (
    <>
      <Basic sketch={sketch} showControls></Basic>
    </>
  );
};
