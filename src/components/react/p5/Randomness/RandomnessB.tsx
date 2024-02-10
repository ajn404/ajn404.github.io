import type p5 from "p5";
import Basic from "../index";

export default () => {
  const sketch = (p: p5) => {
    let walker;
    p.setup = () => {
      p.createCanvas(p.windowWidth / 2, 240);
      walker = new Walker();
      p.background(255);
    };
    p.draw = () => {
      walker.step();
      walker.show();
    };
    p.windowResized = () => {
      p.setup();
    };
    class Walker {
      x: number;
      y: number;
      constructor() {
        this.x = p.width / 2;
        this.y = p.height / 2;
      }
      show() {
        p.stroke(0);
        p.point(this.x, this.y);
      }
      step() {
        let xStep = p.random(-1, 1);
        let yStep = p.random(-1, 1);

        this.x += xStep;
        this.y += yStep;
      }
    }
  };
  return <Basic sketch={sketch}></Basic>;
};
