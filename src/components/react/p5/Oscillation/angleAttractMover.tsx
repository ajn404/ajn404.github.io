import type p5 from "p5";
import Basic from "@components/react/p5/index.tsx";
import { Attractor } from "./composition/attractMover";
import Mover from "./composition/attractMover";
import { useCallback } from "react";

export default () => {
  const sketch = useCallback((p: p5) => {
    let mover: Mover[];
    let attractor: Attractor;
    const setup = () => {
      p.createCanvas(p.windowWidth / 2, 240);
      mover = new Array(10).fill(0).map(() => new Mover(p));
      attractor = new Attractor(p, p.width / 2, p.height / 2);
      p.frameRate(60);
    };
    const draw = () => {
      try {
        p.background(255);
        attractor.display();
        mover.forEach(async m => {
          const force = await attractor.attract(m);
          m.applyForce(force);
          m.update();
          m.checkEdges();
          m.show();
        });
      } catch (e) {
        p.noLoop();
        console.log(e);
      }
    };
    const resize = () => {
      p.resizeCanvas(p.windowWidth / 2, 240);
    };
    p.setup = setup;
    p.draw = draw;
    p.windowResized = resize;
  }, []);
  return <Basic sketch={sketch} showControls></Basic>;
};
