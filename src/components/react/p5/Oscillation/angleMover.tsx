import type p5 from "p5";
import Basic from "@components/react/p5/index.tsx";
import { Mover } from "./Mover";
import { useCallback } from "react";

export default () => {
  const sketch = useCallback((p: p5) => {
    let mover: Mover[];
    const setup = () => {
      p.createCanvas(p.windowWidth / 2, 240);
      mover = new Array(10).fill(0).map(() => new Mover(p));
      p.frameRate(60);
    };
    const draw = () => {
      p.background(255);
      mover.forEach(m => {
        m.update();
        m.checkEdges();
        m.show();
      });
    };
    const resize = () => {
      p.resizeCanvas(p.windowWidth / 2, 240);
    };
    p.setup = setup;
    p.draw = draw;
    p.windowResized = resize;
  }, []);
  return (
    <>
      <Basic sketch={sketch} showControls></Basic>
    </>
  );
};
