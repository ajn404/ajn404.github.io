import type p5 from "p5";
import Basic from "@components/react/p5/index.tsx";
import { ForceMoverB } from "./ForceMoverB";
export default () => {
  const sketch = (p: p5) => {
    let mover: ForceMoverB;
    let moverWithWind: ForceMoverB;
    let movers: ForceMoverB[];
    const setup = () => {
      p.createCanvas(p.windowWidth / 2, 240);
      mover = new ForceMoverB(p, "mover", 32);
      moverWithWind = new ForceMoverB(p, "press mouse", 32);
      moverWithWind.position = p.createVector(
        p.width / 2,
        moverWithWind.circleRadius
      );
      movers = new Array(3)
        .fill(0)
        .map(
          (item, index) => new ForceMoverB(p, "mover" + index, p.random(16, 32))
        );
      p.frameRate(120);
    };
    const draw = () => {
      p.background(255);

      mover.move();
      mover.checkEdges();
      mover.show();
      mover.showName();

      moverWithWind.applyForce(p.createVector(0, 0.1));

      if (p.mouseIsPressed) {
        let wind = p.createVector(0.1, 0);
        moverWithWind.applyForce(wind); // 应用风
      }

      moverWithWind.move();
      moverWithWind.show();
      moverWithWind.showName();
      moverWithWind.checkEdges();

      movers.forEach(m => {
        m.applyForce(p.createVector(0, p.random(0, 1)));
        m.move();
        m.checkEdges();
        m.show();
        m.showName();
      });
    };
    const resize = () => {
      p.resizeCanvas(p.windowWidth / 2, 240);
    };
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
