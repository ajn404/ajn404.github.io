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
    p.windowResized = () => {
      p.setup();
    };
    p.draw = () => {
      walker.step();
      walker.show();
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
        let r = p.random(1);
        if (r < 0.35) {
          this.x++;
        } else if (r < 0.6) {
          this.x--;
        } else if (r < 0.8) {
          this.y++;
        } else {
          this.y--;
        }
      }
    }
  };
  return <Basic sketch={sketch}></Basic>;
};
